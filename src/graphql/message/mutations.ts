import {gql} from 'graphql-request';

export const MESSAGE_CREATE_MESSAGE = gql`
  mutation message_createMessage($messageInput: MessageInput) {
    message_createMessage(messageInput: $messageInput) {
      result {
        createdAt
        conversationId
        senderId
        text
        id
        isDeleted
      }
      status
    }
  }
`;

export const MESSAGE_DELETE_MESSAGE = gql`
  mutation message_deleteMessage($messageId: Int!) {
    message_deleteMessage(messageId: $messageId) {
      result {
        createdAt
        conversationId
        senderId
        text
        id
        isDeleted
      }
      status
    }
  }
`;

export const MESSAGE_REMOVE_CONVERSATION = gql`
  mutation message_removeConversation($conversationId: Int!) {
    message_removeConversation(conversationId: $conversationId) {
      status
    }
  }
`;

export const MESSAGE_GET_CONVERSATION_FOR_USER = gql`
  query message_getConversationForUser(
    $otherUserId: Int!
    $currentUserId: Int
    $projectId: Int
  ) {
    message_getConversationForUser(
      otherUserId: $otherUserId
      currentUserId: $currentUserId
      projectId: $projectId
    ) {
      result {
        id
      }
      status
    }
  }
`;

export const MESSAGE_CREATE_GROUP_MESSAGE = gql`
  mutation message_createGroupMessage($messageInput: MessageInput) {
    message_createGroupMessage(messageInput: $messageInput) {
      result {
        messageType
        photoUrl
        isEdited
        text
        id
        isDeleted
        createdDate
        conversationId
      }
      status
    }
  }
`;
