import dayjs from 'dayjs';
import {ExportCurve} from 'iconsax-react-native';
import {HStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {BackHandler, Platform, TouchableOpacity} from 'react-native';
import Config from 'react-native-config';
import Share from 'react-native-share';
import {
  CustomContainer,
  ProjectOptionsButton,
  ScreensHeader,
  SectionActiveBidsRoute,
  SectionDescriptionRoute,
  SectionPaymentRoute,
  SectionQuestionRoute,
  TabViewContainer,
} from '~/components';
import {Project, ProjectStatus} from '~/generated/graphql';
import {useGetProject} from '~/hooks/project';
import {goBack, resetRoot} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';

const ProjectDetailsScreen = ({route}: NavigationProp) => {
  const externalProjectId = route!.params!.id;
  const internalProjectId = route!.params!.projectId;
  const projectId = externalProjectId
    ? parseInt(externalProjectId)
    : internalProjectId;
  const isDeepLinking = route!.params!.isDeepLinking;
  const initialRoute = route!.params!.initialRoute;
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);
  const [currentRoute, setCurrentRoute] = useState<number>(initialRoute ?? 0);

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });

  const projectData = getProject?.project_getProject?.result ?? {};
  const project: Project = projectData?.project;
  const projectDeadLine = projectData?.project?.projectDeadLine;
  const projectStatus = project?.projectStatus;
  const isLister = userData?.id === project?.userId;
  const isDoer = projectData?.currentDoer?.id === userData?.id;
  const isBidding = projectStatus === ProjectStatus.Bidding;
  const inProgress = projectStatus === ProjectStatus.InProgress;
  const isFinished = projectStatus === ProjectStatus.Finished;
  const date1 = dayjs(projectDeadLine);
  const current = dayjs();
  const deadLine = date1.diff(current, 'millisecond', true);
  const isClosed = deadLine <= 0;

  const routesData = [
    {
      key: 'project',
      title: t('projects.project'),
      component: <SectionDescriptionRoute {...{projectId, setCurrentRoute}} />,
    },
    {
      key: 'qa',
      title: t('projects.qa'),
      component: <SectionQuestionRoute {...{projectId}} />,
    },
    {
      key: 'bid',
      title: t('projects.bids.bids'),
      component: <SectionActiveBidsRoute {...{projectId}} />,
    },
    ...((inProgress || isFinished) && (isLister || isDoer)
      ? [
          {
            key: 'payment',
            title: t('projects.payment.payment'),
            component: <SectionPaymentRoute {...{projectId}} />,
          },
        ]
      : []),
  ];

  const backOnPress = () => {
    if (isDeepLinking) {
      resetRoot('MainTabs');
    } else {
      goBack();
    }
  };

  useEffect(() => {
    const backAction = () => {
      backOnPress();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <CustomContainer isLoading={getProjectLoading}>
      <ScreensHeader
        backAction
        backActionHandler={backOnPress}
        title={t('projects.createProject.projectDetails')}
        rightHeader={
          isLister ? (
            !isBidding || isClosed ? (
              <HStack alignItems="center" space="16px">
                <ShareProject {...{projectId}} />
              </HStack>
            ) : (
              <HStack alignItems="center" space="16px">
                <ProjectOptionsButton
                  {...{isLister, projectId, projectStatus, projectDeadLine}}
                />
              </HStack>
            )
          ) : (
            <HStack alignItems="center" space="16px">
              <ShareProject {...{projectId}} />
            </HStack>
          )
        }
      />
      <TabViewContainer
        swipeEnabled={false}
        routes={routesData}
        defaultIndex={currentRoute}
        backgroundColor={Colors.SEARCH_BACKGROUND}
        setRoute={setCurrentRoute}
      />
    </CustomContainer>
  );
};

export default ProjectDetailsScreen;

const ShareProject = ({projectId}: {projectId: number}) => {
  const shareOnPress = async () => {
    let options = Platform.select({
      ios: {
        message: `${Config.DEEP_LINKING}project?id=${projectId}`,
        type: 'text',
      },
      default: {
        title: 'Share',
        message: '',
        url: `${Config.DEEP_LINKING}project?id=${projectId}`,
        failOnCancel: false,
      },
    });
    await Share.open(options);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={shareOnPress}>
      <ExportCurve size="22" color={Colors.WHITE} />
    </TouchableOpacity>
  );
};
