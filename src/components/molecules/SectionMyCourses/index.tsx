import {Box, HStack, VStack} from 'native-base';
import React, {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CustomFlatList,
  CustomText,
  CustomTouchable,
  MyCoursePlaceHolder,
  MyCoursesRow,
} from '~/components';
import {useGetUserCourses} from '~/hooks/course';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize, myCourseWidth, scale} from '~/utils/style';

function SectionMyCourses({
  my = '16px',
  px = '24px',
}: {
  my?: string | number;
  px?: string | number;
}) {
  const {t} = useTranslation();
  const {userData} = userDataStore();

  const options = {
    where: {
      userId: {eq: userData?.id},
    },
    order: {
      createdDate: 'DESC',
    },
    take: 3,
  };

  const {isLoading: getUserLoading, data: getCourses} =
    useGetUserCourses(options);
  const courses = getCourses?.pages ?? [];

  const seeAllOnPress = () => {
    navigate('AcademyTab', {initialRoute: 1});
  };
  const keyExtractor = useCallback((itm: any) => itm?.id, [courses]);

  if (getUserLoading) {
    return <MyCoursePlaceHolder />;
  }

  const renderItem = ({item}: {item: any}) => <MyCoursesRow item={item} />;

  if (courses?.length > 0) {
    return (
      <VStack my={my} space="16px">
        <HStack px={px} alignItems="center" justifyContent="space-between">
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xMedium}>
            {t('courses.myCourses')}
          </CustomText>
          <CustomTouchable onPress={seeAllOnPress}>
            <CustomText
              color={Colors.PRIMARY}
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xNormal}>
              {t('common.seeAll')}
            </CustomText>
          </CustomTouchable>
        </HStack>

        <CustomFlatList
          horizontal
          pagingEnabled
          data={courses}
          hasItemSeparatorComponent={false}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainerStyle}
          snapToInterval={myCourseWidth}
        />
      </VStack>
    );
  }

  return null;
}

export default memo(SectionMyCourses);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: scale(18),
    paddingTop: scale(5),
  },
});
