import {VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomContainer,
  CustomText,
  ScreensHeader,
  SectionAddProjectStep1,
  SectionEditProjectStep1,
} from '~/components';
import {canGoBack, goBack, replace} from '~/navigation/Methods';
import {projectEditStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const CreateProjectStep1 = () => {
  const {t} = useTranslation();
  const {isEdit, projectId, setIsEdit} = projectEditStore();

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
              {t('projects.createProject.step', {n: 1})}
            </CustomText>
          </VStack>
        }
        backAction
        backActionHandler={() => {
          if (isEdit) {
            setIsEdit(false);
          }
          if (canGoBack()) {
            goBack();
          } else {
            replace('MainTabs');
          }
        }}
      />
      {isEdit ? (
        <SectionEditProjectStep1 {...{projectId}} />
      ) : (
        <SectionAddProjectStep1 />
      )}
    </CustomContainer>
  );
};

export default CreateProjectStep1;
