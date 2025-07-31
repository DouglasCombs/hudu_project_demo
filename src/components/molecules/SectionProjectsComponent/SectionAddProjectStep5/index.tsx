import {Flex, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  AddProjectImages,
  CustomButton,
  CustomKeyboardAwareScrollView,
  CustomText,
} from '~/components';
import {push} from '~/navigation/Methods';
import projectStore from '~/stores/projectStore';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {showInfoMessage} from '~/utils/utils';

const SectionAddProjectStep5 = () => {
  const {t} = useTranslation();

  const {projectData} = projectStore(state => state);

  const nextHandler = () => {
    if (projectData?.projectImages?.length > 0) {
      push('createProjectStep6');
    } else {
      showInfoMessage('Please select a project image.');
    }
  };

  return (
    <Flex flex={1} pb="6">
      <CustomKeyboardAwareScrollView>
        <VStack py="4" space="4" flex={1}>
          <CustomText
            fontSize={fontSize.tooLarge}
            fontFamily={fontFamily.medium}
            marginTop={verticalScale(8)}>
            {t('projects.createProject.whatUNeed')}
          </CustomText>
          <CustomText
            marginTop={16}
            marginBottom={10}
            fontSize={fontSize.small}
            fontFamily={fontFamily.regular}>
            {t('projects.createProject.uploadDocument')}
          </CustomText>
          <AddProjectImages />
        </VStack>
      </CustomKeyboardAwareScrollView>
      <VStack alignSelf={'center'} px="3" w={'90%'}>
        <CustomButton
          title={t('projects.createProject.continue')}
          onPress={nextHandler}
        />
      </VStack>
    </Flex>
  );
};

export default SectionAddProjectStep5;
