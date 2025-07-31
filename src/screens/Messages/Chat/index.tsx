import dayjs from 'dayjs';
import {Box, Center, Divider, HStack, VStack} from 'native-base';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {SectionList, StyleSheet} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';
import {Document, EmptyMessages} from '~/assets/icons';
import images from '~/assets/images';
import {
  ChatInput,
  CustomContainer,
  CustomImage,
  CustomSectionList,
  CustomText,
  CustomTouchable,
  EmptyData,
  InfoModal,
  ListItemMessageContent,
  ProjectDetailsModal,
  ScreensHeader,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {MessageTypes, ResponseStatus, SortEnumType} from '~/generated/graphql';
import {useCreateMessage, useGetConversation} from '~/hooks/message';
import {useUploadFile} from '~/hooks/upload';
import {useGetMinimalProfile} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isIllegal} from '~/utils/helper';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';
import {useDateTimeFormat} from '~/utils/utils';

const ChatScreen = ({route}: {route: any}) => {
  const {conversationId, user, projectId} = route?.params;

  const {setLastConversationId, userData} = userDataStore(state => state);
  const queryClient = useQueryClient();
  const {formatDate} = useDateTimeFormat();
  const {t} = useTranslation();
  const inputRef = useRef(null);

  const {
    mutate: uploadFileMutate,
    isLoading: isUploading,
    reset: resetUpload,
  } = useUploadFile();

  const sectionListRef = useRef<SectionList>(null);

  const [chatId, setChatId] = useState(conversationId);
  const [tempChatData, setTempChatData] = useState<any>([]);
  const [disableUpload, setDisableUpload] = useState<boolean>(false);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (conversationId) {
      setChatId(conversationId);
      setLastConversationId(conversationId);
    }
  }, [conversationId]);

  const options = chatId ? {conversationId: chatId} : {enabled: false};

  const {data: getProfile} = useGetMinimalProfile({userId: user?.id});

  const profile = useMemo(() => {
    return getProfile?.user_getProfile?.result ?? {};
  }, [getProfile]);

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
  } = useCreateMessage(async variables => {
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
              if (items) {
                items.unshift({
                  ...variables,
                  local: variables?.photoUrl ? true : false,
                  id: Math.floor(Math.random() * 10000 + 1),
                  senderId: userData?.id,
                  loading: true,
                });
              } else {
                items = [
                  {
                    // ...variables,
                    local: variables?.photoUrl ? true : false,
                    id: Math.floor(Math.random() * 10000 + 1),
                    senderId: userData?.id,
                    loading: true,
                  },
                ];
              }
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

  const items = useMemo(() => {
    return conversionData?.pages;
  }, [conversionData]);

  const sections = useMemo(() => {
    return items?.reduce((acc, item: any) => {
      const title = dayjs(item?.createdAt).format('MM/DD/YYYY');
      const date = item?.createdAt;
      const index = acc.findIndex(section => section?.title?.title === title);
      if (index >= 0) {
        acc[index]?.data?.push(item);
      } else {
        acc.push({title: {title, date}, data: [item]});
      }
      return acc;
    }, []);
  }, [items]);

  useEffect(() => {
    if (isSuccessGetConversation) {
      queryClient.invalidateQueries(queryKeys.userMessages);
      queryClient.invalidateQueries(queryKeys.unReadMessages);
    }
  }, [isSuccessGetConversation]);

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
              receiverId: user?.id,
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
          receiverId: user?.id,
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
    if (type === 'image') {
      sendMessage({type, msg, image, previousConversationData});
    } else {
      if (isIllegal(msg)) {
        setInfoModalVisible(true);
      } else {
        sendMessage({type, msg, image, previousConversationData});
      }
    }
  };

  const onCloseInfoModal = () => {
    setInfoModalVisible(false);
  };

  const sendMessage = ({
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
      receiverId: user?.id,
      isGroup: false,
      isByAmin: false,
      projectId,
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
          successData?.message_createMessage?.status === ResponseStatus.Success
        ) {
          if (!chatId) {
            setChatId(
              successData.message_createMessage?.result?.conversationId,
            );
            setLastConversationId(
              successData.message_createMessage?.result?.conversationId,
            );
          }
          refetchLatestConversation();
          queryClient.invalidateQueries(queryKeys.getConversationsProject, {
            exact: false,
          });
          queryClient.invalidateQueries(
            queryKeys.getUserMessagesGroupedByUser,
            {
              exact: false,
            },
          );
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
        {...{item, cancelOnPress, userImage: profile?.imageAddress}}
      />
    );
  };

  const renderSectionFooter = useCallback(
    ({section}: {section: any}) => {
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
    },
    [formatDate],
  );

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData showText={false} customIcon={<EmptyMessages />} inverted />
    ),
    [],
  );

  const itemSeparatorComponent = useCallback(() => <Box h="8px" />, []);

  const sectionSeparatorComponent = useCallback(() => <Box h="16px" />, []);

  return (
    <CustomContainer isLoading={conversionIsLoading}>
      <ScreensHeader
        pb="0"
        backAction
        rightHeader={projectId && <ProjectIcon {...{projectId}} />}
        centerHeader={
          <HStack flex={1} h="100%" mx="48px" alignItems="center" space="4">
            <CustomImage
              imageSource={profile?.imageAddress}
              style={styles.image}
              resizeMode="cover"
              errorImage={images.avatarErrorImage}
              errorText={profile?.userName ?? profile?.email}
            />
            <CustomText
              color={Colors.WHITE_F}
              numberOfLines={1}
              fontSize={fontSize.xNormal}
              fontFamily={fontFamily.medium}>
              {profile?.userName ?? ''}
            </CustomText>
          </HStack>
        }
      />
      <CustomSectionList
        inverted
        refreshing={false}
        ref={sectionListRef}
        onLayout={scrollToTop}
        renderItem={renderItem}
        sections={sections ?? []}
        isLoading={conversionIsLoading}
        showScrollToTop
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
      {infoModalVisible && (
        <InfoModal
          isVisible={infoModalVisible}
          onClose={onCloseInfoModal}
          title={t('messages.errors.warning')}
          description={t('messages.errors.restrictError')}
          submitTitle={t('messages.errors.iUnderstand')}
        />
      )}
    </CustomContainer>
  );
};

export default ChatScreen;

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

const ProjectIcon = ({projectId}: {projectId: any}) => {
  const modalRef = useRef<ModalRef>(null);

  const projectOnPress = () => {
    modalRef?.current?.open();
  };

  return (
    <>
      <CustomTouchable onPress={projectOnPress}>
        <Document />
      </CustomTouchable>
      <ProjectDetailsModal ref={modalRef} projectId={projectId} />
    </>
  );
};
