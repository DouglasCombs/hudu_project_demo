import {useCallback, useEffect, useRef} from 'react';
import {Config} from 'react-native-config';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  ChatGpt_CreateChatUsingAzureQuery,
  ConversationDtoFilterInput,
  ConversationDtoSortInput,
  ConversationsProjectDtoFilterInput,
  ConversationsProjectDtoSortInput,
  MessageInput,
  Message_CreateGroupMessageMutation,
  Message_CreateGroupMessageMutationVariables,
  Message_CreateMessageMutation,
  Message_CreateMessageMutationVariables,
  Message_DeleteMessageMutation,
  Message_DeleteMessageMutationVariables,
  Message_GetConversationForUserQuery,
  Message_GetConversationForUserQueryVariables,
  Message_GetConversationQuery,
  Message_GetConversationQueryVariables,
  Message_GetConversationsProjectQuery,
  Message_GetConversationsProjectQueryVariables,
  Message_GetGroupsQuery,
  Message_GetGroupsQueryVariables,
  Message_GetUserMessagesGroupedByUserQuery,
  Message_GetUserMessagesGroupedByUserQueryVariables,
  Message_GetUserMessagesQuery,
  Message_GetUserMessagesQueryVariables,
  Message_HasUnreadChatQuery,
  Message_HasUnreadChatQueryVariables,
  Message_RemoveConversationMutation,
  Message_RemoveConversationMutationVariables,
  ResponseStatus,
  UserMessageGroupFilterInput,
} from '~/generated/graphql';
import {fetcher} from '~/graphql/graphQLClient';
import {
  MESSAGE_CREATE_GROUP_MESSAGE,
  MESSAGE_CREATE_MESSAGE,
  MESSAGE_DELETE_MESSAGE,
  MESSAGE_GET_CONVERSATION_FOR_USER,
  MESSAGE_REMOVE_CONVERSATION,
} from '~/graphql/message/mutations';
import {
  MESSAGE_GET_CONVERSATION,
  MESSAGE_GET_CONVERSATIONS_PROJECT,
  MESSAGE_GET_GROUPS,
  MESSAGE_GET_GROUP_MEMBERS,
  MESSAGE_GET_USER_MESSAGES,
  MESSAGE_GET_USER_MESSAGES_GROUPED_BY_USER,
  MESSAGE_HAS_UNREAD_CHAT,
} from '~/graphql/message/queries';
import {
  MESSAGE_ADDED,
  SUBSCRIBE_TO_GROUP_MESSAGE_ADDED,
} from '~/graphql/message/subscriptions';
import {GPT_QUESTIONS} from '~/graphql/project/queries';
import {showErrorMessage} from '~/utils/utils';

export const useChatGPT = (message: string) => {
  const res = useQuery<ChatGpt_CreateChatUsingAzureQuery>(
    [queryKeys.chatGPT, message],
    async () => {
      return fetcher<ChatGpt_CreateChatUsingAzureQuery, any>(
        GPT_QUESTIONS,
        message,
      )();
    },
    {enabled: !!message},
  );

  return {
    ...res,
    questions: res?.data?.chatGpt_createChatUsingAzure?.result?.questionDto,
  };
};

export const useGetConversation = (options: any = {}, pageSize = PAGE_SIZE) => {
  return useInfiniteQuery<
    Message_GetConversationQuery,
    any,
    Message_GetConversationQueryVariables,
    any
  >(
    [queryKeys.conversation, {conversationId: options?.conversationId}],
    async ({pageParam = 0}) => {
      return fetcher(MESSAGE_GET_CONVERSATION, {
        skip: pageParam * pageSize,
        take: pageSize,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Message_GetConversationQuery,
        allPages: Message_GetConversationQuery[],
      ) => {
        if (lastPage?.message_getConversation?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.message_getConversation?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetUserMessages = (options: any = {}) => {
  return useInfiniteQuery<
    Message_GetUserMessagesQuery,
    any,
    Message_GetUserMessagesQueryVariables,
    any
  >(
    [queryKeys.userMessages],
    async ({pageParam = 0}) => {
      return fetcher(MESSAGE_GET_USER_MESSAGES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Message_GetUserMessagesQuery,
        allPages: Message_GetUserMessagesQuery[],
      ) => {
        if (lastPage?.message_getUserMessages?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.message_getUserMessages?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetConversationsProject = ({
  where,
  order,
  options = {},
  pageSize = PAGE_SIZE,
  userId,
  enabled,
}: {
  where?: ConversationsProjectDtoFilterInput;
  order?: ConversationsProjectDtoSortInput[] | ConversationsProjectDtoSortInput;
  pageSize?: any;
  options?: any;
  userId?: number;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Message_GetConversationsProjectQuery,
    any,
    Message_GetConversationsProjectQueryVariables,
    any
  >(
    [queryKeys.getConversationsProject, {userId}],
    async ({pageParam = 0}) => {
      return fetcher(MESSAGE_GET_CONVERSATIONS_PROJECT, {
        skip: pageParam * pageSize,
        take: pageSize,
        ...options,
        where,
        order,
        userId,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Message_GetConversationsProjectQuery,
        allPages: Message_GetConversationsProjectQuery[],
      ) => {
        if (
          lastPage?.message_getConversationsProject?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.message_getConversationsProject?.result?.items)
            .flat(),
        };
      },
      enabled,
      ...options,
    },
  );
};

export const useGetUserMessagesGroupedByUser = ({
  where,
  order,
  options = {},
  pageSize = PAGE_SIZE,
  currentUserId,
}: {
  where?: ConversationDtoFilterInput;
  order?: ConversationDtoSortInput[] | ConversationDtoSortInput;
  pageSize?: any;
  options?: any;
  currentUserId?: number;
}) => {
  return useInfiniteQuery<
    Message_GetUserMessagesGroupedByUserQuery,
    any,
    Message_GetUserMessagesGroupedByUserQueryVariables,
    any
  >(
    [queryKeys.getUserMessagesGroupedByUser, currentUserId],
    async ({pageParam = 0}) => {
      return fetcher(MESSAGE_GET_USER_MESSAGES_GROUPED_BY_USER, {
        skip: pageParam * pageSize,
        take: pageSize,
        ...options,
        where,
        order,
        currentUserId,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Message_GetUserMessagesGroupedByUserQuery,
        allPages: Message_GetUserMessagesGroupedByUserQuery[],
      ) => {
        if (
          lastPage?.message_getUserMessagesGroupedByUser?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.message_getUserMessagesGroupedByUser?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetUnreadMessages = (options: any = {}) => {
  return useQuery<
    Message_HasUnreadChatQuery,
    any,
    Message_HasUnreadChatQueryVariables,
    any
  >(
    [queryKeys.unReadMessages, options],
    async () => {
      return fetcher(MESSAGE_HAS_UNREAD_CHAT, options)();
    },
    {
      ...options,
    },
  );
};

export const useCreateMessage = (onMutate?: (variables: any) => void) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Message_CreateMessageMutation,
    any,
    Message_CreateMessageMutationVariables
  >(
    async (messageInput: MessageInput) => {
      return fetcher(MESSAGE_CREATE_MESSAGE, {messageInput})();
    },
    {
      onMutate: onMutate,
      onSuccess: successData => {
        if (
          successData?.message_createMessage?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.userMessages);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    mutation.reset();
  }, [mutation.reset]);

  return {
    ...mutation,
    abortControllerRef,
    reset,
  };
};

export const useGetGroupMessages = ({
  options = {},
  userId,
  where,
}: {
  options?: any;
  userId: number;
  where?: ConversationDtoFilterInput;
}) => {
  return useInfiniteQuery<
    Message_GetGroupsQuery,
    any,
    Message_GetGroupsQueryVariables,
    any
  >(
    [queryKeys.getGroupMessages, userId],
    async ({pageParam = 0}) => {
      return fetcher(MESSAGE_GET_GROUPS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        userId,
        ...where,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Message_GetGroupsQuery,
        allPages: Message_GetGroupsQuery[],
      ) => {
        if (lastPage?.message_getGroups?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.message_getGroups?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetGroupMembers = ({
  options = {},
  where,
  conversationId,
}: {
  options?: UserMessageGroupFilterInput;
  where?: ConversationDtoFilterInput;
  conversationId: number;
}) => {
  return useInfiniteQuery<any>(
    [queryKeys.getGroupMembers],
    async ({pageParam = 0}) => {
      return fetcher(MESSAGE_GET_GROUP_MEMBERS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        conversationId,
        ...where,
        ...options,
      })();
    },
    {
      getNextPageParam: (lastPage: any, allPages: any) => {
        if (lastPage?.message_getGroupMembers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.message_getGroupMembers?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetGroupMessagesMutation = () => {
  return useMutation<
    Message_GetGroupsQuery,
    any,
    Message_GetGroupsQueryVariables
  >(
    async ({
      userId,
      where,
    }: {
      userId?: number;
      where?: ConversationDtoFilterInput;
    }) => {
      return fetcher(MESSAGE_GET_GROUPS, {userId, where})();
    },
    {
      onSuccess: successData => {
        if (successData?.message_getGroups?.status === ResponseStatus.Success) {
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useCreateGroupMessage = (onMutate?: (variables: any) => void) => {
  const abortControllerRef = useRef<AbortController | null>(null);
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Message_CreateGroupMessageMutation,
    any,
    Message_CreateGroupMessageMutationVariables
  >(
    async (messageInput: MessageInput) => {
      return fetcher(MESSAGE_CREATE_GROUP_MESSAGE, {messageInput})();
    },
    {
      onMutate: onMutate,
      onSuccess: successData => {
        if (
          successData?.message_createGroupMessage?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getGroupMessages);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    mutation.reset();
  }, [mutation.reset]);

  return {
    ...mutation,
    abortControllerRef,
    reset,
  };
};

export const useGetConversationId = () => {
  return useMutation<
    Message_GetConversationForUserQuery,
    any,
    Message_GetConversationForUserQueryVariables
  >(
    async ({
      otherUserId,
      currentUserId,
      projectId,
    }: {
      otherUserId: number;
      currentUserId: number;
      projectId: number;
    }) => {
      return fetcher(MESSAGE_GET_CONVERSATION_FOR_USER, {
        otherUserId,
        currentUserId,
        projectId,
      })();
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_DeleteMessageMutation,
    any,
    Message_DeleteMessageMutationVariables
  >(
    async (messageId: any) => {
      return fetcher(MESSAGE_DELETE_MESSAGE, {messageId})();
    },
    {
      onSuccess: successData => {
        if (
          successData?.message_deleteMessage?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.userMessages);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useRemoveConversation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Message_RemoveConversationMutation,
    any,
    Message_RemoveConversationMutationVariables
  >(
    async (conversationId: any) => {
      return fetcher(MESSAGE_REMOVE_CONVERSATION, {
        conversationId,
      })();
    },
    {
      onSuccess: successData => {
        if (
          successData?.message_removeConversation?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.conversation);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useMessageSubscription = ({
  userId,
  callback,
}: {
  userId: number;
  callback: (data: any) => void;
}) => {
  useEffect(() => {
    const fetchData = async () => {
      const ws = new WebSocket(Config.API_URL, 'graphql-ws');
      ws.onopen = () => {
        const message = {
          id: '1',
          type: 'start',
          payload: {
            variables: {userId: userId},
            extensions: {},
            operationName: null,
            query: MESSAGE_ADDED,
          },
        };
        ws.send(JSON.stringify(message));
      };
      ws.onmessage = callback;
      return () => {
        // Unsubscribe before exit
        ws.send(JSON.stringify({id: '1', type: 'stop'}));
        ws.close();
      };
    };

    fetchData();
  }, []);
};

export const useGroupMessageSubscription = ({
  userId,
  callback,
}: {
  userId: number;
  callback: (data: any) => void;
}) => {
  useEffect(() => {
    const fetchData = async () => {
      const ws = new WebSocket(Config.API_URL, 'graphql-ws');
      ws.onopen = () => {
        const message = {
          id: '1',
          type: 'start',
          payload: {
            variables: {userId: userId},
            extensions: {},
            operationName: null,
            query: SUBSCRIBE_TO_GROUP_MESSAGE_ADDED,
          },
        };
        ws.send(JSON.stringify(message));
      };
      ws.onmessage = callback;
      return () => {
        // Unsubscribe before exit
        ws.send(JSON.stringify({id: '1', type: 'stop'}));
        ws.close();
      };
    };
    fetchData();
  }, []);
};
