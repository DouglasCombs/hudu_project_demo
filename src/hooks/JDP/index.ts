import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import queryKeys from '~/constants/queryKeys';
import {
  TazworkOrders_GetOrdersQuery,
  TazworkOrders_GetOrdersQueryVariables,
  TazworkOrders_GetUserTazWorkRateQuery,
  TazworkOrders_GetUserTazWorkRateQueryVariables,
  TazworkProducts_GetProductsQuery,
  TazworkProducts_GetProductsQueryVariables,
  Tazwork_SubmitOrderMutation,
} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {TAZWORK_SUBMIT_ORDER} from '~/graphql/JDP/mutations';
import {
  GET_ORDER_TAZWORK,
  GET_PRODUCTS_TAZWORK,
  GET_USER_TAZWORK_RATE,
} from '~/graphql/JDP/queries';
import {fetcher} from '~/graphql/graphQLClient';
import {showErrorMessage} from '~/utils/utils';

export const useSubmitOrderTazwork = () => {
  return useMutation<Tazwork_SubmitOrderMutation>(
    async (productId: number) => {
      return fetcher(TAZWORK_SUBMIT_ORDER, productId)();
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(queryKeys.getBadges);
        queryClient.invalidateQueries(queryKeys.getBadge);
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetUserTaworkRate = (userId: number = 0) => {
  return useQuery<
    TazworkOrders_GetUserTazWorkRateQuery,
    any,
    TazworkOrders_GetUserTazWorkRateQueryVariables,
    any
  >([queryKeys.getUserTazworkRate, userId], async () => {
    return fetcher(GET_USER_TAZWORK_RATE, {userId})();
  });
};

export const useGetTazworkProducts = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    TazworkProducts_GetProductsQuery,
    any,
    TazworkProducts_GetProductsQueryVariables,
    any
  >(
    [queryKeys.getProductsTazwork, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_PRODUCTS_TAZWORK, {
        skip: pageParam * 40,
        take: take || 40,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: TazworkProducts_GetProductsQuery,
        allPages: TazworkProducts_GetProductsQuery[],
      ) => {
        if (
          lastPage?.tazworkProducts_getProducts?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.tazworkProducts_getProducts?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.tazworkProducts_getProducts?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetTazworkOrder = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    TazworkOrders_GetOrdersQuery,
    any,
    TazworkOrders_GetOrdersQueryVariables,
    any
  >(
    [queryKeys.getOrderTazwork, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_ORDER_TAZWORK, {
        skip: pageParam * 40,
        take: take || 40,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: TazworkOrders_GetOrdersQuery,
        allPages: TazworkOrders_GetOrdersQuery[],
      ) => {
        if (lastPage?.tazworkOrders_getOrders?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.tazworkOrders_getOrders?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.tazworkOrders_getOrders?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
