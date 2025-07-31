import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  Category_GetPinedCategoriesQuery,
  Category_GetPinedCategoriesQueryVariables,
  Category_PinCategoriesMutation,
  Category_PinCategoriesMutationVariables,
  Category_PinCategoryMutation,
  Category_PinCategoryMutationVariables,
  Category_UnPinCategoryMutation,
  Category_UnPinCategoryMutationVariables,
  PinCategoryFilterInput,
  ResponseStatus,
} from '~/generated/graphql';
import {
  CATEGORY_PIN_CATEGORIES,
  CATEGORY_PIN_CATEGORY,
  CATEGORY_UN_PIN_CATEGORY,
} from '~/graphql/category/mutations';
import {CATEGORY_GET_PINED_CATEGORIES} from '~/graphql/category/queries';
import {fetcher} from '~/graphql/graphQLClient';
import {useGetMessages} from '~/utils/helper';
import {showErrorMessage} from '~/utils/utils';

export const usePinCategories = () => {
  const {showResponseMessage} = useGetMessages();
  const queryClient = useQueryClient();
  return useMutation<
    Category_PinCategoriesMutation,
    any,
    Category_PinCategoriesMutationVariables
  >(
    async ({categoryIds}: {categoryIds: number[]}) => {
      return fetcher(CATEGORY_PIN_CATEGORIES, {
        categoryIds,
      })();
    },
    {
      onSuccess: successData => {
        if (
          successData?.category_pinCategories?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getPinedCategories);
          queryClient.invalidateQueries(queryKeys.getCategories);
        } else {
          showResponseMessage(successData?.category_pinCategories?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const usePinCategory = () => {
  const {showResponseMessage} = useGetMessages();
  const queryClient = useQueryClient();
  return useMutation<
    Category_PinCategoryMutation,
    any,
    Category_PinCategoryMutationVariables
  >(
    async ({categoryId}: {categoryId: number}) => {
      return fetcher(CATEGORY_PIN_CATEGORY, {
        categoryId,
      })();
    },
    {
      onSuccess: successData => {
        if (
          successData?.category_pinCategory?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getPinedCategories);
          queryClient.invalidateQueries(queryKeys.getCategories);
        } else {
          showResponseMessage(successData?.category_pinCategory?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useUnPinCategory = () => {
  const {showResponseMessage} = useGetMessages();
  const queryClient = useQueryClient();
  return useMutation<
    Category_UnPinCategoryMutation,
    any,
    Category_UnPinCategoryMutationVariables
  >(
    async ({categoryId}: {categoryId: number}) => {
      return fetcher(CATEGORY_UN_PIN_CATEGORY, {
        categoryId,
      })();
    },
    {
      onSuccess: successData => {
        if (
          successData?.category_unPinCategory?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getPinedCategories);
          queryClient.invalidateQueries(queryKeys.getCategories);
        } else {
          showResponseMessage(successData?.category_unPinCategory?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetPinedCategories = ({
  where,
  options = {},
  pageSize = PAGE_SIZE,
}: {
  where?: PinCategoryFilterInput;
  pageSize?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    Category_GetPinedCategoriesQuery,
    any,
    Category_GetPinedCategoriesQueryVariables,
    any
  >(
    [queryKeys.getPinedCategories, where],
    async ({pageParam = 0}) => {
      return fetcher(CATEGORY_GET_PINED_CATEGORIES, {
        skip: pageParam * pageSize,
        take: pageSize,
        where,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Category_GetPinedCategoriesQuery,
        allPages: Category_GetPinedCategoriesQuery[],
      ) => {
        if (
          lastPage?.category_getPinedCategories?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.category_getPinedCategories?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};
