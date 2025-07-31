import {useDrawerStatus} from '@react-navigation/drawer';
import {Box, Circle, HStack, VStack} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import images from '~/assets/images';
import {CollapsibleProvider, CustomImage, CustomText} from '~/components';
import {toggleDrawer} from '~/navigation/Methods';
import {messagesStore} from '~/stores';
import {Colors} from '~/styles';
import {getDateFromNow} from '~/utils/helper';
import {fontFamily, fontSize, scale} from '~/utils/style';

const MessageItem = ({item}: {item: any}) => {
  const isDrawerOpen = useDrawerStatus() === 'open';

  const {user, setUser} = messagesStore(state => state);

  const onPressHandler = () => {
    setUser({
      id: item?.userId,
      imageAddress: item?.imageAddress,
    });
    toggleDrawer();
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPressHandler}>
      <HStack space="12px" alignItems="center" py="16px">
        <Box>
          <CustomImage
            imageSource={item?.imageAddress}
            style={styles.image}
            resizeMode="cover"
            errorImage={images.avatarErrorImage}
            errorText={item?.userName ?? item?.userEmail}
          />
          {user?.id === item?.userId && isDrawerOpen && (
            <CollapsibleProvider
              style={styles.circle}
              visible={user?.id === item?.userId && isDrawerOpen}>
              <Circle size="12px" bg={Colors.PRIMARY} />
            </CollapsibleProvider>
          )}
        </Box>
        <VStack flex={1} justifyContent="center">
          <CustomText
            fontFamily={fontFamily.medium}
            numberOfLines={1}
            fontSize={fontSize.xNormal}>
            {item?.userName}
          </CustomText>
          <CustomText
            color={Colors.Topaz}
            numberOfLines={1}
            fontSize={fontSize.xTiny}>
            {Array.isArray(item?.projectNames) ? projectNames.join(', ') : ''}
          </CustomText>
        </VStack>
        <CustomText
          color={Colors.Topaz}
          numberOfLines={1}
          fontSize={fontSize.xTiny}>
          {getDateFromNow(item?.latestMessageDate)}
        </CustomText>
      </HStack>
    </TouchableOpacity>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  image: {
    height: scale(56),
    width: scale(56),
    borderRadius: 100,
  },
  circle: {
    position: 'absolute',
    top: 26,
    right: -16,
  },
});

/* {item?.unreadCount === 0 && (
          <Center rounded="full" h="20px" w="20px" bg={Colors.FINISHED}>
            <CustomText color={Colors.WHITE} fontSize={fontSize.tiny}>
              {item?.unreadCount}
            </CustomText>
          </Center>
        )} */
