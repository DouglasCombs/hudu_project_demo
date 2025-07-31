import React from 'react';
import {HStack, VStack} from 'native-base';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontSize, fontFamily} from '~/utils/style';
import {useTranslation} from 'react-i18next';

export default function CustomPercentBar({
  percentage = 0,
  status,
}: {
  percentage?: number;
  status: string;
}) {
  const {t} = useTranslation();

  if (status === 'FAILED') {
    return (
      <VStack space="1">
        <HStack h="5px" rounded="full" w="100%" bg={Colors.SEARCH_BACKGROUND}>
          <HStack
            rounded="full"
            h="100%"
            w={`${100}%`}
            bg={Colors.TIME_LEFT_RED_BACKGROUND}
          />
        </HStack>
        <CustomText
          fontFamily={fontFamily.medium}
          fontSize={fontSize.xTiny}
          color={Colors.TIME_LEFT_RED_BACKGROUND}>{`${t(
          'common.Failed',
        )}`}</CustomText>
      </VStack>
    );
  }
  if (status === 'COMPLETED') {
    return (
      <VStack space="1">
        <HStack h="5px" rounded="full" w="100%" bg={Colors.SEARCH_BACKGROUND}>
          <HStack rounded="full" h="100%" w={`${100}%`} bg={Colors.LimeGreen} />
        </HStack>
        <CustomText
          fontFamily={fontFamily.medium}
          fontSize={fontSize.xTiny}
          color={Colors.LimeGreen}>{`${t('common.Successful')}`}</CustomText>
      </VStack>
    );
  }
  return (
    <VStack space="1">
      <HStack h="5px" rounded="full" w="100%" bg={Colors.SEARCH_BACKGROUND}>
        <HStack
          rounded="full"
          h="100%"
          w={`${percentage}%`}
          bg={Colors.LimeGreen}
        />
      </HStack>
      <CustomText
        fontFamily={fontFamily.medium}
        fontSize={fontSize.xTiny}
        color={Colors.Topaz}>{`${percentage}% ${t(
        'common.complete',
      )}`}</CustomText>
    </VStack>
  );
}
