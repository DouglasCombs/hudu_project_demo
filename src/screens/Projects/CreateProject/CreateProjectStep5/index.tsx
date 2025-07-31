import {VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomContainer,
  CustomText,
  ScreensHeader,
  SectionAddProjectStep5,
  SectionEditProjectStep5,
} from '~/components';
import {pop} from '~/navigation/Methods';
import {projectEditStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const CreateProjectStep5 = () => {
  const {t} = useTranslation();
  const {isEdit, projectId} = projectEditStore();

  return (
    <CustomContainer backgroundColor={Colors.SEARCH_BACKGROUND}>
      <ScreensHeader
        centerHeader={
          <VStack>
            <CustomText
              color={Colors.WHITE}
              fontSize={fontSize.xNormal}
              textAlign={'center'}
              fontFamily={fontFamily.medium}>
              {t('projects.createProject.listAProject')}
            </CustomText>
            <CustomText
              color={Colors.WHITE}
              fontSize={fontSize.xTiny}
              textAlign={'center'}
              fontFamily={fontFamily.medium}>
              {t('projects.createProject.step', {n: 5})}
            </CustomText>
          </VStack>
        }
        backAction
        backActionHandler={() => pop(1)}
      />
      {isEdit ? (
        <SectionEditProjectStep5 {...{projectId}} />
      ) : (
        <SectionAddProjectStep5 />
      )}
    </CustomContainer>
  );
};

export default CreateProjectStep5;
