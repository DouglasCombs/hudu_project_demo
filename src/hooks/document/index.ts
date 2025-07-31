import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  UsersDocument_AddUsersDocumentMutation,
  UsersDocument_DeleteUsersDocumentMutation,
  UsersDocument_EditUsersDocumentMutation,
  UsersDocument_GetUsersDocumentQuery,
  UsersDocument_GetUsersDocumentQueryVariables,
  UsersDocument_GetUsersDocumentsQuery,
  UsersDocument_GetUsersDocumentsQueryVariables,
} from '~/generated/graphql';
import {
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  EDIT_DOCUMENT,
} from '~/graphql/document/mutations';
import {GET_DOCUMENT, GET_DOCUMENTS} from '~/graphql/document/queries';
import {fetcher} from '~/graphql/graphQLClient';
import {showErrorMessage} from '~/utils/utils';

export const useEditDocument = () => {
  return useMutation<UsersDocument_EditUsersDocumentMutation>(
    async (input: any) => {
      return fetcher(EDIT_DOCUMENT, input)();
    },
    {
      onSuccess: data => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useDeleteDocument = () => {
  return useMutation<UsersDocument_DeleteUsersDocumentMutation>(
    async (documentId: number) => {
      return fetcher(DELETE_DOCUMENT, {documentId})();
    },
    {
      onSuccess: data => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useAddDocument = () => {
  return useMutation<UsersDocument_AddUsersDocumentMutation>(
    async (input: any) => {
      return fetcher(ADD_DOCUMENT, input)();
    },
    {
      onSuccess: data => {},
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetDocument = (entityId: number = 0) => {
  return useQuery<
    UsersDocument_GetUsersDocumentQuery,
    any,
    UsersDocument_GetUsersDocumentQueryVariables,
    any
  >([queryKeys.getDocument, entityId], async () => {
    return fetcher(GET_DOCUMENT, {entityId})();
  });
};

export const useGetDocuments = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    UsersDocument_GetUsersDocumentsQuery,
    any,
    UsersDocument_GetUsersDocumentsQueryVariables,
    any
  >(
    [queryKeys.getDocuments, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_DOCUMENTS, {
        skip: pageParam * PAGE_SIZE,
        take: take || PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: UsersDocument_GetUsersDocumentsQuery,
        allPages: UsersDocument_GetUsersDocumentsQuery[],
      ) => {
        if (
          lastPage?.usersDocument_getUsersDocuments?.result?.pageInfo
            ?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.usersDocument_getUsersDocuments?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.usersDocument_getUsersDocuments?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};
