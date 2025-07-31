import {gql} from 'graphql-request';

export const REPORT_QUESTION = gql`
  mutation project_reportQuestion($input: ReportQuestionInput) {
    project_reportQuestion(input: $input) {
      status
    }
  }
`;

export const VOTE_QUESTION = gql`
  mutation project_voteQuestion($questionId: Int!) {
    project_voteQuestion(questionId: $questionId) {
      status
    }
  }
`;

export const PROJECT_ADD_FEED_BACK = gql`
  mutation project_addFeedBack($feedbackInput: FeedbackInput) {
    project_addFeedBack(feedbackInput: $feedbackInput) {
      result {
        id
      }
      status
    }
  }
`;

export const EDIT_PROJECT = gql`
  mutation project_editProject($editProjectInput: EditProjectInput) {
    project_editProject(editProjectInput: $editProjectInput) {
      status
    }
  }
`;

export const PROJECT_ADD_PROJECT = gql`
  mutation project_addProject($addProjectInput: AddProjectInput) {
    project_addProject(addProjectInput: $addProjectInput) {
      result {
        id
      }
      status
    }
  }
`;

export const PROJECT_ADD_IMAGE_TO_PROJECT = gql`
  mutation project_addImageToProject($imageAddress: String, $projectId: Int!) {
    project_addImageToProject(
      imageAddress: $imageAddress
      projectId: $projectId
    ) {
      result {
        imageAddress
        project {
          id
        }
        projectId
        id
        isDeleted
      }
      status
    }
  }
`;

export const PROJECT_ADD_QUESTION = gql`
  mutation project_addQuestion($questionInput: QuestionInput) {
    project_addQuestion(questionInput: $questionInput) {
      result {
        id
      }
      status
    }
  }
`;

export const PROJECT_FINISHE_PROJECT = gql`
  mutation project_finisheProject($projectId: Int!) {
    project_finisheProject(projectId: $projectId) {
      result {
        id
      }
      status
    }
  }
`;

export const PROJECT_CANCEL_PROJECT = gql`
  mutation project_cancellProject(
    $projectId: Int!
    $cancelProjectStatus: CancelProjectStatus
    $cancellationReason: String
  ) {
    project_cancellProject(
      projectId: $projectId
      cancelProjectStatus: $cancelProjectStatus
      cancellationReason: $cancellationReason
    ) {
      status
    }
  }
`;

export const PROJECT_LIKE = gql`
  mutation project_like($projectId: Int!) {
    project_like(projectId: $projectId) {
      result {
        id
      }
      status
    }
  }
`;

export const PROJECT_UNLIKE = gql`
  mutation project_unlike($projectId: Int!, $userId: Int) {
    project_unlike(projectId: $projectId, userId: $userId) {
      result {
        id
      }
      status
    }
  }
`;

export const PROJECT_UNLIKE_ALL = gql`
  mutation project_unLikeAll() {
    project_unLikeAll {
      status
    }
  }
`;

export const PROJECT_ADD_ENTHUSIASTIC_CITY_STATE = gql`
  mutation project_addEnthusiasticCistyState(
    $input: AddEnthusiasticCistyStateInput
  ) {
    project_addEnthusiasticCistyState(input: $input) {
      result {
        id
      }
      status
    }
  }
`;
