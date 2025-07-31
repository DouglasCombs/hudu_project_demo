import {Box, VStack} from 'native-base';
import React, {memo, useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet} from 'react-native';
import {
  CustomFlatList,
  EmptyData,
  MyCoursesRowVertical,
  SearchInput,
} from '~/components';
import {useGetUserCourses} from '~/hooks/course';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {myCourseWidth} from '~/utils/style';

function SectionMyCoursesRoute() {
  const {userData} = userDataStore();
  const {t} = useTranslation();

  const [searchText, setSearchText] = useState<string | undefined>('');
  const flatListRef = useRef<FlatList>(null);

  const options = {
    where: {
      course: {
        title: {
          contains: searchText,
        },
      },
      userId: {eq: userData?.id},
    },
    order: {
      createdDate: 'DESC',
    },
  };

  const {
    isLoading: getUserLoading,
    data: getCourses,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useGetUserCourses(options);
  const courses = getCourses?.pages ?? [];
  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const keyExtractor = useCallback((itm: any) => itm?.id, []);

  const renderItem = ({item}: {item: any}) => (
    <MyCoursesRowVertical item={item} />
  );

  const onChangeSearch = (text: any) => {
    if (text?.length > 0) {
      setSearchText(text);
    } else {
      setSearchText('');
    }
  };

  return (
    <VStack flex={1} pt="4">
      <CustomFlatList
        // style={{paddingHorizontal: scale(18)}}
        data={courses}
        ref={flatListRef}
        bounces={true}
        isLoading={getUserLoading}
        hasInternalLoading
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        listEmptyComponent={<EmptyData showText />}
        refreshing={isRefetching}
        onRefresh={refetch}
        isFetchingNextPage={isFetchingNextPage}
        onEndReached={onLoadMore}
        showScrollToTop
        listHeaderComponent={
          <Box px="4" mb="5">
            <SearchInput
              backgroundColor={Colors.SEARCH_BACKGROUND}
              color={Colors.Topaz}
              placeholderTextColor={Colors.Topaz}
              flex={1}
              placeholder={t('courses.searchCourses')}
              mx="0"
              onChange={onChangeSearch}
            />
          </Box>
        }
        contentContainerStyle={styles.contentContainerStyle}
        snapToInterval={myCourseWidth}
      />
    </VStack>
  );
}

export default memo(SectionMyCoursesRoute);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
  },
});
