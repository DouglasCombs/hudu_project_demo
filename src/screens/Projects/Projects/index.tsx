import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Archive2} from '~/assets/icons';
import {
  CustomContainer,
  CustomTouchable,
  ScreensHeader,
  SectionBidsDetailsProjects,
  SectionListingDetailsProjects,
  TabViewContainer,
} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';

const ProjectsScreen = ({route}: NavigationProp) => {
  const initialRoute = route!.params!.initialRoute;
  const {t} = useTranslation();

  const [currentRoute, setCurrentRoute] = useState<number>(initialRoute ?? 0);

  const routes = [
    {
      component: <SectionBidsDetailsProjects />,
      title: t('projects.bids.asDoer'),
      key: 'myBids',
    },
    {
      component: <SectionListingDetailsProjects />,
      title: t('projects.bids.asLister'),
      key: 'myListing',
    },
  ];

  const archiveOnPress = () => {
    if (currentRoute === 0) {
      navigate('BidsByStatus', {isArchive: true});
    } else {
      navigate('ProjectsByStatus', {projectStatus: ProjectStatus.Failed});
    }
  };

  return (
    <CustomContainer pb={0}>
      <ScreensHeader
        rightHeader={
          <CustomTouchable onPress={archiveOnPress}>
            <Archive2 />
          </CustomTouchable>
        }
        title={t('projects.projectStatus.myProjects')}
      />
      <TabViewContainer
        defaultIndex={initialRoute}
        routes={routes}
        setRoute={setCurrentRoute}
      />
    </CustomContainer>
  );
};

export default ProjectsScreen;
