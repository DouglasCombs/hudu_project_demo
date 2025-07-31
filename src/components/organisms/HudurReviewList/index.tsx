import React, {useCallback} from 'react';
import {VStack} from 'native-base';
import {
  HudurReviewItem,
  SectionReviewContainer,
  CustomLoading,
  EmptyData,
  CustomFlatList,
} from '~/components';
import {useGetBids} from '~/hooks/bid';
import {userDataStore} from '~/stores';
import {BidStatus} from '~/generated/graphql';
import {useTranslation} from 'react-i18next';

const HudurReviewList = ({userId}: {userId: number}) => {
  const {userData} = userDataStore(state => state);
  const targetUserId = userId || userData?.id;
  const {t} = useTranslation();
  const hudurReviewOption = {
    where: {
      and: [
        {bidStatus: {eq: BidStatus.Finished}},
        {huduId: {eq: targetUserId}},
        {isListerCommented: {eq: true}},
      ],
    },
    order: {
      createdDate: 'DESC',
    },
  };

  const {
    isLoading: getHudurReviewsLoading,
    data: getHudurReviews,
    fetchNextPage: fetchNextPageHudurReviews,
    hasNextPage: hasNextPageHudurReviews,
    refetch: refetchHudurReviews,
    isRefetching: isRefetchingHudurReviews,
    isFetchingNextPage: isFetchingNextPageHudurReviews,
  } = useGetBids(hudurReviewOption);

  const hudurReviews = getHudurReviews?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageHudurReviews) {
      fetchNextPageHudurReviews();
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <HudurReviewItem {...{item, index, arrayLength: hudurReviews?.length}} />
  );

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData text={false} description={t('messages.youCurrentlyDoer')} />
    ),
    [hudurReviews, t],
  );

  return (
    <VStack flexGrow={1} px="4" h="100%">
      {getHudurReviewsLoading ? (
        <CustomLoading />
      ) : (
        <CustomFlatList
          data={hudurReviews}
          renderItem={renderItem}
          refreshing={isRefetchingHudurReviews}
          onRefresh={refetchHudurReviews}
          isFetchingNextPage={isFetchingNextPageHudurReviews}
          listEmptyComponent={listEmptyComponent}
          onEndReached={onLoadMore}
        />
      )}
    </VStack>
  );
};

export default React.memo(HudurReviewList);
