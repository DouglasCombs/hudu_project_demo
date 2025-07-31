import {HStack, VStack} from 'native-base';
import React, {memo, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {EmptyQuestions} from '~/assets/icons';
import {
  CustomButton,
  CustomDivider,
  CustomFlatList,
  CustomText,
  EmptyData,
  PaymentHistoryItem,
} from '~/components';
import {BidStatus, ProjectFilter} from '~/generated/graphql';
import {useGetUserBids} from '~/hooks/bid';
import {
  useGetProjectDoerPaymentDetails,
  useGetStripeConnectUserBalance,
} from '~/hooks/payment';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

function SectionPaymentHistory() {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);

  const {data: getPaymentDetails, isLoading: isLoadingGetPaymentDetails} =
    useGetProjectDoerPaymentDetails({userId: userData?.id});

  const paymentDetails =
    getPaymentDetails?.payment_getProjectDoerPaymentDetails?.result;

  const {
    data: getBids,
    isLoading: isLoadingGetBids,
    hasNextPage: hasNextPageBids,
    fetchNextPage: fetchNextPageBids,
    refetch: refetchBids,
    isFetchingNextPage: isFetchingNextPageBids,
  } = useGetUserBids({
    location: [12, 12],
    projectFilter: ProjectFilter.LowToHighBids,
    where: {
      and: [
        {huduId: {eq: userData?.id}},
        {bidStatus: {eq: BidStatus.Finished}},
      ],
    },
  });

  const bids = getBids?.pages ?? [];

  const {isLoading: isLoadingGetBalance, data: getBalance} =
    useGetStripeConnectUserBalance();

  const balance = useMemo(() => {
    return getBalance?.payment_getStripeConnectUserBlance?.result > 0
      ? getBalance?.payment_getStripeConnectUserBlance?.result / 100
      : 0;
  }, [getBalance]);

  const onLoadMore = () => {
    if (hasNextPageBids) {
      fetchNextPageBids();
    }
  };

  const withdraw = () => {
    navigate('WithDrawDoer');
  };

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData
        customIcon={<EmptyQuestions />}
        text={t('messages.emptyDataTitle')}
        description={t('messages.emptyDataDescription')}
        buttonTitle={t('common.backToHome')}
      />
    ),
    [t],
  );

  const renderItem = ({item}: {item: any}) => (
    <PaymentHistoryItem {...{item}} />
  );

  const loading =
    isLoadingGetBids || isLoadingGetPaymentDetails || isLoadingGetBalance;

  return (
    <VStack flex={1} px="24px" pt="24px">
      <CustomText
        marginBottom={12}
        fontFamily={fontFamily.medium}
        fontSize={fontSize.large}>
        {t('profile.payment.paymentHistoryTitle')}
      </CustomText>
      <CustomText marginBottom={26} fontSize={fontSize.small}>
        {t('profile.payment.paymentHistoryDescription')}
      </CustomText>
      <HStack
        px="24px"
        py="24px"
        alignItems="center"
        rounded="sm"
        mb="24px"
        bg={Colors.SEARCH_BACKGROUND}>
        <VStack flex={1} space="5px">
          <CustomText
            fontFamily={fontFamily.medium}
            color={Colors.LimeGreen}
            fontSize={fontSize.small}>
            {t('profile.payment.paid')}
          </CustomText>
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xNormal}>
            {`$${
              paymentDetails?.huduerReceiveForCompletingTheJob?.toFixed(2) ?? 0
            }`}
          </CustomText>
        </VStack>
        <CustomDivider
          my="0"
          h="40px"
          w="1px"
          mx="24px"
          bg={Colors.WhiteLilac}
          orientation="vertical"
        />
        <VStack flex={1} space="5px">
          <CustomText
            fontFamily={fontFamily.medium}
            color={Colors.Ronchi}
            fontSize={fontSize.small}>
            {t('profile.payment.heldInScrew')}
          </CustomText>
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xNormal}>
            {`$${
              paymentDetails?.huduerReceiveForCompletingTheJobFee?.toFixed(2) ??
              0
            }`}
          </CustomText>
        </VStack>
      </HStack>
      <CustomFlatList
        data={bids}
        refreshing={false}
        onRefresh={refetchBids}
        onEndReached={onLoadMore}
        renderItem={renderItem}
        isFetchingNextPage={isFetchingNextPageBids}
        isLoading={loading}
        hasInternalLoading={isLoadingGetBids}
        listEmptyComponent={listEmptyComponent}
      />
      <VStack space="16px" bottom="24px">
        <CustomButton
          disabled={parseInt(balance) > 0 ? false : true}
          onPress={withdraw}
          title={`${t('common.withDraw')}${
            balance > 0 ? ` ($${balance})` : ''
          }`}
        />
      </VStack>
    </VStack>
  );
}

export default memo(SectionPaymentHistory);
