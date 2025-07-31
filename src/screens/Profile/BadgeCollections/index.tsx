import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  BadgeCollectionList,
  CustomContainer,
  ScreensHeader,
} from '~/components';
import {useGetBadges} from '~/hooks/badge';
import {userDataStore} from '~/stores';

const BadgeCollectionsScreen = () => {
  const {t} = useTranslation();
  const {userData} = userDataStore();

  const {isLoading} = useGetBadges({
    where: {userId: {eq: userData?.id}},
    order: {createdDate: 'DESC'},
  });

  return (
    <CustomContainer isLoading={isLoading}>
      <ScreensHeader backAction title={t('profile.badgeCollection')} />
      <BadgeCollectionList />
    </CustomContainer>
  );
};

export default BadgeCollectionsScreen;
