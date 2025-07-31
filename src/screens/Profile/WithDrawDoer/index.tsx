import {yupResolver} from '@hookform/resolvers/yup';
import {Box, HStack, VStack} from 'native-base';
import React, {useMemo, useRef} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Wallet, WithDraw} from '~/assets/icons';
import {
  ConfirmationModalV2,
  CustomButton,
  CustomContainer,
  CustomKeyboardAvoidingView,
  CustomText,
  FormInput,
  ScreensHeader,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import queryKeys from '~/constants/queryKeys';
import {ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {
  useGetStripeConnectUserBalance,
  usePaymentPayoutForConnect,
} from '~/hooks/payment';
import {useSchemas} from '~/schemas';
import {Colors} from '~/styles';
import {useGetMessages} from '~/utils/helper';
import {fontFamily} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

export default function WithDrawDoerScreen() {
  const {t} = useTranslation();
  const {withdrawSchema} = useSchemas();
  const {withdrawalMethodData} = useMockData();
  const confirmationModalRef = useRef<ModalRef>(null);

  const {...methods} = useForm({
    resolver: yupResolver(withdrawSchema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState, setValue, watch} = methods;

  const {isLoading: isLoadingGetBalance, data: getBalance} =
    useGetStripeConnectUserBalance();

  const balance = useMemo(() => {
    return getBalance?.payment_getStripeConnectUserBlance?.result > 0
      ? getBalance?.payment_getStripeConnectUserBlance?.result / 100
      : 0;
  }, [getBalance]);

  const {mutate: mutateWithdraw, isLoading: isLoadingWithdraw} =
    usePaymentPayoutForConnect();

  const amount = watch('amount');

  const bankFee = useMemo(() => {
    return parseInt(amount) > 0 ? (parseInt(amount) * 1) / 100 : 0;
  }, [amount]);

  const withdraw = () => {
    if (parseInt(amount) > parseInt(balance)) {
      showErrorMessage(t('profile.payment.maxError'));
    } else {
      confirmationModalRef?.current?.open();
    }
  };

  const onSubmitPaymentModal = () => {
    mutateWithdraw(
      {amount: parseInt(amount)},
      {
        onSuccess: successData => {
          if (
            successData?.payment_payoutForConnects?.status ===
            ResponseStatus.Success
          ) {
            queryClient.invalidateQueries(
              queryKeys.getStripeConnectUserBalance,
            );
            setValue('amount', null);
            confirmationModalRef?.current?.close();
          } else {
            confirmationModalRef?.current?.close();
          }
        },
      },
    );
  };

  const loading = isLoadingGetBalance;

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
                    {`$${balance ? balance?.toFixed(2) : 0}`}
                  </CustomText>
                </VStack>
              </HStack>

              <HStack space="16px" alignItems="center">
                <Wallet />
                <VStack flex={1} space="4px">
                  <CustomText>
                    {t('profile.payment.withdrawalMethod')}
                  </CustomText>
                  <CustomText fontFamily={fontFamily.bold}>
                    {withdrawalMethodData[0]?.title}
                  </CustomText>
                </VStack>
              </HStack>

              <VStack px="56px" alignItems="center">
                <FormInput
                  isReadOnly={balance > 0 ? false : true}
                  px="0"
                  textAlign="center"
                  errorAlignment="center"
                  backgroundColor={Colors.TRANSPARENT}
                  underline
                  {...register('amount')}
                  {...{formState}}
                  keyboardType="numeric"
                />

                <CustomText>
                  {t('profile.payment.bankFee')}{' '}
                  <CustomText
                    color={Colors.PRIMARY}>{`$${bankFee}`}</CustomText>
                </CustomText>
              </VStack>
            </VStack>
            <VStack space="24px">
              <CustomButton
                disabled={balance > 0 ? false : true}
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
            value={`$${balance}`}
          />
          <Item
            title={t('profile.payment.paymentMethod')}
            value={withdrawalMethodData[0]?.title}
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
