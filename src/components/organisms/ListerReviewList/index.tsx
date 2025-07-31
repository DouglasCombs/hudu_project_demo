import {VStack} from 'native-base';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomFlatList,
  CustomLoading,
  EmptyData,
  ListerReviewItem,
  SectionReviewContainer,
} from '~/components';
import {BidStatus} from '~/generated/graphql';
import {useGetBids} from '~/hooks/bid';
import {userDataStore} from '~/stores';

const ListerReviewList = ({userId}: {userId: number}) => {
  const {userData} = userDataStore(state => state);
  const targetUserId = userId || userData?.id;
  const {t} = useTranslation();
  const listerReviewOption = {
    where: {
      and: [
        {bidStatus: {eq: BidStatus.Finished}},
        {listerId: {eq: targetUserId}},
        {isHuduCommented: {eq: true}},
      ],
    },
    order: {
      createdDate: 'DESC',
    },
  };

  const {
    isLoading: getListerReviewsLoading,
    data: getListerReviews,
    fetchNextPage: fetchNextPageListerReviews,
    hasNextPage: hasNextPageListerReviews,
    refetch: refetchListerReviews,
    isRefetching: isRefetchingListerReviews,
    isFetchingNextPage: isFetchingNextPageReviews,
  } = useGetBids(listerReviewOption);

  const listerReviews = getListerReviews?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageListerReviews) {
      fetchNextPageListerReviews();
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <ListerReviewItem
      {...{item, index, arrayLength: listerReviews?.length}}
      asLister
    />
  );

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData text={false} description={t('messages.youCurrentlyLister')} />
    ),
    [listerReviews, t],
  );

  return (
    <VStack flexGrow={1} px="4" h="100%">
      {getListerReviewsLoading ? (
        <CustomLoading />
      ) : (
        <CustomFlatList
          data={listerReviews}
          renderItem={renderItem}
          refreshing={isRefetchingListerReviews}
          onRefresh={refetchListerReviews}
          isFetchingNextPage={isFetchingNextPageReviews}
          listEmptyComponent={listEmptyComponent}
          onEndReached={onLoadMore}
        />
      )}
    </VStack>
  );
};

export default React.memo(ListerReviewList);
