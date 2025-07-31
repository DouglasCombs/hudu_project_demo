import {ScrollView, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import images from '~/assets/images';
import {
  CustomContainer,
  CustomText,
  GeneralInformationCard,
  PlaceBidButton,
  ProjectHistoryCard,
  RatingsCard,
  ReviewsProfileList,
  SectionUserRow,
  UserProfileHeader,
  UserProfileInformationCard,
  UserProfilePlaceholder,
} from '~/components';
import {Project} from '~/generated/graphql';
import {useGetProject} from '~/hooks/project';
import {useGetProfile} from '~/hooks/user';
import {userDataStore} from '~/stores';

const ListerProfileScreen = ({route}: {route: any}) => {
  const userId = route?.params?.userId;
  const projectId = route?.params?.projectId;
  const isShowMessage = route?.params?.showMessage;

  const {t} = useTranslation();
  const {userData} = userDataStore(state => state);

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });
  const {data, isLoading} = useGetProfile({userId: userId});
  const userDataProfile = data?.user_getProfile?.result;
  const projectData = getProject?.project_getProject?.result ?? {};
  const project: Project = projectData?.project;
  const isLister = userData?.id === project?.userId;

  const loading = isLoading;

  if (loading) {
    return <UserProfilePlaceholder />;
  }
  return (
    <CustomContainer
      barStyle="dark-content"
      headerBackground={images.headerBackground}
      isLoading={loading}>
      <SectionUserRow isBack />

      <ScrollView flex={1} bounces={false} showsVerticalScrollIndicator={false}>
        <UserProfileHeader
          userData={userDataProfile}
          {...{isShowMessage, userId, projectId}}
        />

        <VStack space="4">
          <UserProfileInformationCard {...{data: userDataProfile}} />
          <GeneralInformationCard {...{data: userDataProfile}} />
          <ProjectHistoryCard
            userId={userId}
            leaderBoardPoint={userDataProfile?.leaderBoardPoint || 0}
          />
          {/* <CredentialCard /> */}
          <RatingsCard {...{data: userDataProfile}} asLister />
          <VStack space="5" h="100%">
            <VStack px="4">
              <CustomText>{t('profile.drawer.reviews')}</CustomText>
            </VStack>
            <ReviewsProfileList targetUserId={userId} asLister={true} />
          </VStack>
        </VStack>
      </ScrollView>
      {isLister ? (
        <PlaceBidButton acceptBid title="Accept" {...{projectId}} />
      ) : null}
    </CustomContainer>
  );
};

export default ListerProfileScreen;
