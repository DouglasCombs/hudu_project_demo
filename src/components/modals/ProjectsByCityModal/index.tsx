import dayjs from 'dayjs';
import {Box, Flex} from 'native-base';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {
  CustomFlatList,
  ProjectsByCityPlaceHolder,
  ProjectsByCityRow,
} from '~/components';
import {ProjectFilter, ProjectStatus} from '~/generated/graphql';
import {useGetProjects} from '~/hooks/project';
import {Colors} from '~/styles';

function ProjectsByCityModal({onClose}: {onClose?: () => void}, ref: any) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [item, setItem] = useState<any>();

  useImperativeHandle(ref, () => ({
    open: (itm: any) => {
      openModal(itm);
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = (itm: any) => {
    setItem(itm);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    setItem(undefined);
    onClose?.();
  };

  const today = useMemo(() => {
    return dayjs(new Date().toUTCString());
  }, []);

  const otherProjectsOptions = {
    projectFilter: ProjectFilter.NewestToOldest,
    location: [12, 12],
    where: {
      and: [
        {project: {isDeletedAccount: {neq: true}}},
        {project: {projectDeadLine: {gt: today}}},
        {project: {projectStatus: {eq: ProjectStatus.Bidding}}},
        {project: {city: {eq: item?.city}}},
      ],
    },
    projectOrderVms: [{projectStatus: ProjectStatus.Bidding, order: 1}],
    enabled: item ? true : false,
  };

  const {
    isLoading: isLoadingGetProjects,
    data: getProjects,
    hasNextPage: hasNextPageProjects,
    fetchNextPage: fetchNextPageProjects,
    isFetchingNextPage: isFetchingNextPageProjects,
  } = useGetProjects(otherProjectsOptions);

  const projects = getProjects?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageProjects) {
      fetchNextPageProjects();
    }
  };

  const keyExtractor = useCallback((itm: any) => itm?.project?.id, []);

  const renderItem = ({item: projectItem}: {item: any}) => {
    return <ProjectsByCityRow item={projectItem} onClose={closeModal} />;
  };

  const itemSeparatorComponent = useCallback(() => <Box w="12px" />, []);

  if (isVisible) {
    return (
      <TouchableWithoutFeedback onPress={closeModal}>
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          flex={1}
          backgroundColor={Colors.BLACK_TRANSPARENT}>
          <TouchableWithoutFeedback>
            <Box w="100%" position="absolute" bottom="58px">
              {isLoadingGetProjects ? (
                <ProjectsByCityPlaceHolder />
              ) : (
                <CustomFlatList
                  horizontal
                  data={projects}
                  contentContainerStyle={styles.contentContainerStyle}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  itemSeparatorComponent={itemSeparatorComponent}
                  onEndReached={onLoadMore}
                  isFetchingNextPage={isFetchingNextPageProjects}
                />
              )}
            </Box>
          </TouchableWithoutFeedback>
        </Flex>
      </TouchableWithoutFeedback>
    );
  }

  return null;
}

export default forwardRef(ProjectsByCityModal);

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1, paddingHorizontal: 24},
});
