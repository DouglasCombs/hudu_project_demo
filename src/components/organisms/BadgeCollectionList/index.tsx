import {Divider, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BadgeCollectionHeader,
  CustomFlatList,
  CustomImage,
  CustomText,
  CustomTouchable,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {BadgeLevel} from '~/generated/graphql';
import {useGetBadges} from '~/hooks/badge';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {scale, width} from '~/utils/style';

function getColor(level, item) {
  switch (level) {
    case BadgeLevel.Level1:
      return item?.iconBlue;
    case BadgeLevel.Level2:
      return item?.iconPurple;
    case BadgeLevel.Level3:
      return item?.iconPink;
    default:
      return item?.iconGray;
  }
}

const BadgeCollectionList = () => {
  const {badgeCollectionsData} = useMockData();
  const {userData} = userDataStore();
  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useGetBadges({
    where: {userId: {eq: userData?.id}},
    order: {createdDate: 'DESC'},
  });

  const badges = data?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderItem = ({item}) => {
    const level = badges?.find(
      el => el?.badgeType === item?.value && el?.badgeLevel,
    );

    const badgeType = badges?.find(
      el => el?.badgeType === item?.value && el?.badgeType,
    );

    const createdDate = badges?.find(el =>
      el?.badgeType === item?.value ? el?.createdDate : null,
    );

    const colorIcon = getColor(level?.badgeLevel, item);

    const itemPress = () => {
      navigate('BadgeCollectionDetails', {
        badge: {
          badgeLevel: level?.badgeLevel,
          colorIcon,
          description: item?.desc,
          createdDate: createdDate?.createdDate,
          badgeType: badgeType || null,
          item,
        },
      });
    };

    return (
      <CustomTouchable onPress={itemPress}>
        <VStack
          mx="2"
          width={width * 0.29}
          justifyContent={'flex-start'}
          alignItems="center"
          space="2">
          <CustomImage
            imageSource={colorIcon}
            local
            style={{
              width: scale(80),
              height: scale(80),
            }}
          />
          <CustomText textAlign="center" numberOfLines={3}>
            {item?.title}
          </CustomText>
        </VStack>
      </CustomTouchable>
    );
  };

  const itemSeparatorComponent = () => (
    <Divider h="8" bg={Colors.TRANSPARENT} />
  );

  return (
    <CustomFlatList
      contentContainerStyle={styles.listContainer}
      numColumns={3}
      px="0"
      mt="4"
      isLoading={isLoading}
      data={badgeCollectionsData}
      ItemSeparatorComponent={itemSeparatorComponent}
      ListHeaderComponent={<BadgeCollectionHeader />}
      keyExtractor={(item, index) => item.id}
      renderItem={renderItem}
      onEndReached={onLoadMore}
      refreshing={isRefetching}
      onRefresh={refetch}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
};

export default BadgeCollectionList;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginHorizontal: scale(0),
    paddingBottom: 50,
  },
});
