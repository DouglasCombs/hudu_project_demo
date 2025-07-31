import {Box, VStack, View} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {SorryIcon} from '~/assets/icons';
import {CustomButton, CustomText, ModalContainer} from '~/components';
import {useIsMyCourses, useReStartCourse} from '~/hooks/course';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';

export default function FailedExamModal({
  visible,
  onClose,
  courseId,
}: {
  visible: boolean;
  onClose: () => void;
  courseId: number;
}) {
  const {t} = useTranslation();

  const {isLoading, mutate} = useIsMyCourses();
  const {isLoading: isLoadingResetCourse, mutate: mutateResetCourse} =
    useReStartCourse();

  const {userData} = userDataStore();

  const onPressHandler = () => {
    const options = {
      where: {
        and: [
          {courseId: {eq: courseId}},
          {
            userId: {eq: userData?.id},
          },
        ],
      },
    };
    mutateResetCourse({courseId});

    mutate(options, {
      onSuccess: successData => {
        navigate('CourseDetails', {
          courseId: courseId,
          id:
            successData?.userCourse_getUserCourses?.result?.items?.[0] || null,
        });
      },
    });
  };

  return (
    <ModalContainer
      // onClose={onClose}
      useBody={false}
      style={styles.modal}
      justify="flex-end"
      backdropColor={Colors.BLACK_TRANSPARENT_2}
      isVisible={visible}>
      <VStack
        space="8"
        bg={Colors.WHITE_F}
        rounded="lg"
        py="16px"
        w="100%"
        mb="58px">
        <View
          alignSelf={'center'}
          h="1"
          bg={Colors.Ghost}
          w="15%"
          borderRadius="full"
        />
        <VStack space="16" alignItems={'center'} justifyContent={'center'}>
          {/* <Lottie
            style={styles.lottie}
            source={animations.congratulation}
            loop={true}
            autoPlay
            speed={1}
            // autoSize
          /> */}
          <SorryIcon />
          <VStack alignItems={'center'} justifyContent={'center'} space="2">
            <CustomText
              fontFamily={fontFamily.regular}
              fontSize={fontSize.medium}
              color={Colors.TIME_LEFT_RED_BACKGROUND}>
              {t('courses.sorry')}
            </CustomText>
            <CustomText
              fontFamily={fontFamily.regular}
              fontSize={fontSize.normal}>
              {t('courses.youFailedExam')}
            </CustomText>
          </VStack>

          <Box px="4" w="100%">
            <CustomButton
              height={verticalScale(35)}
              loading={isLoading || isLoadingResetCourse}
              title={t('courses.startAgain')}
              onPress={onPressHandler}
            />
          </Box>
        </VStack>
      </VStack>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(183),
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  modal: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  lottie: {height: scale(370), width: scale(370)},
});
