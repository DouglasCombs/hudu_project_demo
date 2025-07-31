import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import {Box, Center, HStack, ScrollView, VStack} from 'native-base';
import React, {useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CourseDetailsPlaceholder,
  CustomButton,
  CustomContainer,
  CustomImage,
  CustomText,
  EmptyData,
  ScreensHeader,
  SectionTranslate,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {
  useGetCourse,
  useGetUserCourses,
  useReStartCourse,
  useStartFreeCourse,
  useStartPaidCourse,
} from '~/hooks/course';
import {
  useCreateEphemeralKeyMutation,
  useGetPublishableKey,
} from '~/hooks/payment';
import {navigate} from '~/navigation/Methods';
import {academyLangStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';
import {fontFamily, fontSize, width} from '~/utils/style';
import {
  showErrorMessage,
  showInfoMessage,
  showSuccessMessage,
} from '~/utils/utils';

const CourseDetails = ({route}: {route: any}) => {
  const courseId = route?.params?.courseId;
  const id = route?.params?.id;
  const {userData} = userDataStore(state => state);
  const {indexLang, setIndexLang} = academyLangStore(state => state);
  const [navigateLoading, setNavigateLoading] = useState(false);
  const {t} = useTranslation();

  const [descriptionTranslate, setDescriptionTranslate] = useState('');
  const [title, setTitle] = useState('');

  const onTranslate = async data => {
    setValue(data);
    setIndexLang(data?.id);
  };

  const {isLoading: getCourseLoading, data: getCourseData} =
    useGetCourse(courseId);
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

  const {isLoading: startCourseLoading, mutate: startCourseMutate} =
    useStartFreeCourse();
  const {isLoading: startPaidCourseLoading, mutate: startPAidCourseMutate} =
    useStartPaidCourse();
  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading: stripeLoading,
  } = usePaymentSheet();
  const {mutate: mutateEphemeralKey, isLoading: createEphemeralKeyLoading} =
    useCreateEphemeralKeyMutation();
  const {data: getPublishableKeyData, isLoading: isLoadingGetPublishableKey} =
    useGetPublishableKey();
  const {isLoading: isLoadingResetCourse, mutate: mutateResetCourse} =
    useReStartCourse();
  const result = getPublishableKeyData?.payment_getPublishableKey?.result;
  const course = getCourseData?.course_getCourse?.result;
  const courseTranslates = course?.courseTranslates;
  const translateData = useMemo(() => {
    return [
      {
        id: 0,
        title: 'English',
        value: 'en',
        disabled: false,
      },
      {
        id: 1,
        title: 'Spanish',
        value: 'es',
        disabled: course?.spanishTranslateStatus !== 'PUBLISHED',
      },
    ];
  }, [course]);

  const [value, setValue] = useState(translateData?.[0]);

  const isUserCourse = getUserCourseData?.pages?.length > 0;

  useEffect(() => {
    setValue(translateData?.[indexLang]);
  }, [translateData, indexLang, setIndexLang]);

  useEffect(() => {
    if (course?.spanishTranslateStatus !== 'PUBLISHED') {
      setValue(translateData?.[0]);
    }
  }, [course]);

  useEffect(() => {
    setDescriptionTranslate(course?.description);
    setTitle(course?.title);
  }, [course]);

  const onPayCourse = async (ephemeralKey: any, clientSecretKey: any) => {
    const clientSecret = clientSecretKey ?? '';

    const {error: initPaymentError} = await initPaymentSheet({
      customerId: userData?.stripeCustomerId,
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'HUDU Inc.',
      allowsDelayedPaymentMethods: true,
      customerEphemeralKeySecret: ephemeralKey,
    });

    if (initPaymentError) {
      showErrorMessage(initPaymentError?.message);
    } else {
      const {error: paymentError} = await presentPaymentSheet();

      if (paymentError) {
        showErrorMessage(paymentError?.message);
      } else {
        queryClient.invalidateQueries(queryKeys.getUserCourses);
        showSuccessMessage(t('messages.paymentSuccessfully'));
        setNavigateLoading(true);
        setTimeout(() => {
          setNavigateLoading(false);

          navigate('CourseDetailsSlides', {courseId, id});
        }, 3000);
      }
    }
  };

  const paymentOnPress = async (clientSecretKey: any) => {
    mutateEphemeralKey(
      {},
      {
        onSuccess: successData => {
          if (
            successData?.payment_createEphemeralKey?.status ===
            ResponseStatus.Success
          ) {
            const ephemeralKey =
              successData?.payment_createEphemeralKey?.result?.secret;
            onPayCourse(ephemeralKey, clientSecretKey);
          }
        },
      },
    );
  };

  const startCourseFunc = () => {
    if (
      course?.slides?.length > 0 &&
      course?.exam?.courseQuestions?.length > 0
    ) {
      if (isUserCourse) {
        mutateResetCourse({courseId});

        navigate('CourseDetailsSlides', {courseId, id});
      } else {
        if (course?.isFree) {
          startCourseMutate(
            {courseId: parseInt(courseId)},
            {
              onSuccess: successData => {
                queryClient.invalidateQueries(queryKeys.getUserCourses);
                if (
                  successData?.userCourse_startFreeCourse?.status ===
                  ResponseStatus.Success
                ) {
                  navigate('CourseDetailsSlides', {courseId, id});
                } else if (
                  successData?.userCourse_startFreeCourse?.status ===
                  'ALREADY_EXIST'
                ) {
                  navigate('CourseDetailsSlides', {courseId, id});
                }
              },
            },
          );
        } else {
          startPAidCourseMutate(
            {courseId: parseInt(courseId)},
            {
              onSuccess: successData => {
                if (
                  successData?.userCourse_startPaidCourse?.status ===
                  ResponseStatus.Success
                ) {
                  paymentOnPress(
                    successData?.userCourse_startPaidCourse?.result,
                  );
                }
                queryClient.invalidateQueries(queryKeys.getUserCourses);
              },
            },
          );
        }
      }
    } else {
      showInfoMessage('There is no slide or exam!');
    }
  };

  const loadingGet = getCourseLoading || getUserCourseLoading;
  const loading = stripeLoading || createEphemeralKeyLoading;

  return (
    <CustomContainer isLoading={navigateLoading}>
      <ScreensHeader
        backAction
        title={t('courses.courseDetails')}
        rightHeader={
          <SectionTranslate
            value={value}
            onChange={onTranslate}
            data={translateData}
            showChevronIcon
            titleColor={Colors.PRIMARY}
            flex={0}
            showSelectedValue
          />
        }
      />

      {loadingGet ? (
        <CourseDetailsPlaceholder />
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            <VStack space="4">
              <CustomImage
                style={{
                  width: width,
                  height: width * 0.56,
                }}
                resizeMode="contain"
                imageSource={course?.mediaUrl}
              />
              <VStack px="4" space="4">
                <CustomText color={Colors.Topaz} fontSize={fontSize.xNormal}>
                  {course?.slides?.length} {t('courses.slides')}
                </CustomText>
                <HStack space="2">
                  <Center
                    px="8px"
                    py="4px"
                    borderRadius="sm"
                    bg={Colors.SlateBlue}>
                    <CustomText
                      color={Colors.WHITE_F}
                      fontSize={fontSize.xTiny}
                      fontFamily={fontFamily.medium}
                      numberOfLines={1}>
                      En
                    </CustomText>
                  </Center>

                  {course?.spanishTranslateStatus === 'PUBLISHED' ? (
                    <Center
                      px="8px"
                      py="4px"
                      borderRadius="sm"
                      bg={Colors.SlateBlue}>
                      <CustomText
                        color={Colors.WHITE_F}
                        fontSize={fontSize.xTiny}
                        fontFamily={fontFamily.medium}
                        numberOfLines={1}>
                        Es
                      </CustomText>
                    </Center>
                  ) : null}
                </HStack>
                <CustomText
                  color={Colors.BLACK}
                  fontFamily={fontFamily.bold}
                  fontSize={fontSize.xMedium}>
                  {value?.value === 'es'
                    ? courseTranslates?.[0]?.title
                    : course?.title}
                </CustomText>

                <CustomText
                  color={Colors.BLACK}
                  fontFamily={fontFamily.light}
                  fontSize={fontSize.xNormal}>
                  {value?.value === 'es'
                    ? courseTranslates?.[0]?.content
                    : course?.description}
                </CustomText>
              </VStack>
            </VStack>
          </ScrollView>
          <Box pb={isAndroid && '4'} px="4">
            <StripeProvider
              merchantIdentifier="merchant.com.hudu"
              publishableKey={result?.publishableKey}>
              <CustomButton
                onPress={startCourseFunc}
                loading={
                  startCourseLoading || startPaidCourseLoading || loading
                }
                title={
                  isUserCourse
                    ? t('courses.startCourse')
                    : `${t('courses.startCourse')} | $${course?.price}`
                }
              />
            </StripeProvider>
          </Box>
        </>
      )}
    </CustomContainer>
  );
};

export default CourseDetails;

// if (data?.value === 'es' || data?.value === 'en') {
//   const input = {
//     text: descriptionTranslate,
//     fromLanguage: '',
//     toLanguage: data?.value,
//   };

//   translatorDescription(input, {
//     onSuccess: successData => {
//       if (
//         successData?.translator_translate?.status === ResponseStatus.Success
//       ) {
//         if (
//           data?.value === 'en' &&
//           onlyLettersAndNumbers(descriptionTranslate)
//         ) {
//           setDescriptionTranslate(course?.description);
//         } else {
//           setDescriptionTranslate(
//             successData?.translator_translate?.result,
//           );
//         }
//       }
//     },
//   });

//   const input1 = {
//     text: title,
//     fromLanguage: '',
//     toLanguage: data?.value,
//   };

//   translatorTitle(input1, {
//     onSuccess: successData => {
//       if (
//         successData?.translator_translate?.status === ResponseStatus.Success
//       ) {
//         if (data?.value === 'en' && onlyLettersAndNumbers(title)) {
//           setTitle(course?.title);
//         } else {
//           setTitle(successData?.translator_translate?.result);
//         }
//       }
//     },
//   });
// } else {
//   setTitle(course?.title);
//   setDescriptionTranslate(course?.description);
// }
