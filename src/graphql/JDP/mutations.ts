import {gql} from 'graphql-request';

export const TAZWORK_SUBMIT_ORDER = gql`
  mutation tazwork_submitOrder($productId: Int!) {
    tazwork_submitOrder(productId: $productId) {
      result
      status
    }
  }
`;
