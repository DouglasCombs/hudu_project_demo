import {gql} from 'graphql-request';

export const GET_DOCUMENTS = gql`
  query usersDocument_getUsersDocuments(
    $skip: Int
    $take: Int
    $where: UsersDocumentFilterInput
    $order: [UsersDocumentSortInput!]
  ) {
    usersDocument_getUsersDocuments {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          fileName
          file
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

export const GET_DOCUMENT = gql`
  query usersDocument_getUsersDocument($entityId: Int!) {
    usersDocument_getUsersDocument(entityId: $entityId) {
      result {
        fileName
        file
        userId

        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;
