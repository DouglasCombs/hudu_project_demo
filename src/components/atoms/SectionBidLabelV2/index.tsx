import {Center} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {CustomText} from '~/components';
import {Bid, BidStatus} from '~/generated/graphql';
import {Colors} from '~/styles';

const SectionBidLabelV2 = ({
  item,
  isClosed,
}: {
  item?: Bid;
  isClosed: boolean;
}) => {
  const {t} = useTranslation();

  const getBidDetails = () => {
    switch (item?.bidStatus) {
      case BidStatus.Waiting:
        return {
          text: t('projects.bids.active'),
          backgroundColor: Colors.WAITING_BACKGROUND,
          color: Colors.INFO,
        };
      case BidStatus.PenndingHuduWithdraw:
        return {
          text: t('projects.bids.pendingWithDraw'),
          backgroundColor: Colors.WAITING_BACKGROUND,
          color: Colors.INFO,
        };
      case BidStatus.InProgress:
        return {
          text: t('projects.bids.awarded'),
          backgroundColor: Colors.IN_PROGRESS_BACKGROUND,
          color: Colors.SUCCESS,
        };
      case BidStatus.Failed:
        return {
          text: t('projects.bids.rejected'),
          backgroundColor: Colors.FAILED_BACKGROUND,
          color: Colors.ERROR,
        };
      case BidStatus.HuduFinishedProject:
        return {
          text: t('projects.bids.done'),
          backgroundColor: Colors.PRIMARY_BACKGROUND,
          color: Colors.PRIMARY,
        };
      case BidStatus.Finished:
        return {
          text: t('projects.bids.finished'),
          backgroundColor: Colors.SUCCESS_BACKGROUND,
          color: Colors.SUCCESS,
        };
      case BidStatus.NotLucky:
        return {
          text: t('projects.bids.notLucky'),
          backgroundColor: Colors.FAILED_BACKGROUND,
          color: Colors.ERROR,
        };
      case BidStatus.Cancell:
        return {
          text: t('projects.bids.canceled'),
          backgroundColor: Colors.CANCEL_BACKGROUND,
          color: Colors.CANCEL,
        };
      default:
        return {
          text: '',
          backgroundColor: Colors.TRANSPARENT,
          color: Colors.TRANSPARENT,
        };
    }
  };

  const bidStatus =
    item?.bidStatus === BidStatus.InProgress ||
    item?.bidStatus === BidStatus.Finished ||
    item?.bidStatus === BidStatus.HuduFinishedProject ||
    item?.bidStatus === BidStatus.PenndingHuduWithdraw
      ? getBidDetails()
      : isClosed
      ? {
          text: t('projects.bids.notLucky'),
          backgroundColor: Colors.FAILED_BACKGROUND,
          color: Colors.ERROR,
        }
      : getBidDetails();

  return (
    <Center>
      <CustomText zIndex={11} color={bidStatus?.color}>
        {bidStatus?.text}
      </CustomText>
    </Center>
  );
};

export default SectionBidLabelV2;
