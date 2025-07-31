import {yupResolver} from '@hookform/resolvers/yup';
import {Box, HStack, VStack} from 'native-base';
import React, {useMemo, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Wallet, WithDraw} from '~/assets/icons';
import {
  ConfirmationModalV2,
  CustomButton,
  CustomContainer,
  CustomDropDown,
  CustomKeyboardAvoidingView,
  CustomText,
  FormInput,
  ScreensHeader,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import queryKeys from '~/constants/queryKeys';
import {ResponseStatus, WidthrawWalletType} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {useWithdrawUserWallet} from '~/hooks/payment';
import {useGetMeProfile} from '~/hooks/user';
import {useSchemas} from '~/schemas';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';

export default function WithDrawScreen() {
  const {t} = useTranslation();
  const {showResponseMessage} = useGetMessages();
  const {withdrawSchema, withdrawRegularSchema} = useSchemas();
  const {withdrawalMethodData} = useMockData();
  const confirmationModalRef = useRef<ModalRef>(null);

  const [withdrawalMethod, setWithdrawalMethod] = useState(
    withdrawalMethodData[0],
  );

  const isInstantPayout = useMemo(() => {
    return withdrawalMethod?.value === 'instantPayout';
  }, [withdrawalMethod]);

  const {userData} = userDataStore(state => state);

  const {...methods} = useForm({
    resolver: yupResolver(
      isInstantPayout ? withdrawSchema : withdrawRegularSchema,
    ),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState, setValue, watch} = methods;

  const getMeOptions = userData?.id ? {userId: userData?.id} : {enabled: false};

  const {isLoading: getProfileLoading, data: getProfile} =
    useGetMeProfile(getMeOptions);

  const {mutate: mutateWithdraw, isLoading: isLoadingWithdraw} =
    useWithdrawUserWallet();

  const profile = useMemo(() => {
    const emptyObj = {};
    return getProfile?.user_getProfile?.result ?? emptyObj;
  }, [getProfile]);

  const amount = watch('amount');

  const bankFee = useMemo(() => {
    return isInstantPayout
      ? parseInt(amount) > 0
        ? (parseInt(amount) * 1) / 100
        : 0
      : 0;
  }, [isInstantPayout, amount]);

  const withdraw = () => {
    confirmationModalRef?.current?.open();
  };

  const onChangeWithdrawalMethod = (value: any) => {
    setWithdrawalMethod(value);
  };

  const onSubmitPaymentModal = () => {
    if (isInstantPayout) {
      mutateWithdraw(
        {
          amount: parseInt(amount),
          widthrawWalletType: WidthrawWalletType.PayOut,
        },
        {
          onSuccess: successData => {
            if (
              successData?.payment_widthrawUsersWallet?.status ===
              ResponseStatus.Success
            ) {
              queryClient.invalidateQueries(queryKeys.myProfile);
              setValue('amount', null);
              confirmationModalRef?.current?.close();
            } else {
              showResponseMessage(
                successData?.payment_widthrawUsersWallet?.status,
              );
            }
          },
        },
      );
    } else {
      mutateWithdraw(
        {
          amount: parseInt(amount),
          widthrawWalletType: WidthrawWalletType.TransferToStripe,
        },
        {
          onSuccess: successData => {
            if (
              successData?.payment_widthrawUsersWallet?.status ===
              ResponseStatus.Success
            ) {
              queryClient.invalidateQueries(queryKeys.myProfile);
              setValue('amount', null);
              confirmationModalRef?.current?.close();
            } else {
              showResponseMessage(
                successData?.payment_widthrawUsersWallet?.status,
              );
            }
          },
        },
      );
    }
  };

  const loading = getProfileLoading;

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader backAction title={t('profile.payment.withdraw')} />
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      <CustomKeyboardAvoidingView>
        <VStack flex={1} p="24px">
          <FormProvider {...methods}>
            <VStack flex={1} space="36px">
              <HStack space="16px" alignItems="center">
                <WithDraw />
                <VStack flex={1} space="4px">
                  <CustomText>{t('common.refundedAmount')}</CustomText>
                  <CustomText fontFamily={fontFamily.bold}>
                    {`$${profile?.wallet ? profile?.wallet?.toFixed(2) : 0}`}
                  </CustomText>
                </VStack>
              </HStack>
              <HStack space="16px" alignItems="center">
                <Wallet />
                <VStack flex={1} space="8px">
                  <CustomText fontSize={fontSize.tiny}>
                    {t('profile.payment.withdrawalMethod')}
                  </CustomText>
                  <CustomDropDown
                    data={withdrawalMethodData}
                    onChange={onChangeWithdrawalMethod}
                    value={withdrawalMethod}
                    titleKey="title"
                    title={t('profile.payment.withdrawalMethod')}
                    titleFlex={1}
                    titleFontSize={fontSize.xNormal}
                    chevronColor={Colors.BLACK}
                    underline
                    alignItems="flex-start"
                    justifyContent="center"
                    modalTitle={t('profile.payment.withdrawalMethod')}
                    showChevronIcon
                    showSelectedValue
                  />
                </VStack>
              </HStack>
              <VStack px="56px" alignItems="center">
                <FormInput
                  px="0"
                  textAlign="center"
                  errorAlignment="center"
                  backgroundColor={Colors.TRANSPARENT}
                  underline
                  {...register('amount')}
                  {...{formState}}
                  keyboardType="numeric"
                />
                {isInstantPayout && (
                  <CustomText>
                    {t('profile.payment.bankFee')}{' '}
                    <CustomText
                      color={Colors.PRIMARY}>{`$${bankFee}`}</CustomText>
                  </CustomText>
                )}
              </VStack>
            </VStack>
            <VStack space="24px">
              <CustomButton
                color={Colors.PRIMARY}
                onPress={handleSubmit(withdraw)}
                title={t('profile.payment.review')}
              />
            </VStack>
          </FormProvider>
        </VStack>
      </CustomKeyboardAvoidingView>
      <ConfirmationModalV2
        ref={confirmationModalRef}
        onSubmit={onSubmitPaymentModal}
        title={t('profile.payment.reviewPayment')}
        submitTitle={t('common.approve')}
        cancelTitle={t('common.back')}
        submitColor={Colors.LimeGreen}
        isLoading={isLoadingWithdraw}>
        <VStack space="18px" pt="16px" pb="86px">
          <Item
            title={t('profile.payment.availableAmount')}
            value={`$${profile.wallet}`}
          />
          <Item
            title={t('profile.payment.paymentMethod')}
            value={withdrawalMethod?.title}
          />
          <Item
            title={t('profile.payment.withdrawalRequest')}
            value={`$${amount}`}
          />
          <Item title={t('profile.payment.bankFee')} value={`$${bankFee}`} />
          <Item
            titleColor={Colors.BLACK}
            title={t('profile.payment.total')}
            value={`$${amount - bankFee}`}
          />
        </VStack>
      </ConfirmationModalV2>
    </CustomContainer>
  );
}

const Item = ({
  title,
  value,
  titleColor = Colors.Topaz,
}: {
  title: any;
  value: any;
  titleColor?: string;
}) => {
  return (
    <HStack alignItems="center">
      <CustomText flex={1} color={titleColor}>
        {title}
      </CustomText>
      <CustomText>{value}</CustomText>
    </HStack>
  );
};
