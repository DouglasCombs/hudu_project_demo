import {useInfiniteQuery, useMutation} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  Course_GetCourseTranslatesQuery,
  Course_GetCourseTranslatesQueryVariables,
  Translator_TranslateMutation,
  Translator_TranslateMutationVariables,
} from '~/generated/graphql';
import {fetcher} from '~/graphql/graphQLClient';
import {TRANSLATE} from '~/graphql/translate/mutations';
import {GET_COURSE_TRANSLATES} from '~/graphql/translate/queries';
import {showErrorMessage} from '~/utils/utils';

export const useTranslator = () => {
  return useMutation<
    Translator_TranslateMutation,
    any,
    Translator_TranslateMutationVariables
  >(
    async (input: any) => {
      return fetcher(TRANSLATE, {input})();
    },
    {
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetCourseTranslates = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    Course_GetCourseTranslatesQuery,
    any,
    Course_GetCourseTranslatesQueryVariables,
    any
  >(
    [queryKeys.getCourseTranslates, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_COURSE_TRANSLATES, {
        skip: pageParam * PAGE_SIZE,
        take: take || PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Course_GetCourseTranslatesQuery,
        allPages: Course_GetCourseTranslatesQuery[],
      ) => {
        if (
          lastPage?.course_getCourseTranslates?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getCourseTranslates?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.course_getCourseTranslates?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
