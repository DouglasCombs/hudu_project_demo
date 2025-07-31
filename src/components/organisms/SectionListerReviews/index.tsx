import {Box, FlatList, View} from 'native-base';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomButton,
  EmptyData,
  HudurReviewItem,
  ListerReviewItem,
} from '~/components';
import {BidStatus} from '~/generated/graphql';
import {useGetBids} from '~/hooks/bid';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';

const SectionListerReviews = ({
  asLister,
  targetUserId,
}: {
  asLister: boolean;
  targetUserId: number;
}) => {
  const {userData} = userDataStore(state => state);
  const [showAll, setShowAll] = useState(false);
  const {t} = useTranslation();

  // const options = asLister
  //   ? {
  //       where: {
  //         and: [
  //           {bidStatus: {eq: BidStatus.Finished}},
  //           {listerId: {eq: targetUserId}},
  //           {isHuduCommented: {eq: true}},
  //         ],
  //       },
  //     }
  //   : {
  //       where: {
  //         and: [
  //           {bidStatus: {eq: BidStatus.Finished}},
  //           {huduId: {eq: targetUserId}},
  //           {isListerCommented: {eq: true}},
  //         ],
  //       },
  //     };

  const options = {
    where: {
      or: [
        {
          and: [
            {bidStatus: {eq: BidStatus.Finished}},
            {listerId: {eq: targetUserId}},
            {isHuduCommented: {eq: true}},
          ],
        },
        {
          and: [
            {bidStatus: {eq: BidStatus.Finished}},
            {huduId: {eq: targetUserId}},
            {isListerCommented: {eq: true}},
          ],
        },
      ],
    },
  };

  const listerReviewOption = {
    ...options,
    take: showAll ? 10 : 3,
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
    <Box px="4">
      {item?.huduId === targetUserId ? (
        <HudurReviewItem
          {...{item, index, arrayLength: listerReviews?.length}}
        />
      ) : (
        <ListerReviewItem
          {...{item, index, arrayLength: listerReviews?.length}}
        />
      )}
    </Box>
  );

  const listEmptyComponent = useCallback(
    () => (
      <Box px="4">
        <EmptyData text={false} description={t('messages.youCurrently')} />
      </Box>
    ),
    [listerReviews, t],
  );

  const ListFooterComponent = useCallback(
    () => (
      <Box px="4">
        <CustomButton
          onPress={() => navigate('UserReview', {targetUserId})}
          // onPress={() => setShowAll(true)}
          mt="6"
          outline
          color={Colors.BLACK}
          title={t('profile.moreReviews')}
        />
      </Box>
    ),
    [listerReviews, t],
  );

  const ItemSeparatorComponent = useCallback(
    () => <View h="0.5" my="1" bg={Colors.Gainsboro} />,
    [listerReviews],
  );

  return (
    <FlatList
      data={listerReviews}
      renderItem={renderItem}
      contentContainerStyle={{paddingBottom: 30}}
      ItemSeparatorComponent={ItemSeparatorComponent}
      ListEmptyComponent={listEmptyComponent}
      onEndReached={onLoadMore}
      ListFooterComponent={
        !showAll && listerReviews?.length > 1 ? ListFooterComponent : null
      }
    />
  );
};

export default React.memo(SectionListerReviews);
