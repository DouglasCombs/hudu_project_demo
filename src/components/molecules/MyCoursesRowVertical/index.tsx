import {Box, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  CustomImage,
  CustomPercentBar,
  CustomText,
  CustomTouchable,
} from '~/components';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {
  fontFamily,
  fontSize,
  myCourseWidthVertical,
  verticalScale,
  width,
} from '~/utils/style';

type Props = {
  item: any;
};

const MyCoursesRowVertical = ({item}: Props) => {
  const imageSource = item?.course?.mediaUrl;

  const onPressHandler = () => {
    navigate('CourseDetails', {id: item?.id, courseId: item?.course?.id});
  };

  return (
    <Box
      mx="4"
      mb="16px"
      bg={Colors.WHITE}
      shadow="4"
      w={myCourseWidthVertical}
      maxWidth={width * 0.92}
      // mr="16px"
    >
      <CustomTouchable style={styles.container} onPress={onPressHandler}>
        <CustomImage
          resizeMode="cover"
          imageSource={imageSource}
          style={styles.image}
        />
        <VStack rounded="sm" p="16px" space="16px">
          <CustomText
            color={Colors.RegalBlue}
            numberOfLines={1}
            fontSize={fontSize.xNormal}>
            {item?.course?.title}
          </CustomText>
          <CustomText
            color={Colors.PRIMARY}
            numberOfLines={1}
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xTiny}>
            {item?.course?.category?.text}
          </CustomText>
          <CustomPercentBar
            status={item?.status}
            percentage={item?.completedPercent}
          />
        </VStack>
      </CustomTouchable>
    </Box>
  );
};

export default MyCoursesRowVertical;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(138),
    borderRadius: 4,
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    width: '100%',
  },
});
