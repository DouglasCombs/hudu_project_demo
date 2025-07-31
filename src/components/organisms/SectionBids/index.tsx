import {HStack} from 'native-base';
import React, {memo} from 'react';
import {SectionBidAmountLabel, CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontSize as fs} from '~/utils/style';

const SectionBids = ({
  projectStatus,
  listerId,
  currentLowBid,
}: {
  projectStatus: string;
  listerId: number;
  currentLowBid?: any;
}) => {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <SectionBidAmountLabel
        {...{
          listerId,
          projectStatus,
          fontSize: fs.medium,
          currentLowBid,
        }}
      />
      {currentLowBid && currentLowBid > 0 ? (
        <CustomText fontSize={fs.medium} color={Colors.PRIMARY}>
          {currentLowBid && currentLowBid > 0
            ? `$${Number(currentLowBid)?.toFixed(2)}`
            : ''}
        </CustomText>
      ) : (
        <></>
      )}
    </HStack>
  );
};

export default memo(SectionBids);
