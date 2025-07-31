import {gql} from 'graphql-request';

export const GET_ORDER_TAZWORK = gql`
  query tazworkOrders_getOrders(
    $skip: Int
    $take: Int
    $where: TazworkOrderFilterInput
    $order: [TazworkOrderSortInput!]
  ) {
    tazworkOrders_getOrders {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          userId
          productId

          orderGuid
          quickappApplicantLink
          orderStatus
          id
          isDeleted
          createdDate
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

export const GET_USER_TAZWORK_RATE = gql`
  query tazworkOrders_getUserTazWorkRate($userId: Int!) {
    tazworkOrders_getUserTazWorkRate(userId: $userId) {
      result {
        gold
        silver
        bronze
        hasBackgroundCheck
      }
      status
    }
  }
`;

export const GET_PRODUCTS_TAZWORK = gql`
  query tazworkProducts_getProducts(
    $skip: Int
    $take: Int
    $where: TazWorkProductsFilterInput
    $order: [TazWorkProductsSortInput!]
  ) {
    tazworkProducts_getProducts {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          clientProductGuid
          productGuid
          productName
          alternateName
          productType
          price

          id
          isDeleted
          createdDate
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
