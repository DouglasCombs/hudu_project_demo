import {HStack} from 'native-base';
import React from 'react';
import {CustomText} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';

const BidsHeaderTitle = ({title}: {title: any}) => {
  return (
    <HStack flex={1} py="16px">
      <CustomText fontFamily={fontFamily.medium} fontSize={fontSize.medium}>
        {title}
      </CustomText>
    </HStack>
  );
};

export default BidsHeaderTitle;
