import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  LeaderBoard_GetLeaderBoardsQuery,
  LeaderBoard_GetLeaderBoardsQueryVariables,
  LeaderBoard_GetUsersLeaderBoardRankQuery,
  LeaderBoard_GetUsersLeaderBoardRankQueryVariables,
} from '~/generated/graphql';
import {fetcher} from '~/graphql/graphQLClient';
import {
  LEADER_BOARD_GET_LEADER_BOARDS,
  LEADER_BOARD_GET_LEADER_BOARD_RANK,
} from '~/graphql/leaderBoard/queries';

export const useGetLeaderBoards = (options: any = {}, pageSize = PAGE_SIZE) => {
  return useInfiniteQuery<
    LeaderBoard_GetLeaderBoardsQuery,
    any,
    LeaderBoard_GetLeaderBoardsQueryVariables,
    any
  >(
    [queryKeys.projects],
    async ({pageParam = 0}) => {
      return fetcher(LEADER_BOARD_GET_LEADER_BOARDS, {
        skip: pageParam * pageSize,
        take: pageSize,
      })();
    },
    {
      getNextPageParam: (
        lastPage: LeaderBoard_GetLeaderBoardsQuery,
        allPages: LeaderBoard_GetLeaderBoardsQuery[],
      ) => {
        if (
          lastPage?.leaderBoard_getLeaderBoards?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.leaderBoard_getLeaderBoards?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetLeaderBoardRank = ({
  userId,
  options = {},
  enabled = true,
}: {
  userId: number;
  options?: any;
  enabled?: boolean;
}) => {
  return useQuery<
    LeaderBoard_GetUsersLeaderBoardRankQuery,
    any,
    LeaderBoard_GetUsersLeaderBoardRankQueryVariables,
    any
  >(
    [queryKeys.getLeaderBoardRank, userId],
    async () => {
      return fetcher(LEADER_BOARD_GET_LEADER_BOARD_RANK, {userId})();
    },
    {
      ...options,
      enabled,
    },
  );
};
