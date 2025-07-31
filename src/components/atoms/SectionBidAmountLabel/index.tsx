import React from 'react';
import {fontSize as fs} from '~/utils/style';
import {userDataStore} from '~/stores';
import {ProjectStatus} from '~/generated/graphql';
import {CustomText} from '~/components';

const SectionBidAmountLabel = ({
  projectStatus,
  listerId,
  fontSize = fs.normal,
  currentLowBid,
}: {
  projectStatus: string;
  listerId: number;
  fontSize?: number;
  currentLowBid?: any;
}) => {
  const {userData} = userDataStore(state => state);
  const isFinished = projectStatus === ProjectStatus.Finished;
  const isInProgress = projectStatus === ProjectStatus.InProgress;
  const isLister = listerId === userData?.id;

  return (
    <CustomText fontSize={fontSize}>
      {currentLowBid && currentLowBid > 0
        ? isFinished || isInProgress
          ? 'Awarded bid'
          : 'Current low bid'
        : isLister
        ? 'No bids yet'
        : 'Be the first one to bid'}
    </CustomText>
  );
};

export default SectionBidAmountLabel;
