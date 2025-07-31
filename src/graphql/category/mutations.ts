import {gql} from 'graphql-request';

export const CATEGORY_PIN_CATEGORIES = gql`
  mutation category_pinCategories($categoryIds: [Int!]) {
    category_pinCategories(categoryIds: $categoryIds) {
      status
    }
  }
`;

export const CATEGORY_PIN_CATEGORY = gql`
  mutation category_pinCategory($categoryId: Int!) {
    category_pinCategory(categoryId: $categoryId) {
      status
    }
  }
`;

export const CATEGORY_UN_PIN_CATEGORY = gql`
  mutation category_unPinCategory($categoryId: Int!) {
    category_unPinCategory(categoryId: $categoryId) {
      status
    }
  }
`;
