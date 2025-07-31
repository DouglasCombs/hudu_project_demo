import {gql} from 'graphql-request';

export const MESSAGE_ADDED = gql`
  subscription messageAdded($userId: Int!) {
    messageAdded(userId: $userId) {
      messageType
      photoUrl
      isEdited
      createdAt
      conversationId
      conversation {
        subject
        project {
          title
          id
        }
        projectId
        id
        isDeleted
        createdDate
      }
      senderId
      sender {
        userName
        id
      }
      text
      id
      isDeleted
      createdDate
    }
  }
`;

export const SUBSCRIBE_TO_GROUP_MESSAGE_ADDED = gql`
  subscription subscribeToGroupMessageAdded($userId: Int!) {
    subscribeToGroupMessageAdded(userId: $userId) {
      messageType
      photoUrl
      isEdited
      createdAt
      conversationId
      senderId
      text
      id
      isDeleted
      createdDate
    }
  }
`;
