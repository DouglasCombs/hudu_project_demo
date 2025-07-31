import dayjs from 'dayjs';
import {Center, HStack, VStack, View} from 'native-base';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {InfoRedIcon} from '~/assets/icons';
import {CustomButton, CustomText, ModalContainer} from '~/components';
import {BidStatus, ProjectStatus} from '~/generated/graphql';
import {useGetBidsOrderByStatus} from '~/hooks/bid';
import {useGetProject} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {projectEditStore} from '~/stores';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

type Props = {
  isLister: boolean;
  projectId: number;
};

function EditProjectModal(props: Props, ref: any) {
  const {isLister, projectId} = props;
  const {t} = useTranslation();

  const {setIsEdit, setProjectId} = projectEditStore();
  const {setProjectData} = projectStore(state => state);

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = () => {
    if (bids?.length > 0) {
      setIsVisible(true);
    } else {
      nextPress();
    }
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });
  const projectData = getProject?.project_getProject?.result ?? {};
  const projectStatus = projectData?.project?.projectStatus;
  const isBidding = projectStatus === ProjectStatus.Bidding;
  const projectDeadLine = projectData?.project?.projectDeadLine;
  const date1 = dayjs(projectDeadLine);
  const current = dayjs();
  const deadLine = date1.diff(current, 'millisecond', true);
  const isClosed = deadLine <= 0;

  const getBidsOption = {
    where: {
      and: [
        {projectId: {eq: projectId}},
        {bidStatus: {neq: BidStatus.Cancell}},
      ],
    },
    input: {
      bovms: [
        {bidStatus: BidStatus.Finished, order: 1},
        {bidStatus: BidStatus.InProgress, order: 2},
        {bidStatus: BidStatus.Waiting, order: 3},
        {bidStatus: BidStatus.NotLucky, order: 4},
        {bidStatus: BidStatus.Cancell, order: 5},
        {bidStatus: BidStatus.Failed, order: 6},
      ],
    },
  };

  const {data: getBids} = useGetBidsOrderByStatus(getBidsOption);

  const bids = getBids?.pages ?? [];

  const [visible, setIsVisible] = useState<boolean>(false);

  const nextPress = () => {
    setIsEdit(true);
    setProjectId(projectId);
    setProjectData({});
    setTimeout(() => {
      closeModal();
      navigate('createProjectStep1');
    }, 700);
  };

  if (!isLister || !isBidding || isClosed) {
    return null;
  }

  return (
    <>
      <ModalContainer
        onClose={closeModal}
        useBody={false}
        style={styles.modal}
        justify="flex-end"
        backdropColor={Colors.BLACK_TRANSPARENT_2}
        isVisible={visible}>
        <VStack
          space="8"
          bg={Colors.WHITE_F}
          rounded="lg"
          py="16px"
          w="100%"
          mb="58px">
          <View
            alignSelf={'center'}
            h="1"
            bg={Colors.Ghost}
            w="15%"
            borderRadius="full"
          />
          <VStack
            space="16"
            alignItems={'flex-start'}
            px="4"
            justifyContent={'center'}>
            <Center alignSelf={'center'}>
              <InfoRedIcon />
            </Center>
            <VStack
              alignItems={'flex-start'}
              justifyContent={'center'}
              space="2">
              <CustomText
                fontFamily={fontFamily.regular}
                fontSize={fontSize.medium}
                color={Colors.BLACK}>
                {t('projects.createProject.editProject')}
              </CustomText>
              <CustomText
                fontFamily={fontFamily.regular}
                fontSize={fontSize.normal}>
                {t('projects.createProject.ifYouEditTheProject')}
                <CustomText
                  fontFamily={fontFamily.regular}
                  fontSize={fontSize.normal}
                  color={Colors.TIME_LEFT_RED_BACKGROUND}>
                  {t('projects.createProject.deleted')}
                </CustomText>
              </CustomText>
            </VStack>
          </VStack>
          <VStack mt="8" space="4">
            <View h="1" width="100%" bg={Colors.Solitude} />
            <HStack
              px="4"
              justifyContent={'space-between'}
              alignItems={'center'}
              space="4">
              <CustomButton
                width={'47%'}
                height={verticalScale(36)}
                color={Colors.Solitude}
                textColor={Colors.Topaz}
                onPress={closeModal}
                title={t('common.cancel')}
              />
              <CustomButton
                width={'47%'}
                height={verticalScale(36)}
                onPress={nextPress}
                title={t('projects.createProject.edit')}
              />
            </HStack>
          </VStack>
        </VStack>
      </ModalContainer>
    </>
  );
}

export default forwardRef(EditProjectModal);

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
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
