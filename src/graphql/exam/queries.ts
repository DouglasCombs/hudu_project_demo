import {gql} from 'graphql-request';

export const GET_COURSE_QUESTIONS = gql`
  query courseQuestion_getCourseQuestions(
    $skip: Int
    $take: Int
    $where: CourseQuestionFilterInput
    $order: [CourseQuestionSortInput!]
  ) {
    courseQuestion_getCourseQuestions {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          number
          questionContent
          examId
          id
          isDeleted
          createdDate
          exam {
            courseId
          }
          answers {
            value
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

export const GET_COURSE_QUESTION = gql`
  query courseQuestion_getCourseQuestion($entityId: Int!) {
    courseQuestion_getCourseQuestion(entityId: $entityId) {
      result {
        number
        questionContent
        examId
        id
        isDeleted
        createdDate
      }
      status
    }
  }
`;
