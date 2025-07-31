import {HStack, ScrollView, VStack} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';
import images from '~/assets/images';
import {
  CustomContainer,
  CustomText,
  GeneralInformationCard,
  ProjectHistoryCard,
  RatingsCard,
  ReviewsProfileList,
  SectionUserRow,
  UserProfileHeader,
  UserProfileInformationCard,
  UserProfilePlaceholder,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {useGetProfile} from '~/hooks/user';
import {userDataStore} from '~/stores';

const ProfileScreen = () => {
  const {userData} = userDataStore(state => state);
  const {t} = useTranslation();
  const {UserType} = useMockData();
  const [userTypeState, setUserTypeState] = useState(UserType?.[0]);

  const {data, isLoading} = useGetProfile({userId: userData?.id});
  const userDataProfile = data?.user_getProfile?.result;
  const loading = isLoading;

  if (loading) {
    return <UserProfilePlaceholder />;
  }
  return (
    <CustomContainer
      barStyle="dark-content"
      headerBackground={images.headerBackground}
      isLoading={loading}
      pb={0}>
      <SectionUserRow />

      <ScrollView flex={1} bounces={false} showsVerticalScrollIndicator={false}>
        <UserProfileHeader
          userId={userDataProfile?.id}
          userData={userDataProfile}
        />

        <VStack space="4">
          <UserProfileInformationCard {...{data: userDataProfile}} />
          <GeneralInformationCard {...{data: userDataProfile}} />
          <ProjectHistoryCard
            userId={userData?.id}
            leaderBoardPoint={userDataProfile?.leaderBoardPoint || 0}
          />
          {/* <CredentialCard /> */}
          <RatingsCard {...{data: userDataProfile}} />
          <VStack space="0" mt="4" h="100%">
            <VStack px="4">
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <CustomText>{t('profile.drawer.reviews')}</CustomText>
                {/* <SectionUserType
                  value={userTypeState}
                  onChange={setUserTypeState}
                  data={UserType}
                  showChevronIcon
                  titleColor={Colors.PRIMARY}
                  flex={0}
                  showSelectedValue
                /> */}
              </HStack>
            </VStack>
            <ReviewsProfileList
              targetUserId={userData?.id}
              asLister={userTypeState?.value}
            />
          </VStack>
        </VStack>
      </ScrollView>
    </CustomContainer>
  );
};

export default ProfileScreen;
