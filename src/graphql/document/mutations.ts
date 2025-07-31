import {gql} from 'graphql-request';

export const ADD_DOCUMENT = gql`
  mutation usersDocument_addUsersDocument($input: UsersDocumentInput) {
    usersDocument_addUsersDocument(input: $input) {
      status
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation usersDocument_deleteUsersDocument($documentId: Int!) {
    usersDocument_deleteUsersDocument(documentId: $documentId) {
      status
    }
  }
`;

export const EDIT_DOCUMENT = gql`
  mutation usersDocument_editUsersDocument($input: UsersDocumentInput) {
    usersDocument_editUsersDocument(input: $input) {
      status
    }
  }
`;
