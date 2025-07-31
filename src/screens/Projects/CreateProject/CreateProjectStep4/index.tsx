import {VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomContainer,
  CustomText,
  ScreensHeader,
  SectionAddProjectStep4,
  SectionEditProjectStep4,
} from '~/components';
import {useChatGPT} from '~/hooks/message';
import {useGetProject} from '~/hooks/project';
import {pop} from '~/navigation/Methods';
import {projectEditStore} from '~/stores';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const CreateProjectStep4 = () => {
  const {t} = useTranslation();

  const {projectData} = projectStore(state => state);

  const {data, isLoading} = useChatGPT({
    projectTitle: projectData?.title,
    projectDescription: projectData?.description,
  });
  const {isEdit, projectId} = projectEditStore();

  const {isLoading: getProjectLoading} = useGetProject({
    projectId: projectId,
  });

  return (
    <CustomContainer
      isLoading={isLoading || getProjectLoading}
      backgroundColor={Colors.SEARCH_BACKGROUND}>
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
              {t('projects.createProject.step', {n: 4})}
            </CustomText>
          </VStack>
        }
        backAction
        backActionHandler={() => pop(1)}
      />
      {isEdit ? (
        <SectionEditProjectStep4 {...{data, projectId}} />
      ) : (
        <SectionAddProjectStep4 {...{data}} />
      )}
    </CustomContainer>
  );
};

export default CreateProjectStep4;
