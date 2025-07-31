import {Box, FlatList, VStack} from 'native-base';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomLoading,
  EmptyData,
  HudurReviewItem,
} from '~/components';
import {BidStatus} from '~/generated/graphql';
import {useGetBids} from '~/hooks/bid';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const SectionHudurReviews = ({targetUserId}: {targetUserId: number}) => {
  const {userData} = userDataStore(state => state);
  const [showAll, setShowAll] = useState(false);
  const {t} = useTranslation();

  const hudurReviewOption = {
    where: {
      and: [
        {bidStatus: {eq: BidStatus.Finished}},
        {huduId: {eq: targetUserId}},
        {isListerCommented: {eq: true}},
      ],
    },
    take: showAll ? 10 : 2,
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

  // const listEmptyComponent = useCallback(
  //   () => (
  //     <Lottie
  //       style={styles.lottie}
  //       source={animations.notFound}
  //       loop={true}
  //       autoPlay
  //     />
  //   ),
  //   [hudurReviews],
  // );

  const ListFooterComponent = useCallback(
    () => (
      <Box>
        <CustomButton
          onPress={() => setShowAll(true)}
          mt="6"
          outline
          color={Colors.BLACK}
          title={t('profile.moreReviews')}
        />
      </Box>
    ),
    [hudurReviews, t],
  );

  return (
    <VStack px="4" flexGrow={1} h="100%">
      {getHudurReviewsLoading ? (
        <CustomLoading />
      ) : (
        <FlatList
          data={hudurReviews}
          renderItem={renderItem}
          isFetchingNextPage={isFetchingNextPageHudurReviews}
          onEndReached={onLoadMore}
          ListEmptyComponent={<EmptyData />}
          ListFooterComponent={
            !showAll && hudurReviews?.length > 1 ? ListFooterComponent : null
          }
          mb="8"
        />
      )}
    </VStack>
  );
};

export default React.memo(SectionHudurReviews);

const styles = StyleSheet.create({
  lottie: {height: scale(150), width: scale(150)},
  inverted: {transform: [{rotateX: '-180deg'}]},
});
