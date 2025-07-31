import {Box, VStack} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import CoursesAcademyPlaceholder from '~/components/PlaceHolders/CoursesAcademyPlaceholder';
import CustomKeyboardAwareScrollView from '~/components/atoms/CustomKeyboardAwareScrollView';
import CustomText from '~/components/atoms/CustomText';
import EmptyData from '~/components/atoms/EmptyData';
import SectionElevateCareer from '~/components/atoms/SectionElevateCareer';
import SectionTopics from '~/components/atoms/SectionTopics';
import SectionCourses from '~/components/molecules/SectionCourses';
import {useGetCourses, useGetTopCategoryCourses} from '~/hooks/course';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import SectionSearchBox from '../SectionSearchBox';

function SectionCoursesRoute() {
  const {t} = useTranslation();
  const {isLoading: getUserLoading, data: getCourses} = useGetCourses({
    where: {
      courseStatus: {
        eq: 'PUBLISHED',
      },
    },
    order: {
      createdDate: 'DESC',
    },
  });
  const courses = getCourses?.pages ?? [];

  const {isLoading, data: getCategories} = useGetTopCategoryCourses({
    order: {
      courseCount: 'DESC',
    },
  });
  const categories = getCategories?.pages ?? [];

  if (getUserLoading || isLoading) {
    return <CoursesAcademyPlaceholder />;
  }

  return (
    <VStack flex={1} pt="8">
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack space="6">
          <SectionElevateCareer />
          <VStack px="4" space="4">
            <CustomText
              fontSize={fontSize.large}
              fontFamily={fontFamily.bold}
              color={Colors.BLACK}>
              {t('courses.explore')}
            </CustomText>
            <SectionSearchBox
              placeholder={t('courses.searchCourses')}
              onPress={() => navigate('Courses')}
            />
          </VStack>
          {courses?.length === 0 ? (
            <EmptyData />
          ) : (
            <>
              <SectionTopics />
              <Box px="4">
                <CustomText
                  fontSize={fontSize.large}
                  fontFamily={fontFamily.bold}
                  color={Colors.BLACK}>
                  {t('courses.topCategories')}
                </CustomText>
              </Box>

              <SectionCourses
                categoryId={categories?.[0]?.id}
                categoryTitle={categories?.[0]?.category?.text}
              />
              <SectionCourses
                categoryId={categories?.[1]?.id}
                categoryTitle={categories?.[1]?.category?.text}
              />
              <SectionCourses
                categoryId={categories?.[2]?.id}
                categoryTitle={categories?.[2]?.category?.text}
              />
            </>
          )}
        </VStack>
      </CustomKeyboardAwareScrollView>
    </VStack>
  );
}

export default memo(SectionCoursesRoute);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
