import React, {memo} from 'react';
import {HStack} from 'native-base';
import {getAvailabilityTitle} from '~/utils/helper';
import {fontSize} from '~/utils/style';
import dayjs from 'dayjs';
import {CustomText} from '~/components';

const SectionAvailability = ({data}: {data: any}) => {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <CustomText fontSize={fontSize.medium}>
        {getAvailabilityTitle(data?.availability)}
      </CustomText>
      {data?.availability === 'SPECIFIC_TIME' && (
        <CustomText fontSize={fontSize.medium}>
          {dayjs(data?.duration).format('MM/DD/YYYY - hh:mm A')}
        </CustomText>
      )}
    </HStack>
  );
};

export default memo(SectionAvailability);
