import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  SectionHudurReviews,
  SectionListerReviews,
  TopTabContainer,
} from '~/components';

export default function ReviewsScreen() {
  const {t} = useTranslation();

  const tabData = [
    {
      name: t('projects.bids.asLister'),
      component: SectionListerReviews,
    },
    {
      name: t('projects.bids.asDoer'),
      component: SectionHudurReviews,
    },
  ];

  return <TopTabContainer screens={tabData} />;
}
