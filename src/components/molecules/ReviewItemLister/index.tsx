import React from 'react';
import {VStack, HStack} from 'native-base';
import {RatingStar, CustomText} from '~/components';
import {fontSize, scale} from '~/utils/style';
import {Colors} from '~/styles';

const ReviewItemLister = ({item}: {item: any}) => {
  return (
    <VStack space="2" p="4" borderRadius="lg" shadow="2" bg={Colors.WHITE}>
      <HStack space="1">
        <CustomText flex={1} fontSize={fontSize.tiny}>
          {item?.hudu?.userName
            ? item?.hudu?.isDeletedAccount === false
              ? item?.hudu?.userName
              : 'Accounts deleted'
            : 'Doer'}
          {': '}
          {item?.hudusComment ? (
            <CustomText
              marginHorizontal={scale(8)}
              flex={1}
              fontSize={fontSize.tiny}
              color={Colors.PLACEHOLDER}>
              {item?.hudusComment}
            </CustomText>
          ) : (
            <></>
          )}
        </CustomText>
        <HStack mt="3px">
          <RatingStar
            rate={item?.hudusRate}
            showRating="right"
            disabled
            size={12}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};

export default ReviewItemLister;
