import {gql} from 'graphql-request';

export const RE_START_COURSE = gql`
  mutation userCourse_restartCourse($courseId: Int!) {
    userCourse_restartCourse(courseId: $courseId) {
      status
    }
  }
`;

export const START_FREE_COURSE = gql`
  mutation userCourse_startFreeCourse($courseId: Int!) {
    userCourse_startFreeCourse(courseId: $courseId) {
      status
    }
  }
`;

export const START_PAID_COURSE = gql`
  mutation userCourse_startPaidCourse($courseId: Int!) {
    userCourse_startPaidCourse(courseId: $courseId) {
      result
      status
    }
  }
`;

export const READ_SLIDE = gql`
  mutation userCourse_readSlide($userCourseId: Int!, $slideId: Int!) {
    userCourse_readSlide(userCourseId: $userCourseId, slideId: $slideId) {
      status
    }
  }
`;
