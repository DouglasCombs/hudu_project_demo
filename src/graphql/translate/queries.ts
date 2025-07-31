import {gql} from 'graphql-request';

export const GET_COURSE_TRANSLATES = gql`
  query course_getCourseTranslates(
    $skip: Int
    $take: Int
    $where: CourseTranslateFilterInput
    $order: [CourseTranslateSortInput!]
  ) {
    course_getCourseTranslates {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          languageType
          title
          content
          mediaUrl
          courseId
          slideId
          courseQuestionId
          courseQuestionAnswerId
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
