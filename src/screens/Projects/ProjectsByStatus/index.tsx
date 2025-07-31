import {Box, Flex, HStack, Spacer} from 'native-base';
import React, {Fragment, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
  CustomContainer,
  CustomFlatList,
  ProjectCard,
  ScreensHeader,
  ProjectByStatusPlaceholder,
  SearchInput,
  CustomTouchable,
  EmptyData,
} from '~/components';
import {ProjectFilter, ProjectStatus} from '~/generated/graphql';
import {useGetProjectsByStatus} from '~/hooks/project';
import {userDataStore} from '~/stores';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '~/styles';
import {goBack} from '~/navigation/Methods';
import dayjs from 'dayjs';

const ProjectsByStatus = ({route}: NavigationProp) => {
  const projectStatus = route?.params?.projectStatus;
  const searchable = route?.params?.searchable;
  const WrapperComponent = searchable ? TouchableWithoutFeedback : Fragment;
  const {t} = useTranslation();

  const [searchText, setSearchText] = useState<string | undefined>(undefined);

  const {userData} = userDataStore(state => state);

  const today = useMemo(() => {
    return dayjs(new Date().toUTCString());
  }, []);

  const title = useMemo(() => {
    switch (projectStatus) {
      case ProjectStatus.Bidding:
        return t('projects.activeProjects');
      case ProjectStatus.Cancelled:
        return t('projects.closedProjects');
      case ProjectStatus.InProgress:
        return t('projects.awardedProjects');
      case ProjectStatus.Finished:
        return t('projects.completedProjects');
      case ProjectStatus.Failed:
        return t('common.archive');
      default:
        return '';
    }
  }, [projectStatus, t]);

  const options = {
    projectFilter: ProjectFilter.NewestToOldest,
    location: [12, 12],
    where: {
      and: [
        {project: {userId: {eq: userData?.id}}},
        ...(searchable
          ? searchText
            ? [
                {
                  project: {title: {contains: searchText}},
                },
              ]
            : []
          : [
              ...(projectStatus === ProjectStatus.Cancelled
                ? [
                    {
                      or: [
                        {
                          and: [
                            {
                              project: {
                                projectStatus: {eq: ProjectStatus.Bidding},
                              },
                            },
                            {
                              project: {projectDeadLine: {lt: today}},
                            },
                          ],
                        },
                        {
                          project: {
                            projectStatus: {eq: ProjectStatus.Cancelled},
                          },
                        },
                      ],
                    },
                  ]
                : [
                    {
                      project: {
                        projectStatus: {eq: projectStatus},
                      },
                    },
                  ]),
            ]),
        ...(projectStatus === ProjectStatus.Bidding
          ? [
              {
                project: {projectDeadLine: {gt: today}},
              },
            ]
          : []),
      ],
    },
    projectOrderVms: [
      {projectStatus: ProjectStatus.Bidding, order: 1},
      {projectStatus: ProjectStatus.InProgress, order: 2},
      {projectStatus: ProjectStatus.Finished, order: 3},
      {projectStatus: ProjectStatus.Failed, order: 4},
    ],
  };

  const {
    isLoading: getProjectLoading,
    data: getProjects,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextPageProjects,
    refetch: refetchProjects,
    isRefetching: isRefetchingProjects,
    isFetchingNextPage: isFetchingNextPageProjects,
  } = useGetProjectsByStatus(options);

  const projects = getProjects?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageProjects) {
      fetchNextPageProjects();
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onChangeSearch = (text: any) => {
    if (text?.length > 0) {
      setSearchText(text);
    } else {
      setSearchText(undefined);
    }
  };

  const onClearSearchInput = () => {
    setSearchText(undefined);
  };

  const renderItem = ({item}: {item: any}) => {
    return <ProjectCard {...{item, showDetails: searchable ? false : true}} />;
  };

  const itemSeparatorComponent = useCallback(() => <Spacer h="24px" />, []);

  const listEmptyComponent = useCallback(
    () => <EmptyData showButton={!searchable} />,
    [searchable],
  );

  return (
    <CustomContainer>
      <WrapperComponent onPress={dismissKeyboard}>
        <Flex flex={1}>
          {searchable ? (
            <HStack
              alignItems="center"
              space="8px"
              pl="12px"
              pr="24px"
              pb="12px"
              w="100%"
              h="52px"
              bg={Colors.Rhino}>
              <Box>
                <CustomTouchable onPress={goBack}>
                  <Icon name="chevron-back" color={Colors.WHITE_F} size={24} />
                </CustomTouchable>
              </Box>
              <SearchInput
                backgroundColor={Colors.Comet}
                flex={1}
                onChange={onChangeSearch}
                onClear={onClearSearchInput}
              />
            </HStack>
          ) : (
            <ScreensHeader backAction title={title} />
          )}
          {getProjectLoading && !isRefetchingProjects ? (
            <ProjectByStatusPlaceholder />
          ) : (
            <CustomFlatList
              data={projects}
              renderItem={renderItem}
              onEndReached={onLoadMore}
              onRefresh={refetchProjects}
              listEmptyComponent={listEmptyComponent}
              isLoading={getProjectLoading}
              refreshing={isRefetchingProjects}
              isFetchingNextPage={isFetchingNextPageProjects}
              itemSeparatorComponent={itemSeparatorComponent}
              contentContainerStyle={styles.contentContainerStyle}
            />
          )}
        </Flex>
      </WrapperComponent>
    </CustomContainer>
  );
};

export default ProjectsByStatus;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
