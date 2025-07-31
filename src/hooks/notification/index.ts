import {useEffect} from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import {fetcher} from '~/graphql/graphQLClient';
import queryKeys from '~/constants/queryKeys';
import {NOTIFICATION_GET_NOTIFICATIONS} from '~/graphql/notification/queries';
import {NOTIFICATION_ADDED} from '~/graphql/notification/subscriptions';
import {
  NOTIFICATION_ADD_NOTIFICATION,
  NOTIFICATION_READ_NOTIFICATION,
  NOTIFICATION_DELETE_NOTIFICATION,
} from '~/graphql/notification/mutations';
import {
  Notification_AddNotificationMutation,
  Notification_AddNotificationMutationVariables,
  Notification_GetNotificationsQuery,
  Notification_GetNotificationsQueryVariables,
  Notification_ReadNotificationMutation,
  Notification_ReadNotificationMutationVariables,
  Notification_DeleteNotificationMutationVariables,
  Notification_DeleteNotificationMutation,
  ResponseStatus,
} from '~/generated/graphql';
import {Config} from 'react-native-config';
import {useGetMessages} from '~/utils/helper';
import {showErrorMessage} from '~/utils/utils';

export const useGetNotifications = (
  options: any = {},
  pageSize = PAGE_SIZE,
) => {
  return useInfiniteQuery<
    Notification_GetNotificationsQuery,
    any,
    Notification_GetNotificationsQueryVariables,
    any
  >(
    [queryKeys.notifications],
    async ({pageParam = 0}) => {
      return fetcher(NOTIFICATION_GET_NOTIFICATIONS, {
        skip: pageParam * pageSize,
        take: pageSize,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Notification_GetNotificationsQuery,
        allPages: Notification_GetNotificationsQuery[],
      ) => {
        if (
          lastPage?.notification_getNotifications?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.notification_getNotifications?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetUnreadNotifications = (options: any = {}) => {
  return useInfiniteQuery<
    Notification_GetNotificationsQuery,
    any,
    Notification_GetNotificationsQueryVariables,
    any
  >(
    [queryKeys.unReadNotifications],
    async ({pageParam = 0}) => {
      return fetcher(NOTIFICATION_GET_NOTIFICATIONS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Notification_GetNotificationsQuery,
        allPages: Notification_GetNotificationsQuery[],
      ) => {
        if (
          lastPage?.notification_getNotifications?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.notification_getNotifications?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.notification_getNotifications?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useAddNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<
    Notification_AddNotificationMutation,
    any,
    Notification_AddNotificationMutationVariables
  >(
    async (notifications: any) => {
      return fetcher(NOTIFICATION_ADD_NOTIFICATION, {
        notifications,
      })();
    },
    {
      onSuccess: successData => {
        if (
          successData?.notification_addNotification?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.notifications);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useReadNotification = () => {
  return useMutation<
    Notification_ReadNotificationMutation,
    any,
    Notification_ReadNotificationMutationVariables
  >(
    async (notificationId: any) => {
      return fetcher(NOTIFICATION_READ_NOTIFICATION, {
        notificationId,
      })();
    },
    {
      onSuccess: successData => {
        if (
          successData?.notification_readNotification?.status ===
          ResponseStatus.Success
        ) {
        }
      },
    },
  );
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Notification_DeleteNotificationMutation,
    any,
    Notification_DeleteNotificationMutationVariables
  >(
    async (notificationId: any) => {
      return fetcher(NOTIFICATION_DELETE_NOTIFICATION, {
        notificationId,
      })();
    },
    {
      onMutate: async variables => {
        //#region ---------------cancel queries
        await queryClient.cancelQueries(queryKeys.notifications);
        //#endregion ------------cancel queries

        //#region ---------------get previous data
        const previousNotificationData = queryClient.getQueryData([
          queryKeys.notifications,
        ]);
        let oldNotificationData = previousNotificationData;
        //#endregion ------------get previous data

        //#region ---------------notifications
        if (oldNotificationData?.pages?.length > 0) {
          const notificationDataChecked = oldNotificationData?.pages?.map(
            (item: any) => {
              let temp = Object.assign({}, item);
              const tempItems =
                item.notification_getNotifications?.result?.items?.filter(
                  (el: any) => el?.id !== variables,
                );
              temp.notification_getNotifications.result.items = tempItems;
              return temp;
            },
          );
          oldNotificationData.pages = notificationDataChecked;
        }
        //#endregion ------------notifications

        //#region ---------------set new data
        queryClient.setQueriesData(
          queryKeys.notifications,
          oldNotificationData,
        );
        //#endregion ------------set new data

        //#region ---------------return
        return {previousNotificationData};
        //#endregion ------------return
      },
      onSuccess: (successData, variables: any, context: any) => {
        if (
          successData?.notification_deleteNotification?.status ===
          ResponseStatus.Success
        ) {
        } else {
          queryClient.setQueriesData(
            queryKeys.notifications,
            context.previousNotificationData,
          );
          showResponseMessage(
            successData?.notification_deleteNotification?.status,
          );
        }
      },
      onError: (errorData: any, variables: any, context: any) => {
        queryClient.setQueriesData(
          queryKeys.notifications,
          context.previousNotificationData,
        );
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useNotificationSubscription = ({
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
        const notification = {
          id: '1',
          type: 'start',
          payload: {
            variables: {userId: userId},
            extensions: {},
            operationName: null,
            query: NOTIFICATION_ADDED,
          },
        };
        ws.send(JSON.stringify(notification));
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
