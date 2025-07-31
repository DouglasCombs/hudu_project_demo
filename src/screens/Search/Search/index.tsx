import dayjs from 'dayjs';
import {Box, Center, Flex, HStack} from 'native-base';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, StyleSheet} from 'react-native';
import {
  CustomContainer,
  CustomDivider,
  CustomFlatList,
  CustomText,
  CustomTouchable,
  LocationAccessModal,
  SavedProjectsButton,
  SearchInput,
  SearchOnMapButton,
  SearchProjectRow,
  SearchProjectsPlaceHolder,
  SectionPinedCategories,
  SectionSort,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {Category, ProjectStatus} from '~/generated/graphql';
import {useGetProjects} from '~/hooks/project';
import {goBack} from '~/navigation/Methods';
import {authStore, filterStore, stateStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const SearchScreen = ({navigation}: NavigationProp) => {
  const {t} = useTranslation();
  const {
    defaultSortObject,
    allTimeObject,
    defaultSortData,
    defaultAuthSortData,
  } = useMockData();

  const flatListRef = useRef<FlatList>(null);

  const {isUserLoggedIn} = authStore(state => state);
  const {stateTempData} = stateStore(state => state);
  const {filterTempData, setFilterTempData} = filterStore(state => state);

  const [sort, setSort] = useState<sortType>(defaultSortObject);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const today = useMemo(() => {
    return dayjs(new Date().toUTCString());
  }, []);

  const timeFilter = useMemo(() => {
    if (filterTempData?.time?.length > 0) {
      const res = filterTempData?.time?.find(
        (itm: any) => itm?.value === allTimeObject.value,
      );
      if (res) {
        return null;
      } else {
        return filterTempData?.time?.map((day: any) => ({
          project: {
            projectDeadLine: {
              lte: dayjs(new Date().toUTCString())
                .add(day.value, 'day')
                .endOf('day')
                .toDate(),
            },
          },
        }));
      }
    } else {
      return null;
    }
  }, [filterTempData?.time, allTimeObject]);

  const options = {
    projectFilter: sort?.value,
    location: [12, 12],
    where: {
      and: [
        {project: {isDeletedAccount: {neq: true}}},
        ...(stateTempData?.city && stateTempData?.city?.length > 0
          ? [{project: {city: {in: stateTempData?.city}}}]
          : stateTempData?.state?.value
          ? [
              {
                or: [
                  {project: {state: {eq: stateTempData?.state?.value}}},
                  {project: {state: {eq: `US-${stateTempData?.state?.value}`}}},
                ],
              },
            ]
          : []),
        {
          project: {
            projectStatus: {
              in: filterTempData?.status?.map((el: any) => el?.value),
            },
          },
        },
        ...(filterTempData?.category?.length > 0
          ? [
              {
                project: {
                  categoryId: {
                    in: filterTempData?.category?.map((el: any) => el?.id),
                  },
                },
              },
            ]
          : []),
        ...(timeFilter?.length > 0
          ? [
              {
                and: [
                  {project: {projectDeadLine: {gt: today}}},
                  {or: timeFilter},
                ],
              },
            ]
          : [{project: {projectDeadLine: {gt: today}}}]),
      ],
      ...(searchText ? {project: {title: {contains: searchText}}} : {}),
    },
    projectOrderVms: [{projectStatus: ProjectStatus.Bidding, order: 1}],
  };

  const {
    isLoading: getProjectLoading,
    data: getProjects,
    isFetchingNextPage: isFetchingNextPageProjects,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextPageProjects,
    refetch: refetchProjects,
    isRefetching: isRefetchingGetProjects,
  } = useGetProjects(options);

  const onChangeSearch = (text: any) => {
    if (text?.length > 0) {
      setSearchText(text);
    } else {
      setSearchText(undefined);
    }
  };

  const onCloseInput = () => {
    setSearchText(undefined);
    goBack();
  };

  const filterOnPress = () => {
    navigation.push('Filter');
  };

  const sortOnPress = (item: any) => {
    if (item) {
      setSort(item);
    }
  };

  const locationOnPress = () => {
    navigation.push('SelectState');
  };

  const categoryOnChange = (inCategory: Category | undefined) => {
    setFilterTempData({
      ...filterTempData,
      category: inCategory ? [inCategory] : undefined,
    });
  };

  const onLoadMore = () => {
    if (hasNextPageProjects) {
      fetchNextPageProjects();
    }
  };

  const renderItem = ({item}: {item: any}) => <SearchProjectRow {...{item}} />;

  const itemSeparatorComponent = useCallback(() => <Box h="42px" />, []);

  return (
    <CustomContainer pb={0}>
      <Flex flex={1}>
        <HStack
          alignItems="center"
          space="8px"
          pl="12px"
          pr="24px"
          pb="12px"
          w="100%"
          h="52px"
          bg={Colors.Rhino}>
          <SearchInput
            backgroundColor={Colors.Comet}
            flex={1}
            onChange={onChangeSearch}
            onClose={onCloseInput}
          />
          <SavedProjectsButton />
        </HStack>
        <HStack
          bg={Colors.SEARCH_BACKGROUND}
          h="44px"
          alignItems="center"
          justifyContent="space-between">
          <Item title={t('search.filter')} onPress={filterOnPress} />
          <CustomDivider bg={Colors.Ghost} h="24px" orientation="vertical" />
          <Center h="100%" flex={1}>
            <SectionSort
              data={isUserLoggedIn ? defaultSortData : defaultAuthSortData}
              value={sort}
              onChange={sortOnPress}
              width="100%"
            />
          </Center>
          <CustomDivider bg={Colors.Ghost} h="24px" orientation="vertical" />
          <Item title={t('search.location')} onPress={locationOnPress} />
        </HStack>
        <>
          {isUserLoggedIn && (
            <SectionPinedCategories onChange={categoryOnChange} />
          )}
          {getProjectLoading && !isRefetchingGetProjects ? (
            <SearchProjectsPlaceHolder />
          ) : (
            <CustomFlatList
              showScrollToTop
              ref={flatListRef}
              style={styles.flatList}
              isLoading={getProjectLoading}
              data={getProjects?.pages ?? []}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainerStyle}
              onEndReached={onLoadMore}
              onRefresh={refetchProjects}
              itemSeparatorComponent={itemSeparatorComponent}
              isFetchingNextPage={isFetchingNextPageProjects}
            />
          )}
        </>
        <SearchOnMapButton />
      </Flex>
      <LocationAccessModal />
    </CustomContainer>
  );
};

export default SearchScreen;

type ItemProps = {
  title?: any;
  onPress?: () => void;
};

const Item = ({title, onPress}: ItemProps) => {
  return (
    <CustomTouchable style={styles.item} onPress={onPress}>
      <CustomText fontsize={fontSize.small} fontFamily={fontFamily.medium}>
        {title}
      </CustomText>
    </CustomTouchable>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  flatList: {
    marginTop: 16,
  },
});
