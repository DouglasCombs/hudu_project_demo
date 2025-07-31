import {gql} from 'graphql-request';

export const FLAG_TEXT_GET_FLAG_TEXTS = gql`
  query flagText_getFlagTexts(
    $skip: Int
    $take: Int
    $where: FlagTextFilterInput
    $order: [FlagTextSortInput!]
  ) {
    flagText_getFlagTexts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          text
          id
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
      }
      status
    }
  }
`;
