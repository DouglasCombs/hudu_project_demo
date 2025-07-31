import React from 'react';
import {Box, HStack, VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily} from '~/utils/style';
import {userDataStore} from '~/stores';
import {CustomText, RatingStar} from '~/components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {navigate} from '~/navigation/Methods';

const QuestionChildItem = ({item, listerId}: {item: any; listerId: number}) => {
  const {userData} = userDataStore(state => state);

  const curUser = userData?.id === item?.userId;
  const lister = listerId === item?.userId;

  const goToProfile = () => {
    navigate('HudurProfile', {userId: item?.userId, isLister: false});
  };

  return (
    <HStack space="4">
      <Box flex={0.1} />
      <VStack flex={1} px="4">
        <HStack flex={1} space="1">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goToProfile}
            style={styles.flex1}>
            <CustomText flex={1} fontFamily={fontFamily.medium}>
              {curUser
                ? 'you'
                : lister
                ? 'Lister'
                : item?.user?.userName
                ? item?.user?.isDeletedAccount === true
                  ? 'Deleted account'
                  : item?.user?.userName
                : 'user'}
            </CustomText>
          </TouchableOpacity>
          <RatingStar
            disabled
            rate={item?.user?.averageRate}
            showRating="right"
            size={12}
          />
        </HStack>
        {item?.text ? (
          <CustomText color={Colors.PLACEHOLDER}>{item?.text}</CustomText>
        ) : (
          <></>
        )}
      </VStack>
    </HStack>
  );
};

export default QuestionChildItem;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
