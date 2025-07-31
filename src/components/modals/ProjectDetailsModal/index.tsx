import {Box, HStack, VStack} from 'native-base';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CategoryLabel,
  CustomButton,
  CustomDivider,
  CustomImage,
  CustomText,
  ModalContainer,
  ProjectStatusLabel,
  RemainedTimeSection,
} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {useGetProject} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

function ProjectDetailsModal(
  {
    projectId,
  }: {
    projectId: number;
  },
  ref: any,
) {
  const {t} = useTranslation();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });

  const projectData = getProject?.project_getProject?.result ?? {};
  const currentLowBid = projectData?.currentLowBid ?? 0;
  const project = projectData?.project;

  const imageSource = project?.cover;
  const projectDeadLine = project?.projectDeadLine;
  const userId = project?.userId;
  const projectStatus = project?.projectStatus;
  const cancelRequestStatus = project?.cancellRequestStatus;
  const category = project?.category;
  const projectTitle = project?.title;
  const isBidding = projectStatus === ProjectStatus.Bidding;
  const isDoerFinishProject = projectData?.isHuduFinished;

  const onPressHandler = () => {
    closeModal();
    navigate('ProjectDetails', {projectId, isDeepLinking: false});
  };

  return (
    <ModalContainer
      onClose={closeModal}
      useBody={false}
      style={styles.modal}
      justify="flex-end"
      backdropColor={Colors.BLACK_TRANSPARENT_2}
      isVisible={isVisible}
      loading={getProjectLoading}>
      <VStack bg={Colors.WHITE_F} rounded="sm" py="16px" w="100%" mb="58px">
        <Box px="16px">
          <CustomText
            fontSize={fontSize.xNormal}
            fontFamily={fontFamily.medium}
            marginBottom={18}
            textAlign="center">
            {t('projects.createProject.projectDetails')}
          </CustomText>
          <Box>
            <VStack space="12px">
              <CustomImage
                resizeMode="cover"
                imageSource={imageSource}
                style={styles.image}>
                {isBidding && (
                  <RemainedTimeSection
                    {...{projectDeadLine, currentLowBid, userId}}
                  />
                )}
              </CustomImage>
              <HStack alignItems="center" space="8px">
                <ProjectStatusLabel
                  status={projectStatus}
                  projectDeadLine={projectDeadLine}
                  cancelRequestStatus={cancelRequestStatus}
                  isDoerFinishProject={isDoerFinishProject}
                />
                {category && <CategoryLabel category={category} />}
              </HStack>
              <CustomText fontSize={fontSize.xNormal}>
                {projectTitle}
              </CustomText>
            </VStack>
          </Box>
        </Box>
        <CustomDivider />
        <HStack space="10px" px="16px">
          <CustomButton
            flex={1}
            height={verticalScale(32)}
            onPress={onPressHandler}
            title={t('projects.viewProject')}
            fontSize={fontSize.small}
          />
          <CustomButton
            flex={1}
            height={verticalScale(32)}
            color={Colors.Solitude}
            textColor={Colors.Topaz}
            onPress={closeModal}
            title={t('common.done')}
            fontSize={fontSize.small}
          />
        </HStack>
      </VStack>
    </ModalContainer>
  );
}

export default forwardRef(ProjectDetailsModal);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(183),
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  modal: {
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
