import {HStack, VStack} from 'native-base';
import React, {memo, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CoursesRow,
  CustomFlatList,
  CustomText,
  CustomTouchable,
  MyCoursePlaceHolder,
} from '~/components';
import {useGetCourses} from '~/hooks/course';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize, myCourseWidth, scale} from '~/utils/style';

function SectionCourses({
  my = '8px',
  px = '24px',
  categoryId,
  categoryTitle,
}: {
  my?: string | number;
  px?: string | number;
  categoryId?: number;
  categoryTitle: string;
}) {
  const {t} = useTranslation();

  const where = categoryId
    ? {
        where: {
          and: [
            {
              categoryId: {
                eq: categoryId,
              },
            },
            {
              courseStatus: {
                eq: 'PUBLISHED',
              },
            },
          ],
        },
      }
    : {
        where: {
          courseStatus: {
            eq: 'PUBLISHED',
          },
        },
      };

  const options = {
    ...where,
    take: 3,
    order: {
      createdDate: 'DESC',
    },
  };

  const {isLoading: getProjectLoading, data: getProjects} =
    useGetCourses(options);

  const courses = getProjects?.pages ?? [];

  const seeAllOnPress = () => {
    navigate('Courses', {
      category: {
        id: categoryId,
        title: categoryTitle,
      },
    });
  };
  const keyExtractor = useCallback((itm: any) => itm?.project?.id, []);

  if (getProjectLoading) {
    return <MyCoursePlaceHolder />;
  }

  const renderItem = ({item}: {item: any}) => <CoursesRow item={item} />;

  if (courses?.length > 0) {
    return (
      <VStack my={my} space="16px">
        <HStack px={px} alignItems="center" justifyContent="space-between">
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xMedium}>
            {categoryTitle}
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

export default memo(SectionCourses);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingStart: scale(18),
    paddingVertical: 5,
    paddingEnd: scale(18),
  },
});
