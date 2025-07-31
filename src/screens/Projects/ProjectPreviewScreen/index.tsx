import dayjs from 'dayjs';
import {Center, CloseIcon, HStack, VStack} from 'native-base';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {
  CopyIcon,
  DateIcon,
  DollarIcon,
  DotIcon,
  GoalIcon,
} from '~/assets/icons';
import {
  ConfirmationModal,
  CustomButton,
  CustomCarousel,
  CustomContainer,
  CustomText,
  CustomTouchable,
  LocationViewer,
  ProjectPreviewDescription,
  ProjectPreviewQuestions,
  ProjectStatusLabel,
  ScreensHeader,
  ShowSummaryWithIcon,
  UserInfoCard,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {Project, ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {
  useAddProject,
  useEditProject,
  useGetCategory,
  useGetProject,
} from '~/hooks/project';
import {useGetProfile} from '~/hooks/user';
import {pop, replace} from '~/navigation/Methods';
import {projectEditStore, userDataStore} from '~/stores';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {appFormatDate, getProjectColor} from '~/utils/helper';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';

const ProjectPreviewScreen = () => {
  const {t} = useTranslation();
  const {isLoading, mutate} = useAddProject();
  const {isLoading: isLoadingEditProject, mutate: mutateEditProject} =
    useEditProject();

  const [isModalCreate, setIsModalCreate] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [isModalIgnore, setIsModalIgnore] = useState(false);

  const {userData} = userDataStore(state => state);
  const userId = userData?.id;
  const {isLoading: isLoadingGetProfile, data} = useGetProfile({userId});
  const {isEdit, projectId, setIsEdit, setProjectId} = projectEditStore();

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId,
    enabled: isEdit,
  });
  const project: Project = getProject?.project_getProject?.result?.project;

  const getProfile = data?.user_getProfile?.result;

  const {projectData, setProjectData} = projectStore(state => state);
  const {data: categoryData} = useGetCategory(
    parseInt(projectData?.categoryId),
  );

  const availability = projectData?.availability;
  const startDate =
    availability === 'FLEXIBLE_DATE'
      ? 'Flexible'
      : availability === 'SPECIFIC_DATE'
      ? dayjs(projectData?.projectDeadLine).format('M/D/YYYY')
      : dayjs(projectData?.startDate).format('M/D/YYYY');

  const category = categoryData?.category_getCategory?.result?.text;

  const projectDeadLine = isEdit
    ? project?.projectDeadLine
    : projectData?.projectDeadLine;
  const isBidder = projectData?.yourLowesBid > 0;
  const projectStatus = project?.projectStatus;
  const cancelRequestStatus = project?.cancellRequestStatus;
  const isDoerFinishProject = project?.isHuduFinished;

  const backgroundColor = getProjectColor(projectDeadLine).backgroundColor;
  let currentLowBid = 0;

  const createProject = useCallback(() => {
    let addProjectInput = {
      ...projectData,
      categoryId: parseInt(projectData?.categoryId),
      cover: projectData?.projectImages?.[0]?.imageAddress,
      startDate: new Date(projectData?.startDate),
      endDate: new Date(projectData?.endDate),
      city: projectData?.city ? projectData?.city : projectData?.state,
      point: [projectData?.point?.[0], projectData?.point?.[1]],
      projectDeadLine: projectData?.projectDeadLine
        ? new Date(projectData?.projectDeadLine)
        : new Date(
            new Date(projectData?.startDate).setDate(new Date().getDate() + 7),
          ),
    };
    delete addProjectInput.addressId;
    mutate(addProjectInput, {
      onSuccess: success => {
        if (success?.project_addProject?.status === ResponseStatus.Success) {
          pop(7);
          replace('MainTabs');
          queryClient.invalidateQueries([queryKeys.projects, {exact: false}]);
          queryClient.invalidateQueries([queryKeys.bids, {exact: false}]);
          queryClient.invalidateQueries([
            queryKeys.bidsOrderByStatus,
            {exact: false},
          ]);
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          setProjectData({});
          showSuccessMessage(t('alerts.yourProjectHasBeenListedSuccessfully'));
        } else {
          showErrorMessage(success?.project_addProject?.status);
        }
      },
    });
    onCloseCancelModal();
  }, [projectData]);

  const editProject = useCallback(() => {
    let addProjectInput = {
      ...projectData,
      categoryId: parseInt(projectData?.categoryId),
      cover: projectData?.projectImages?.[0]?.imageAddress,
      startDate: new Date(projectData?.startDate),
      endDate: new Date(projectData?.endDate),
      projectDeadLine: new Date(projectData?.projectDeadLine),
      city: projectData?.city ? projectData?.city : projectData?.state,
      id: projectId,
      point: [projectData?.point?.[0], projectData?.point?.[1]],
    };
    delete addProjectInput.addressId;
    mutateEditProject(addProjectInput, {
      onSuccess: success => {
        if (success?.project_editProject?.status === ResponseStatus.Success) {
          pop(7);
          replace('MainTabs');
          queryClient.invalidateQueries([queryKeys.projects, {exact: false}]);
          queryClient.invalidateQueries([queryKeys.bids, {exact: false}]);
          queryClient.invalidateQueries([
            queryKeys.bidsOrderByStatus,
            {exact: false},
          ]);
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          setProjectData({});
          setIsEdit(false);
          setProjectId(null);
          showSuccessMessage(t('alerts.yourProjectPublishedSuccessfully'));
        } else {
          showErrorMessage(success?.project_editProject?.status);
        }
      },
    });
    onCloseCancelModal();
  }, [setIsEdit, projectId, isEdit, projectData]);

  const onIgnore = () => {
    setProjectData({});
    pop(7);
    onCloseCancelModal();
  };
  const onCloseCancelModal = () => {
    setIsModalCreate(false);
    setIsModalEdit(false);
    setIsModalIgnore(false);
  };

  const loading = isLoading ?? isLoadingEditProject;

  return (
    <CustomContainer backgroundColor={Colors.WHITE} isLoading={loading}>
      <ScreensHeader
        backAction
        title={t('projects.createProject.projectPreview')}
        backActionHandler={() => pop(1)}
        rightHeader={
          <CustomTouchable onPress={() => setIsModalIgnore(true)}>
            <CloseIcon color={Colors.WHITE} />
          </CustomTouchable>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={styles.flex1}>
        <CustomCarousel
          height={verticalScale(211)}
          data={projectData?.projectImages}
          backgroundColor={backgroundColor}
          projectDeadLine={projectDeadLine}
          currentLowBid={currentLowBid}
        />
        <VStack px="4" mt="4">
          {isEdit ? (
            <HStack pb="4" space="8px" alignItems={'center'}>
              <ProjectStatusLabel
                isDoer={isBidder}
                status={projectStatus}
                type="outline"
                projectDeadLine={projectDeadLine}
                cancelRequestStatus={cancelRequestStatus}
                isDoerFinishProject={isDoerFinishProject}
              />
            </HStack>
          ) : (
            <HStack pb="4" space="8px" alignItems={'center'}>
              <DotIcon color={Colors.DEEP_FIR} />
              <CustomText
                fontFamily={fontFamily.medium}
                fontSize={fontSize.small}
                color={Colors.DEEP_FIR}>
                {t('projects.notPublished')}
              </CustomText>
            </HStack>
          )}

          <CustomText
            flex={1}
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xNormal}
            color={Colors.RegalBlue}>
            {projectData.title}
          </CustomText>
          <HStack mt="28px" justifyContent={'space-between'} my="2">
            <ShowSummaryWithIcon
              title={t('projects.createProject.startDate')}
              icon={<DateIcon />}
              data={startDate}
            />
            <ShowSummaryWithIcon
              title={t('projects.createProject.location')}
              icon={<GoalIcon />}
              data={projectData?.city + ', ' + projectData?.state}
            />
          </HStack>
          <HStack justifyContent={'space-between'} my="2">
            <ShowSummaryWithIcon
              title={t('projects.createProject.category')}
              icon={<CopyIcon />}
              data={category}
            />
            <ShowSummaryWithIcon
              title={t('projects.bidAmount.currentLowBid')}
              icon={<DollarIcon />}
              data={'$ 0'}
            />
          </HStack>

          <VStack mt="24px">
            <UserInfoCard data={getProfile} isLoading={isLoadingGetProfile} />
            <CustomText marginTop={18} style={{color: Colors.Topaz}}>
              {`${t('projects.projectListedIn')} ${appFormatDate(new Date())}`}
            </CustomText>
          </VStack>

          <ProjectPreviewDescription data={projectData} />

          <CustomText>{t('projects.createProject.location')}</CustomText>
          <LocationViewer
            latitude={projectData?.point?.[0]}
            longitude={projectData?.point?.[1]}
            address={projectData?.streetAddress}
          />
          {projectData?.question1 ||
          projectData?.question2 ||
          projectData?.question3 ? (
            <ProjectPreviewQuestions data={projectData} />
          ) : null}
        </VStack>
      </ScrollView>
      <Center>
        <CustomButton
          title={
            isEdit
              ? t('common.save')
              : t('projects.createProject.publishProject')
          }
          mb={4}
          width={'90%'}
          loading={loading}
          onPress={
            isEdit && projectId
              ? () => setIsModalEdit(true)
              : () => setIsModalCreate(true)
          }
        />
      </Center>
      <ConfirmationModal
        isVisible={isModalCreate}
        onClose={onCloseCancelModal}
        onSubmit={createProject}
        isLoading={isLoading}
        title={t('alerts.createProject')}
        description={t('alerts.areYouSureToCreateProject')}
        submitTitle={t('alerts.ok')}
      />
      <ConfirmationModal
        isVisible={isModalEdit}
        onClose={onCloseCancelModal}
        onSubmit={editProject}
        isLoading={isLoadingEditProject}
        title={t('alerts.confirmChanges')}
        description={t('alerts.areYouSureToEditProject')}
        submitTitle={t('alerts.ok')}
      />
      <ConfirmationModal
        isVisible={isModalIgnore}
        onClose={onCloseCancelModal}
        onSubmit={onIgnore}
        title={t('alerts.ignoreProject')}
        description={t('alerts.areYouSureToIgnoreProject')}
        submitTitle={t('alerts.ok')}
        submitColor={Colors.FrenchRose}
      />
    </CustomContainer>
  );
};

export default ProjectPreviewScreen;

const styles = StyleSheet.create({
  flex1: {paddingVertical: verticalScale(16), paddingBottom: 150},
  image: {
    width: '100%',
    height: verticalScale(275),
    justifyContent: 'flex-end',
  },
});
