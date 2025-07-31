import dayjs from 'dayjs';
import {HStack, VStack} from 'native-base';
import React, {memo, useMemo, useRef, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  CustomFlatList,
  FilterButton,
  HomeProjectsRow,
  ProjectsToBidPlaceHolder,
  SavedProjectsButton,
  SearchInput,
  SectionPinedCategories,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {ProjectStatus} from '~/generated/graphql';
import {useGetProjects} from '~/hooks/project';
import {authStore, filterStore, stateStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';

function SectionHomeProjects() {
  const {defaultSortObject, allTimeObject} = useMockData();

  const {userData} = userDataStore(state => state);
  const {stateTempData} = stateStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);
  const FlatListRef = useRef<FlatList>(null);
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const {filterTempData} = filterStore(state => state);

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

  const otherProjectsOptions = useMemo(() => {
    return {
      projectFilter: filterTempData.sort?.value || defaultSortObject.value,
      location: [12, 12],
      where: {
        or: [
          {
            and: [
              ...(isUserLoggedIn
                ? [{project: {userId: {neq: userData?.id}}}]
                : []),
              {project: {isDeletedAccount: {neq: true}}},
              {project: {projectStatus: {eq: ProjectStatus.Bidding}}},
              {project: {projectDeadLine: {gt: today}}},
              ...(stateTempData?.city && stateTempData?.city?.length > 0
                ? [{project: {city: {in: stateTempData?.city}}}]
                : stateTempData?.state?.value
                ? [
                    {
                      or: [
                        {project: {state: {eq: stateTempData?.state?.value}}},
                        {
                          project: {
                            state: {eq: `US-${stateTempData?.state?.value}`},
                          },
                        },
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
                          in: filterTempData?.category?.map(
                            (el: any) => el?.id,
                          ),
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
          },
          {
            and: [
              ...(isUserLoggedIn
                ? [{project: {userId: {neq: userData?.id}}}]
                : []),
              {project: {isDeletedAccount: {neq: true}}},
              {project: {projectStatus: {eq: ProjectStatus.Finished}}},
              {isBidder: {eq: false}},
            ],
          },
        ],
        ...(searchText ? {project: {title: {contains: searchText}}} : {}),
      },
      projectOrderVms: [
        {projectStatus: ProjectStatus.Bidding, order: 1},
        {projectStatus: ProjectStatus.InProgress, order: 2},
        {projectStatus: ProjectStatus.Finished, order: 3},
      ],
    };
  }, [
    isUserLoggedIn,
    userData,
    stateTempData,
    today,
    filterTempData,
    defaultSortObject,
    searchText,
    timeFilter,
  ]);

  const {
    isLoading: getOtherProjectLoading,
    data: getOtherProjects,
    refetch: refetchGetOtherProjects,
    hasNextPage: hasNextPageOtherProjects,
    fetchNextPage: fetchNextPageOtherProjects,
    isFetchingNextPage: isFetchingNextPageOtherProjects,
  } = useGetProjects(otherProjectsOptions);

  const otherProjects = useMemo(() => {
    return getOtherProjects?.pages ?? [];
  }, [getOtherProjects]);

  const onChangeSearch = (text: any) => {
    if (text?.length > 0) {
      setSearchText(text);
    } else {
      setSearchText(undefined);
    }
  };

  const onClearSearch = () => {
    setSearchText(undefined);
  };

  const onLoadMore = () => {
    if (hasNextPageOtherProjects) {
      fetchNextPageOtherProjects();
    }
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <VStack px="24px" key={item?.project?.id}>
        <HomeProjectsRow
          mb={index < otherProjects?.length - 1 ? 42 : 0}
          item={item}
        />
      </VStack>
    );
  };

  return (
    <VStack flex={1}>
      <HStack
        alignItems="center"
        space="8px"
        pl="12px"
        pr="24px"
        w="100%"
        h="52px">
        <SearchInput
          flex={1}
          placeholderTextColor={Colors.PLACEHOLDER}
          color={Colors.PLACEHOLDER}
          onChange={onChangeSearch}
          onClear={onClearSearch}
          iconColor={Colors.PLACEHOLDER}
        />
        <FilterButton />
        <SavedProjectsButton />
      </HStack>
      {isUserLoggedIn && <SectionPinedCategories />}
      {getOtherProjectLoading ? (
        <ProjectsToBidPlaceHolder />
      ) : (
        <CustomFlatList
          ref={FlatListRef}
          data={otherProjects}
          renderItem={renderItem}
          onRefresh={refetchGetOtherProjects}
          isLoading={getOtherProjectLoading}
          onEndReached={onLoadMore}
          isFetchingNextPage={isFetchingNextPageOtherProjects}
          contentContainerStyle={styles.contentContainerStyle}
          showScrollToTop
        />
      )}
    </VStack>
  );
}

export default memo(SectionHomeProjects);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
