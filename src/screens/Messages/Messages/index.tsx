import {useDrawerStatus} from '@react-navigation/drawer';
import {Box} from 'native-base';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {EmptyMessages} from '~/assets/icons';
import {
  CustomContainer,
  CustomDivider,
  CustomFlatList,
  EmptyData,
  MessageItem,
  MessagesPlaceholder,
  ScreensHeader,
} from '~/components';
import {SortEnumType} from '~/generated/graphql';
import {useGetUserMessagesGroupedByUser} from '~/hooks/message';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {verticalScale} from '~/utils/style';

export default function MessagesScreen() {
  const {t} = useTranslation();
  const isDrawerOpen = useDrawerStatus() === 'open';

  const {userData} = userDataStore(state => state);

  const options = {
    order: {
      latestMessageDate: SortEnumType.Desc,
    },
    where: {isGroup: {eq: false}},
    currentUserId: userData?.id,
  };

  const {
    isLoading: isLoadingGetUserMessages,
    data: getUserMessages,
    fetchNextPage: fetchNextPageUserMessages,
    hasNextPage: hasNextPageUserMessages,
    isFetchingNextPage: isFetchingNextPageUserMessages,
    refetch: refetchUserMessages,
    isRefetching: isRefetchingUserMessages,
  } = useGetUserMessagesGroupedByUser(options);

  const userMessages = getUserMessages?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageUserMessages) {
      fetchNextPageUserMessages();
    }
  };

  const loading = isLoadingGetUserMessages;

  const renderItem = ({item}: {item: any}) => <MessageItem {...{item}} />;

  const itemSeparatorComponent = useCallback(() => {
    return <CustomDivider my="0" />;
  }, []);

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData
        showButton
        customIcon={<EmptyMessages />}
        text={t('messages.emptyMessagesTitle')}
        description={t('messages.emptyMessagesDescription')}
        buttonTitle={t('common.backToHome')}
      />
    ),
    [t],
  );

  return (
    <CustomContainer
      backgroundColor={
        isDrawerOpen ? Colors.SEARCH_BACKGROUND : Colors.WHITE_F
      }>
      <ScreensHeader backAction title={t('messages.messages')} />
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      {loading ? (
        <MessagesPlaceholder />
      ) : (
        <CustomFlatList
          data={userMessages}
          renderItem={renderItem}
          onRefresh={refetchUserMessages}
          isLoading={loading}
          refreshing={isRefetchingUserMessages}
          onEndReached={onLoadMore}
          isFetchingNextPage={isFetchingNextPageUserMessages}
          contentContainerStyle={styles.contentContainerStyle}
          itemSeparatorComponent={itemSeparatorComponent}
          listEmptyComponent={listEmptyComponent}
        />
      )}
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: verticalScale(16),
    paddingHorizontal: 24,
  },
});
