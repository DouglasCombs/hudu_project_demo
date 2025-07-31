import React, {memo} from 'react';
import {TimeLeftLabel, CustomText} from '~/components';
import {fontSize} from '~/utils/style';

const SectionTimeLeft = ({data}: {data: any}) => {
  return (
    <>
      {data?.projectStatus === 'BIDDING' ||
      data?.projectStatus === 'WAITING' ? (
        <TimeLeftLabel
          {...{time: data?.projectDeadLine, type: 'projectDetails'}}
        />
      ) : (
        <CustomText fontSize={fontSize.medium}>-</CustomText>
      )}
    </>
  );
};

export default memo(SectionTimeLeft);
