import {gql} from 'graphql-request';

export const GET_TOP_CATEGORY_COURSES = gql`
  query category_getCourseTopCategories(
    $skip: Int
    $take: Int
    $where: CourseTopCategoryDtoFilterInput
    $order: [CourseTopCategoryDtoSortInput!]
  ) {
    category_getCourseTopCategories {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          category {
            text
            spanishText
            userId
            parentId
            id
            isDeleted
            createdDate
          }
          id
          courseCount
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

export const GET_USER_COURSE = gql`
  query userCourse_getUserCourse($entityId: Int!) {
    userCourse_getUserCourse(entityId: $entityId) {
      result {
        userId
        courseId
        currentSlideId
        course {
          slides {
            title
            description
            mediaUrl
            id
          }
        }
        currentSlide {
          id
        }
        isSlidesEnded
        hasCertificate
        completedPercent
        status

        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;

export const GET_SLIDES = gql`
  query Slide_getSlides(
    $skip: Int
    $take: Int
    $where: SlideFilterInput
    $order: [SlideSortInput!]
  ) {
    Slide_getSlides {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          title
          description
          mediaUrl
          mediaType
          order
          courseId
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

export const GET_USER_COMPLETE_COURSE = gql`
  query userCourse_getUserCompleteCourses($userId: Int!) {
    userCourse_getUserCompleteCourses(userId: $userId) {
      result
      status
    }
  }
`;

export const GET_COURSE = gql`
  query course_getCourse($entityId: Int!) {
    course_getCourse(entityId: $entityId) {
      result {
        title
        description
        mediaUrl
        courseStatus
        isFree
        price
        slides {
          title
          description
          mediaUrl
          id
        }
        spanishTranslateStatus

        courseTranslates {
          languageType
          title
          content
          slide {
            title
            description
          }
        }
        exam {
          courseQuestions {
            number
          }
        }
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;

export const GET_USER_COURSES = gql`
  query userCourse_getUserCourses(
    $skip: Int
    $take: Int
    $where: UserCourseFilterInput
    $order: [UserCourseSortInput!]
  ) {
    userCourse_getUserCourses {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          userId
          courseId
          currentSlideId
          isSlidesEnded
          hasCertificate
          completedPercent
          status
          id
          isDeleted
          createdDate

          course {
            title
            mediaUrl
            id
            category {
              text
            }
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

export const GET_COURSES = gql`
  query course_getCourses(
    $skip: Int
    $take: Int
    $where: CourseFilterInput
    $order: [CourseSortInput!]
  ) {
    course_getCourses {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          title
          description
          mediaUrl
          courseStatus
          isFree
          price
          slides {
            title
          }
          category {
            text
            id
          }
          categoryId
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
