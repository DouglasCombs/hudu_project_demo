import React, {memo} from 'react';
import {Flex} from 'native-base';
import {
  CustomContainer,
  SectionSearchBox,
  ProjectCountCard,
  CustomKeyboardAwareScrollView,
  SectionInviteFriend,
} from '~/components';
import {ActiveBids, AwardedBid, CompletedProjects} from '~/assets/icons';
import {useGetBidsGroupByStatus} from '~/hooks/project';
import {authStore, userDataStore} from '~/stores';
import {useTranslation} from 'react-i18next';
import {ProjectStatus} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';

const SectionBidsDetailsProjects = () => {
  const {t} = useTranslation();
  const {userData} = userDataStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);

  const {data: getBidCount, isLoading: isLoadingGetBidCount} =
    useGetBidsGroupByStatus({userId: userData?.id});

  const bidsCounts = getBidCount?.pages ?? [];

  const bidingCount = (status: ProjectStatus) => {
    const res = bidsCounts?.find((item: any) => item?.projectStatus === status);
    return res?.projectCount ?? 0;
  };

  const goToNext = (status: ProjectStatus) => {
    navigate('BidsByStatus', {projectStatus: status});
  };

  const searchOnPress = () => {
    navigate('BidsByStatus', {projectStatus: undefined, searchable: true});
  };

  return (
    <CustomContainer safeArea={false} isLoading={isLoadingGetBidCount}>
      <CustomKeyboardAwareScrollView>
        <Flex flex={1} py="12px">
          <SectionSearchBox mt="0.5" mb="2" onPress={searchOnPress} />
          {isUserLoggedIn && <SectionInviteFriend mb="12px" mt="12px" />}
          <ProjectCountCard
            icon={<ActiveBids />}
            title={t('projects.bids.biddingOn')}
            count={bidingCount(ProjectStatus.Bidding)}
            onPress={() => goToNext(ProjectStatus.Bidding)}
          />
          <ProjectCountCard
            icon={<AwardedBid />}
            title={t('projects.bids.awardedBid')}
            count={bidingCount(ProjectStatus.InProgress)}
            onPress={() => goToNext(ProjectStatus.InProgress)}
          />
          <ProjectCountCard
            icon={<CompletedProjects />}
            title={t('projects.bids.finishedProjects')}
            count={bidingCount(ProjectStatus.Finished)}
            onPress={() => goToNext(ProjectStatus.Finished)}
          />
        </Flex>
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
};

export default memo(SectionBidsDetailsProjects);
