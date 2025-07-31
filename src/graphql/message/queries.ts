import {gql} from 'graphql-request';

export const MESSAGE_GET_CONVERSATION = gql`
  query message_getConversation(
    $skip: Int
    $take: Int
    $where: MessagesFilterInput
    $order: [MessagesSortInput!]
    $conversationId: Int!
  ) {
    message_getConversation(conversationId: $conversationId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          createdAt
          conversationId
          senderId
          text
          id
          isDeleted
          createdDate
          photoUrl
          messageType
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

export const MESSAGE_GET_USER_MESSAGES = gql`
  query message_getUserMessages(
    $skip: Int
    $take: Int
    $where: ConversationDtoFilterInput
    $order: [ConversationDtoSortInput!]
  ) {
    message_getUserMessages {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          subject
          conversationId
          unreadCount
          latestMessageDate
          user {
            userName
            imageAddress
            id
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

export const MESSAGE_HAS_UNREAD_CHAT = gql`
  query message_hasUnreadChat {
    message_hasUnreadChat {
      result
      status
    }
  }
`;

export const MESSAGE_GET_CONVERSATIONS_PROJECT = gql`
  query message_getConversationsProject(
    $skip: Int
    $take: Int
    $where: ConversationsProjectDtoFilterInput
    $order: [ConversationsProjectDtoSortInput!]
    $userId: Int!
  ) {
    message_getConversationsProject(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          latestMessage
          latestMessageDate
          conversation {
            id
          }
          project {
            title
            id
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

export const MESSAGE_GET_USER_MESSAGES_GROUPED_BY_USER = gql`
  query message_getUserMessagesGroupedByUser(
    $skip: Int
    $take: Int
    $where: ConversationDtoFilterInput
    $order: [ConversationDtoSortInput!]
    $currentUserId: Int
  ) {
    message_getUserMessagesGroupedByUser(currentUserId: $currentUserId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          projectId
          userEmail
          userFirstName
          userLastName
          subject
          userName
          userId
          imageAddress
          projectNames
          conversationId
          unreadCount
          latestMessageDate
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

export const MESSAGE_GET_GROUPS = gql`
  query message_getGroups(
    $skip: Int
    $take: Int
    $where: ConversationDtoFilterInput
    $order: [ConversationDtoSortInput!]
    $userId: Int!
  ) {
    message_getGroups(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isMemberOfGroup
          conversationId
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

export const MESSAGE_GET_GROUP_MEMBERS = gql`
  query message_getGroupMembers(
    $skip: Int
    $take: Int
    $where: UserMessageGroupFilterInput
    $order: [UserMessageGroupSortInput!]
    $conversationId: Int!
  ) {
    message_getGroupMembers(conversationId: $conversationId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          conversationId
          isAdmin
          unreadCount
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
