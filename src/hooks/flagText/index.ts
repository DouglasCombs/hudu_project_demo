import {useInfiniteQuery} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  FlagTextFilterInput,
  FlagTextSortInput,
  FlagText_GetFlagTextsQuery,
  FlagText_GetFlagTextsQueryVariables,
  InputMaybe,
} from '~/generated/graphql';
import {FLAG_TEXT_GET_FLAG_TEXTS} from '~/graphql/flagText/queries';
import {fetcher} from '~/graphql/graphQLClient';
import {tempStore} from '~/stores';

export const useGetFlagTexts = ({
  where,
  order,
  options = {},
  pageSize = PAGE_SIZE,
}: {
  where?: InputMaybe<FlagTextFilterInput>;
  order?: InputMaybe<Array<FlagTextSortInput> | FlagTextSortInput>;
  pageSize?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    FlagText_GetFlagTextsQuery,
    any,
    FlagText_GetFlagTextsQueryVariables,
    any
  >(
    [queryKeys.getFlagTexts],
    async ({pageParam = 0}) => {
      return fetcher(FLAG_TEXT_GET_FLAG_TEXTS, {
        skip: pageParam * pageSize,
        take: pageSize,
        ...options,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: FlagText_GetFlagTextsQuery,
        allPages: FlagText_GetFlagTextsQuery[],
      ) => {
        if (lastPage?.flagText_getFlagTexts?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        const flatMapData = data?.pages
          ?.map(a => a?.flagText_getFlagTexts?.result?.items)
          .flat();
        tempStore.setState({flagTexts: flatMapData});
        return {
          ...data,
          pages: flatMapData,
        };
      },
      ...options,
    },
  );
};
