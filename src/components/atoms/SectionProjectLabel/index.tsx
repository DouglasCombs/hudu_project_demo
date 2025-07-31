import React, {useMemo} from 'react';
import {Center} from 'native-base';
import {scale, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import dayjs from 'dayjs';
import {ProjectStatus} from '~/generated/graphql';
import {CustomText} from '~/components';

const SectionProjectLabel = ({item}: {item?: any}) => {
  const today = useMemo(() => {
    return dayjs(new Date().toUTCString());
  }, []);

  const projectDeadLine = dayjs(item?.project?.projectDeadLine);

  const getProjectType = () => {
    if (
      projectDeadLine.isBefore(today) &&
      item?.project?.projectStatus === 'WAITING'
    ) {
      return {
        text: 'Expired',
        backgroundColor: Colors.CANCEL_BACKGROUND,
        color: Colors.CANCEL,
      };
    } else {
      switch (item?.project?.projectStatus) {
        case ProjectStatus.Bidding:
          return {
            text: 'Bidding',
            backgroundColor: Colors.WAITING_BACKGROUND,
            color: Colors.INFO,
          };
        case 'WAITING':
          return {
            text: 'Waiting',
            backgroundColor: Colors.WAITING_BACKGROUND,
            color: Colors.INFO,
          };
        case ProjectStatus.InProgress:
          return {
            text: 'Awarded',
            backgroundColor: Colors.IN_PROGRESS_BACKGROUND,
            color: Colors.SUCCESS,
          };
        case ProjectStatus.Failed:
          return {
            text: 'Failed',
            backgroundColor: Colors.FAILED_BACKGROUND,
            color: Colors.ERROR,
          };
        case ProjectStatus.Finished:
          return {
            text: 'Finished',
            backgroundColor: Colors.FINISHED_BACKGROUND,
            color: Colors.FINISHED,
          };
        default:
          return {
            text: '',
            backgroundColor: Colors.TRANSPARENT,
            color: Colors.TRANSPARENT,
          };
      }
    }
  };

  const projectStatus = getProjectType();

  return (
    <Center
      h={`${verticalScale(25)}px`}
      borderRadius="md"
      bg={projectStatus?.backgroundColor}>
      <CustomText
        paddingHorizontal={scale(16)}
        zIndex={11}
        color={projectStatus?.color}>
        {projectStatus?.text}
      </CustomText>
    </Center>
  );
};

export default SectionProjectLabel;
