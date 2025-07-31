import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import queryKeys from '~/constants/queryKeys';
import {
  Badge_GetBadgeQuery,
  Badge_GetBadgeQueryVariables,
  Badge_GetBadgesQuery,
  Badge_GetBadgesQueryVariables,
} from '~/generated/graphql';
import {GET_BADGE, GET_BADGES} from '~/graphql/badge';
import {fetcher} from '~/graphql/graphQLClient';

export const useGetBadge = (entityId: number = 0) => {
  return useQuery<Badge_GetBadgeQuery, any, Badge_GetBadgeQueryVariables, any>(
    [queryKeys.getBadge, entityId],
    async () => {
      return fetcher(GET_BADGE, {entityId})();
    },
  );
};

export const useGetBadges = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    Badge_GetBadgesQuery,
    any,
    Badge_GetBadgesQueryVariables,
    any
  >(
    [queryKeys.getBadges, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_BADGES, {
        skip: pageParam * 40,
        take: take || 40,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Badge_GetBadgesQuery,
        allPages: Badge_GetBadgesQuery[],
      ) => {
        if (lastPage?.badge_getBadges?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.badge_getBadges?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.badge_getBadges?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
