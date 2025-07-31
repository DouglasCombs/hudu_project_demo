import {useTranslation} from 'react-i18next';
import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  ActivationNotificationInput,
  MutationUser_EditImageArgs,
  MutationUser_RemoveImageArgs,
  Referall_GetReferallInfoQuery,
  Referall_GetReferallInfoQueryVariables,
  ResponseStatus,
  UserAddressIputInput,
  User_AddAddressesToUserMutation,
  User_AddAddressesToUserMutationVariables,
  User_DeleteUserMutation,
  User_DeleteUserMutationVariables,
  User_GetMinimalProfileQuery,
  User_GetMinimalProfileQueryVariables,
  User_GetProfileQuery,
  User_GetProfileQueryVariables,
  User_GetReviewsQuery,
  User_GetReviewsQueryVariables,
  User_GetUserAddressesQuery,
  User_GetUserAddressesQueryVariables,
  User_GetUserImagesQuery,
  User_GetUserImagesQueryVariables,
  User_GetUsersQuery,
  User_GetUsersQueryVariables,
  User_GetUsersSafeQuery,
  User_GetUsersSafeQueryVariables,
  User_RemoveAddressFromUserMutation,
  User_RemoveAddressFromUserMutationVariables,
  User_SendEmailMutation,
  User_SendEmailMutationVariables,
  User_UpdateLastSeenMutation,
  User_UpdateLastSeenMutationVariables,
  User_UpdateProfileMutation,
  User_UpdateProfileMutationVariables,
  User_UsernameExistQuery,
  User_UsernameExistQueryVariables,
  UsersFilterInput,
  UsersSortInput,
} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import graphQLClient, {fetcher} from '~/graphql/graphQLClient';
import {
  GENERATE_REFERRAL_CODE,
  USER_ACTIVATION_NOTIFICATION,
  USER_ADD_ADDRESSES_TO_USER,
  USER_ADD_IMAGES,
  USER_ADD_PHONE_NUMBER,
  USER_CHECK_USER_NAME,
  USER_CONFIRM_PHONE_NUMBER,
  USER_DELETE_IMAGES,
  USER_DELETE_USER,
  USER_EDIT_ADDRESS,
  USER_EDIT_IMAGES,
  USER_REMOVE_ADDRESSES_FROM_USER,
  USER_SEND_EMAIL,
  USER_SIGN_UP_REFERRAL_CODE,
  USER_UPDATE_LAST_SEEN,
  USER_UPDATE_PROFILE,
} from '~/graphql/user/mutations';
import {
  GET_REFERRAL_INFO,
  GET_USERS,
  GET_USER_IMAGES,
  USER_GET_ADDRESSES,
  USER_GET_MINIMAL_PROFILE,
  USER_GET_NOTIFICATION_STATUS,
  USER_GET_PROFILE,
  USER_GET_REVIEW,
  USER_GET_USERS_SAFE,
} from '~/graphql/user/queries';
import {goBack, resetRoot} from '~/navigation/Methods';
import {removeData} from '~/services/storage';
import {authStore, userDataStore} from '~/stores';
import {useGetMessages} from '~/utils/helper';
import {showErrorMessage} from '~/utils/utils';

export const useGetReferralInfo = (userId: number = 0) => {
  return useQuery<
    Referall_GetReferallInfoQuery,
    any,
    Referall_GetReferallInfoQueryVariables,
    any
  >([queryKeys.getReferralInfo, userId], async () => {
    return fetcher(GET_REFERRAL_INFO, userId)();
  });
};

export const useGetUserReviews = (options: any = {}) => {
  return useInfiniteQuery<
    User_GetReviewsQuery,
    any,
    User_GetReviewsQueryVariables,
    any
  >(
    [queryKeys.getUserReviews, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(USER_GET_REVIEW, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: User_GetReviewsQuery,
        allPages: User_GetReviewsQuery[],
      ) => {
        if (lastPage?.user_getReviews?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getReviews?.result?.items || [])
            .flat(),
          totalCount: data?.pages?.[0]?.user_getReviews?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetUsers = ({
  options = {},
  where,
  order,
}: {
  options?: any;
  where?: UsersFilterInput;
  order?: UsersSortInput;
}) => {
  return useInfiniteQuery<
    User_GetUsersQuery,
    any,
    User_GetUsersQueryVariables,
    any
  >(
    [queryKeys.getUsers],
    async ({pageParam = 0}) => {
      return graphQLClient.request(GET_USERS, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        where,
        order,
      });
    },
    {
      getNextPageParam: (
        lastPage: User_GetUsersQuery,
        allPages: User_GetUsersQuery[],
      ) => {
        if (lastPage?.user_getUsers?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getUsers?.result?.items || [])
            .flat(),
          totalCount: data?.pages?.[0]?.user_getUsers?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetUserAddresses = (options: any = {}) => {
  return useInfiniteQuery<
    User_GetUserAddressesQuery,
    any,
    User_GetUserAddressesQueryVariables,
    any
  >(
    [queryKeys.getUserAddresses, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(USER_GET_ADDRESSES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: User_GetUserAddressesQuery,
        allPages: User_GetUserAddressesQuery[],
      ) => {
        if (lastPage?.user_getUserAddresses?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getUserAddresses?.result?.items || [])
            .flat(),
          totalCount:
            data?.pages?.[0]?.user_getUserAddresses?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetProfile = (options: any = {}) => {
  return useQuery<
    User_GetProfileQuery,
    any,
    User_GetProfileQueryVariables,
    any
  >(
    [queryKeys.userProfile, options],
    async () => {
      return fetcher(USER_GET_PROFILE, options)();
    },
    {
      ...options,
    },
  );
};

export const useGetMinimalProfile = (options: any = {}) => {
  return useQuery<
    User_GetMinimalProfileQuery,
    any,
    User_GetMinimalProfileQueryVariables,
    any
  >(
    [queryKeys.minimalUserProfile, options],
    async () => {
      return fetcher(USER_GET_MINIMAL_PROFILE, options)();
    },
    {
      ...options,
    },
  );
};

export const useGetNotificationStatus = ({
  userId,
  options = {},
}: {
  userId: number;
  options?: any;
}) => {
  return useQuery<
    User_GetMinimalProfileQuery,
    any,
    User_GetMinimalProfileQueryVariables,
    any
  >(
    [queryKeys.getNotificationStatus, userId],
    async () => {
      return fetcher(USER_GET_NOTIFICATION_STATUS, {userId})();
    },
    {
      ...options,
    },
  );
};

export const useGetMeProfile = (options: any = {}) => {
  return useQuery<
    User_GetProfileQuery,
    any,
    User_GetProfileQueryVariables,
    any
  >(
    [queryKeys.myProfile, options],
    async () => {
      return fetcher(USER_GET_PROFILE, options)();
    },
    {
      ...options,
    },
  );
};

export const useUpdateLastSeen = () => {
  return useMutation<
    User_UpdateLastSeenMutation,
    any,
    User_UpdateLastSeenMutationVariables
  >(
    async () => {
      return fetcher(USER_UPDATE_LAST_SEEN)();
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useUpdateProfile = () => {
  const {showResponseMessage} = useGetMessages();
  const {setUserData} = userDataStore(state => state);
  return useMutation<
    User_UpdateProfileMutation,
    any,
    User_UpdateProfileMutationVariables
  >(
    async (userInput: any) => {
      return fetcher(USER_UPDATE_PROFILE, {userInput})();
    },
    {
      onSuccess: async successData => {
        if (
          successData?.user_updateProfile?.status === ResponseStatus.Success
        ) {
          setUserData(successData?.user_updateProfile?.result);
          await queryClient.invalidateQueries(queryKeys.userProfile);
        } else {
          showResponseMessage(successData?.user_updateProfile?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useSendEmail = () => {
  return useMutation<
    User_SendEmailMutation,
    any,
    User_SendEmailMutationVariables
  >(
    async (email: any) => {
      return fetcher(USER_SEND_EMAIL, {email})();
    },
    {
      onSuccess: () => {
        goBack();
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useSignUpReferralCode = () => {
  return useMutation<any>(
    async (referallCode: any) => {
      return fetcher(USER_SIGN_UP_REFERRAL_CODE, {referallCode})();
    },
    {
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useDeleteAccount = () => {
  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData, setGroupConversationId} = userDataStore(state => state);
  const {setToken} = authStore(state => state);

  const {t} = useTranslation();

  return useMutation<
    User_DeleteUserMutation,
    any,
    User_DeleteUserMutationVariables
  >(
    async userId => {
      return fetcher(USER_DELETE_USER, {userId})();
    },
    {
      onSuccess: async successData => {
        if (successData.user_DeleteUser?.status === ResponseStatus.Success) {
          graphQLClient.setHeader('authorization', '');
          queryClient.cancelQueries();
          queryClient.clear();
          setGroupConversationId(undefined);
          await removeData('isUserLoggedIn');
          await removeData('userData');
          await removeData('id_token');
          await removeData('FCM_TOKEN');
          setIsUserLoggedIn(false);
          setUserData({});
          setToken(undefined);
          resetRoot('MainTabs');
        } else {
          showErrorMessage(t('messages.cantDeleteAccount'));
        }
      },
    },
  );
};

export const useGetEmailByUserName = () => {
  return useMutation<
    User_GetUsersSafeQuery,
    any,
    User_GetUsersSafeQueryVariables
  >(
    async (options: any) => {
      return fetcher(USER_GET_USERS_SAFE, options)();
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useCheckUserNameExist = () => {
  return useMutation<
    User_UsernameExistQuery,
    any,
    User_UsernameExistQueryVariables
  >(
    async (params: any) => {
      return fetcher(USER_CHECK_USER_NAME, params)();
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGenerateReferralCode = (options: any = {}) => {
  return useQuery([queryKeys.referralCode, options], async () => {
    return fetcher(GENERATE_REFERRAL_CODE)();
  });
};

export const useEditAddress = () => {
  return useMutation<
    User_AddAddressesToUserMutation,
    any,
    User_AddAddressesToUserMutationVariables,
    any
  >(
    async ({input}: {input: UserAddressIputInput[]}) => {
      return fetcher(USER_EDIT_ADDRESS, {input})();
    },
    {
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddUserAddress = () => {
  return useMutation<
    User_AddAddressesToUserMutation,
    any,
    User_AddAddressesToUserMutationVariables,
    any
  >(
    async ({input}: {input: UserAddressIputInput[]}) => {
      return fetcher(USER_ADD_ADDRESSES_TO_USER, {input})();
    },
    {
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useRemoveAddress = () => {
  return useMutation<
    User_RemoveAddressFromUserMutation,
    any,
    User_RemoveAddressFromUserMutationVariables,
    any
  >(
    async ({addressIds}: {addressIds: number[]}) => {
      return fetcher(USER_REMOVE_ADDRESSES_FROM_USER, {
        userAddressIds: addressIds,
      })();
    },
    {
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddPhoneNumber = () => {
  return useMutation<any>(
    async ({phoneNumber, countryCode}: any) => {
      return fetcher(USER_ADD_PHONE_NUMBER, {
        phoneNumber,
        countryCode,
      })();
    },
    {
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useConfirmPhoneNumber = () => {
  return useMutation<any>(
    async ({verificationCode}: any) => {
      return fetcher(USER_CONFIRM_PHONE_NUMBER, {
        verificationCode,
      })();
    },
    {
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddUserImages = () => {
  return useMutation<MutationUser_EditImageArgs>(
    async input => {
      return fetcher(USER_ADD_IMAGES, {input})();
    },
    {
      onSuccess: async successData => {
        queryClient.invalidateQueries(queryKeys.userProfile);
      },
    },
  );
};

export const useDeleteUserImages = () => {
  return useMutation<MutationUser_RemoveImageArgs>(
    async userImageids => {
      return fetcher(USER_DELETE_IMAGES, {userImageids})();
    },
    {
      onSuccess: async successData => {
        queryClient.invalidateQueries(queryKeys.userProfile);
      },
    },
  );
};

export const useEditUserImages = () => {
  return useMutation<MutationUser_EditImageArgs>(
    async input => {
      return fetcher(USER_EDIT_IMAGES, {input})();
    },
    {
      onSuccess: async successData => {
        queryClient.invalidateQueries(queryKeys.userProfile);
      },
    },
  );
};

export const useGetUserImages = (options: any = {}) => {
  return useInfiniteQuery<
    User_GetUserImagesQuery,
    any,
    User_GetUserImagesQueryVariables,
    any
  >(
    [queryKeys.getUserImages, options],
    async ({pageParam = 0}) => {
      return graphQLClient.request(GET_USER_IMAGES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      });
    },
    {
      getNextPageParam: (
        lastPage: User_GetUserImagesQuery,
        allPages: User_GetUserImagesQuery[],
      ) => {
        if (lastPage?.user_getUserImages?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.user_getUserImages?.result?.items || [])
            .flat(),
          totalCount: data?.pages?.[0]?.user_getUserImages?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useActivationNotifications = () => {
  return useMutation<any>(
    async ({input}: {input: ActivationNotificationInput}) => {
      return fetcher(USER_ACTIVATION_NOTIFICATION, {input})();
    },
    {
      onSuccess: successData => {
        if (
          successData?.user_activationNotifications?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries([queryKeys.getNotificationStatus], {
            exact: false,
          });
          goBack();
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};
