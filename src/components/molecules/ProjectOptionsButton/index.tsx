import React, {useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import {CustomTouchable, ProjectOptionsModal} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {Colors} from '~/styles';

export default function ProjectOptionsButton({
  isLister,
  projectId,
  projectStatus,
  projectDeadLine,
}: {
  isLister: boolean;
  projectId: number;
  projectStatus: ProjectStatus;
  projectDeadLine?: any;
}) {
  const modalRef = useRef<ModalRef>(null);

  const openModal = () => {
    modalRef.current.open();
  };

  return (
    <>
      <CustomTouchable onPress={openModal}>
        <Feather name="more-vertical" size={20} color={Colors.WHITE_F} />
      </CustomTouchable>
      <ProjectOptionsModal
        ref={modalRef}
        {...{isLister, projectId, projectStatus, projectDeadLine}}
      />
    </>
  );
}
