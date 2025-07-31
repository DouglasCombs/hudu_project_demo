import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Box, VStack, HStack} from 'native-base';
import {Colors} from '~/styles';
import {
  CustomImage,
  ProjectFavoriteIcon,
  TimeLeftLabel,
  SectionBidAmount,
  CustomText,
} from '~/components';
import {fontFamily, scale, verticalScale, fontSize as fs} from '~/utils/style';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';

const SearchProjectItem = ({
  item,
  userQuery,
}: {
  item?: any;
  userQuery?: any;
}) => {
  const {userData} = userDataStore(state => state);

  const isLister = userData?.id === item?.project?.userId;

  const onPressHandler = () => {
    navigate('ProjectDetails', {
      projectId: item?.project?.id,
      isDeepLinking: false,
    });
  };

  const getHighlightedText = (
    text: any,
    highlight: any,
    fontSize: number = fs.xTiny,
    numberOfLines: number = 1,
  ) => {
    const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <CustomText numberOfLines={numberOfLines} fontSize={fontSize}>
        {' '}
        {parts.map((part: any, i: number) => (
          <CustomText
            key={i}
            fontFamily={
              part.toLowerCase() === highlight?.toLowerCase()
                ? fontFamily.bold
                : fontFamily.regular
            }
            color={
              part.toLowerCase() === highlight?.toLowerCase()
                ? Colors.BLACK_3
                : Colors.PLACEHOLDER
            }>
            {part}
          </CustomText>
        ))}{' '}
      </CustomText>
    );
  };

  return (
    <Box
      w="48%"
      h={`${verticalScale(220)}px`}
      shadow="4"
      borderRadius="md"
      bg={Colors.WHITE}>
      <TouchableOpacity
        style={styles.flex1}
        activeOpacity={0.7}
        onPress={onPressHandler}>
        <CustomImage
          imageSource={item?.project?.projectImages?.[0]?.imageAddress}
          style={styles.image}
          resizeMode="cover">
          <VStack flex={1} justifyContent="space-between">
            <HStack w="100%" px="2" py="2">
              {!isLister && <ProjectFavoriteIcon {...{item}} />}
            </HStack>
            <TimeLeftLabel {...{time: item?.project?.projectDeadLine}} />
          </VStack>
        </CustomImage>

        <VStack py="2" px="2" space="2" flex={1}>
          {item?.project?.title &&
            getHighlightedText(item?.project?.title, userQuery, scale(14), 2)}
        </VStack>
        <SectionBidAmount
          {...{
            listerId: item?.project?.userId,
            currentLowBid: item?.currentLowBid,
          }}
        />
      </TouchableOpacity>
    </Box>
  );
};

export default SearchProjectItem;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(135),
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    overflow: 'hidden',
  },
  flex1: {
    flex: 1,
  },
});
