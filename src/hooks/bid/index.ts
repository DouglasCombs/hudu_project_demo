import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  BidFilterInput,
  Bid_AcceptBidMutation,
  Bid_AcceptBidMutationVariables,
  Bid_ActivateBidMutation,
  Bid_ActivateBidMutationVariables,
  Bid_AddBidMutation,
  Bid_AddBidMutationVariables,
  Bid_AddWorkingHoursMutation,
  Bid_AddWorkingHoursMutationVariables,
  Bid_CancellBidMutation,
  Bid_CancellBidMutationVariables,
  Bid_DeleteBidMutation,
  Bid_DeleteBidMutationVariables,
  Bid_EditBidMutation,
  Bid_EditBidMutationVariables,
  Bid_GetAcceptBidDetailsQuery,
  Bid_GetAcceptBidDetailsQueryVariables,
  Bid_GetBidsInProjectDetailsTabQuery,
  Bid_GetBidsInProjectDetailsTabQueryVariables,
  Bid_GetBidsOrdedByBidSatatusQuery,
  Bid_GetBidsOrdedByBidSatatusQueryVariables,
  Bid_GetBidsQuery,
  Bid_GetBidsQueryVariables,
  Bid_GetBids_MutationQuery,
  Bid_GetBids_MutationQueryVariables,
  Bid_Get_User_BidsQuery,
  Bid_Get_User_BidsQueryVariables,
  Bid_HuduFinsihedProjectMutation,
  Bid_HuduFinsihedProjectMutationVariables,
  Bid_RejectBidMutation,
  Bid_RejectBidMutationVariables,
  Bid_WithdrawBidForHuduMutation,
  Bid_WithdrawBidForHuduMutationVariables,
  ResponseStatus,
} from '~/generated/graphql';
import {
  BID_ACCEPT_BID,
  BID_ACTIVE_BID,
  BID_ADD_BID,
  BID_ADD_WORKING_HOURS,
  BID_CANCELL_BID,
  BID_DELETE_BID,
  BID_EDIT_BID,
  BID_HUDU_FINISHED_PROJECT,
  BID_REJECT_BID,
  BID_WITHDRAW_BID_FOR_HUDU,
} from '~/graphql/bid/mutations';
import {
  BID_GET_ACCEPT_BID_DETAILS,
  BID_GET_BIDS,
  BID_GET_BIDS_IN_PROJECT_DETAILS_TAB,
  BID_GET_BIDS_MUTATION,
  BID_GET_BIDS_ORDED_BY_BID_SATATUS,
  BID_GET_USER_BIDS,
} from '~/graphql/bid/queries';
import {fetcher} from '~/graphql/graphQLClient';
import {useGetMessages} from '~/utils/helper';
import {showErrorMessage} from '~/utils/utils';

export const useGetBids = ({
  projectFilter,
  location,
  where,
  take = PAGE_SIZE,
  order,
  options = {},
}: {
  projectFilter?: any;
  location?: any;
  where?: BidFilterInput;
  order?: any;
  options?: any;
  take?: number;
}) => {
  return useInfiniteQuery<
    Bid_GetBidsQuery,
    any,
    Bid_GetBidsQueryVariables,
    any
  >(
    [queryKeys.bids, projectFilter, location, where, take, order],
    async ({pageParam = 0}) => {
      return fetcher(BID_GET_BIDS, {
        skip: pageParam * PAGE_SIZE,
        take,
        projectFilter,
        location,
        where,
        order,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Bid_GetBidsQuery,
        allPages: Bid_GetBidsQuery[],
      ) => {
        if (lastPage?.bid_getBids?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.bid_getBids?.result?.items).flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetUserBids = ({
  projectFilter,
  location,
  where,
  take = PAGE_SIZE,
  options = {},
}: {
  projectFilter?: any;
  location?: any;
  where?: BidFilterInput;
  options?: any;
  take?: number;
}) => {
  return useInfiniteQuery<
    Bid_Get_User_BidsQuery,
    any,
    Bid_Get_User_BidsQueryVariables,
    any
  >(
    [queryKeys.getUserBids],
    async ({pageParam = 0}) => {
      return fetcher(BID_GET_USER_BIDS, {
        skip: pageParam * PAGE_SIZE,
        take,
        projectFilter,
        location,
        where,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Bid_Get_User_BidsQuery,
        allPages: Bid_Get_User_BidsQuery[],
      ) => {
        if (lastPage?.bid_getBids?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages?.map(a => a?.bid_getBids?.result?.items).flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetBidsOrderByStatus = ({
  projectFilter,
  where,
  options = {},
  input,
  pageSize = PAGE_SIZE,
}: {
  projectFilter?: any;
  where?: BidFilterInput;
  options?: any;
  input?: any;
  pageSize?: any;
}) => {
  return useInfiniteQuery<
    Bid_GetBidsOrdedByBidSatatusQuery,
    any,
    Bid_GetBidsOrdedByBidSatatusQueryVariables,
    any
  >(
    [queryKeys.bidsOrderByStatus, projectFilter, where, input],
    async ({pageParam = 0}) => {
      return fetcher(BID_GET_BIDS_ORDED_BY_BID_SATATUS, {
        skip: pageParam * pageSize,
        take: pageSize,
        projectFilter,
        where,
        input,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Bid_GetBidsOrdedByBidSatatusQuery,
        allPages: Bid_GetBidsOrdedByBidSatatusQuery[],
      ) => {
        if (
          lastPage?.bid_getBidsOrdedByBidSatatus?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.bid_getBidsOrdedByBidSatatus?.result?.items)
            .flat(),
        };
      },
      ...options,
    },
  );
};

export const useGetBidsInProjectDetailsTab = ({
  where,
  projectId,
}: {
  where?: BidFilterInput;
  projectId: number;
}) => {
  return useQuery<
    Bid_GetBidsInProjectDetailsTabQuery,
    any,
    Bid_GetBidsInProjectDetailsTabQueryVariables,
    any
  >([queryKeys.getBidsInProjectTab, projectId, where], async () => {
    return fetcher(BID_GET_BIDS_IN_PROJECT_DETAILS_TAB, {projectId})();
  });
};

export const useAcceptBid = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Bid_AcceptBidMutation,
    any,
    Bid_AcceptBidMutationVariables
  >(
    async ({bidId, couponCode}: {bidId: any; couponCode?: any}) => {
      return fetcher(BID_ACCEPT_BID, {
        bidId,
        ...(couponCode && {couponCode}),
      })();
    },
    {
      onSuccess: successData => {
        if (successData?.bid_acceptBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.bid_acceptBid?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useRejectBid = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Bid_RejectBidMutation,
    any,
    Bid_RejectBidMutationVariables
  >(
    async (bidId: number) => {
      return fetcher(BID_REJECT_BID, {bidId})();
    },
    {
      onSuccess: successData => {
        if (successData?.bid_rejectBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries([queryKeys.getBidsInProjectTab], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getBidsCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.bid_rejectBid?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddBid = () => {
  const queryClient = useQueryClient();

  return useMutation<Bid_AddBidMutation, any, Bid_AddBidMutationVariables>(
    async (bidInput: any) => {
      return fetcher(BID_ADD_BID, {bidInput})();
    },
    {
      onSuccess: successData => {
        if (successData?.bid_addBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries([queryKeys.bids, {exact: false}]);
          queryClient.invalidateQueries([queryKeys.bidsOrderByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.projects], {exact: false});
          queryClient.invalidateQueries([queryKeys.project], {exact: false});
          queryClient.invalidateQueries([queryKeys.userLikeProjects], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getBidsCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getMyBids], {
            exact: false,
          });
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useCancelBid = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Bid_CancellBidMutation,
    any,
    Bid_CancellBidMutationVariables
  >(
    async ({
      bidId,
      cancellationReason,
    }: {
      bidId: any;
      cancellationReason?: any;
    }) => {
      return fetcher(BID_CANCELL_BID, {bidId, cancellationReason})();
    },
    {
      onSuccess: successData => {
        if (successData?.bid_cancellBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.bid_cancellBid?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useActiveBid = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Bid_ActivateBidMutation,
    any,
    Bid_ActivateBidMutationVariables
  >(
    async (bidId: any) => {
      return fetcher(BID_ACTIVE_BID, {bidId})();
    },
    {
      onSuccess: successData => {
        if (successData?.bid_activateBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.bid_activateBid?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useDeleteBid = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Bid_DeleteBidMutation,
    any,
    Bid_DeleteBidMutationVariables
  >(
    async (bidId: any) => {
      return fetcher(BID_DELETE_BID, {bidId})();
    },
    {
      onSuccess: successData => {
        if (successData?.bid_deleteBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getBidsCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.bid_deleteBid?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useEditBid = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<Bid_EditBidMutation, any, Bid_EditBidMutationVariables>(
    async (editBidInput: any) => {
      return fetcher(BID_EDIT_BID, {editBidInput})();
    },
    {
      onSuccess: successData => {
        if (successData?.bid_editBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries([queryKeys.bids], {exact: false});
          queryClient.invalidateQueries([queryKeys.getUserReviews], {
            exact: false,
          });

          queryClient.invalidateQueries([queryKeys.bidsOrderByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.projects], {exact: false});
          queryClient.invalidateQueries([queryKeys.project], {exact: false});
          queryClient.invalidateQueries([queryKeys.userLikeProjects], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getBidsCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.bid_editBid?.status) as any;
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useHuduFinishedProject = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Bid_HuduFinsihedProjectMutation,
    any,
    Bid_HuduFinsihedProjectMutationVariables
  >(
    async (bidId: number) => {
      return fetcher(BID_HUDU_FINISHED_PROJECT, {bidId})();
    },
    {
      onSuccess: successData => {
        if (
          successData?.bid_huduFinsihedProject?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
          queryClient.invalidateQueries([queryKeys.getProjectCountByStatus], {
            exact: false,
          });
        } else {
          showResponseMessage(successData?.bid_huduFinsihedProject?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useWithdrawBidForHudu = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Bid_WithdrawBidForHuduMutation,
    any,
    Bid_WithdrawBidForHuduMutationVariables
  >(
    async (bidId: number) => {
      return fetcher(BID_WITHDRAW_BID_FOR_HUDU, {bidId})();
    },
    {
      onSuccess: successData => {
        if (
          successData?.bid_withdrawBidForHudu?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
        } else {
          showResponseMessage(successData?.bid_withdrawBidForHudu?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddWorkingHours = () => {
  const queryClient = useQueryClient();
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Bid_AddWorkingHoursMutation,
    any,
    Bid_AddWorkingHoursMutationVariables
  >(
    async ({bidId, workedHours}: {bidId: number; workedHours: any}) => {
      return fetcher(BID_ADD_WORKING_HOURS, {bidId, workedHours})();
    },
    {
      onSuccess: successData => {
        if (
          successData?.bid_addWorkingHours?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.project);
          queryClient.invalidateQueries(queryKeys.userLikeProjects);
        } else {
          showResponseMessage(successData?.bid_addWorkingHours?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetBidsMutation = ({
  projectFilter,
  location,
  where,
  take = PAGE_SIZE,
}: {
  projectFilter?: any;
  location?: any;
  where?: BidFilterInput;
  take?: number;
}) => {
  const queryClient = useQueryClient();

  return useMutation<
    Bid_GetBids_MutationQuery,
    any,
    Bid_GetBids_MutationQueryVariables,
    any
  >(
    async () => {
      return fetcher(BID_GET_BIDS_MUTATION, {
        projectFilter,
        location,
        where,
        take,
        skip: PAGE_SIZE,
      })();
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

export const useGetAcceptBidDetails = (bidId: number) => {
  return useQuery<
    Bid_GetAcceptBidDetailsQuery,
    any,
    Bid_GetAcceptBidDetailsQueryVariables,
    any
  >([queryKeys.getBadge, bidId], async () => {
    return fetcher(BID_GET_ACCEPT_BID_DETAILS, {bidId})();
  });
};
