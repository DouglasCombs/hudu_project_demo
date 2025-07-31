import dayjs from 'dayjs';
import {Box, Flex, HStack, VStack} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {CopyIcon, DateIcon, DollarIcon, GoalIcon} from '~/assets/icons';
import {
  CustomButton,
  CustomCarousel,
  CustomText,
  LocationViewer,
  ManageBidsShortcut,
  PlaceBidButton,
  ProjectArchiveIcon,
  ProjectDetailsPlaceholder,
  ProjectPreviewDescription,
  ProjectStatusLabel,
  RemainedTimeSection,
  ShowSummaryWithIcon,
  UserInfoCard,
} from '~/components';
import {
  Availability,
  CancellRequestStatus,
  Project,
  ProjectStatus,
} from '~/generated/graphql';
import {useGetProject} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {authStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {appFormatDate} from '~/utils/helper';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {useGetLanguageTitle, useGetLowestBidTitle} from '~/utils/utils';

const SectionDescriptionRoute = ({
  projectId,
  setCurrentRoute,
}: {
  projectId: number;
  setCurrentRoute?: any;
}) => {
  const {t} = useTranslation();
  const {getLowestBidTitle} = useGetLowestBidTitle();
  const {getLanguageText} = useGetLanguageTitle();

  const {userData} = userDataStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });

  const projectData = getProject?.project_getProject?.result ?? {};
  const project: Project = projectData?.project;
  const projectImages = project?.projectImages;
  const availability = project?.availability;
  const projectDeadLine = project?.projectDeadLine;
  const projectStatus = project?.projectStatus;
  const currentLowBid = projectData?.currentLowBid;
  const hudu = projectData?.currentDoer;
  const cancelRequestStatus = project?.cancellRequestStatus;

  const isBidding = projectStatus === ProjectStatus.Bidding;
  const inProgress = projectStatus === ProjectStatus.InProgress;
  const isLister = userData?.id === project?.userId;
  const isBidder = projectData?.yourLowesBid > 0;
  const isDoer = projectData?.currentDoer?.id === userData?.id;
  const isDoerFinishProject = projectData?.isHuduFinished;
  const awardedBid = projectData?.awardedBid;
  const bidId = awardedBid?.id;
  const date1 = dayjs(projectDeadLine);
  const current = dayjs();
  const deadLine = date1.diff(current, 'millisecond', true);
  const isClosed = deadLine <= 0;
  const cancelStatus =
    awardedBid?.cancellRequestStatus === CancellRequestStatus.Pendding ||
    awardedBid?.cancellRequestStatus === CancellRequestStatus.Cancelled;
  const listerCancelStatus =
    project?.cancellRequestStatus === CancellRequestStatus.Pendding ||
    project?.cancellRequestStatus === CancellRequestStatus.Cancelled;

  const startDate =
    availability === Availability.FlexibleDate
      ? t('projects.flexible')
      : availability === Availability.SpecificDate
      ? appFormatDate(projectDeadLine)
      : appFormatDate(project?.startDate);

  const lowestBid = getLowestBidTitle({
    currentLowBid: projectData?.currentLowBid,
    listerId: project?.userId,
    projectDeadLine,
  });

  const loading = getProjectLoading;

  const markAsComplete = () => {
    navigate('RateAndReview', {projectId, bidId});
  };

  const finishProject = () => {
    navigate('RateAndReview', {projectId, bidId, asLister: false});
  };

  const awardOnPress = () => {
    setCurrentRoute(2);
  };

  if (loading) {
    return <ProjectDetailsPlaceholder />;
  }

  return (
    <Flex flex={1}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Box bg={Colors.SEARCH_BACKGROUND} h="8px" w="100%" />
        <CustomCarousel height={verticalScale(211)} data={projectImages}>
          {isBidding && (
            <RemainedTimeSection
              {...{
                projectDeadLine,
                currentLowBid,
                userId: project?.userId,
                position: 'absolute',
                bottom: '0',
              }}
            />
          )}
        </CustomCarousel>
        <VStack px="24px" mt="16px">
          <VStack space="8px">
            <ProjectStatusLabel
              isDoer={isBidder}
              status={projectStatus}
              type="outline"
              projectDeadLine={projectDeadLine}
              cancelRequestStatus={cancelRequestStatus}
              isDoerFinishProject={isDoerFinishProject}
            />
            {isLister && inProgress && (
              <UserInfoCard
                isLoading={loading}
                data={hudu}
                asLister={isLister}
                isDoer={isDoer}
                isBidder={isBidder}
                projectStatus={projectStatus}
                projectId={projectId}
              />
            )}
            <ManageBidsShortcut projectData={projectData} />
            <HStack alignItems="center">
              <CustomText
                flex={1}
                fontFamily={fontFamily.medium}
                fontSize={fontSize.xNormal}
                color={Colors.RegalBlue}>
                {project?.title}
              </CustomText>
              {!isLister && (
                <ProjectArchiveIcon
                  item={project}
                  isLiked={projectData?.isLiked}
                />
              )}
            </HStack>
          </VStack>
          <HStack justifyContent={'space-between'} mt="28px">
            <ShowSummaryWithIcon
              title={t('projects.createProject.startDate')}
              icon={<DateIcon />}
              data={startDate}
            />
            <ShowSummaryWithIcon
              title={t('projects.createProject.location')}
              icon={<GoalIcon />}
              data={project?.city + ', ' + project?.state}
            />
          </HStack>
          <HStack justifyContent={'space-between'} mt="20px">
            <ShowSummaryWithIcon
              title={t('projects.createProject.category')}
              icon={<CopyIcon />}
              data={project?.category?.[getLanguageText()]}
            />
            <ShowSummaryWithIcon
              title={t('projects.bidAmount.currentLowBid')}
              icon={<DollarIcon />}
              data={lowestBid}
            />
          </HStack>
          <VStack mt="24px">
            {!isLister && (
              <UserInfoCard
                data={project?.user}
                isLoading={loading}
                isDoer={isDoer}
                asLister={true}
                isBidder={isBidder}
                projectStatus={projectStatus}
                projectId={projectId}
              />
            )}
            <CustomText
              marginTop={!isLister ? 18 : 0}
              style={{color: Colors.Topaz}}>
              {`${t('projects.projectListedIn')} ${appFormatDate(
                project?.createdDate,
              )}`}
            </CustomText>
          </VStack>
          <ProjectPreviewDescription data={project} />
          {(isLister || isDoer) && (
            <CustomText
              marginTop={26}
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xNormal}>
              {t('projects.createProject.location')}
            </CustomText>
          )}
          <LocationViewer
            showAddress={isLister || isDoer}
            latitude={project?.latitude}
            longitude={project?.longitude}
            address={project?.streetAddress}
          />
        </VStack>
      </ScrollView>
      {isLister && isBidding && !isClosed && (
        <VStack px="24px" pb="24px">
          <CustomButton
            title={t('projects.awardThisProject')}
            onPress={awardOnPress}
            color={Colors.PRIMARY}
          />
        </VStack>
      )}
      {inProgress && !isDoer && !isDoerFinishProject && !cancelStatus && (
        <VStack px="24px" pb="24px">
          <CustomButton
            disabled
            title={t('projects.doerInProgress')}
            textColor={Colors.Rhino}
            onPress={() => {}}
          />
        </VStack>
      )}
      {cancelStatus && isLister && (
        <VStack px="24px" pb="24px">
          <CustomButton
            disabled
            title={t('projects.doerCancelPending')}
            textColor={Colors.FINISHED}
            disableColor={Colors.FINISHED.concat('26')}
            onPress={() => {}}
          />
        </VStack>
      )}
      {cancelStatus && isDoer && (
        <VStack px="24px" pb="24px">
          <CustomButton
            disabled
            title={t('projects.pendingAdminApproval')}
            textColor={Colors.FINISHED}
            disableColor={Colors.FINISHED.concat('26')}
            onPress={() => {}}
          />
        </VStack>
      )}
      {inProgress && isDoer && !isDoerFinishProject && !cancelStatus && (
        <VStack px="24px" pb="24px">
          <CustomButton
            color={Colors.PRIMARY}
            title={t('projects.finishProjects')}
            onPress={finishProject}
          />
        </VStack>
      )}
      {isDoerFinishProject && isLister && !listerCancelStatus && (
        <VStack px="24px" pb="24px">
          <CustomButton
            color={Colors.PRIMARY}
            title={t('projects.markAsComplete')}
            onPress={markAsComplete}
          />
        </VStack>
      )}
      {!isLister && isUserLoggedIn && <PlaceBidButton {...{projectId}} />}
    </Flex>
  );
};

export default memo(SectionDescriptionRoute);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});
