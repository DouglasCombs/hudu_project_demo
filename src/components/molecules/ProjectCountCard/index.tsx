import React from 'react';
import {HStack, VStack} from 'native-base';
import {Colors} from '~/styles';
import {CustomText, CustomTouchable} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';

const ProjectCountCard = ({
  icon,
  title,
  count,
  onPress = () => {},
}: {
  icon: JSX.Element;
  title: any;
  count: number;
  onPress?: () => void;
}) => {
  return (
    <CustomTouchable onPress={onPress}>
      <HStack
        p="4"
        my="2"
        justifyContent={'center'}
        alignItems={'center'}
        bg={Colors.WHITE}
        shadow={'2'}
        borderRadius={'md'}>
        <VStack
          justifyContent={'center'}
          alignItems={'center'}
          bg={Colors.SECONDARY}
          borderRadius={'full'}
          w="48px"
          h="48px">
          {icon}
        </VStack>
        <CustomText
          flex={1}
          marginHorizontal={10}
          fontFamily={fontFamily.medium}
          color={Colors.Rhino}
          fontSize={fontSize.xNormal}>
          {title}
        </CustomText>
        <VStack
          bg={Colors.SEARCH_BACKGROUND}
          borderRadius={'full'}
          w="25px"
          h="25px"
          justifyContent={'center'}
          alignItems={'center'}>
          <CustomText
            fontFamily={fontFamily.medium}
            color={Colors.Rhino}
            fontSize={fontSize.small}>
            {count}
          </CustomText>
        </VStack>
      </HStack>
    </CustomTouchable>
  );
};

export default ProjectCountCard;
