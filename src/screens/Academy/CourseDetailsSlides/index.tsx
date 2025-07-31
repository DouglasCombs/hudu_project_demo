import {Center, HStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomButton,
  CustomContainer,
  CustomText,
  EmptyData,
  HorizontalSwiper,
  ScreensHeader,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {useGetCourse, useGetUserCourses, useReadSlide} from '~/hooks/course';
import {goBack, navigate, replace} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';

const CourseDetailsSlidesScreen = ({route}: {route: any}) => {
  const courseId = route?.params?.courseId;
  const id = route?.params?.id;

  const {userData} = userDataStore();
  const {t} = useTranslation();

  const {isLoading: getCourseLoading, data: getCourseData} =
    useGetCourse(courseId);
  const {isLoading: isLoadingReadSlide, mutate: mutateReadSlide} =
    useReadSlide();
  const options =
    id !== undefined || id !== null
      ? {
          where: {
            and: [
              {courseId: {eq: courseId}},
              {
                userId: {eq: userData?.id},
              },
            ],
          },
        }
      : {
          where: {
            id: {eq: id},
          },
        };
  const {isLoading: getUserCourseLoading, data: getUserCourseData} =
    useGetUserCourses(options);
  const userCourseId = getUserCourseData?.pages?.[0]?.id;
  const isFinishedCourse =
    getUserCourseData?.pages?.[0]?.status === 'COMPLETED';
  const [currentSlide, setCurrentSlide] = useState(1);

  const course = getCourseData?.course_getCourse?.result;
  const courseSlides = course?.slides || [];
  const ref = useRef();

  const prevPress = () => {
    if (ref?.current?.getCurrentIndex?.() > 0) {
      ref?.current?.scrollToIndex({
        index: ref?.current?.getCurrentIndex?.() - 1,
      });
      setCurrentSlide(prev => prev - 1);
    } else {
      goBack();
    }
  };
  const nextPress = () => {
    if (isFinishedCourse) {
      if (ref?.current?.getCurrentIndex?.() < courseSlides?.length - 1) {
        ref?.current?.scrollToIndex({
          index: ref?.current?.getCurrentIndex?.() + 1,
        });
        setCurrentSlide(prev => prev + 1);
      } else {
        replace('MainTabs', {screen: 'AcademyTab'});
      }
    } else {
      const input = {
        userCourseId,
        slideId: courseSlides?.[ref?.current?.getCurrentIndex?.()]?.id,
      };
      mutateReadSlide(input, {
        onSuccess: success => {
          queryClient.invalidateQueries(queryKeys.getUserCourses);

          if (
            success?.userCourse_readSlide?.status === ResponseStatus.Success
          ) {
            if (ref?.current?.getCurrentIndex?.() < courseSlides?.length - 1) {
              ref?.current?.scrollToIndex({
                index: ref?.current?.getCurrentIndex?.() + 1,
              });
              setCurrentSlide(prev => prev + 1);
            } else {
              navigate('FinalExam', {courseId, id});
            }
          }
        },
      });
    }
  };

  const loading = getCourseLoading || getUserCourseLoading;

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader
        backAction
        title={t('courses.courseDetails')}
        rightHeader={
          <Center
            bg={Colors.CornflowerBlue}
            px="3"
            py="1"
            borderRadius={'full'}>
            <CustomText color={Colors.WHITE}>
              {currentSlide}/{courseSlides?.length}
            </CustomText>
          </Center>
        }
      />

      {loading ? (
        <EmptyData />
      ) : (
        <>
          <HorizontalSwiper data={courseSlides} {...{course}} ref={ref} />
          <HStack
            pb={isAndroid && '4'}
            justifyContent={'space-between'}
            alignItems={'center'}
            px="4">
            <CustomButton
              width={'47%'}
              color={Colors.Solitude}
              textColor={Colors.Topaz}
              onPress={prevPress}
              disabled={isLoadingReadSlide}
              title={t('courses.back')}
            />
            <CustomButton
              width={'47%'}
              color={Colors.Rhino}
              onPress={nextPress}
              loading={isLoadingReadSlide}
              disabled={isLoadingReadSlide}
              title={t('courses.next')}
            />
          </HStack>
        </>
      )}
    </CustomContainer>
  );
};

export default CourseDetailsSlidesScreen;
