import {Flex} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  ActiveBids,
  ClosedBids,
  CompletedProjects,
  InProgressProjects,
} from '~/assets/icons';
import {
  CustomContainer,
  CustomKeyboardAwareScrollView,
  ProjectCountCard,
  SectionInviteFriend,
  SectionSearchBox,
} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {useGetProjectCountByStatus} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {authStore, userDataStore} from '~/stores';

const SectionListingDetailsProjects = () => {
  const {t} = useTranslation();
  const {isUserLoggedIn} = authStore(state => state);

  const {userData} = userDataStore(state => state);

  const {data: getProjectCount, isLoading: isLoadingGetProjectCount} =
    useGetProjectCountByStatus({listerId: userData?.id});

  const projectsCount =
    getProjectCount?.project_getProjectCountByStatus?.result;

  const listingCount = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Bidding:
        return projectsCount?.bidding ?? 0;
      case ProjectStatus.Cancelled:
        return projectsCount?.cancelled ?? 0;
      case ProjectStatus.Failed:
        return projectsCount?.failed ?? 0;
      case ProjectStatus.Finished:
        return projectsCount?.finished ?? 0;
      case ProjectStatus.InProgress:
        return projectsCount?.inProgress ?? 0;

      default:
        break;
    }
  };

  const goToNext = (status: ProjectStatus) => {
    navigate('ProjectsByStatus', {projectStatus: status});
  };

  const searchOnPress = () => {
    navigate('ProjectsByStatus', {projectStatus: undefined, searchable: true});
  };

  return (
    <CustomContainer safeArea={false} isLoading={isLoadingGetProjectCount}>
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <Flex flex={1} py="12px">
          <SectionSearchBox mt="0.5" mb="2" onPress={searchOnPress} />
          {isUserLoggedIn && <SectionInviteFriend mb="12px" mt="12px" />}
          <ProjectCountCard
            title={t('projects.activeProjects')}
            icon={<ActiveBids />}
            count={listingCount(ProjectStatus.Bidding)}
            onPress={() => goToNext(ProjectStatus.Bidding)}
          />
          <ProjectCountCard
            title={t('projects.closedProjects')}
            icon={<ClosedBids />}
            count={listingCount(ProjectStatus.Cancelled)}
            onPress={() => goToNext(ProjectStatus.Cancelled)}
          />
          <ProjectCountCard
            title={t('projects.awardedProjects')}
            icon={<InProgressProjects />}
            count={listingCount(ProjectStatus.InProgress)}
            onPress={() => goToNext(ProjectStatus.InProgress)}
          />
          <ProjectCountCard
            title={t('projects.completedProjects')}
            icon={<CompletedProjects />}
            count={listingCount(ProjectStatus.Finished)}
            onPress={() => goToNext(ProjectStatus.Finished)}
          />
        </Flex>
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default memo(SectionListingDetailsProjects);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 86,
  },
});
