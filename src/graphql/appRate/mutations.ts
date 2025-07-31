import {gql} from 'graphql-request';

export const APP_RATE_ADD_APP_RATE = gql`
  mutation appRate_addAppRate($input: AppRateInput) {
    appRate_addAppRate(input: $input) {
      result {
        id
      }
      status
    }
  }
`;
