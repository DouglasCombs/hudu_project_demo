import {VStack} from 'native-base';
import React from 'react';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function SectionQuestions({data}: {data: any}) {
  return (
    <VStack space="16px" mt="16px">
      {data?.map((el: any, idx: number) => {
        return (
          <VStack space="4px" key={`question${idx}`}>
            <CustomText color={Colors.Topaz} fontSize={fontSize.small}>
              {el?.question}
            </CustomText>
            <CustomText fontSize={fontSize.small}>{el?.answer}</CustomText>
          </VStack>
        );
      })}
    </VStack>
  );
}
