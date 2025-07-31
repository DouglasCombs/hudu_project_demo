import {yupResolver} from '@hookform/resolvers/yup';
import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import {HStack, Spinner, VStack} from 'native-base';
import React, {useMemo, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ArrowUp} from '~/assets/icons';
import {
  CustomButton,
  CustomContainer,
  CustomDivider,
  CustomKeyboardAvoidingView,
  CustomText,
  CustomTouchable,
  FormInput,
  ScreensHeader,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {PayType, ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {useAcceptBid, useGetAcceptBidDetails} from '~/hooks/bid';
import {
  useCheckCouponCode,
  useCreateEphemeralKeyMutation,
  useGetPublishableKey,
} from '~/hooks/payment';
import {goBack} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';

const defaultValues = {
  couponCode: '',
};

export default function PaymentScreen({route}: {route: any}) {
  const {bid, projectId} = route?.params;

  const {t} = useTranslation();
  const {paymentSchema} = useSchemas();
  const {showResponseMessage} = useGetMessages();

  const {...methods} = useForm({
    resolver: yupResolver(paymentSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState, watch} = methods;

  const {userData} = userDataStore(state => state);

  const {data: getPublishableKeyData, isLoading: isLoadingGetPublishableKey} =
    useGetPublishableKey();
  const {data: getAcceptBidDetails, isLoading: isLoadingGetAcceptBidDetails} =
    useGetAcceptBidDetails(bid?.id);
  const {mutate: mutateAcceptBid, isLoading: acceptBidLoading} = useAcceptBid();
  const {mutate: mutateEphemeralKey, isLoading: createEphemeralKeyLoading} =
    useCreateEphemeralKeyMutation();
  const {mutate: mutateCheckCouponCode, isLoading: isLoadingCheckCouponCode} =
    useCheckCouponCode();

  const getAcceptBidResult =
    getAcceptBidDetails?.bid_getAcceptBidDetails?.result;

  const [couponCodeStatus, setCouponCodeStatus] = useState({
    status: false,
    percent: 0,
  });
  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading: stripeLoading,
  } = usePaymentSheet();

  const result = getPublishableKeyData?.payment_getPublishableKey?.result;

  const bidFinalAmount = useMemo(() => {
    const commission = (result?.listerApplicationFee * bid?.amount) / 100 ?? 0;
    const final = commission + bid?.amount;
    return final;
  }, [bid, result]);

  const hasLength = watch('couponCode')?.trim()?.length > 0;

  const disabled = !hasLength || isLoadingCheckCouponCode;

  const percentToSubtract = couponCodeStatus?.percent ?? 0;
  const percentToReferral = result?.referalDiscountPercent ?? 0;
  const percentageAmount = bidFinalAmount * (percentToSubtract / 100);
  const firstPercentageAmount = bidFinalAmount * (percentToReferral / 100);
  const newTotal = bidFinalAmount - percentageAmount;
  const newFirstTotal = bidFinalAmount - firstPercentageAmount;

  const onChangeCouponCode = () => {
    setCouponCodeStatus({
      status: false,
      percent: 0,
    });
  };

  const paymentOnPress = async (formData: typeof defaultValues) => {
    mutateEphemeralKey(
      {},
      {
        onSuccess: successData => {
          if (
            successData?.payment_createEphemeralKey?.status ===
            ResponseStatus.Success
          ) {
            const ephemeralKey =
              successData?.payment_createEphemeralKey?.result?.secret;
            if (couponCodeStatus?.status) {
              onBid(ephemeralKey, formData);
            } else {
              onBid(ephemeralKey);
            }
          }
        },
      },
    );
  };

  const onBid = async (ephemeralKey: any, formData?: any) => {
    if (bid) {
      if (result?.publishableKey) {
        const input = {
          bidId: bid?.id,
          ...(formData?.couponCode &&
            couponCodeStatus?.status && {couponCode: formData?.couponCode}),
        };
        mutateAcceptBid(input as any, {
          onSuccess: async successData => {
            if (successData?.bid_acceptBid?.status === ResponseStatus.Success) {
              if (
                successData?.bid_acceptBid?.result?.payType !== PayType.ByWallet
              ) {
                const clientSecret =
                  successData?.bid_acceptBid?.result?.clientSecret ?? '';
                const {error: initPaymentError} = await initPaymentSheet({
                  customerId: userData?.stripeCustomerId,
                  paymentIntentClientSecret: clientSecret,
                  merchantDisplayName: 'HUDU Inc.',
                  allowsDelayedPaymentMethods: true,
                  customerEphemeralKeySecret: ephemeralKey,
                });
                if (initPaymentError) {
                  showErrorMessage(initPaymentError?.message);
                } else {
                  const {error: paymentError} = await presentPaymentSheet();
                  if (paymentError) {
                    showErrorMessage(paymentError?.message);
                    queryClient.invalidateQueries([
                      queryKeys.project,
                      projectId,
                    ]);
                    queryClient.invalidateQueries(
                      [queryKeys.bidsOrderByStatus],
                      {exact: false},
                    );
                    queryClient.invalidateQueries(
                      [queryKeys.getBidsInProjectTab],
                      {exact: false},
                    );
                    queryClient.invalidateQueries([queryKeys.bids], {
                      exact: false,
                    });
                    queryClient.invalidateQueries([queryKeys.getUserReviews], {
                      exact: false,
                    });
                    queryClient.invalidateQueries([queryKeys.projects], {
                      exact: false,
                    });
                    queryClient.invalidateQueries(
                      [queryKeys.projectQuestions],
                      {exact: false},
                    );
                    queryClient.invalidateQueries(
                      [queryKeys.userLikeProjects],
                      {exact: false},
                    );
                    setTimeout(() => {
                      goBack?.();
                    }, 3000);
                  } else {
                    onSuccessAccept();
                  }
                }
              } else {
                onSuccessAccept();
              }
            }
          },
          onError: () => {},
        });
      } else {
        showErrorMessage();
      }
    } else {
      showErrorMessage(t('messages.errors.enterValidCardNumber'));
    }
  };

  const onSuccessAccept = () => {
    showSuccessMessage(t('messages.paymentSuccessfully'));
    queryClient.invalidateQueries([queryKeys.project, projectId]);
    queryClient.invalidateQueries(queryKeys.bidsOrderByStatus, {
      exact: false,
    });
    queryClient.invalidateQueries([queryKeys.getBidsInProjectTab], {
      exact: false,
    });
    queryClient.invalidateQueries([queryKeys.bids], {exact: false});
    queryClient.invalidateQueries([queryKeys.getUserReviews], {
      exact: false,
    });
    queryClient.invalidateQueries([queryKeys.projectQuestions], {exact: false});
    queryClient.invalidateQueries([queryKeys.projects], {exact: false});
    queryClient.invalidateQueries([queryKeys.userLikeProjects], {exact: false});
    queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
      exact: false,
    });
    setTimeout(() => {
      goBack?.();
    }, 3000);
  };

  const cancelOnPress = () => {
    goBack();
  };

  const checkCouponCode = () => {
    const couponCode = watch('couponCode')?.trim();

    mutateCheckCouponCode(
      {couponCode},
      {
        onSuccess: successData => {
          switch (successData?.coupon_isCouponValid?.status) {
            case ResponseStatus.Success:
              showSuccessMessage(t('messages.promoCodeIsValid'));
              setCouponCodeStatus({
                status: true,
                percent: parseInt(
                  successData?.coupon_isCouponValid?.result?.coupon?.percent,
                ),
              });
              break;
            case ResponseStatus.DiffrenetIds:
              showErrorMessage(t('messages.couponLimit'));
              setCouponCodeStatus({
                status: false,
                percent: 0,
              });
              break;
            case ResponseStatus.TimeConflict:
              showErrorMessage(t('messages.timeConflict'));
              setCouponCodeStatus({
                status: false,
                percent: 0,
              });
              break;
            case ResponseStatus.NotAllowed:
              showErrorMessage(t('messages.notAllowed'));
              setCouponCodeStatus({
                status: false,
                percent: 0,
              });
              break;

            default:
              showResponseMessage(successData?.coupon_isCouponValid?.status);
              setCouponCodeStatus({
                status: false,
                percent: 0,
              });
              break;
          }
        },
        onError: () => {
          setCouponCodeStatus({
            status: false,
            percent: 0,
          });
        },
      },
    );
  };

  const loading =
    stripeLoading ||
    acceptBidLoading ||
    isLoadingGetPublishableKey ||
    createEphemeralKeyLoading ||
    isLoadingGetAcceptBidDetails;

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader backAction title={t('projects.payment.paymentSummary')} />
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView>
          <VStack flex={1}>
            <VStack space="16px" p="24px" flex={1}>
              <Item
                title={t('projects.payment.price')}
                value={
                  getAcceptBidResult?.newBidAmount
                    ? `$${getAcceptBidResult?.newBidAmount?.toFixed(2) ?? ''}`
                    : `$${bid?.amount?.toFixed(2) ?? ''}`
                }
              />
              <Item
                title={t('projects.payment.huduCommission')}
                value={`${result?.listerApplicationFee ?? 0}%`}
              />
              {result?.isFirstAcceptingProject ? (
                <Item
                  title={t('projects.payment.firstProjectDiscountCode')}
                  value={`${result?.referalDiscountPercent}%`}
                />
              ) : (
                <VStack space="12px">
                  <CustomText color={Colors.Topaz} fontSize={fontSize.xNormal}>
                    {t('projects.payment.promoCode')}
                  </CustomText>
                  <FormInput
                    outline
                    outlineBorderColor={Colors.Ghost}
                    onChangeText={onChangeCouponCode}
                    {...register('couponCode')}
                    {...{formState}}
                    autoCapitalize="none"
                    rightComponent={
                      <CustomTouchable
                        disabled={disabled}
                        onPress={checkCouponCode}>
                        {isLoadingCheckCouponCode ? (
                          <Spinner size="sm" color={Colors.PRIMARY} />
                        ) : (
                          <ArrowUp
                            fillColor={
                              disabled
                                ? Colors.SEARCH_BACKGROUND
                                : Colors.PRIMARY
                            }
                            strokeColor={
                              disabled ? Colors.DEEP_FIR : Colors.WHITE_F
                            }
                          />
                        )}
                      </CustomTouchable>
                    }
                  />
                </VStack>
              )}
              <Item
                mt="8px"
                color={Colors.BLACK}
                title={t('projects.payment.total')}
                // value={`$${newTotal.toFixed(2)}`}
                value={
                  result?.isFirstAcceptingProject
                    ? `$${newFirstTotal.toFixed(2)}`
                    : `$${newTotal.toFixed(2)}`
                }
              />
            </VStack>
            <StripeProvider
              merchantIdentifier="merchant.com.hudu"
              publishableKey={result?.publishableKey}>
              <VStack pb="8">
                <CustomDivider my="24px" />
                <HStack space="16px" px="24px">
                  <CustomButton
                    flex={1}
                    textColor={Colors.Topaz}
                    color={Colors.Solitude}
                    onPress={cancelOnPress}
                    title={t('common.cancel')}
                    disabled={loading}
                  />
                  <CustomButton
                    flex={1}
                    color={Colors.LimeGreen}
                    onPress={handleSubmit(paymentOnPress)}
                    title={t('common.award')}
                    disabled={loading}
                  />
                </HStack>
              </VStack>
            </StripeProvider>
          </VStack>
        </CustomKeyboardAvoidingView>
      </FormProvider>
    </CustomContainer>
  );
}

const Item = ({
  title,
  value,
  color = Colors.Topaz,
  mt,
}: {
  title: string;
  value?: string;
  color?: string;
  mt?: number | string;
}) => {
  return (
    <HStack mt={mt} alignItems="center">
      <CustomText color={color} fontSize={fontSize.xNormal} flex={1}>
        {title}
      </CustomText>
      {value && <CustomText fontFamily={fontFamily.medium}>{value}</CustomText>}
    </HStack>
  );
};
