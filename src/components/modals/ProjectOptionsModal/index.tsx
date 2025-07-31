import dayjs from 'dayjs';
import {Edit, ExportCurve, Trash} from 'iconsax-react-native';
import {HStack, VStack} from 'native-base';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import Share from 'react-native-share';
import {
  ActionSheetContainer,
  CustomDivider,
  CustomText,
  CustomTouchable,
  EditProjectModal,
} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';

type Props = {
  projectId: number;
  projectStatus: ProjectStatus;
  projectDeadLine: any;
};

function ProjectOptionsModal(props: Props, ref: any) {
  const {projectId, projectStatus, projectDeadLine} = props;

  const {t} = useTranslation();
  const isBidding = projectStatus === ProjectStatus.Bidding;
  const date1 = dayjs(projectDeadLine);
  const current = dayjs();
  const deadLine = date1.diff(current, 'millisecond', true);
  const isClosed = deadLine <= 0;

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const modalRef = useRef<ModalRef>(null);

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

  const shareOnPress = async () => {
    closeModal();
    let options = Platform.select({
      ios: {
        message: `${Config.DEEP_LINKING}project?id=${projectId}`,
        type: 'text',
      },
      default: {
        title: 'Share',
        message: '',
        url: `${Config.DEEP_LINKING}project?id=${projectId}`,
        failOnCancel: false,
      },
    });
    await Share.open(options);
  };

  const deleteOnPress = () => {
    closeModal();
    navigate('ProjectCancelation', {projectId, projectStatus});
  };

  const editOnPress = () => {
    closeModal();
    modalRef.current.open();
  };

  return (
    <>
      <ActionSheetContainer isVisible={isVisible} onClose={closeModal}>
        <VStack p="24px" w="100%" flexGrow={1}>
          <Item
            title={t('common.share')}
            icon={<ExportCurve size="22" color={Colors.BLACK} />}
            onPress={shareOnPress}
          />
          {!isBidding || isClosed ? (
            <></>
          ) : (
            <>
              <CustomDivider />
              <Item
                title={t('common.edit')}
                icon={<Edit size="22" color={Colors.BLACK} />}
                onPress={editOnPress}
              />
              <CustomDivider />
              <Item
                title={t('common.delete')}
                icon={<Trash size="22" color={Colors.BLACK} />}
                onPress={deleteOnPress}
              />
            </>
          )}
        </VStack>
      </ActionSheetContainer>
      <EditProjectModal ref={modalRef} {...{isLister: true, projectId}} />
    </>
  );
}

export default forwardRef(ProjectOptionsModal);

const Item = ({
  title,
  icon,
  onPress,
}: {
  title?: any;
  icon?: JSX.Element;
  onPress?: () => void;
}) => {
  return (
    <CustomTouchable onPress={onPress}>
      <HStack w="100%" alignItems="center" space="8px">
        {icon}
        <CustomText flex={1}>{title}</CustomText>
      </HStack>
    </CustomTouchable>
  );
};
