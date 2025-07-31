import {Box, Center, HStack, VStack} from 'native-base';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {BackgroundBadge, Info, Leader} from '~/assets/icons';
import images from '~/assets/images';
import {
  CustomContainer,
  CustomFlatList,
  CustomImage,
  CustomText,
  CustomTouchable,
  ScreensHeader,
} from '~/components';
import {SortEnumType} from '~/generated/graphql';
import {useGetLeaderBoardRank} from '~/hooks/leaderBoard';
import {useGetMinimalProfile, useGetUsers} from '~/hooks/user';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function LeaderBoardScreen() {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);

  const getProfileOptions = {userId: userData?.id};

  const {data: profileData, isLoading: isLoadingGetProfile} =
    useGetMinimalProfile(getProfileOptions);

  const profile = profileData?.user_getProfile?.result;

  const {data: getLeaderBoardData, isLoading: isLoadingGetLeaderBoard} =
    useGetLeaderBoardRank({userId: userData?.id});

  const userRank =
    getLeaderBoardData?.leaderBoard_getUsersLeaderBoardRank?.result ?? 0;

  const {
    data: getUsers,
    isLoading: isLoadingGetUsers,
    isFetchingNextPage: isFetchingNextPageUsers,
    hasNextPage: hasNextPageUsers,
    fetchNextPage: fetchNextPageUsers,
    refetch: refetchUsers,
  } = useGetUsers({
    order: {leaderBoardPoint: SortEnumType.Desc},
  });

  const users = getUsers?.pages ?? [];

  const pointToRankMap = new Map();
  let currentRank = 1;

  users.forEach(user => {
    const {leaderBoardPoint} = user;
    if (!pointToRankMap.has(leaderBoardPoint)) {
      pointToRankMap.set(leaderBoardPoint, currentRank);
      currentRank++;
    }
    user.rank = pointToRankMap.get(leaderBoardPoint);
  });

  // Sort the array based on the assigned ranks
  users.sort((a, b) => a.rank - b.rank);

  const customSortedArray = useMemo(() => {
    let tempUsers = [];
    users?.slice(0, 3)?.map((itm: any, index: number) => {
      tempUsers.push({...itm, index});
    });
    return tempUsers;
  }, [users]);

  const infoOnPress = () => {
    navigate('LeaderBoardGuidLines');
  };

  const onLoadMore = () => {
    if (hasNextPageUsers) {
      fetchNextPageUsers();
    }
  };

  const listHeaderComponent = () => {
    return (
      <VStack>
        <HStack space="8px" alignItems="flex-end">
          {customSortedArray
            ?.sort((a, b) => {
              if (a.index === 2) {
                return -1;
              }
              if (b.index === 2) {
                return 1;
              }
              if (a.index === 0) {
                return -1;
              }
              if (b.index === 0) {
                return 1;
              }
              return a.index - b.index;
            })
            ?.map((el: any) => {
              const color =
                el.index === 0
                  ? Colors.Bisque
                  : el.index === 1
                  ? Colors.Gainsboro
                  : Colors.SwissCoffee;
              const borderColor =
                el.index === 0
                  ? Colors.Bisque
                  : el.index === 1
                  ? Colors.SwissCoffee
                  : Colors.WhiteSmoke;
              const height = el.index === 0 ? 142 : el.index === 1 ? 137 : 122;
              const isFirst = el.index === 0;

              return (
                <HeaderItem
                  key={el.index}
                  item={el}
                  color={color}
                  height={height}
                  borderColor={borderColor}
                  isFirst={isFirst}
                />
              );
            })}
        </HStack>
        <HStack
          mt="24px"
          mb="12px"
          px="16px"
          space="24px"
          w="100%"
          alignItems="center">
          <Center flex={0.2}>
            <CustomText
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xTiny}
              color={Colors.Topaz}>
              #
            </CustomText>
          </Center>
          <HStack flex={1}>
            <CustomText
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xTiny}
              color={Colors.Topaz}>
              {t('common.user')}
            </CustomText>
          </HStack>
          <HStack justifyContent="flex-end" flex={0.3}>
            <CustomText
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xTiny}
              color={Colors.Topaz}>
              {t('common.points')}
            </CustomText>
          </HStack>
        </HStack>
      </VStack>
    );
  };

  const renderItem = ({item, index}: {item?: any; index: number}) => {
    return <LeaderBoardItem key={item?.id} item={item} index={index} />;
  };

  const loading =
    isLoadingGetLeaderBoard || isLoadingGetUsers || isLoadingGetProfile;

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader
        backAction
        title={t('common.leaderBoard')}
        rightHeader={
          <CustomTouchable onPress={infoOnPress}>
            <Info />
          </CustomTouchable>
        }
      />

      <CustomFlatList
        data={users}
        renderItem={renderItem}
        listHeaderComponent={listHeaderComponent}
        hasItemSeparatorComponent={false}
        contentContainerStyle={styles.contentContainerStyle}
        isLoading={isLoadingGetUsers}
        isFetchingNextPage={isFetchingNextPageUsers}
        onEndReached={onLoadMore}
        onRefresh={refetchUsers}
        refreshing={false}
      />
      <Box px="24px" mb="24px">
        <LeaderBoardItem
          borderWidth="1"
          item={profile}
          index={userData?.id}
          rank={userRank}
        />
      </Box>
    </CustomContainer>
  );
}

const HeaderItem = ({
  item,
  height = 202,
  isFirst,
  color = Colors.Bisque,
  borderColor = Colors.Bisque,
}: {
  item?: any;
  height?: number;
  isFirst?: boolean;
  color?: string;
  borderColor?: string;
}) => {
  const {t} = useTranslation();

  return (
    <VStack flex={1}>
      <VStack alignItems="center" zIndex={16} space="1">
        {isFirst && <Leader />}
        <Center rounded="full" borderWidth="2" borderColor={borderColor}>
          <CustomImage
            resizeMode="stretch"
            style={styles.headerAvatar}
            imageSource={item?.imageAddress}
            errorImage={images.avatarErrorImage}
            errorText={item?.userName ?? item?.email}
          />
        </Center>
      </VStack>

      <VStack
        h={height}
        rounded="sm"
        bg={color}
        alignItems="center"
        top="-18px"
        pt="30px">
        <CustomText
          flex={1}
          numberOfLines={1}
          fontFamily={fontFamily.medium}
          fontSize={fontSize.small}
          color={Colors.BLACK}>
          {item?.userName}
        </CustomText>
        <VStack
          alignItems="center"
          justifyContent="flex-end"
          space="14px"
          mb="12px"
          flex={1}>
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.small}
            color={Colors.BLACK}>
            {`${item?.index + 1}${
              item?.index === 0 ? 'st' : item?.index === 1 ? 'nd' : 'rd'
            }`}
          </CustomText>
          <Center rounded="sm" bg={Colors.WHITE_F} px="12px" py="6px">
            <CustomText
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xTiny}
              color={Colors.BLACK}>
              {item?.leaderBoardPoint} {t('common.pts')}
            </CustomText>
          </Center>
        </VStack>
      </VStack>
    </VStack>
  );
};

const LeaderBoardItem = ({
  item,
  index,
  borderWidth,
  rank,
}: {
  item?: any;
  index: number;
  borderWidth?: string | number;
  rank?: number;
}) => {
  const {t} = useTranslation();

  const color =
    index + 1 === 1
      ? Colors.MySin
      : index + 1 === 2
      ? Colors.DEEP_FIR
      : Colors.ClamShell;

  return (
    <HStack
      rounded="sm"
      px="16px"
      py="12px"
      space="24px"
      alignItems="center"
      borderColor={Colors.PRIMARY}
      borderWidth={borderWidth}
      bg={(index + 1) % 2 === 0 ? Colors.SEARCH_BACKGROUND : Colors.WHITE_F}>
      <Center flex={0.2}>
        {item?.rank <= 3 ? (
          <BackgroundBadge fillColor={color} badge={item?.rank} />
        ) : (
          <CustomText
            fontFamily={fontFamily.bold}
            fontSize={fontSize.xNormal}
            color={Colors.BLACK}>
            {rank ?? item?.rank}
          </CustomText>
        )}
      </Center>
      <HStack alignItems="center" space="16px" flex={1}>
        <CustomImage
          resizeMode="stretch"
          style={styles.avatar}
          imageSource={item?.imageAddress}
          errorImage={images.avatarErrorImage}
          errorText={item?.userName ?? item?.email}
        />
        <CustomText
          fontFamily={fontFamily.medium}
          fontSize={fontSize.small}
          color={Colors.BLACK}>
          {item?.userName ?? t('common.huduUser')}
        </CustomText>
      </HStack>
      <HStack justifyContent="flex-end" flex={0.3}>
        <CustomText
          fontFamily={fontFamily.medium}
          fontSize={fontSize.xTiny}
          color={Colors.Topaz}>
          {item?.leaderBoardPoint ?? 0}
        </CustomText>
      </HStack>
    </HStack>
  );
};

const styles = StyleSheet.create({
  headerAvatar: {
    height: 56,
    width: 56,
    borderRadius: 100,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 100,
  },
});
