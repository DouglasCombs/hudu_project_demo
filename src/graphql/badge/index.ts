import {gql} from 'graphql-request';

export const GET_BADGES = gql`
  query badge_getBadges(
    $skip: Int
    $take: Int
    $where: BadgeFilterInput
    $order: [BadgeSortInput!]
  ) {
    badge_getBadges {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          badgeType
          badgeLevel
          description
          userId
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

export const GET_BADGE = gql`
  query badge_getBadge($entityId: Int!) {
    badge_getBadge(entityId: $entityId) {
      result {
        badgeType
        badgeLevel
        description
        userId
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;
