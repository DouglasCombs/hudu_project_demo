import {useMutation} from '@tanstack/react-query';
import queryKeys from '~/constants/queryKeys';
import {
  AppRateInput,
  AppRate_AddAppRateMutation,
  AppRate_AddAppRateMutationVariables,
} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {APP_RATE_ADD_APP_RATE} from '~/graphql/appRate/mutations';
import {fetcher} from '~/graphql/graphQLClient';
import {showErrorMessage} from '~/utils/utils';

export const useAddAppRate = () => {
  return useMutation<
    AppRate_AddAppRateMutation,
    any,
    AppRate_AddAppRateMutationVariables
  >(
    async (input: AppRateInput) => {
      return fetcher(APP_RATE_ADD_APP_RATE, {input})();
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
