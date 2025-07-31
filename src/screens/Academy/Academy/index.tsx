import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomContainer,
  SectionCoursesRoute,
  TabViewContainer,
  SectionMyCoursesRoute,
} from '~/components';
import {authStore} from '~/stores';
import {Colors} from '~/styles';

export default function AcademyScreen({route}: NavigationProp) {
  const initialRoute = route!.params!.initialRoute;
  const {isUserLoggedIn} = authStore(state => state);

  const {t} = useTranslation();

  const routes = [
    {
      component: <SectionCoursesRoute />,
      title: t('academy.courses'),
      key: 'myBids',
    },
    ...(isUserLoggedIn
      ? [
          {
            key: 'myListing',
            title: t('academy.myCourses'),
            component: <SectionMyCoursesRoute />,
          },
        ]
      : []),
  ];

  return (
    <CustomContainer
      pb={0}
      barStyle="dark-content"
      statusBarBackgroundColor={Colors.WHITE_F}>
      <TabViewContainer defaultIndex={initialRoute} routes={routes} />
    </CustomContainer>
  );
}
