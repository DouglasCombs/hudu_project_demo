import {Box, Center, Divider, HStack} from 'native-base';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native';
import images from '~/assets/images';
import {
  CongratulationModal,
  CustomButton,
  CustomContainer,
  CustomFlatList,
  EmptyData,
  ExamItem,
  FailedExamModal,
  ScreensHeader,
  SectionTranslate,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';
import {useGetCourse, useGetUserCourses} from '~/hooks/course';
import {useFinishExam, useGetCourseQuestions} from '~/hooks/exam';
import {navigate, replace} from '~/navigation/Methods';
import {academyLangStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';
import {height, width} from '~/utils/style';
import {showErrorMessage, showInfoMessage} from '~/utils/utils';

function removeObjectWithId(arr, id) {
  const objWithIdIndex = arr.findIndex(obj => obj.parentId === id);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
}

const FinalExamScreen = ({route}: {route: any}) => {
  const courseId = route?.params?.courseId;
  const id = route?.params?.id;

  const {t} = useTranslation();
  const {userData} = userDataStore();

  const [ids, setIds] = useState<Array<any>>([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [isFailedModal, setIsFailedModal] = useState(false);

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

  const {isLoading: isLoadingFinishExam, mutate} = useFinishExam();
  const {isLoading: getUserCourseLoading, data: getUserCourseData} =
    useGetUserCourses(options);

  const {isLoading: getCourseLoading, data: getCourseData} =
    useGetCourse(courseId);
  const userCourseId = getUserCourseData?.pages?.[0]?.id;
  const course = getCourseData?.course_getCourse?.result;

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
  const {indexLang, setIndexLang} = academyLangStore(state => state);

  const [value, setValue] = useState(translateData?.[0]);

  useEffect(() => {
    setValue(translateData?.[indexLang]);
  }, [translateData, indexLang, setIndexLang]);

  useEffect(() => {
    if (course?.spanishTranslateStatus !== 'PUBLISHED') {
      setValue(translateData?.[0]);
    }
  }, [course]);

  const {isLoading, data: getExams} = useGetCourseQuestions({
    where: {
      exam: {
        courseId: {
          eq: courseId,
        },
      },
    },
  });

  const exams = getExams?.pages || [];

  const onTranslate = async data => {
    setValue(data);
    setIndexLang(data?.id);
  };

  const selectAnswer = useCallback(
    (parentId: number, id: number) => {
      let tempIDS = ids;

      if (tempIDS?.find?.(el => el?.parentId === parentId)) {
        tempIDS = removeObjectWithId(tempIDS, parentId);
      }

      tempIDS?.push({
        parentId,
        id,
      });

      setIds(tempIDS);
    },
    [exams, ids],
  );

  const onFinishExam = () => {
    if (ids?.length === exams?.length) {
      const input = {
        userCourseId,
        courseQuestionAnswersIds: ids?.map(el => el?.id),
      };

      mutate(input, {
        onSuccess: success => {
          queryClient.invalidateQueries(queryKeys.getUserCourses);

          if (success?.userCourse_finishExam?.result?.status === 'COMPLETED') {
            setVisibleModal(true);
          } else if (
            success?.userCourse_finishExam?.result?.status === 'FAILED'
          ) {
            setIsFailedModal(true);
          } else {
            showErrorMessage(success?.userCourse_finishExam?.status);
          }
        },
      });
    } else {
      showInfoMessage('Please answer all questions!');
    }
  };

  const onClaim = () => {
    setVisibleModal(false);
    replace('MainTabs', {screen: 'ProfileTab'});
  };

  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => {
      return (
        <ExamItem onPressAnswer={selectAnswer} {...{item, index, value}} />
      );
    },
    [exams, selectAnswer, value, setValue],
  );

  return (
    <CustomContainer isLoading={isLoadingFinishExam}>
      <ScreensHeader
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
        backAction
        title={t('courses.finalExam')}
      />

      <CustomFlatList
        data={exams}
        flex={1}
        listEmptyComponent={<EmptyData />}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        isLoading={isLoading || getUserCourseLoading}
        renderItem={renderItem}
        itemSeparatorComponent={<Divider h="7" bg={Colors.WHITE} />}
        listHeaderComponent={
          exams?.length > 0 ? (
            <HStack px="4" my="4" py="2" w={width} h={height * 0.2}>
              <Image
                source={images.finalExam}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 10,
                }}
              />
            </HStack>
          ) : null
        }
      />
      <Box pb={isAndroid && '4'} px="4">
        <CustomButton onPress={onFinishExam} title={t('common.submit')} />
      </Box>
      <FailedExamModal
        visible={isFailedModal}
        onClose={() => setIsFailedModal(false)}
        {...{courseId}}
      />
      <CongratulationModal
        visible={visibleModal}
        onClose={() => setVisibleModal(false)}
        onClaim={onClaim}
      />
    </CustomContainer>
  );
};

export default FinalExamScreen;
