import {HStack, Spacer} from 'native-base';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Alert} from 'react-native';
import {
  CustomContainer,
  CustomFlatList,
  CustomText,
  CustomTouchable,
  ScreensHeader,
  SearchProjectRow,
  SearchProjectsPlaceHolder,
} from '~/components';
import {ProjectFilter} from '~/generated/graphql';
import {useGetUserLikeProjects, useProjectUnLikeAll} from '~/hooks/project';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

export default function SavedProjectsScreen() {
  const {t} = useTranslation();

  const options = {
    projectFilter: ProjectFilter.NewestToOldest,
    location: [12, 12],
    where: {
      project: {
        and: [{isDeletedAccount: {neq: true}}],
      },
    },
  };

  const {
    isLoading: getUserLikeProjectsLoading,
    data: getUserLikeProjects,
    fetchNextPage: fetchNextPageUserLikeProjects,
    hasNextPage: hasNextPageUserLikeProjects,
    refetch: refetchUserLikeProjects,
    isRefetching: isRefetchingUserLikeProjects,
    isFetchingNextPage: isFetchingNextPageUserLikeProjects,
  } = useGetUserLikeProjects(options);

  const {
    mutate: mutateUnlikeAllProjects,
    isLoading: isLoadingUnLikeAllProjects,
  } = useProjectUnLikeAll();

  const userLikeProjects = getUserLikeProjects?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageUserLikeProjects) {
      fetchNextPageUserLikeProjects();
    }
  };

  const clearAllOnPress = () => {
    Alert.alert(t('common.clearAll'), t('messages.clearAllWarning'), [
      {
        text: t('common.cancel'),
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: t('common.ok'),
        onPress: () => mutateUnlikeAllProjects({}),
      },
    ]);
  };

  const renderItem = ({item}: {item: any}) => <SearchProjectRow {...{item}} />;

  const itemSeparatorComponent = useCallback(() => <Spacer h="42px" />, []);

  return (
    <CustomContainer isLoading={isLoadingUnLikeAllProjects}>
      <ScreensHeader backAction title={t('search.savedItems')} />
      <HStack
        px="24px"
        h="44px"
        w="100%"
        alignItems="center"
        justifyContent="flex-end"
        bg={Colors.SEARCH_BACKGROUND}>
        <CustomTouchable onPress={clearAllOnPress}>
          <CustomText
            fontFamily={fontFamily.medium}
            color={Colors.PRIMARY}
            fontSize={fontSize.xNormal}>
            {t('common.clearAll')}
          </CustomText>
        </CustomTouchable>
      </HStack>
      {getUserLikeProjectsLoading ? (
        <SearchProjectsPlaceHolder />
      ) : (
        <CustomFlatList
          isLoading={getUserLikeProjectsLoading}
          data={userLikeProjects}
          renderItem={renderItem}
          onRefresh={refetchUserLikeProjects}
          refreshing={isRefetchingUserLikeProjects}
          onEndReached={onLoadMore}
          isFetchingNextPage={isFetchingNextPageUserLikeProjects}
          contentContainerStyle={styles.contentContainerStyle}
          itemSeparatorComponent={itemSeparatorComponent}
        />
      )}
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: verticalScale(8),
    paddingHorizontal: 24,
  },
});
