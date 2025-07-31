import React from 'react';
import {HStack} from 'native-base';
import {ProjectRemainedTime, SectionBidAmount} from '~/components';
import {getProjectColor} from '~/utils/helper';
import dayjs from 'dayjs';

type Props = {
  projectDeadLine: any;
  userId: number;
  currentLowBid: any;
  position?: 'absolute' | 'relative';
  bottom?: number | string;
};

export default function RemainedTimeSection({
  projectDeadLine,
  userId,
  currentLowBid,
  position,
  bottom,
}: Props) {
  const date1 = dayjs(projectDeadLine);
  const current = dayjs();
  const deadLine = date1.diff(current, 'millisecond', true);

  if (deadLine <= 0) {
    return null;
  }

  return (
    <HStack
      bottom={bottom}
      position={position}
      w="70%"
      mx="16px"
      mb="8px"
      bg={getProjectColor(projectDeadLine).backgroundColor}
      px="16px"
      py="12px"
      space="16px"
      rounded="8px"
      justifyContent="space-between"
      alignItems="center">
      <ProjectRemainedTime time={projectDeadLine} />
      <SectionBidAmount listerId={userId} currentLowBid={currentLowBid} />
    </HStack>
  );
}
