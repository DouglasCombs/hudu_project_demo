import {gql} from 'graphql-request';

export const FINISH_EXAM = gql`
  mutation userCourse_finishExam(
    $userCourseId: Int!
    $courseQuestionAnswersIds: [Int!]
  ) {
    userCourse_finishExam(
      userCourseId: $userCourseId
      courseQuestionAnswersIds: $courseQuestionAnswersIds
    ) {
      result {
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
      }
      status
    }
  }
`;
