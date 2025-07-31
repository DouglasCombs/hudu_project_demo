import {Flex, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  AddProjectImages,
  CustomButton,
  CustomKeyboardAwareScrollView,
  CustomText,
} from '~/components';
import {useGetProject} from '~/hooks/project';
import {push} from '~/navigation/Methods';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {showInfoMessage} from '~/utils/utils';

const SectionEditProjectStep5 = ({projectId}: {projectId: number}) => {
  const {t} = useTranslation();

  const {projectData, setProjectData} = projectStore(state => state);
  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });
  const project = getProject?.project_getProject?.result?.project ?? {};

  useEffect(() => {
    if (project) {
      setProjectData({
        ...projectData,
        projectImages: project?.projectImages?.map(el => {
          return {imageAddress: el?.imageAddress, alt: el?.alt};
        }),
      });
    }
  }, [project]);

  const nextHandler = () => {
    if (projectData?.projectImages?.length > 0) {
      push('createProjectStep6');
    } else {
      showInfoMessage('Please select a project image.');
    }
  };

  return (
    <Flex bg={Colors.SEARCH_BACKGROUND} flex={1} pb="6">
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

export default SectionEditProjectStep5;
