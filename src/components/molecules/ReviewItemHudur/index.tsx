import React from 'react';
import {VStack, HStack} from 'native-base';
import {RatingStar, CustomText} from '~/components';
import {fontSize, scale} from '~/utils/style';
import {Colors} from '~/styles';

const ReviewItemHudur = ({item}: {item: any}) => {
  return (
    <VStack
      space="2"
      px="4"
      py="4"
      borderRadius="lg"
      shadow="2"
      bg={Colors.WHITE}>
      <HStack space="1">
        <CustomText flex={1} fontSize={fontSize.tiny}>
          {item?.lister?.userName
            ? item?.lister?.isDeletedAccount === false
              ? item?.lister?.userName
              : 'Accounts deleted'
            : 'Lister'}
          {': '}
          {item?.listersComment ? (
            <CustomText
              marginHorizontal={scale(8)}
              flex={1}
              fontSize={fontSize.tiny}
              color={Colors.PLACEHOLDER}>
              {item?.listersComment}
            </CustomText>
          ) : (
            <></>
          )}
        </CustomText>
        <HStack mt="3px">
          <RatingStar
            rate={item?.listersRate}
            showRating="right"
            disabled
            size={12}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ReviewItemHudur;
