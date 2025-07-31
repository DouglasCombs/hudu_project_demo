import {Box} from 'native-base';
import React, {useCallback, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from 'react-native';
import {
  AnimationProvider,
  CoursesRowVertical,
  CustomContainer,
  CustomFlatList,
  CustomFloatActionButton,
  CustomText,
  ScreensHeader,
  SearchInput,
} from '~/components';
import {useGetCourses} from '~/hooks/course';
import {Colors} from '~/styles';
import {fontFamily, fontSize, myCourseWidth} from '~/utils/style';

const CoursesScreen = ({route}: {route: any}) => {
  const category = route?.params?.category;
  const {t} = useTranslation();

  const [searchText, setSearchText] = useState<string | undefined>('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const where = category?.id
    ? {
        where: {
          and: [
            {
              title: {
                contains: searchText,
              },
            },
            {
              categoryId: {
                eq: category?.id,
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
          and: [
            {
              title: {
                contains: searchText,
              },
            },
            {
              courseStatus: {
                eq: 'PUBLISHED',
              },
            },
          ],
        },
      };

  const options = {
    ...where,
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
  } = useGetCourses(options);

  const courses = getCourses?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onChangeSearch = (text: any) => {
    if (text?.length > 0) {
      setSearchText(text);
    } else {
      setSearchText('');
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

  const keyExtractor = useCallback((itm: any) => itm?.project?.id, []);

  const renderItem = ({item}: {item: any}) => (
    <CoursesRowVertical item={item} />
  );

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('academy.courses')} />
      {category?.title ? (
        <Box pt="4" px="4">
          <CustomText
            fontSize={fontSize.large}
            fontFamily={fontFamily.bold}
            color={Colors.BLACK}>
            Topic: {category?.title}
          </CustomText>
        </Box>
      ) : null}

      <Box flex={1} py="6">
        <CustomFlatList
          data={courses}
          ref={flatListRef}
          isLoading={getUserLoading}
          renderItem={renderItem}
          hasInternalLoading
          keyExtractor={keyExtractor}
          refreshing={isRefetching}
          onRefresh={refetch}
          isFetchingNextPage={isFetchingNextPage}
          onEndReached={onLoadMore}
          bounces={true}
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
      </Box>
    </CustomContainer>
  );
};

export default CoursesScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1, paddingBottom: 30},
});
