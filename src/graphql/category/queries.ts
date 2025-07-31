import {gql} from 'graphql-request';

export const CATEGORY_GET_PINED_CATEGORIES = gql`
  query category_getPinedCategories(
    $skip: Int
    $take: Int
    $where: PinCategoryFilterInput
    $order: [PinCategorySortInput!]
  ) {
    category_getPinedCategories {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          categoryId
          id
          isDeleted
          category {
            text
            spanishText
            id
            parentId
          }
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
