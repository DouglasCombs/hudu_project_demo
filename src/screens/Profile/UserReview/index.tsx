import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomContainer,
  ScreensHeader,
  HudurReviewList,
  SectionListerReviews,
  TabViewContainer,
  ListerReviewList,
} from '~/components';

const UserReviewScreen = ({route}: {route: any}) => {
  const {t} = useTranslation();
  const tabIndex = route?.params?.index || 0;
  const targetUserId = route?.params?.targetUserId;
  const routesData = [
    {
      key: 'project',
      title: t('profile.review.asDoer'),
      component: <HudurReviewList userId={targetUserId} />,
    },
    {
      key: 'qa',
      title: t('profile.review.asLister'),
      component: <ListerReviewList userId={targetUserId} />,
    },
  ];
  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('profile.drawer.reviews')} />
      <TabViewContainer
        swipeEnabled={false}
        routes={routesData}
        defaultIndex={tabIndex}
      />
    </CustomContainer>
  );
};

export default UserReviewScreen;
