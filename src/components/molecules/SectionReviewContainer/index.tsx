import React from 'react';
import {Colors} from '~/styles';
import {Flex, VStack} from 'native-base';

export default function SectionReviewContainer({children}: ReactChildren) {
  return (
    <Flex py="8" bg={Colors.WHITE} shadow={0}>
      <VStack shadow="4" overflow="hidden" borderRadius={12} bg={Colors.WHITE}>
        {children}
      </VStack>
    </Flex>
  );
}
