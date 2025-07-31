import {HStack, VStack} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {fontFamily as AppFonts, fontSize as font_size} from '~/utils/style';
import CustomText from '../CustomText';

const ProjectPreviewQuestions = ({data}: {data: any}) => {
  const {t} = useTranslation();

  return (
    <VStack mt="4" space="2">
      <CustomText>{t('projects.createProject.requiredMaterials')}</CustomText>
      {data?.question1 ? (
        <HStack space="2">
          <CustomText>.</CustomText>
          <CustomText fontSize={font_size.small} fontFamily={AppFonts.medium}>
            {data?.question1}
          </CustomText>
        </HStack>
      ) : null}
      {data?.question2 ? (
        <HStack space="2">
          <CustomText>.</CustomText>
          <CustomText fontSize={font_size.small} fontFamily={AppFonts.medium}>
            {data?.question2}
          </CustomText>
        </HStack>
      ) : null}
      {data?.question3 ? (
        <HStack space="2">
          <CustomText>.</CustomText>
          <CustomText fontSize={font_size.small} fontFamily={AppFonts.medium}>
            {data?.question2}
          </CustomText>
        </HStack>
      ) : null}
    </VStack>
  );
};

export default memo(ProjectPreviewQuestions);
