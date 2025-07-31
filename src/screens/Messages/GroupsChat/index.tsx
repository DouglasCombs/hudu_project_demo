import dayjs from 'dayjs';
import {Box, Center, Divider, HStack, VStack} from 'native-base';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SectionList, StyleSheet} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {Help2} from '~/assets/icons';
import {SmallHuduLogo} from '~/assets/images';
import {
  ChatInput,
  CustomContainer,
  CustomSectionList,
  CustomText,
  EmptyData,
  ListItemMessageContent,
  ScreensHeader,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {MessageTypes, ResponseStatus, SortEnumType} from '~/generated/graphql';
import {useCreateGroupMessage, useGetConversation} from '~/hooks/message';
import {useUploadFile} from '~/hooks/upload';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize, scale, verticalScale} from '~/utils/style';
import {useDateTimeFormat} from '~/utils/utils';

const GroupsChatScreen = () => {
  const {t} = useTranslation();
  const {formatDate} = useDateTimeFormat();
  const {userData, groupConversationId, setGroupConversationId} = userDataStore(
    state => state,
  );
  const queryClient = useQueryClient();

  const {
    mutate: uploadFileMutate,
    isLoading: isUploading,
    reset: resetUpload,
  } = useUploadFile();

  const sectionListRef = useRef<SectionList>(null);
  const inputRef = useRef(null);

  const [chatId, setChatId] = useState(groupConversationId);
  const [tempChatData, setTempChatData] = useState<any>([]);
  const [disableUpload, setDisableUpload] = useState<boolean>(false);

  useEffect(() => {
    if (groupConversationId) {
      setChatId(groupConversationId);
    }
  }, [groupConversationId]);

  const options = chatId
    ? {conversationId: chatId, currentUserId: userData?.id}
    : {enabled: false};

  const {
    data: conversionData,
    isLoading: conversionIsLoading,
    fetchNextPage: conversionLoadMore,
    hasNextPage: conversionHasNextPage,
    isFetchingNextPage: conversionIsFetchingNextPage,
    refetch: refetchLatestConversation,
    isSuccess: isSuccessGetConversation,
  } = useGetConversation(
    {...options, order: {createdAt: SortEnumType.Desc}},
    20,
  );

  const {
    mutate: sendMessageMutate,
    isLoading: sendMessageIsLoading,
    reset: resetCreateMessage,
  } = useCreateGroupMessage(async variables => {
    if (variables?.messageType === 'TEXT') {
      if (variables?.conversationId) {
        //#region ---------------cancel queries
        await queryClient.cancelQueries([
          queryKeys.conversation,
          {conversationId: variables?.conversationId},
        ]);
        //#endregion ------------cancel queries

        //#region ---------------get previous data
        const previousConversationData = queryClient.getQueryData([
          queryKeys.conversation,
          {conversationId: variables?.conversationId},
        ]);
        let oldUserConversationData = previousConversationData;
        //#endregion ------------get previous data

        //#region ---------------update
        if (oldUserConversationData?.pages?.length > 0) {
          const conversationData = oldUserConversationData?.pages?.map(
            (item: any) => {
              let temp = Object.assign({}, item);
              let items = item.message_getConversation?.result?.items;
              items.unshift({
                ...variables,
                local: variables?.photoUrl ? true : false,
                id: Math.floor(Math.random() * 10000 + 1),
                senderId: userData?.id,
                loading: true,
              });
              temp.message_getConversation.result.items = items;
              return temp;
            },
          );
          oldUserConversationData.pages = conversationData;
        }
        //#endregion ------------update

        //#region ---------------set new data
        queryClient.setQueriesData(
          [queryKeys.conversation, {conversationId: variables?.conversationId}],
          oldUserConversationData,
        );
        inputRef?.current?.clear();
        //#endregion ------------set new data

        //#region ---------------return
        return {previousConversationData};
        //#endregion ------------return
      }
    } else {
      setTempChatData((prevState: any) => [
        ...prevState,
        {
          ...variables,
          local: variables?.photoUrl ? true : false,
          id: Math.floor(Math.random() * 10000 + 1),
          senderId: userData?.id,
          loading: true,
        },
      ]);
    }
  });

  const items = conversionData?.pages ?? [];

  const sections = items?.reduce((acc, item: any) => {
    const title = dayjs(item?.createdAt).format('DD/MM/YYYY');
    const date = item?.createdAt;
    const index = acc.findIndex(section => section?.title?.title === title);
    if (index >= 0) {
      acc[index]?.data?.push(item);
    } else {
      acc.push({title: {title, date}, data: [item]});
    }
    return acc;
  }, []);

  const onSubmitMessage = (msg: string) => {
    onSendMessage({type: 'text', msg});
  };

  const onSubmitImage = async (image: any) => {
    setDisableUpload(true);
    if (chatId) {
      //#region ---------------cancel queries
      await queryClient.cancelQueries([
        queryKeys.conversation,
        {conversationId: chatId},
      ]);
      //#endregion ------------cancel queries

      //#region ---------------get previous data
      const previousConversationData = queryClient.getQueryData([
        queryKeys.conversation,
        {conversationId: chatId},
      ]);
      let oldUserConversationData = previousConversationData;
      //#endregion ------------get previous data

      //#region ---------------update
      if (oldUserConversationData?.pages?.length > 0) {
        const conversationData = oldUserConversationData?.pages?.map(
          (item: any) => {
            let temp = Object.assign({}, item);
            let items = item.message_getConversation?.result?.items;
            items.unshift({
              ...(chatId && {conversationId: chatId}),
              messageType: 'PHOTO',
              photoUrl: image?.path,
              local: true,
              id: Math.floor(Math.random() * 10000 + 1),
              senderId: userData?.id,
              loading: true,
            });
            temp.message_getConversation.result.items = items;
            return temp;
          },
        );
        oldUserConversationData.pages = conversationData;
      }
      //#endregion ------------update

      //#region ---------------set new data
      queryClient.setQueriesData(
        [queryKeys.conversation, {conversationId: chatId}],
        oldUserConversationData,
      );
      inputRef?.current?.clear();
      //#endregion ------------set new data

      uploadFileMutate(image, {
        onSuccess: (successData: any) => {
          if (successData?.uploadedUrl) {
            onSendMessage({
              type: 'image',
              image: successData?.uploadedUrl,
              previousConversationData,
            });
            setDisableUpload(false);
          } else {
            setDisableUpload(false);
          }
        },
      });
    } else {
      setTempChatData((prevState: any) => [
        ...prevState,
        {
          messageType: 'PHOTO',
          photoUrl: image?.path,
          local: true,
          id: Math.floor(Math.random() * 10000 + 1),
          senderId: userData?.id,
          loading: true,
        },
      ]);
      uploadFileMutate(image, {
        onSuccess: (successData: any) => {
          if (successData?.uploadedUrl) {
            onSendMessage({
              type: 'image',
              image: successData?.uploadedUrl,
              previousConversationData: [],
            });
            setDisableUpload(false);
          } else {
            setDisableUpload(false);
          }
        },
      });
    }
  };

  const onSendMessage = ({
    type,
    msg,
    image,
    previousConversationData,
  }: {
    type: string;
    msg?: string;
    image?: string;
    previousConversationData?: any;
  }) => {
    let msgObject: any = {
      isGroup: true,
      isByAmin: false,
      ...(chatId && {conversationId: chatId}),
    };

    switch (type) {
      case 'text':
        msgObject.text = msg;
        msgObject.messageType = MessageTypes.Text;
        break;
      case 'image':
        msgObject.photoUrl = image;
        msgObject.messageType = MessageTypes.Photo;
        break;
      default:
        break;
    }
    sendMessageMutate(msgObject, {
      onSuccess: (successData: any, variables?: any, context?: any) => {
        if (
          successData?.message_createGroupMessage?.status ===
          ResponseStatus.Success
        ) {
          if (!chatId) {
            setChatId(
              successData.message_createGroupMessage?.result?.conversationId,
            );
            setGroupConversationId(
              successData.message_createGroupMessage?.result?.conversationId,
            );
          }
          refetchLatestConversation();
        } else {
          if (type === 'image') {
            queryClient.setQueriesData(
              [queryKeys.conversation, {conversationId: chatId}],
              previousConversationData,
            );
          } else {
            queryClient.setQueriesData(
              [queryKeys.conversation, {conversationId: chatId}],
              context?.previousConversationData,
            );
          }
        }
      },
      onError(errorData, variables?: any, context?: any) {
        if (type === 'image') {
          queryClient.setQueriesData(
            [queryKeys.conversation, {conversationId: chatId}],
            previousConversationData,
          );
        } else {
          queryClient.setQueriesData(
            [queryKeys.conversation, {conversationId: chatId}],
            context?.previousConversationData,
          );
        }
      },
    });
  };

  const onLoadMore = () => {
    if (conversionHasNextPage) {
      conversionLoadMore?.();
    }
  };

  const scrollToTop = () => {
    sectionListRef?.current?.scrollToOffset?.({animated: true, offset: 0});
  };

  const cancelOnPress = async (inputItem: any) => {
    if (items?.length > 0) {
      //#region ------------cancel queries
      await queryClient.cancelQueries([
        queryKeys.conversation,
        {conversationId: chatId},
      ]);
      //#endregion ------------cancel queries

      //#region ---------------get previous data
      const previousConversationData = queryClient.getQueryData([
        queryKeys.conversation,
        {conversationId: chatId},
      ]);
      let oldUserConversationData = previousConversationData;
      //#endregion ------------get previous data

      //#region ---------------update
      if (oldUserConversationData?.pages?.length > 0) {
        const conversationData = oldUserConversationData?.pages?.map(
          (item: any) => {
            let temp = Object.assign({}, item);
            const tempItems =
              item.message_getConversation?.result?.items?.filter(
                (el: any) => el?.id !== inputItem?.id,
              );
            temp.message_getConversation.result.items = tempItems;
            return temp;
          },
        );
        oldUserConversationData.pages = conversationData;
      }
      //#endregion ------------update

      //#region ---------------set new data
      queryClient.setQueriesData(
        [queryKeys.conversation, {conversationId: chatId}],
        oldUserConversationData,
      );
      //#endregion ------------set new data

      resetUpload?.();
      resetCreateMessage?.();
    } else if (tempChatData?.length > 0) {
      setTempChatData((prevState: any) =>
        prevState?.filter((el: any) => el?.id !== inputItem?.id),
      );
      resetUpload?.();
      resetCreateMessage?.();
    } else {
      setTempChatData([]);
      resetUpload?.();
      resetCreateMessage?.();
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <ListItemMessageContent
        {...{item, cancelOnPress, isChatWithAdmin: true}}
      />
    );
  };

  const renderSectionFooter = ({section}: {section: any}) => {
    return (
      <VStack>
        <HStack justifyContent="center" alignItems="center" zIndex={4}>
          <Center px="4" bg={Colors.WHITE_F}>
            <CustomText
              fontSize={fontSize.xTiny}
              color={Colors.Topaz}
              textAlign="center">
              {formatDate(section?.title?.date)}
            </CustomText>
          </Center>
        </HStack>
        <Divider position="absolute" top="50%" />
      </VStack>
    );
  };

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData
        inverted
        showText
        customIcon={<Help2 />}
        text={t('common.huduSupport')}
        description={t('common.startConversation')}
      />
    ),
    [t],
  );

  const itemSeparatorComponent = useCallback(() => <Box h="8px" />, []);

  const sectionSeparatorComponent = useCallback(() => <Box h="16px" />, []);

  const loading = conversionIsLoading;

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader
        pb="0"
        backAction
        centerHeaderAlignItems="center"
        centerHeader={<SmallHuduLogo fillColor={Colors.PRIMARY} />}
      />
      <CustomSectionList
        inverted
        refreshing={false}
        ref={sectionListRef}
        onLayout={scrollToTop}
        renderItem={renderItem}
        sections={sections ?? []}
        showScrollToTop
        isLoading={loading}
        isFetchingNextPage={conversionIsFetchingNextPage}
        renderSectionFooter={renderSectionFooter}
        listEmptyComponent={listEmptyComponent}
        itemSeparatorComponent={itemSeparatorComponent}
        SectionSeparatorComponent={sectionSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
        onEndReached={onLoadMore}
      />
      <ChatInput
        ref={inputRef}
        {...{
          onSubmitMessage,
          onSubmitImage,
          disabled: disableUpload,
          maxLength: 500,
        }}
      />
    </CustomContainer>
  );
};

export default GroupsChatScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    padding: verticalScale(24),
  },
  image: {
    height: scale(32),
    width: scale(32),
    borderRadius: 100,
  },
});
