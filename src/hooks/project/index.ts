import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {gql} from 'graphql-request';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  AddEnthusiasticCistyStateInput,
  CategoryDtoFilterInput,
  Category_GetCategoriesQuery,
  Category_GetCategoriesQueryVariables,
  Category_GetCategoryQuery,
  Category_GetCategoryQueryVariables,
  EnthusiasticCistyStateFilterInput,
  MutationProject_ReportQuestionArgs,
  MutationProject_VoteQuestionArgs,
  ProjectDtoFilterInput,
  Project_AddFeedBackMutation,
  Project_AddFeedBackMutationVariables,
  Project_AddProjectMutation,
  Project_AddProjectMutationVariables,
  Project_AddQuestionMutation,
  Project_AddQuestionMutationVariables,
  Project_GetBidCountByStatusQuery,
  Project_GetBidCountByStatusQueryVariables,
  Project_GetEnthusiasticCistyStateQuery,
  Project_GetEnthusiasticCistyStateQueryVariables,
  Project_GetListerProjectsQuery,
  Project_GetListerProjectsQueryVariables,
  Project_GetMyBidsQuery,
  Project_GetMyBidsQueryVariables,
  Project_GetProjectCountByStatusQuery,
  Project_GetProjectCountByStatusQueryVariables,
  Project_GetProjectIBidOnGroupedByStatusQuery,
  Project_GetProjectIBidOnGroupedByStatusQueryVariables,
  Project_GetProjectQuery,
  Project_GetProjectQueryVariables,
  Project_GetProject_QuestionsQuery,
  Project_GetProject_QuestionsQueryVariables,
  Project_GetProjectsByStatusQuery,
  Project_GetProjectsByStatusQueryVariables,
  Project_GetProjectsGrouptedByCityFromMapDataQuery,
  Project_GetProjectsGrouptedByCityFromMapDataQueryVariables,
  Project_GetProjectsGrouptedByCityQuery,
  Project_GetProjectsGrouptedByCityQueryVariables,
  Project_GetProjectsQuery,
  Project_GetProjectsQueryVariables,
  Project_GetQuestionsQuery,
  Project_GetQuestionsQueryVariables,
  Project_GetUserLikeProjectQuery,
  Project_GetUserLikeProjectQueryVariables,
  Project_GetUserLikeProjectsQuery,
  Project_GetUserLikeProjectsQueryVariables,
  Project_LikeMutation,
  Project_LikeMutationVariables,
  Project_UnLikeAllMutation,
  Project_UnLikeAllMutationVariables,
  Project_UnlikeMutation,
  Project_UnlikeMutationVariables,
  ResponseStatus,
} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {fetcher} from '~/graphql/graphQLClient';
import {
  EDIT_PROJECT,
  PROJECT_ADD_ENTHUSIASTIC_CITY_STATE,
  PROJECT_ADD_FEED_BACK,
  PROJECT_ADD_PROJECT,
  PROJECT_ADD_QUESTION,
  PROJECT_CANCEL_PROJECT,
  PROJECT_FINISHE_PROJECT,
  PROJECT_LIKE,
  PROJECT_UNLIKE,
  PROJECT_UNLIKE_ALL,
  REPORT_QUESTION,
  VOTE_QUESTION,
} from '~/graphql/project/mutations';
import {
  GET_BIDS_GROUP_BY_STATUS,
  GET_CATEGORY,
  GET_PROJECTS_BY_CITY,
  PROJECT_CATEGORY,
  PROJECT_GET_BID_COUNT_BY_STATUS,
  PROJECT_GET_ENTHUSIASTIC_CITY_STATE,
  PROJECT_GET_LISTER_PROJECTS,
  PROJECT_GET_MY_BIDS,
  PROJECT_GET_PROJECT,
  PROJECT_GET_PROJECTS,
  PROJECT_GET_PROJECTS_BY_STATUS,
  PROJECT_GET_PROJECTS_GROUPTED_BY_CITY_FROM_MAP_DATA,
  PROJECT_GET_PROJECT_COUNT_BY_STATUS,
  PROJECT_GET_PROJECT_QUESTIONS,
  PROJECT_GET_QUESTIONS,
  PROJECT_GET_USER_LIKE_PROJECT,
  PROJECT_GET_USER_LIKE_PROJECTS,
} from '~/graphql/project/queries';
import {useGetMessages} from '~/utils/helper';
import {showErrorMessage, showInfoMessage} from '~/utils/utils';

export const useGetBidCountByStatus = ({
  huduerId,
  options = {},
}: {
  huduerId: number;
  options?: any;
}) => {
  return useQuery<
    Project_GetBidCountByStatusQuery,
    any,
    Project_GetBidCountByStatusQueryVariables,
    any
  >(
    [queryKeys.getBidCountByStatus, huduerId],
    async () => {
      return fetcher(PROJECT_GET_BID_COUNT_BY_STATUS, {huduerId})();
    },
    {
      ...options,
    },
  );
};

export const useGetProjectCountByStatus = ({
  listerId,
  options = {},
}: {
  listerId: number;
  options?: any;
}) => {
  return useQuery<
    Project_GetProjectCountByStatusQuery,
    any,
    Project_GetProjectCountByStatusQueryVariables,
    any
  >(
    [queryKeys.getProjectCountByStatus, listerId],
    async () => {
      return fetcher(PROJECT_GET_PROJECT_COUNT_BY_STATUS, {listerId})();
    },
    {
      ...options,
    },
  );
};

export const useGetBidsGroupByStatus = ({
  userId,
  options = {},
  pageSize = PAGE_SIZE,
}: {
  userId?: any;
  options?: any;
  pageSize?: any;
}) => {
  return useInfiniteQuery<
    Project_GetProjectIBidOnGroupedByStatusQuery,
    any,
    Project_GetProjectIBidOnGroupedByStatusQueryVariables,
    any
  >(
    [queryKeys.getBidsCountByStatus, userId],
    async ({pageParam = 0}) => {
      return fetcher(GET_BIDS_GROUP_BY_STATUS, {
        skip: pageParam * pageSize,
        take: pageSize,
        userId,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetProjectIBidOnGroupedByStatusQuery,
        allPages: Project_GetProjectIBidOnGroupedByStatusQuery[],
      ) => {
        if (
          lastPage?.project_getProjectIBidOnGroupedByStatus?.result?.pageInfo
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
            ?.map(
              a => a?.project_getProjectIBidOnGroupedByStatus?.result?.items,
            )
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetProjectEdit = ({
  projectId,
  options = {},
  enabled = true,
}: {
  projectId: number;
  options?: any;
  enabled?: boolean;
}) => {
  const PROJECT_GET_PROJECT_EDIT = gql`
    query project_getProject($projectId: Int!) {
      project_getProject(projectId: $projectId) {
        result {
          projectQuestions
        }
        status
      }
    }
  `;
  return useQuery<
    Project_GetProjectQuery,
    any,
    Project_GetProjectQueryVariables,
    any
  >(
    [queryKeys.projectEdit, projectId],
    async () => {
      return fetcher(PROJECT_GET_PROJECT_EDIT, {projectId})();
    },
    {
      ...options,
      enabled,
    },
  );
};

export const useGetProject = ({
  projectId,
  options = {},
  enabled = true,
}: {
  projectId: number;
  options?: any;
  enabled?: boolean;
}) => {
  return useQuery<
    Project_GetProjectQuery,
    any,
    Project_GetProjectQueryVariables,
    any
  >(
    [queryKeys.project, projectId],
    async () => {
      return fetcher(PROJECT_GET_PROJECT, {projectId})();
    },
    {
      ...options,
      enabled,
    },
  );
};

export const useGetProjectQuestions = ({
  projectId,
  options = {},
  enabled = true,
}: {
  projectId: number;
  options?: any;
  enabled?: boolean;
}) => {
  return useQuery<
    Project_GetProject_QuestionsQuery,
    any,
    Project_GetProject_QuestionsQueryVariables,
    any
  >(
    [queryKeys.projectQuestions, projectId],
    async () => {
      return fetcher(PROJECT_GET_PROJECT_QUESTIONS, {projectId})();
    },
    {
      ...options,
      enabled,
    },
  );
};

export const useGetProjects = ({
  projectFilter,
  location,
  projectOrderVms,
  where,
  options = {},
  pageSize = PAGE_SIZE,
  isMyBid = false,
  enabled,
}: {
  projectFilter?: any;
  location?: any;
  projectOrderVms?: any;
  where?: ProjectDtoFilterInput;
  options?: any;
  pageSize?: any;
  isMyBid?: boolean;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Project_GetProjectsQuery,
    any,
    Project_GetProjectsQueryVariables,
    any
  >(
    [
      queryKeys.projects,
      projectFilter,
      location,
      projectOrderVms,
      where,
      isMyBid,
    ],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_PROJECTS, {
        skip: pageParam * pageSize,
        take: pageSize,
        projectFilter,
        location,
        projectOrderVms,
        where,
        isMyBid,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetProjectsQuery,
        allPages: Project_GetProjectsQuery[],
      ) => {
        if (lastPage?.project_getProjects?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getProjects?.result?.items)
            .flat(),
        };
      },
      enabled,
      ...options,
    },
  );
};

export const useGetProjectsByCity = ({
  where,
  options = {},
  pageSize = PAGE_SIZE,
}: {
  where?: any;
  options?: any;
  pageSize?: any;
}) => {
  return useInfiniteQuery<
    Project_GetProjectsGrouptedByCityQuery,
    any,
    Project_GetProjectsGrouptedByCityQueryVariables,
    any
  >(
    [queryKeys.getProjectsByCity, where],
    async ({pageParam = 0}) => {
      return fetcher(GET_PROJECTS_BY_CITY, {
        skip: pageParam * pageSize,
        take: pageSize,
        where,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetProjectsGrouptedByCityQuery,
        allPages: Project_GetProjectsGrouptedByCityQuery[],
      ) => {
        if (
          lastPage?.project_getProjectsGrouptedByCity?.result?.pageInfo
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
            ?.map(a => a?.project_getProjectsGrouptedByCity?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetProjectsByCityFromMap = ({
  where,
  options = {},
  pageSize = PAGE_SIZE,
}: {
  where?: any;
  options?: any;
  pageSize?: any;
}) => {
  return useInfiniteQuery<
    Project_GetProjectsGrouptedByCityFromMapDataQuery,
    any,
    Project_GetProjectsGrouptedByCityFromMapDataQueryVariables,
    any
  >(
    [queryKeys.getProjectsByCityFromMap, where],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_PROJECTS_GROUPTED_BY_CITY_FROM_MAP_DATA, {
        skip: pageParam * pageSize,
        take: pageSize,
        where,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetProjectsGrouptedByCityFromMapDataQuery,
        allPages: Project_GetProjectsGrouptedByCityFromMapDataQuery[],
      ) => {
        if (
          lastPage?.project_getProjectsGrouptedByCityFromMapData?.result
            ?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(
              a =>
                a?.project_getProjectsGrouptedByCityFromMapData?.result?.items,
            )
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetListerProjects = ({
  projectFilter,
  location,
  projectOrderVms,
  where,
  options = {},
  pageSize = PAGE_SIZE,
  isMyBid = false,
  enabled,
}: {
  projectFilter?: any;
  location?: any;
  projectOrderVms?: any;
  where?: ProjectDtoFilterInput;
  options?: any;
  pageSize?: any;
  isMyBid?: boolean;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Project_GetListerProjectsQuery,
    any,
    Project_GetListerProjectsQueryVariables,
    any
  >(
    [
      queryKeys.projects,
      projectFilter,
      location,
      projectOrderVms,
      where,
      isMyBid,
    ],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_LISTER_PROJECTS, {
        skip: pageParam * pageSize,
        take: pageSize,
        projectFilter,
        location,
        projectOrderVms,
        where,
        isMyBid,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetListerProjectsQuery,
        allPages: Project_GetListerProjectsQuery[],
      ) => {
        if (lastPage?.project_getProjects?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getProjects?.result?.items)
            .flat(),
        };
      },
      enabled,
      ...options,
    },
  );
};

export const useGetEnthusiasticCityAndState = ({
  where,
  options = {},
  pageSize = PAGE_SIZE,
}: {
  where?: EnthusiasticCistyStateFilterInput;
  options?: any;
  pageSize?: any;
}) => {
  return useInfiniteQuery<
    Project_GetEnthusiasticCistyStateQuery,
    any,
    Project_GetEnthusiasticCistyStateQueryVariables,
    any
  >(
    [queryKeys.getEnthusiasticCityAndState],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_ENTHUSIASTIC_CITY_STATE, {
        skip: pageParam * pageSize,
        take: pageSize,
        ...where,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetEnthusiasticCistyStateQuery,
        allPages: Project_GetEnthusiasticCistyStateQuery[],
      ) => {
        if (
          lastPage?.project_getEnthusiasticCistyState?.result?.pageInfo
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
            ?.map(a => a?.project_getEnthusiasticCistyState?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetMyBids = ({
  projectFilter,
  location,
  projectOrderVms,
  where,
  options = {},
  pageSize = PAGE_SIZE,
  isMyBid = false,
  enabled,
}: {
  projectFilter?: any;
  location?: any;
  projectOrderVms?: any;
  where?: ProjectDtoFilterInput;
  options?: any;
  pageSize?: any;
  isMyBid?: boolean;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Project_GetMyBidsQuery,
    any,
    Project_GetMyBidsQueryVariables,
    any
  >(
    [
      queryKeys.getMyBids,
      projectFilter,
      location,
      projectOrderVms,
      where,
      isMyBid,
    ],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_MY_BIDS, {
        skip: pageParam * pageSize,
        take: pageSize,
        projectFilter,
        location,
        projectOrderVms,
        where,
        isMyBid,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetListerProjectsQuery,
        allPages: Project_GetListerProjectsQuery[],
      ) => {
        if (lastPage?.project_getProjects?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getProjects?.result?.items)
            .flat(),
        };
      },
      enabled,
      ...options,
    },
  );
};

export const useGetProjectsByStatus = ({
  projectFilter,
  location,
  projectOrderVms,
  where,
  options = {},
  pageSize = PAGE_SIZE,
  isMyBid = false,
  enabled,
}: {
  projectFilter?: any;
  location?: any;
  projectOrderVms?: any;
  where?: ProjectDtoFilterInput;
  options?: any;
  pageSize?: any;
  isMyBid?: boolean;
  enabled?: boolean;
}) => {
  return useInfiniteQuery<
    Project_GetProjectsByStatusQuery,
    any,
    Project_GetProjectsByStatusQueryVariables,
    any
  >(
    [
      queryKeys.projects,
      projectFilter,
      location,
      projectOrderVms,
      where,
      isMyBid,
    ],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_PROJECTS_BY_STATUS, {
        skip: pageParam * pageSize,
        take: pageSize,
        projectFilter,
        location,
        projectOrderVms,
        where,
        isMyBid,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetProjectsByStatusQuery,
        allPages: Project_GetProjectsByStatusQuery[],
      ) => {
        if (lastPage?.project_getProjects?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getProjects?.result?.items)
            .flat(),
        };
      },
      enabled,
      ...options,
    },
  );
};

export const useGetQuestionsIsPin = (
  options: any = {},
  projectId: any,
  pageSize = PAGE_SIZE,
) => {
  return useInfiniteQuery<
    Project_GetQuestionsQuery,
    any,
    Project_GetQuestionsQueryVariables,
    any
  >(
    [queryKeys.questionsIsPin, {projectId}],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_QUESTIONS, {
        skip: pageParam * pageSize,
        take: pageSize,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetQuestionsQuery,
        allPages: Project_GetQuestionsQuery[],
      ) => {
        if (lastPage?.project_getQuestions?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getQuestions?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetQuestions = (
  options: any = {},
  projectId: any,
  pageSize = PAGE_SIZE,
) => {
  return useInfiniteQuery<
    Project_GetQuestionsQuery,
    any,
    Project_GetQuestionsQueryVariables,
    any
  >(
    [queryKeys.questions, {projectId}],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_QUESTIONS, {
        skip: pageParam * pageSize,
        take: pageSize,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetQuestionsQuery,
        allPages: Project_GetQuestionsQuery[],
      ) => {
        if (lastPage?.project_getQuestions?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getQuestions?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetUserLikeProject = (options: any = {}) => {
  return useQuery<
    Project_GetUserLikeProjectQuery,
    any,
    Project_GetUserLikeProjectQueryVariables,
    any
  >(
    [queryKeys.userLikeProject, options],
    async () => {
      return fetcher(PROJECT_GET_USER_LIKE_PROJECT)();
    },
    {
      ...options,
    },
  );
};

export const useGetUserLikeProjects = (options: any = {}) => {
  return useInfiniteQuery<
    Project_GetUserLikeProjectsQuery,
    any,
    Project_GetUserLikeProjectsQueryVariables,
    any
  >(
    [queryKeys.userLikeProjects, options],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_GET_USER_LIKE_PROJECTS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Project_GetUserLikeProjectsQuery,
        allPages: Project_GetUserLikeProjectsQuery[],
      ) => {
        if (
          lastPage?.project_getUserLikeProjects?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.project_getUserLikeProjects?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useReportQuestion = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<MutationProject_ReportQuestionArgs>(
    async (input: any) => {
      return fetcher(REPORT_QUESTION, {input})();
    },
    {
      onSuccess: data => {
        if (data?.project_reportQuestion?.status === ResponseStatus.Success) {
          showInfoMessage('Your report sent.');
        } else {
          showResponseMessage(data?.project_reportQuestion?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddVoteQuestion = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<MutationProject_VoteQuestionArgs>(
    async (questionId: any) => {
      return fetcher(VOTE_QUESTION, {questionId})();
    },
    {
      onSuccess: data => {
        if (data?.project_voteQuestion?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.questions);
        } else {
          showResponseMessage(data?.project_voteQuestion?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddFeedBack = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Project_AddFeedBackMutation,
    any,
    Project_AddFeedBackMutationVariables
  >(
    async (feedbackInput: any) => {
      return fetcher(PROJECT_ADD_FEED_BACK, {feedbackInput})();
    },
    {
      onSuccess: data => {
        if (data?.project_addFeedBack?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
        } else {
          showResponseMessage(data?.project_addFeedBack?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useEditProject = () => {
  return useMutation<
    Project_AddProjectMutation,
    any,
    Project_AddProjectMutationVariables
  >(
    async (editProjectInput: any) => {
      return fetcher(EDIT_PROJECT, {editProjectInput})();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getBadges);
        queryClient.invalidateQueries(queryKeys.getBadge);
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddProject = () => {
  return useMutation<
    Project_AddProjectMutation,
    any,
    Project_AddProjectMutationVariables
  >(
    async (addProjectInput: any) => {
      return fetcher(PROJECT_ADD_PROJECT, {addProjectInput})();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getBadges);
        queryClient.invalidateQueries(queryKeys.getBadge);
        queryClient.invalidateQueries(queryKeys.getLeaderBoards);
        queryClient.invalidateQueries(queryKeys.getLeaderBoardRank);
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddQuestion = (onMutate?: (variables: any) => void) => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Project_AddQuestionMutation,
    any,
    Project_AddQuestionMutationVariables
  >(
    async (questionInput: any) => {
      return fetcher(PROJECT_ADD_QUESTION, {questionInput})();
    },
    {
      onMutate: onMutate,
      onSuccess: (successData: any) => {
        if (
          successData?.project_addQuestion?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
        } else {
          showResponseMessage(successData?.project_addQuestion?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useFinishProject = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<any>(
    async (projectId: any) => {
      return fetcher(PROJECT_FINISHE_PROJECT, {projectId})();
    },
    {
      onSuccess: successData => {
        if (
          successData?.project_finisheProject?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries([queryKeys.getBidsCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.project_finisheProject?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useCancelProject = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<any>(
    async ({
      projectId,
      cancellationReason,
      cancelProjectStatus,
    }: {
      projectId: any;
      cancellationReason?: any;
      cancelProjectStatus?: any;
    }) => {
      return fetcher(PROJECT_CANCEL_PROJECT, {
        projectId,
        cancellationReason,
        cancelProjectStatus,
      })();
    },
    {
      onSuccess: (successData, variables) => {
        if (
          successData?.project_cancellProject?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries([
            queryKeys.project,
            variables?.projectId,
          ]);
          queryClient.invalidateQueries([queryKeys.bids], {exact: false});
          queryClient.invalidateQueries([queryKeys.getUserReviews], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.projects], {exact: false});
          queryClient.invalidateQueries([queryKeys.bidsOrderByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getBidCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.project_cancellProject?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useSendCityAndState = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<any>(
    async (input: AddEnthusiasticCistyStateInput) => {
      return fetcher(PROJECT_ADD_ENTHUSIASTIC_CITY_STATE, {input})();
    },
    {
      onSuccess: (successData: any) => {
        if (
          successData?.project_addEnthusiasticCistyState?.status ===
          ResponseStatus.Success
        ) {
        } else {
          showResponseMessage(
            successData?.project_addEnthusiasticCistyState?.status,
          );
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useProjectLike = () => {
  return useMutation<Project_LikeMutation, any, Project_LikeMutationVariables>(
    async (params: any) => {
      return fetcher(PROJECT_LIKE, {projectId: params?.id})();
    },
    {
      onMutate: async variables => {
        //   //#region ---------------cancel queries
        //   await queryClient.cancelQueries(queryKeys.projects);
        // await queryClient.cancelQueries(queryKeys.project);
        //   await queryClient.cancelQueries(queryKeys.userLikeProjects);
        //   //#endregion ------------cancel queries
        //   //#region ---------------get previous data
        //   const previousProjectsData = queryClient.getQueryData(
        //     [queryKeys.projects],
        //     {
        //       exact: false,
        //     },
        //   );
        // const previousProjectData = queryClient.getQueryData([
        //   queryKeys.project,
        //   variables?.id,
        // ]);
        //   const previousUserLikedProjectsData = queryClient.getQueryData(
        //     [queryKeys.userLikeProjects],
        //     {
        //       exact: false,
        //     },
        //   );
        //   let oldProjectsData = previousProjectsData;
        // let oldProjectData = previousProjectData;
        //   let oldUserLikedProjectsData = previousUserLikedProjectsData;
        //   //#endregion ------------get previous data
        //   //#region ---------------projects
        //   if (oldProjectsData?.pages?.length > 0) {
        //     const projectsDataChecked = oldProjectsData?.pages?.map(
        //       (item: any) => {
        //         let temp = Object.assign({}, item);
        //         const items = item.project_getProjects?.result?.items.map(
        //           (el: any) => {
        //             if (el?.project?.id === variables?.id) {
        //               return {...el, isLiked: true};
        //             } else {
        //               return el;
        //             }
        //           },
        //         );
        //         temp.project_getProjects.result.items = items;
        //         return temp;
        //       },
        //     );
        //     oldProjectsData.pages = projectsDataChecked;
        //   }
        //   //#endregion ------------projects
        //#region ---------------project
        // if (oldProjectData?.project_getProject?.result?.isLiked === false) {
        //   oldProjectData.project_getProject.result.isLiked = true;
        // }
        //#endregion ------------project
        //#region ---------------user likes projects
        // if (oldUserLikedProjectsData?.pages?.length > 0) {
        //   const userLikedProjectsDataChecked =
        //     oldUserLikedProjectsData?.pages?.map((item: any) => {
        //       let temp = Object.assign({}, item);
        //       let items = item.project_getUserLikeProjects?.result?.items;
        //       items.push({
        //         ...variables,
        //         isLiked: true,
        //         project: variables?.project,
        //       });
        //       temp.project_getUserLikeProjects.result.items = items;
        //       return temp;
        //     });
        //   oldUserLikedProjectsData.pages = userLikedProjectsDataChecked;
        // }
        //#endregion ------------user likes project
        //   //#region ---------------set new data
        //   queryClient.setQueriesData(queryKeys.projects, oldProjectsData);
        // queryClient.setQueriesData(queryKeys.project, oldProjectData);
        //   queryClient.setQueriesData(
        //     queryKeys.userLikeProjects,
        //     oldUserLikedProjectsData,
        //   );
        //   //#endregion ------------set new data
        //   //#region ---------------return
        //   return {
        //     previousProjectsData,
        //     previousProjectData,
        //     previousUserLikedProjectsData,
        //   };
        //   //#endregion ------------return
      },
      onSuccess: (successData, variables: any, context: any) => {
        if (successData?.project_like?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries([
            queryKeys.project,
            {projectId: variables?.item?.id},
          ]);
          queryClient.invalidateQueries([queryKeys.projects], {exact: false});
          queryClient.invalidateQueries([queryKeys.project], {exact: false});
          queryClient.invalidateQueries([queryKeys.userLikeProjects]);
        } else {
          // queryClient.setQueriesData(
          //   queryKeys.projects,
          //   context.previousProjectsData,
          // );
          // queryClient.setQueriesData(
          //   queryKeys.project,
          //   context.previousProjectData,
          // );
          // queryClient.setQueriesData(
          //   queryKeys.userLikeProjects,
          //   context.previousUserLikedProjectsData,
          // );
        }
      },
      onError: (errorData: any, variables: any, context: any) => {
        // queryClient.setQueriesData(
        //   queryKeys.projects,
        //   context.previousProjectsData,
        // );
        // queryClient.setQueriesData(
        //   queryKeys.project,
        //   context.previousProjectData,
        // );
        // queryClient.setQueriesData(
        //   queryKeys.userLikeProjects,
        //   context.previousUserLikedProjectsData,
        // );
      },
    },
  );
};

export const useProjectUnLike = () => {
  return useMutation<
    Project_UnlikeMutation,
    any,
    Project_UnlikeMutationVariables
  >(
    async (params: any) => {
      const input = {
        projectId: params?.item?.id,
        userId: params?.userId,
      };
      return fetcher(PROJECT_UNLIKE, input)();
    },
    {
      // onMutate: async variables => {
      //   //#region ---------------cancel queries
      //   await queryClient.cancelQueries(queryKeys.projects);
      //   await queryClient.cancelQueries(queryKeys.project);
      //   await queryClient.cancelQueries(queryKeys.userLikeProjects);
      //   //#endregion ------------cancel queries

      //   //#region ---------------get previous data
      //   const previousProjectsData = queryClient.getQueryData(
      //     [queryKeys.projects],
      //     {
      //       exact: false,
      //     },
      //   );
      //   const previousProjectData = queryClient.getQueryData([
      //     queryKeys.project,
      //     {
      //       projectId: variables?.item?.id,
      //     },
      //   ]);
      //   const previousUserLikedProjectsData = queryClient.getQueryData(
      //     [queryKeys.userLikeProjects],
      //     {
      //       exact: false,
      //     },
      //   );
      //   let oldProjectsData = previousProjectsData;
      //   let oldProjectData = previousProjectData;
      //   let oldUserLikedProjectsData = previousUserLikedProjectsData;
      //   //#endregion ------------get previous data

      //   //#region ---------------projects
      //   if (oldProjectsData?.pages?.length > 0) {
      //     const projectsDataChecked = oldProjectsData?.pages?.map(
      //       (item: any) => {
      //         let temp = Object.assign({}, item);
      //         const items = item.project_getProjects?.result?.items.map(
      //           (el: any) => {
      //             if (el?.project?.id === variables?.item?.id) {
      //               return {...el, isLiked: false};
      //             } else {
      //               return el;
      //             }
      //           },
      //         );
      //         temp.project_getProjects.result.items = items;
      //         return temp;
      //       },
      //     );
      //     oldProjectsData.pages = projectsDataChecked;
      //   }
      //   //#endregion ------------projects

      //   //#region ---------------project
      //   if (oldProjectData?.project_getProject?.result?.isLiked) {
      //     oldProjectData.project_getProject.result.isLiked = false;
      //   }
      //   //#endregion ------------project

      //   //#region ---------------user likes projects
      //   if (oldUserLikedProjectsData?.pages?.length > 0) {
      //     const userLikedProjectsDataChecked =
      //       oldUserLikedProjectsData?.pages?.map((item: any) => {
      //         let temp = Object.assign({}, item);
      //         let items = item.project_getUserLikeProjects?.result?.items;
      //         const newItems = items?.filter((el: any) => {
      //           if (el?.project?.id !== variables?.item?.id) {
      //             return el;
      //           }
      //         });
      //         temp.project_getUserLikeProjects.result.items = newItems;
      //         return temp;
      //       });
      //     oldUserLikedProjectsData.pages = userLikedProjectsDataChecked;
      //   }
      //   //#endregion ------------user likes projects

      //   //#region ---------------set new data
      //   queryClient.setQueriesData(queryKeys.projects, oldProjectsData);
      //   queryClient.setQueriesData(queryKeys.project, oldProjectData);
      //   queryClient.setQueriesData(
      //     queryKeys.userLikeProjects,
      //     oldUserLikedProjectsData,
      //   );
      //   //#endregion ------------set new data

      //   //#region ---------------return previous
      //   return {
      //     previousProjectsData,
      //     previousProjectData,
      //     previousUserLikedProjectsData,
      //   };
      //   //#endregion ------------return previous
      // },
      onSuccess: (successData, variables: any, context: any) => {
        if (successData?.project_unlike?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries([
            queryKeys.project,
            {projectId: variables?.item?.id},
          ]);
          queryClient.invalidateQueries([queryKeys.projects], {exact: false});
          queryClient.invalidateQueries([queryKeys.project], {exact: false});
          queryClient.invalidateQueries([queryKeys.userLikeProjects]);
        } else {
          // queryClient.setQueriesData(
          //   queryKeys.projects,
          //   context.previousProjectsData,
          // );
          // queryClient.setQueriesData(
          //   queryKeys.project,
          //   context.previousProjectData,
          // );
          // queryClient.setQueriesData(
          //   queryKeys.userLikeProjects,
          //   context.previousUserLikedProjectsData,
          // );
        }
      },
      onError: (errorData: any, variables: any, context: any) => {
        // queryClient.setQueriesData(
        //   queryKeys.projects,
        //   context.previousProjectsData,
        // );
        // queryClient.setQueriesData(
        //   queryKeys.project,
        //   context.previousProjectData,
        // );
        // queryClient.setQueriesData(
        //   queryKeys.userLikeProjects,
        //   context.previousUserLikedProjectsData,
        // );
      },
    },
  );
};

export const useProjectUnLikeAll = () => {
  return useMutation<
    Project_UnLikeAllMutation,
    any,
    Project_UnLikeAllMutationVariables
  >(
    async () => {
      return fetcher(PROJECT_UNLIKE_ALL)();
    },
    {
      onSuccess: successData => {
        if (successData?.project_unLikeAll?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries([queryKeys.projects], {exact: false});
          queryClient.invalidateQueries([queryKeys.userLikeProjects]);
        }
      },
      onError: () => {},
    },
  );
};

export const useGetCategory = (entityId: number) => {
  return useQuery<
    Category_GetCategoryQuery,
    any,
    Category_GetCategoryQueryVariables,
    any
  >(
    [queryKeys.getCategory, entityId],
    async () => {
      return fetcher<Category_GetCategoryQuery, any>(GET_CATEGORY, {
        entityId,
      })();
    },
    {enabled: !!entityId},
  );
};

export const useGetProjectCategories = ({
  where,
  options = {},
  pageSize = PAGE_SIZE,
}: {
  where?: CategoryDtoFilterInput;
  pageSize?: any;
  options?: any;
}) => {
  return useInfiniteQuery<
    Category_GetCategoriesQuery,
    any,
    Category_GetCategoriesQueryVariables,
    any
  >(
    [queryKeys.getCategories, where],
    async ({pageParam = 0}) => {
      return fetcher(PROJECT_CATEGORY, {
        skip: pageParam * pageSize,
        take: pageSize,
        where,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Category_GetCategoriesQuery,
        allPages: Category_GetCategoriesQuery[],
      ) => {
        if (lastPage?.category_getCategories?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.category_getCategories?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

/*


export const useProjectLike = () => {
  const queryClient = useQueryClient();

  const mutateProjectLike = useCallback(
    async (params: {project: {id: number}}) => {
      return fetcher<Project_LikeMutation, Project_LikeMutationVariables>(
        PROJECT_LIKE,
        {projectId: params.project.id},
      )();
    },
    [],
  );

  return useMutation(mutateProjectLike, {
    onMutate: async params => {
      const previousProjectsData = queryClient.getQueryData(queryKeys.projects);
      const previousProjectData = queryClient.getQueryData([
        queryKeys.project,
        {projectId: params?.project?.id},
      ]);
      const previousUserLikedProjectsData = queryClient.getQueryData(
        queryKeys.userLikeProjects,
      );

      await queryClient.cancelQueries(queryKeys.projects);
      await queryClient.cancelQueries(queryKeys.project);
      await queryClient.cancelQueries(queryKeys.userLikeProjects);

      const oldProjectsData = previousProjectsData?.pages?.map((item: any) => {
        const items = item.project_getProjects?.result?.items.map((el: any) => {
          if (el?.project?.id === params?.project?.id) {
            return {...el, isLiked: true};
          } else {
            return el;
          }
        });
        return {
          ...item,
          project_getProjects: {
            ...item.project_getProjects,
            result: {...item.project_getProjects.result, items},
          },
        };
      });

      const oldProjectData =
        previousProjectData?.project_getProject?.result?.isLiked === false
          ? {
              ...previousProjectData,
              project_getProject: {
                ...previousProjectData.project_getProject,
                result: {
                  ...previousProjectData.project_getProject.result,
                  isLiked: true,
                },
              },
            }
          : previousProjectData;

      const oldUserLikedProjectsData =
        previousUserLikedProjectsData?.pages?.map((item: any) => {
          const items = [
            ...item.project_getUserLikeProjects?.result?.items,
            {...params, isLiked: true, project: params?.project},
          ];
          return {
            ...item,
            project_getUserLikeProjects: {
              ...item.project_getUserLikeProjects,
              result: {...item.project_getUserLikeProjects.result, items},
            },
          };
        });

      queryClient.setQueriesData(queryKeys.projects, oldProjectsData);
      queryClient.setQueriesData(queryKeys.project, oldProjectData);
      queryClient.setQueriesData(
        queryKeys.userLikeProjects,
        oldUserLikedProjectsData,
      );

      return {
        previousProjectsData,
        previousProjectData,
        previousUserLikedProjectsData,
      };
    },
    onSuccess: (successData, newData: any, context: any) => {
      if (successData?.project_like?.status === ResponseStatus.Success) {
      } else {
        queryClient.setQueriesData(
          queryKeys.projects,
          context.previousProjectsData,
        );
        queryClient.setQueriesData(
          queryKeys.project,
          context.previousProjectData,
        );
        queryClient.setQueriesData(
          queryKeys.userLikeProjects,
          context.previousUserLikedProjectsData,
        );
      }
    },
    onError: (errorData: any, newData: any, context: any) => {
      queryClient.setQueriesData(
        queryKeys.projects,
        context.previousProjectsData,
      );
      queryClient.setQueriesData(
        queryKeys.project,
        context.previousProjectData,
      );
      queryClient.setQueriesData(
        queryKeys.userLikeProjects,
        context.previousUserLikedProjectsData,
      );
    },
  });
};

export const useProjectUnLike = () => {
  const queryClient = useQueryClient();

  const mutateProjectUnLike = useCallback(async (params: any) => {
    const input = {
      projectId: params?.item?.project?.id,
      userId: params?.userId,
    };
    return fetcher<Project_UnlikeMutation, Project_UnlikeMutationVariables>(
      PROJECT_LIKE,
      input,
    )();
  }, []);

  return useMutation(mutateProjectUnLike, {
    onMutate: async variables => {
      await queryClient.cancelQueries(queryKeys.projects);
      await queryClient.cancelQueries(queryKeys.project);
      await queryClient.cancelQueries(queryKeys.userLikeProjects);
      const previousProjectsData = queryClient.getQueryData(
        queryKeys.projects,
        {exact: false},
      );
      const previousProjectData = queryClient.getQueryData([
        queryKeys.project,
        {projectId: variables.item.project.id},
      ]);
      const previousUserLikedProjectsData = queryClient.getQueryData(
        queryKeys.userLikeProjects,
        {exact: false},
      );

      const updatedProjectsData = previousProjectsData?.pages?.map(page => {
        const updatedItems = page.project_getProjects.result.items.map(item => {
          if (item.id === variables.item.project.id) {
            return {...item, isLiked: false};
          }
          return item;
        });
        return {
          ...page,
          project_getProjects: {result: {items: updatedItems}},
        };
      });

      const updatedUserLikedProjectsData =
        previousUserLikedProjectsData?.pages?.map(page => {
          const updatedItems =
            page.project_getUserLikeProjects.result.items.filter(
              item => item.project.id !== variables.item.project.id,
            );
          return {
            ...page,
            project_getUserLikeProjects: {result: {items: updatedItems}},
          };
        });

      queryClient.setQueriesData(queryKeys.projects, {
        pages: updatedProjectsData,
      });
      queryClient.setQueriesData(queryKeys.project, {
        ...previousProjectData,
        isLiked: false,
      });
      queryClient.setQueriesData(queryKeys.userLikeProjects, {
        pages: updatedUserLikedProjectsData,
      });

      return {
        previousProjectsData,
        previousProjectData,
        previousUserLikedProjectsData,
      };
    },
    onSuccess: (successData, newData: any, context: any) => {
      if (successData?.project_unlike?.status === ResponseStatus.Success) {
      } else {
        queryClient.setQueriesData(
          queryKeys.projects,
          context.previousProjectsData,
        );
        queryClient.setQueriesData(
          queryKeys.project,
          context.previousProjectData,
        );
        queryClient.setQueriesData(
          queryKeys.userLikeProjects,
          context.previousUserLikedProjectsData,
        );
        // showMessage(
        //   getResponseMessage(successData?.project_unlike?.status) as any,
        // );
      }
    },
    onError: (errorData: any, newData: any, context: any) => {
      queryClient.setQueriesData(
        queryKeys.projects,
        context.previousProjectsData,
      );
      queryClient.setQueriesData(
        queryKeys.project,
        context.previousProjectData,
      );
      queryClient.setQueriesData(
        queryKeys.userLikeProjects,
        context.previousUserLikedProjectsData,
      );
      //showErrorMessage(JSON.stringify(errorData));
    },
  });
};

*/
