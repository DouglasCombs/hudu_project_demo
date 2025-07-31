import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {HStack, VStack, Box, Spinner} from 'native-base';
import {CustomImage, CustomText} from '~/components';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {scale, fontSize, fontFamily} from '~/utils/style';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import images from '~/assets/images';
import {HuduSupport} from '~/assets/icons';

export default function ListItemMessageContent({
  item,
  cancelOnPress,
  userImage,
  isChatWithAdmin,
}: {
  item: any;
  cancelOnPress?: any;
  userImage?: string;
  isChatWithAdmin?: boolean;
}) {
  const {userData} = userDataStore();

  const ownMessage = item?.senderId === userData.id;
  const uri = item?.photoUrl;
  const imageSource = item?.local ? {uri: item?.photoUrl} : uri;

  const cancelHandler = () => {
    cancelOnPress?.(item);
  };

  if (item === undefined) {
    return <></>;
  }

  return (
    <HStack justifyContent={ownMessage ? 'flex-end' : 'flex-start'}>
      <HStack space="2" maxW="70%" alignItems="center">
        {!ownMessage && userImage && (
          <CustomImage
            errorImage={images.avatarErrorImage}
            imageSource={userImage}
            style={styles.miniAvatar}
          />
        )}
        <VStack space="1">
          <HStack space="4px" alignItems="flex-end">
            {!ownMessage && isChatWithAdmin && <HuduSupport />}
            <VStack
              px="16px"
              py="8px"
              borderTopRadius="lg"
              borderBottomLeftRadius={ownMessage ? 'lg' : undefined}
              borderBottomRightRadius={ownMessage ? undefined : 'lg'}
              bg={ownMessage ? Colors.Rhino : Colors.SEARCH_BACKGROUND}>
              {item?.messageType === 'TEXT' && (
                <CustomText
                  fontFamily={fontFamily.medium}
                  fontSize={fontSize.small}
                  color={ownMessage ? Colors.WHITE : Colors.SEMI_BLACK}
                  flex={1}>
                  {item?.text}
                </CustomText>
              )}
              {item?.messageType === 'PHOTO' && (
                <Fragment>
                  {item?.photoUrl ? (
                    <CustomImage
                      local={item?.local}
                      imageSource={imageSource}
                      style={styles.image}
                      zoomable
                      isLoading={item?.loading}
                      customIndicator={
                        <Box
                          w="100%"
                          h="100%"
                          bg={Colors.BLACK_TRANSPARENT_2}
                          flex={1}>
                          <Spinner
                            position="absolute"
                            alignSelf="center"
                            bottom="0"
                            top="0"
                            size={24}
                            color={Colors.PRIMARY}
                          />
                        </Box>
                      }
                      cancelOnPress={cancelHandler}
                    />
                  ) : null}
                </Fragment>
              )}
            </VStack>
          </HStack>
          <HStack
            ml={!ownMessage && isChatWithAdmin ? '28px' : '0'}
            justifyContent={ownMessage ? 'flex-end' : 'flex-start'}
            space="1"
            alignItems="center">
            {item?.loading && (
              <Ionicons
                name="ios-timer-outline"
                size={scale(14)}
                color={Colors.PLACEHOLDER}
              />
            )}
            <CustomText color={Colors.Topaz} fontSize={fontSize.xTiny}>
              {dayjs(item?.createdAt).format('hh:mm A')}
            </CustomText>
          </HStack>
        </VStack>
      </HStack>
    </HStack>
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    width: scale(120),
    height: scale(120),
  },
  miniAvatar: {
    height: 24,
    width: 24,
    borderRadius: 100,
  },
});
