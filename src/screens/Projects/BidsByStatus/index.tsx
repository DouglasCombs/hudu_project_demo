import {Box, Flex, HStack, Spacer} from 'native-base';
import React, {useCallback, useMemo, useState} from 'react';
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
import {BidStatus, ProjectFilter, ProjectStatus} from '~/generated/graphql';
import {useGetProjectsByStatus} from '~/hooks/project';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import dayjs from 'dayjs';

const BidsByStatusScreen = ({route}: NavigationProp) => {
  const projectStatus = route?.params?.projectStatus;
  const searchable = route?.params?.searchable;
  const isArchive = route?.params?.isArchive;

  const today = useMemo(() => {
    return dayjs(new Date().toUTCString());
  }, []);

  const {t} = useTranslation();

  const {userData} = userDataStore();
  const [searchText, setSearchText] = useState<string | undefined>('');

  const title = useMemo(() => {
    if (isArchive) {
      return t('common.archive');
    } else {
      switch (projectStatus) {
        case ProjectStatus.Bidding:
          return t('projects.bids.biddingOn');
        case ProjectStatus.InProgress:
          return t('projects.bids.awardedBid');
        case ProjectStatus.Finished:
          return t('projects.bids.finishedProjects');
        default:
          return '';
      }
    }
  }, [projectStatus, t, isArchive]);

  const where = isArchive
    ? {
        and: [
          {
            or: [{project: {projectStatus: {eq: ProjectStatus.InProgress}}}],
          },
          {
            currentDoer: {id: {neq: userData?.id}},
          },
        ],
      }
    : searchable
    ? {
        project: {title: {contains: searchText}},
      }
    : {
        and: [
          {
            project: {projectStatus: {eq: projectStatus}},
          },
          ...(projectStatus === ProjectStatus.Bidding
            ? [
                {
                  project: {projectDeadLine: {gt: today}},
                  isBidder: {eq: true},
                },
              ]
            : []),
          ...(projectStatus !== ProjectStatus.Bidding
            ? [
                {
                  currentDoer: {id: {eq: userData?.id}},
                },
              ]
            : []),
        ],
      };

  const options = {
    projectFilter: ProjectFilter.NewestToOldest,
    location: [12, 12],
    where,
    projectOrderVms: [
      {projectStatus: ProjectStatus.Bidding, order: 1},
      {projectStatus: ProjectStatus.InProgress, order: 2},
      {projectStatus: ProjectStatus.Finished, order: 3},
      {projectStatus: ProjectStatus.Failed, order: 4},
    ],
    isMyBid: true,
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
      setSearchText('');
    }
  };

  const onClearSearchInput = () => {
    setSearchText('');
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <ProjectCard
        {...{item, showDetails: searchable ? false : true, isArchive}}
      />
    );
  };

  const itemSeparatorComponent = useCallback(() => <Spacer h="24px" />, []);

  const listEmptyComponent = useCallback(
    () => <EmptyData showButton={!searchable} />,
    [searchable],
  );

  return (
    <CustomContainer>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
              isLoading={getProjectLoading}
              refreshing={isRefetchingProjects}
              listEmptyComponent={listEmptyComponent}
              isFetchingNextPage={isFetchingNextPageProjects}
              itemSeparatorComponent={itemSeparatorComponent}
              contentContainerStyle={styles.contentContainerStyle}
            />
          )}
        </Flex>
      </TouchableWithoutFeedback>
    </CustomContainer>
  );
};

export default BidsByStatusScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
