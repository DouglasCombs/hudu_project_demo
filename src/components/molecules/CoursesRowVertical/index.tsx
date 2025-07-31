import {Box, Center, HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {
  CustomImage,
  CustomPercentBar,
  CustomText,
  CustomTouchable,
} from '~/components';
import {useIsMyCourses} from '~/hooks/course';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {
  fontFamily,
  fontSize,
  myCourseWidthVertical,
  verticalScale,
  width,
} from '~/utils/style';

const CoursesRowVertical = ({item}: {item}) => {
  const imageSource = item?.mediaUrl;
  const {t} = useTranslation();

  const {isLoading, mutate} = useIsMyCourses();
  const {userData} = userDataStore();

  const onPressHandler = () => {
    const options = {
      where: {
        and: [
          {courseId: {eq: item?.id}},
          {
            userId: {eq: userData?.id},
          },
        ],
      },
    };

    mutate(options, {
      onSuccess: successData => {
        navigate('CourseDetails', {
          courseId: item?.id,
          id:
            successData?.userCourse_getUserCourses?.result?.items?.[0] || null,
        });
      },
    });
  };

  const isFree = item?.isFree;
  return (
    <Box
      mx="4"
      maxWidth={width * 0.92}
      mb="16px"
      bg={Colors.WHITE}
      shadow="4"
      w={myCourseWidthVertical}
      mr="16px">
      <CustomTouchable style={styles.container} onPress={onPressHandler}>
        {isLoading ? (
          <Center
            position={'absolute'}
            zIndex={1000}
            bg={Colors.WHITE_TRANSPARENT}
            width="100%"
            height="100%">
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </Center>
        ) : null}
        <CustomImage
          resizeMode="cover"
          imageSource={imageSource}
          style={styles.image}
        />
        <VStack rounded="sm" p="16px" space="2">
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <CustomText
              color={Colors.RegalBlue}
              numberOfLines={1}
              fontSize={fontSize.xNormal}>
              {item?.title}
            </CustomText>
            {isFree ? null : (
              <CustomText
                color={Colors.PRIMARY}
                numberOfLines={1}
                fontSize={fontSize.xNormal}>
                ${item?.price}
              </CustomText>
            )}
          </HStack>
          <CustomText color={Colors.Topaz} fontSize={fontSize.small}>
            {item?.slides?.length} {t('courses.slides')}
          </CustomText>

          <CustomText
            color={Colors.PRIMARY}
            numberOfLines={1}
            fontFamily={fontFamily.bold}
            fontSize={fontSize.xTiny}>
            {isFree ? t('courses.startForFree') : t('courses.purchase')}
          </CustomText>
        </VStack>
      </CustomTouchable>
    </Box>
  );
};

export default CoursesRowVertical;

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
