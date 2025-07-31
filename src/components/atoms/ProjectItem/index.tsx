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
import {fontFamily, verticalScale} from '~/utils/style';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';

const ProjectItem = ({item}: {item?: any}) => {
  const {userData} = userDataStore(state => state);

  const isLister = userData?.id === item?.project?.userId;

  const onPressHandler = () => {
    navigate('ProjectDetails', {
      projectId: item?.project?.id,
      isDeepLinking: false,
    });
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
          <CustomText fontFamily={fontFamily.bold} numberOfLines={2}>
            {item?.project?.title}
          </CustomText>
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

export default ProjectItem;

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
