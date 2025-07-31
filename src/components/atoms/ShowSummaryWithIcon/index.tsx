import {HStack, VStack} from 'native-base';
import React from 'react';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

function ShowSummaryWithIcon({
  icon,
  title,
  data,
}: {
  icon: any;
  title: string;
  data: any;
}) {
  return (
    <HStack space="8px" alignItems="center" w="50%">
      <VStack
        borderRadius={'full'}
        bg={Colors.SEARCH_BACKGROUND}
        w="28px"
        h="28px"
        alignItems={'center'}
        justifyContent={'center'}>
        {icon}
      </VStack>
      <VStack>
        <CustomText fontSize={fontSize.xTiny} color={Colors.Topaz}>
          {title}
        </CustomText>
        <CustomText fontSize={fontSize.small} color={Colors.BLACK}>
          {data}
        </CustomText>
      </VStack>
    </HStack>
  );
}

export default ShowSummaryWithIcon;
