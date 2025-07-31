import {Linking} from 'react-native';
import {useMutation, useQuery} from '@tanstack/react-query';
import queryKeys from '~/constants/queryKeys';
import {
  Payment_CreateEphemeralKeyMutation,
  Payment_CreateEphemeralKeyMutationVariables,
  Payment_GetClientSecretOfProjectQuery,
  Payment_GetClientSecretOfProjectQueryVariables,
  Payment_GetConnectUserBlanceQuery,
  Payment_GetConnectUserBlanceQueryVariables,
  Payment_GetProjectDoerPaymentDetailsQuery,
  Payment_GetProjectDoerPaymentDetailsQueryVariables,
  Payment_GetProjectPaymentDetailsQuery,
  Payment_GetProjectPaymentDetailsQueryVariables,
  Payment_GetPublishableKeyQuery,
  Payment_GetPublishableKeyQueryVariables,
  Payment_GetStripeConnectUserBlanceQuery,
  Payment_GetStripeConnectUserBlanceQueryVariables,
  Payment_HasStripeAccountQuery,
  Payment_HasStripeAccountQueryVariables,
  Payment_OnboardUserInStripeConnectMutation,
  Payment_OnboardUserInStripeConnectMutationVariables,
  Payment_PayoutForConnectsMutation,
  Payment_PayoutForConnectsMutationVariables,
  Payment_WidthrawUsersWalletMutation,
  Payment_WidthrawUsersWalletMutationVariables,
  Payment_WidthrawlReferallIncomeMutation,
  Payment_WidthrawlReferallIncomeMutationVariables,
  ResponseStatus,
  WidthrawWalletType,
} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {fetcher} from '~/graphql/graphQLClient';
import {
  PAYMENT_CREATE_EPHEMERAL_KEY,
  PAYMENT_ONBOARD_USER_IN_STRIPE_CONNECT,
  PAYMENT_PAYOUT_FOR_CONNECT,
  PAYMENT_WITHDRAW_USER_WALLET,
  WITHDRAW_REFERRAL_INCOME,
} from '~/graphql/payment/mutation';
import {
  COUPON_IS_COUPON_VALID,
  PAYMENT_GET_CLIENT_SECRET_OF_PROJECT,
  PAYMENT_GET_CONNECT_USER_BALANCE,
  PAYMENT_GET_PROJECT_DOER_PAYMENT_DETAILS,
  PAYMENT_GET_PROJECT_PAYMENT_DETAILS,
  PAYMENT_GET_PUBLISHABLE_KEY,
  PAYMENT_GET_STRIPE_CONNECT_USER_BLANCE,
  PAYMENT_HS_STRIPE_ACCOUNT,
} from '~/graphql/payment/queries';
import {useGetMessages} from '~/utils/helper';
import {showErrorMessage} from '~/utils/utils';

export const useWithdrawReferralIncome = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Payment_WidthrawlReferallIncomeMutation,
    any,
    Payment_WidthrawlReferallIncomeMutationVariables
  >(
    async () => {
      return fetcher(WITHDRAW_REFERRAL_INCOME)();
    },
    {
      onSuccess: successData => {
        showResponseMessage(
          successData?.payment_widthrawlReferallIncome?.status,
        );
        queryClient.invalidateQueries(queryKeys.userProfile);
        queryClient.invalidateQueries(queryKeys.getReferralInfo);
        queryClient.invalidateQueries(queryKeys.getBadges);
        queryClient.invalidateQueries(queryKeys.getBadge);
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useOnboardingStripe = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Payment_OnboardUserInStripeConnectMutation,
    any,
    Payment_OnboardUserInStripeConnectMutationVariables
  >(
    async () => {
      return fetcher(PAYMENT_ONBOARD_USER_IN_STRIPE_CONNECT, {isByApp: true})();
    },
    {
      onSuccess: successData => {
        if (
          successData?.payment_onboardUserInStripeConnect?.status ===
          ResponseStatus.Success
        ) {
          Linking.openURL(
            successData?.payment_onboardUserInStripeConnect?.result,
          );
        } else {
          showResponseMessage(
            successData?.payment_onboardUserInStripeConnect?.status,
          );
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useCreateEphemeralKeyMutation = () => {
  return useMutation<
    Payment_CreateEphemeralKeyMutation,
    any,
    Payment_CreateEphemeralKeyMutationVariables
  >(
    async () => {
      return fetcher(PAYMENT_CREATE_EPHEMERAL_KEY)();
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetHasPaymentStripe = (options: any = {}) => {
  return useQuery<
    Payment_HasStripeAccountQuery,
    any,
    Payment_HasStripeAccountQueryVariables,
    any
  >(
    [queryKeys.hasStripeAccount, options],
    async () => {
      return fetcher(PAYMENT_HS_STRIPE_ACCOUNT, options)();
    },
    {
      ...options,
    },
  );
};

export const useGetHasPaymentStripeMutation = () => {
  return useMutation<
    Payment_HasStripeAccountQuery,
    any,
    Payment_HasStripeAccountQueryVariables,
    any
  >(
    async () => {
      return fetcher(PAYMENT_HS_STRIPE_ACCOUNT)();
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

export const useGetPublishableKey = (options: any = {}) => {
  return useQuery<
    Payment_GetPublishableKeyQuery,
    any,
    Payment_GetPublishableKeyQueryVariables,
    any
  >(
    [queryKeys.getPublishableKey],
    async () => {
      return fetcher(PAYMENT_GET_PUBLISHABLE_KEY)();
    },
    {
      ...options,
    },
  );
};

export const useGetProjectPaymentDetails = ({
  projectId,
  options,
}: {
  projectId?: number;
  options: any;
}) => {
  return useQuery<
    Payment_GetProjectPaymentDetailsQuery,
    any,
    Payment_GetProjectPaymentDetailsQueryVariables,
    any
  >(
    [queryKeys.getProjectPaymentDetails],
    async () => {
      return fetcher(PAYMENT_GET_PROJECT_PAYMENT_DETAILS, {
        ...(projectId && {projectId}),
      })();
    },
    {
      ...options,
    },
  );
};

export const useGetProjectDoerPaymentDetails = ({
  userId,
  options,
}: {
  userId?: number;
  options: any;
}) => {
  return useQuery<
    Payment_GetProjectDoerPaymentDetailsQuery,
    any,
    Payment_GetProjectDoerPaymentDetailsQueryVariables,
    any
  >(
    [queryKeys.getProjectDoerPaymentDetails],
    async () => {
      return fetcher(PAYMENT_GET_PROJECT_DOER_PAYMENT_DETAILS, {
        ...(userId && {userId}),
      })();
    },
    {
      ...options,
    },
  );
};

export const useGetProjectsPaymentDetails = ({options}: {options: any}) => {
  return useQuery<
    Payment_GetProjectPaymentDetailsQuery,
    any,
    Payment_GetProjectPaymentDetailsQueryVariables,
    any
  >(
    [queryKeys.getProjectsPaymentDetails],
    async () => {
      return fetcher(PAYMENT_GET_PROJECT_PAYMENT_DETAILS)();
    },
    {
      ...options,
    },
  );
};

export const useGetClientSecretOfProject = (options: any = {}) => {
  return useQuery<
    Payment_GetClientSecretOfProjectQuery,
    any,
    Payment_GetClientSecretOfProjectQueryVariables,
    any
  >(
    [queryKeys.getClientSecretOfProject],
    async () => {
      return fetcher(PAYMENT_GET_CLIENT_SECRET_OF_PROJECT, options)();
    },
    {
      ...options,
    },
  );
};

export const useCheckCouponCode = () => {
  return useMutation<any>(
    async ({couponCode}: {couponCode: any}) => {
      return fetcher(COUPON_IS_COUPON_VALID, {couponCode})();
    },
    {
      onSuccess: () => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useWithdrawUserWallet = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Payment_WidthrawUsersWalletMutation,
    any,
    Payment_WidthrawUsersWalletMutationVariables
  >(
    async ({
      amount,
      widthrawWalletType,
    }: {
      amount: any;
      widthrawWalletType: WidthrawWalletType;
    }) => {
      return fetcher(PAYMENT_WITHDRAW_USER_WALLET, {
        amount,
        widthrawWalletType,
      })();
    },
    {
      onSuccess: successData => {
        if (
          successData?.payment_widthrawUsersWallet?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries([queryKeys.myProfile], {exact: false});
          showResponseMessage(successData?.payment_widthrawUsersWallet?.status);
        } else {
          showResponseMessage(successData?.payment_widthrawUsersWallet?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetConnectUserBalance = (options: any = {}) => {
  return useQuery<
    Payment_GetConnectUserBlanceQuery,
    any,
    Payment_GetConnectUserBlanceQueryVariables,
    any
  >(
    [queryKeys.getConnectUserBalance],
    async () => {
      return fetcher(PAYMENT_GET_CONNECT_USER_BALANCE, options)();
    },
    {
      ...options,
    },
  );
};

export const useGetStripeConnectUserBalance = (options: any = {}) => {
  return useQuery<
    Payment_GetStripeConnectUserBlanceQuery,
    any,
    Payment_GetStripeConnectUserBlanceQueryVariables,
    any
  >(
    [queryKeys.getStripeConnectUserBalance],
    async () => {
      return fetcher(PAYMENT_GET_STRIPE_CONNECT_USER_BLANCE, options)();
    },
    {
      ...options,
    },
  );
};

export const usePaymentPayoutForConnect = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<
    Payment_PayoutForConnectsMutation,
    any,
    Payment_PayoutForConnectsMutationVariables
  >(
    async ({amount}: {amount: any}) => {
      return fetcher(PAYMENT_PAYOUT_FOR_CONNECT, {
        amount,
      })();
    },
    {
      onSuccess: successData => {
        if (
          successData?.payment_payoutForConnects?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries([queryKeys.myProfile], {exact: false});
          showResponseMessage(successData?.payment_payoutForConnects?.status);
        } else {
          showResponseMessage(successData?.payment_payoutForConnects?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};
