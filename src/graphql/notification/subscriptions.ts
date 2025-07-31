import {gql} from 'graphql-request';

export const NOTIFICATION_ADDED = gql`
  subscription notificationAdded($userId: Int!) {
    notificationAdded(userId: $userId) {
      title
      id
    }
  }
`;
