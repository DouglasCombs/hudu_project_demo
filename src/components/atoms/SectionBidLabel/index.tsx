import React from 'react';
import {Center} from 'native-base';
import {scale, verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {BidStatus} from '~/generated/graphql';
import {CustomText} from '~/components';

const SectionBidLabel = ({item}: {item?: any}) => {
  const getProjectType = () => {
    switch (item?.bidStatus) {
      case BidStatus.Waiting:
        return {
          text: 'Active',
          backgroundColor: Colors.WAITING_BACKGROUND,
          color: Colors.INFO,
        };
      case BidStatus.PenndingHuduWithdraw:
        return {
          text: 'Pending withdraw',
          backgroundColor: Colors.WAITING_BACKGROUND,
          color: Colors.INFO,
        };
      case BidStatus.InProgress:
        return {
          text: 'Awarded',
          backgroundColor: Colors.IN_PROGRESS_BACKGROUND,
          color: Colors.SUCCESS,
        };
      case BidStatus.Failed:
        return {
          text: 'Rejected',
          backgroundColor: Colors.FAILED_BACKGROUND,
          color: Colors.ERROR,
        };
      case BidStatus.HuduFinishedProject:
        return {
          text: 'Done',
          backgroundColor: Colors.FINISHED_BACKGROUND,
          color: Colors.FINISHED,
        };
      case BidStatus.Finished:
        return {
          text: 'Finished',
          backgroundColor: Colors.FINISHED_BACKGROUND,
          color: Colors.FINISHED,
        };
      case BidStatus.NotLucky:
        return {
          text: 'Not lucky',
          backgroundColor: Colors.FAILED_BACKGROUND,
          color: Colors.ERROR,
        };
      case BidStatus.Cancell:
        return {
          text: 'Canceled',
          backgroundColor: Colors.FAILED_BACKGROUND,
          color: Colors.ERROR,
        };
      default:
        return {
          text: '',
          backgroundColor: Colors.TRANSPARENT,
          color: Colors.TRANSPARENT,
        };
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

export default SectionBidLabel;
