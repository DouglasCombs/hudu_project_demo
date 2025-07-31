import {Center, HStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {ChevronRight} from '~/assets/icons';
import {CustomText, CustomTouchable, RatingStar} from '~/components';
import {useGetLeaderBoardRank} from '~/hooks/leaderBoard';
import {useGetMinimalProfile} from '~/hooks/user';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function SectionLeaderBoard() {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);

  const getProfileOptions = {userId: userData?.id};

  const {data: getLeaderBoardData, isLoading: isLoadingGetLeaderBoard} =
    useGetLeaderBoardRank({userId: userData?.id});

  const userRank =
    getLeaderBoardData?.leaderBoard_getUsersLeaderBoardRank?.result ?? 0;

  const {data: profileData, isLoading: isLoadingGetProfile} =
    useGetMinimalProfile(getProfileOptions);

  const profile = profileData?.user_getProfile?.result;

  const leaderBoardOnPress = () => {
    navigate('LeaderBoard');
  };

  const ratingOnPress = () => {
    navigate('UserReview');
  };

  if (isLoadingGetProfile) {
    return <></>;
  }

  return (
    <HStack my="12px" px="24px" w="100%" alignItems="center" space="15px">
      <Item
        title={`${t('common.leaderBoard')} #${userRank}`}
        onPress={leaderBoardOnPress}>
        <CustomText
          color={Colors.Rhino}
          fontFamily={fontFamily.medium}
          fontSize={fontSize.xNormal}>
          {`${profile?.leaderBoardPoint ?? 'N/A'} PTS`}
        </CustomText>
      </Item>
      <Item
        title={`${t('common.rating')} ${
          profile?.averageRate?.toFixed(1) ?? 'N/A'
        }`}
        onPress={ratingOnPress}>
        <RatingStar disabled rate={profile?.averageRate} half={false} />
      </Item>
    </HStack>
  );
}

const Item = ({
  title,
  onPress,
  children,
}: {
  title?: string;
  onPress?: any;
  children?: any;
}) => {
  return (
    <CustomTouchable onPress={onPress} style={styles.itemContainer}>
      <HStack
        px="16px"
        py="8px"
        justifyContent="space-between"
        alignItems="center"
        bg={Colors.SEARCH_BACKGROUND}>
        <CustomText
          fontSize={fontSize.xTiny}
          fontFamily={fontFamily.medium}
          color={Colors.Topaz}>
          {title}
        </CustomText>
        <Center size="18px" rounded="full" bg={Colors.WHITE_F}>
          <ChevronRight />
        </Center>
      </HStack>
      <Center px="16px" py="12px">
        {children}
      </Center>
    </CustomTouchable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.SEARCH_BACKGROUND,
  },
});
