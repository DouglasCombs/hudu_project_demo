import {Image} from 'iconsax-react-native';
import {Flex, HStack, VStack} from 'native-base';
import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CustomContainer,
  CustomDivider,
  CustomFlatList,
  CustomText,
  CustomTouchable,
  MessagesByProjectsPlaceholder,
  ScreensHeader,
} from '~/components';
import {SortEnumType} from '~/generated/graphql';
import {useGetConversationsProject} from '~/hooks/message';
import {navigate, toggleDrawer} from '~/navigation/Methods';
import {messagesStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize, fontFamily} from '~/utils/style';
import {useDateTimeFormat} from '~/utils/utils';

export default function MessagesDrawerContent() {
  const {user} = messagesStore(state => state);
  const {formatTime} = useDateTimeFormat();
  const {t} = useTranslation();

  const options = user
    ? {
        order: {
          latestMessageDate: SortEnumType.Desc,
        },
        userId: user?.id ?? -1,
      }
    : {enabled: false};

  const {
    isLoading: isLoadingGetConversations,
    data: getConversations,
    fetchNextPage: fetchNextPageConversations,
    hasNextPage: hasNextPageConversations,
    isFetchingNextPage: isFetchingNextPageConversations,
    refetch: refetchConversations,
    isRefetching: isRefetchingConversations,
  } = useGetConversationsProject(options);

  const conversations = getConversations?.pages ?? [];

  const itemOnPress = (item: any) => {
    toggleDrawer();
    navigate('Chat', {
      conversationId: item?.conversation?.id,
      projectId: item?.project?.id,
      user,
    });
  };

  const onLoadMore = () => {
    if (hasNextPageConversations) {
      fetchNextPageConversations();
    }
  };

  const renderItem = ({item}: {item: any}) => {
    const formatDateTime = formatTime(item?.latestMessageDate);
    const time = formatDateTime?.dateTime;
    const isToday = formatDateTime?.isToday;

    return (
      <Fragment>
        <CustomTouchable onPress={() => itemOnPress(item)}>
          <VStack space="2" pr="16px">
            <CustomText>{item?.project?.title}</CustomText>
            <HStack
              space="4"
              alignItems="center"
              justifyContent="space-between">
              {item?.latestMessage ? (
                <CustomText
                  flex={1}
                  numberOfLines={1}
                  fontSize={fontSize.xTiny}
                  color={isToday ? Colors.PRIMARY : Colors.Topaz}>
                  {item?.latestMessage}
                </CustomText>
              ) : (
                <HStack alignItems="center" space="4px">
                  <Image
                    size="16"
                    color={isToday ? Colors.PRIMARY : Colors.Topaz}
                  />
                  <CustomText
                    flex={1}
                    numberOfLines={1}
                    fontSize={fontSize.xTiny}
                    color={isToday ? Colors.PRIMARY : Colors.Topaz}>
                    {item?.latestMessage
                      ? item?.latestMessage
                      : t('common.photo')}
                  </CustomText>
                </HStack>
              )}
              <CustomText
                fontFamily={fontFamily.medium}
                fontSize={fontSize.xTiny}
                color={Colors.Topaz}>
                {time}
              </CustomText>
            </HStack>
          </VStack>
        </CustomTouchable>
        <CustomDivider my="16px" />
      </Fragment>
    );
  };

  return (
    <CustomContainer
      pb={0}
      statusBarBackgroundColor={Colors.TRANSPARENT}
      backgroundColor={Colors.TRANSPARENT}>
      <ScreensHeader backgroundColor={Colors.TRANSPARENT} />
      <Flex flex={1} bg={Colors.WHITE_F}>
        {isLoadingGetConversations ? (
          <MessagesByProjectsPlaceholder />
        ) : (
          <CustomFlatList
            data={conversations}
            renderItem={renderItem}
            onEndReached={onLoadMore}
            onRefresh={refetchConversations}
            hasItemSeparatorComponent={false}
            isLoading={isLoadingGetConversations}
            refreshing={isRefetchingConversations}
            isFetchingNextPage={isFetchingNextPageConversations}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
      </Flex>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 24,
    paddingStart: 16,
    backgroundColor: Colors.WHITE_F,
  },
});
