import {useTranslation} from 'react-i18next';
import {useInfiniteQuery, useMutation, useQuery} from '@tanstack/react-query';
import {PAGE_SIZE} from '~/constants/pagination';
import queryKeys from '~/constants/queryKeys';
import {
  Category_GetCourseTopCategoriesQuery,
  Category_GetCourseTopCategoriesQueryVariables,
  Course_GetCourseQuery,
  Course_GetCourseQueryVariables,
  Course_GetCoursesQuery,
  Course_GetCoursesQueryVariables,
  ResponseStatus,
  Slide_GetSlidesQuery,
  Slide_GetSlidesQueryVariables,
  UserCourse_GetUserCompleteCoursesQuery,
  UserCourse_GetUserCompleteCoursesQueryVariables,
  UserCourse_GetUserCourseQuery,
  UserCourse_GetUserCourseQueryVariables,
  UserCourse_GetUserCoursesQuery,
  UserCourse_GetUserCoursesQueryVariables,
  UserCourse_ReadSlideMutation,
  UserCourse_RestartCourseMutation,
  UserCourse_StartFreeCourseMutation,
  UserCourse_StartPaidCourseMutation,
} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {
  READ_SLIDE,
  RE_START_COURSE,
  START_FREE_COURSE,
  START_PAID_COURSE,
} from '~/graphql/course/mutations';
import {
  GET_COURSE,
  GET_COURSES,
  GET_SLIDES,
  GET_TOP_CATEGORY_COURSES,
  GET_USER_COMPLETE_COURSE,
  GET_USER_COURSE,
  GET_USER_COURSES,
} from '~/graphql/course/queries';
import {fetcher} from '~/graphql/graphQLClient';
import {useGetMessages} from '~/utils/helper';
import {showErrorMessage} from '~/utils/utils';

export const useReStartCourse = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<UserCourse_RestartCourseMutation>(
    async (courseId: number) => {
      return fetcher(RE_START_COURSE, courseId)();
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(queryKeys.getUserCourses);
        queryClient.invalidateQueries(queryKeys.getUserCourse);
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useIsMyCourses = () => {
  const {t} = useTranslation();
  const res = useMutation<UserCourse_GetUserCoursesQuery>(
    async (options: any) => {
      return fetcher(GET_USER_COURSES, {...options})();
    },
    {
      onError: () => {
        showErrorMessage(t('messages.errors.accessDenied'));
      },
    },
  );

  return res;
};

export const useGetUserCourse = (entityId: number = 0) => {
  return useQuery<
    UserCourse_GetUserCourseQuery,
    any,
    UserCourse_GetUserCourseQueryVariables,
    any
  >([queryKeys.getUserCourse, entityId], async () => {
    return fetcher(GET_USER_COURSE, {entityId})();
  });
};

export const useGetTopCategoryCourses = (options: any = {}) => {
  return useInfiniteQuery<
    Category_GetCourseTopCategoriesQuery,
    any,
    Category_GetCourseTopCategoriesQueryVariables,
    any
  >(
    [queryKeys.getTopCategoryCourses, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_TOP_CATEGORY_COURSES, {
        skip: pageParam * PAGE_SIZE,
        take: PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Category_GetCourseTopCategoriesQuery,
        allPages: Category_GetCourseTopCategoriesQuery[],
      ) => {
        if (
          lastPage?.category_getCourseTopCategories?.result?.pageInfo
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
            ?.map(a => a?.category_getCourseTopCategories?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.category_getCourseTopCategories?.result
              ?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetSlides = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    Slide_GetSlidesQuery,
    any,
    Slide_GetSlidesQueryVariables,
    any
  >(
    [queryKeys.getSlides, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_SLIDES, {
        skip: pageParam * 20,
        take: take || 20,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Slide_GetSlidesQuery,
        allPages: Slide_GetSlidesQuery[],
      ) => {
        if (lastPage?.Slide_getSlides?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.Slide_getSlides?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.Slide_getSlides?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useReadSlide = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<UserCourse_ReadSlideMutation>(
    async (input: any) => {
      return fetcher(READ_SLIDE, {
        userCourseId: input?.userCourseId,
        slideId: input?.slideId,
      })();
    },
    {
      onSuccess: data => {
        if (data?.userCourse_readSlide?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
        } else {
          showResponseMessage(data?.userCourse_readSlide?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useStartFreeCourse = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<UserCourse_StartFreeCourseMutation>(
    async (courseId: number) => {
      return fetcher(START_FREE_COURSE, courseId)();
    },
    {
      onSuccess: data => {
        if (
          data?.userCourse_startFreeCourse?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
          showResponseMessage(data?.userCourse_startFreeCourse?.status);
        } else {
          showResponseMessage(data?.userCourse_startFreeCourse?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useStartPaidCourse = () => {
  const {showResponseMessage} = useGetMessages();
  return useMutation<UserCourse_StartPaidCourseMutation>(
    async (courseId: number) => {
      return fetcher(START_PAID_COURSE, courseId)();
    },
    {
      onSuccess: data => {
        if (
          data?.userCourse_startPaidCourse?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.getBadges);
          queryClient.invalidateQueries(queryKeys.getBadge);
        } else {
          showResponseMessage(data?.userCourse_startPaidCourse?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGetUserCompleteCourse = (userId: number = 0) => {
  return useQuery<
    UserCourse_GetUserCompleteCoursesQuery,
    any,
    UserCourse_GetUserCompleteCoursesQueryVariables,
    any
  >([queryKeys.getUserCompleteCourse, userId], async () => {
    return fetcher(GET_USER_COMPLETE_COURSE, {userId})();
  });
};

export const useGetCourse = (entityId: number = 0) => {
  return useQuery<
    Course_GetCourseQuery,
    any,
    Course_GetCourseQueryVariables,
    any
  >([queryKeys.getCourse, entityId], async () => {
    return fetcher(GET_COURSE, {entityId})();
  });
};

export const useGetUserCourses = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    UserCourse_GetUserCoursesQuery,
    any,
    UserCourse_GetUserCoursesQueryVariables,
    any
  >(
    [queryKeys.getUserCourses, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_USER_COURSES, {
        skip: pageParam * PAGE_SIZE,
        take: take || PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: UserCourse_GetUserCoursesQuery,
        allPages: UserCourse_GetUserCoursesQuery[],
      ) => {
        if (
          lastPage?.userCourse_getUserCourses?.result?.pageInfo?.hasNextPage
        ) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.userCourse_getUserCourses?.result?.items)
            .flat(),
          totalCount:
            data?.pages?.[0]?.userCourse_getUserCourses?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};

export const useGetCourses = (options: any = {}, take?: number) => {
  return useInfiniteQuery<
    Course_GetCoursesQuery,
    any,
    Course_GetCoursesQueryVariables,
    any
  >(
    [queryKeys.getCourses, options],
    async ({pageParam = 0}) => {
      return fetcher(GET_COURSES, {
        skip: pageParam * PAGE_SIZE,
        take: take || PAGE_SIZE,
        ...options,
      })();
    },
    {
      getNextPageParam: (
        lastPage: Course_GetCoursesQuery,
        allPages: Course_GetCoursesQuery[],
      ) => {
        if (lastPage?.course_getCourses?.result?.pageInfo?.hasNextPage) {
          return allPages.length;
        }
        return undefined;
      },
      select: data => {
        return {
          ...data,
          pages: data?.pages
            ?.map(a => a?.course_getCourses?.result?.items)
            .flat(),
          totalCount: data?.pages?.[0]?.course_getCourses?.result?.totalCount,
        };
      },
      ...options,
    },
  );
};
