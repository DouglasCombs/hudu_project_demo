import {Center} from 'native-base';
import React from 'react';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {CustomText} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';
import {useTranslation} from 'react-i18next';

export default function AsListerLabel({userId}: {userId?: number}) {
  const {t} = useTranslation();
  const {userData} = userDataStore();

  const isLister = userData?.id === userId;

  if (isLister) {
    return (
      <Center px="8px" py="4px" borderRadius="sm" bg={Colors.SlateBlue}>
        <CustomText
          color={Colors.WHITE_F}
          fontSize={fontSize.xTiny}
          fontFamily={fontFamily.medium}
          numberOfLines={1}>
          {t('projects.yourProject')}
        </CustomText>
      </Center>
    );
  }
  return null;
}
