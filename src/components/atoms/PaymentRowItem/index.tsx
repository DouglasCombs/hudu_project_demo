import {HStack} from 'native-base';
import React from 'react';
import {Colors} from '~/styles';
import {fontFamily} from '~/utils/style';
import {CustomText} from '~/components';

const PaymentRowItem = ({title, value}: {title: string; value: any}) => {
  return (
    <HStack space="2" alignItems="center" justifyContent="space-between">
      <CustomText color={Colors.PLACEHOLDER2}>{title}</CustomText>
      <CustomText color={Colors.PRIMARY} fontFamily={fontFamily.medium}>
        {value}
      </CustomText>
    </HStack>
  );
};

export default PaymentRowItem;
