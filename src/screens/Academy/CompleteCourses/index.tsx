import {Box, VStack} from 'native-base';
import React, {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet} from 'react-native';
import {
  AnimationProvider,
  CustomContainer,
  CustomFlatList,
  CustomFloatActionButton,
  EmptyData,
  MyCoursesRowVertical,
  ScreensHeader,
  SearchInput,
} from '~/components';
import {useGetUserCourses} from '~/hooks/course';
import {Colors} from '~/styles';
import {myCourseWidth} from '~/utils/style';

function CompleteCoursesScreen({route}: {route: any}) {
  const userId = route?.params?.userId;
  const {t} = useTranslation();

  const [searchText, setSearchText] = useState<string | undefined>('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const options = {
    where: {
      course: {
        title: {
          contains: searchText,
        },
      },
      userId: {eq: userId},
      status: {eq: 'COMPLETED'},
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

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({index: 0, animated: true});
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    // Adjust the threshold value as needed
    const threshold = 200; // You can adjust this threshold
    setShowScrollButton(offsetY > threshold);
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
    <CustomContainer>
      <ScreensHeader backAction title={t('academy.completeCourses')} />

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
          onScroll={handleScroll}
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
        <AnimationProvider
          visible={showScrollButton}
          visibleChildren={
            <CustomFloatActionButton
              right={false}
              left="24px"
              onPress={scrollToTop}
              name="arrow-up"
            />
          }
          inVisibleChildren={null}
        />
      </VStack>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 30,
  },
});

export default CompleteCoursesScreen;
