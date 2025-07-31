import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  CourseQuestion_GetCourseQuestionQuery,
  CourseQuestion_GetCourseQuestionQueryVariables,
  CourseQuestion_GetCourseQuestionsQuery,
  CourseQuestion_GetCourseQuestionsQueryVariables,
  UserCourse_FinishExamMutation,
} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {FINISH_EXAM} from '~/graphql/exam/mutations';
import {
  GET_COURSE_QUESTION,
  GET_COURSE_QUESTIONS,
} from '~/graphql/exam/queries';
import {fetcher} from '~/graphql/graphQLClient';
import {showErrorMessage} from '~/utils/utils';

export const useFinishExam = () => {
  return useMutation<UserCourse_FinishExamMutation>(
    async (input: number) => {
      return fetcher(FINISH_EXAM, input)();
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(queryKeys.getBadges);
        queryClient.invalidateQueries(queryKeys.getBadge);
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetCourseQuestion = (entityId: number = 0) => {
  return useQuery<
    CourseQuestion_GetCourseQuestionQuery,
    any,
    CourseQuestion_GetCourseQuestionQueryVariables,
    any
  >([queryKeys.getCourseQuestion, entityId], async () => {
    return fetcher(GET_COURSE_QUESTION, {entityId})();
  });
};

export const useGetCourseQuestions = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    CourseQuestion_GetCourseQuestionsQuery,
    any,
    CourseQuestion_GetCourseQuestionsQueryVariables,
    any
  >(
    [queryKeys.getCourseQuestions, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_COURSE_QUESTIONS, {
        skip: pageParam * PAGE_SIZE,
        take: take || PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: CourseQuestion_GetCourseQuestionsQuery,
        allPages: CourseQuestion_GetCourseQuestionsQuery[],
      ) => {
        if (
          lastPage?.courseQuestion_getCourseQuestions?.result?.pageInfo
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
            ?.map(a => a?.courseQuestion_getCourseQuestions?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.courseQuestion_getCourseQuestions?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};
