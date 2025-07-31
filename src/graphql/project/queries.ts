import {gql} from 'graphql-request';

export const PROJECT_GET_PROJECT = gql`
  query project_getProject($projectId: Int!) {
    project_getProject(projectId: $projectId) {
      result {
        project {
          createdDate
          id
          projectStatus
          title
          description
          duration
          availability
          addressTitle
          streetAddress
          city
          state
          cover
          projectDeadLine
          startDate
          endDate
          latestPaymentDateTime
          longitude
          latitude
          zipCode
          backgroundCheckTypeForDoer
          userId
          projectImages {
            imageAddress
            alt
            id
          }
          user {
            isDeletedAccount
            id
            userName
            imageAddress
            asListerRates
            isVerified
            asHuduRates
          }
          categoryId
          category {
            text
            spanishText
            id
            parentId
            userId
          }
        }
        isHuduFinished
        awardedBid {
          amount
          createdDate
          id
          bidStatus
          cancellRequestStatus
        }
        currentDoer {
          userName
          imageAddress
          id
        }
        yourLowesBid
        currentLowBid
        isLiked
      }
      status
    }
  }
`;

export const PROJECT_GET_PROJECT_QUESTIONS = gql`
  query project_getProject_questions($projectId: Int!) {
    project_getProject(projectId: $projectId) {
      result {
        project {
          backgroundCheckTypeForDoer
          createdDate
          id
          projectStatus
          title
          description
          duration
          availability
          addressTitle
          streetAddress
          city
          state
          cover
          projectDeadLine
          startDate
          endDate
          latestPaymentDateTime
          longitude
          latitude
          zipCode
          userId
          projectImages {
            imageAddress
            alt
            id
          }
          user {
            isDeletedAccount
            id
            userName
            imageAddress
            asListerRates
            isVerified
          }
          categoryId
          category {
            text
            spanishText
            id
            parentId
            userId
          }
        }
        isHuduFinished
        projectQuestions
        awardedBid {
          amount
          createdDate
          id
          bidStatus
        }
        currentDoer {
          userName
          imageAddress
          id
        }
        yourLowesBid
        currentLowBid
        isLiked
      }
      status
    }
  }
`;

export const PROJECT_GET_PROJECTS = gql`
  query project_getProjects(
    $skip: Int
    $take: Int
    $where: ProjectDtoFilterInput
    $order: [ProjectDtoSortInput!]
    $projectFilter: ProjectFilter
    $isMyBid: Boolean!
    $location: Position
    $projectOrderVms: [ProjectOrderVmInput]
  ) {
    project_getProjects(
      projectFilter: $projectFilter
      isMyBid: $isMyBid
      location: $location
      projectOrderVms: $projectOrderVms
    ) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isBidder
          project {
            category {
              text
              spanishText
              id
            }
            backgroundCheckTypeForDoer
            projectStatus
            title
            description
            userId
            id
            state
            availability
            projectDeadLine
            projectImages {
              imageAddress
              alt
              id
            }
            cover
          }
          isLiked
          currentLowBid
          yourLowesBid
          isHuduFinished
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

export const PROJECT_GET_LISTER_PROJECTS = gql`
  query project_getListerProjects(
    $skip: Int
    $take: Int
    $where: ProjectDtoFilterInput
    $order: [ProjectDtoSortInput!]
    $projectFilter: ProjectFilter
    $isMyBid: Boolean!
    $location: Position
    $projectOrderVms: [ProjectOrderVmInput]
  ) {
    project_getProjects(
      projectFilter: $projectFilter
      isMyBid: $isMyBid
      location: $location
      projectOrderVms: $projectOrderVms
    ) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          project {
            projectStatus
            title
            description
            userId
            id
            projectDeadLine
            projectImages {
              imageAddress
              alt
              id
            }
            category {
              text
              spanishText
              id
            }
            cover
          }
          lowestBid {
            huduerUsername
            huduerId
            bidAmount
            bidStatus
            bidId
          }
          isLiked
          currentLowBid
          yourLowesBid
          isHuduFinished
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

export const PROJECT_GET_MY_BIDS = gql`
  query project_getMyBids(
    $skip: Int
    $take: Int
    $where: ProjectDtoFilterInput
    $order: [ProjectDtoSortInput!]
    $projectFilter: ProjectFilter
    $isMyBid: Boolean!
    $location: Position
    $projectOrderVms: [ProjectOrderVmInput]
  ) {
    project_getProjects(
      projectFilter: $projectFilter
      isMyBid: $isMyBid
      location: $location
      projectOrderVms: $projectOrderVms
    ) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          project {
            projectStatus
            title
            userId
            id
            projectDeadLine
            description
            category {
              text
              spanishText
              id
            }
            cover
          }
          isHuduFinished
          currentLowBid
          yourLowesBid
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

export const PROJECT_GET_PROJECTS_BY_STATUS = gql`
  query project_getProjectsByStatus(
    $skip: Int
    $take: Int
    $where: ProjectDtoFilterInput
    $order: [ProjectDtoSortInput!]
    $projectFilter: ProjectFilter
    $isMyBid: Boolean!
    $location: Position
    $projectOrderVms: [ProjectOrderVmInput]
  ) {
    project_getProjects(
      projectFilter: $projectFilter
      isMyBid: $isMyBid
      location: $location
      projectOrderVms: $projectOrderVms
    ) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          project {
            projectStatus
            title
            userId
            id
            projectDeadLine

            category {
              text
              spanishText
              id
            }
          }
          awardedBid {
            amount
            createdDate
            id
            bidStatus
            awardDate
            cancellRequestStatus
          }
          currentDoer {
            id
          }
          isHuduFinished
          currentLowBid
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

export const PROJECT_GET_QUESTIONS = gql`
  query project_getQuestions(
    $skip: Int
    $take: Int
    $where: QuestionsDtoFilterInput
    $order: [QuestionsDtoSortInput!]
    $isIllegal: Boolean
  ) {
    project_getQuestions(isIllegal: $isIllegal) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          question {
            isDeletedAccount
            text
            parentId
            projectId
            userId
            id
            isDeleted
            text
            upVote
            isPin
            user {
              id
              isDeletedAccount
              userName
              email
              imageAddress
              firstName
              lastName
              isVerified
              averageRate
              userImages {
                imageAddress
              }
            }
            childrenQuestions {
              isDeletedAccount
              userId
              text
              user {
                id
                userName
                firstName
                lastName
                email
                isVerified
                averageRate
                imageAddress
              }
              createdDate
            }
            createdDate
          }
          isUpVoted
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

export const PROJECT_GET_USER_LIKE_PROJECT = gql`
  query project_getUserLikeProject($projectId: Int!) {
    project_getUserLikeProject(projectId: $projectId) {
      result {
        project {
          isDeletedAccount
          deleteAccountDate
          projectStatus
          title
          description
          duration
          availability
          streetAddress
          city
          state
          zipCode
          userId
          id
          isDeleted
          projectDeadLine
          projectImages {
            imageAddress
            alt
            id
          }
          category {
            text
            spanishText
            id
          }
        }
        isLiked
      }
      status
    }
  }
`;

export const PROJECT_GET_USER_LIKE_PROJECTS = gql`
  query project_getUserLikeProjects(
    $skip: Int
    $take: Int
    $where: ProjectDtoFilterInput
    $order: [ProjectDtoSortInput!]
    $projectFilter: ProjectFilter
    $location: Position
  ) {
    project_getUserLikeProjects(
      projectFilter: $projectFilter
      location: $location
    ) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          project {
            category {
              text
              spanishText
              id
            }
            projectStatus
            title
            description
            userId
            id
            projectDeadLine
            projectImages {
              imageAddress
              alt
              id
            }
            cover
          }
          isLiked
          currentLowBid
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

export const GET_CATEGORY = gql`
  query category_getCategory($entityId: Int!) {
    category_getCategory(entityId: $entityId) {
      result {
        text
        spanishText
        id
      }
      status
    }
  }
`;

export const PROJECT_GET_BID_COUNT_BY_STATUS = gql`
  query project_getBidCountByStatus($huduerId: Int!) {
    project_getBidCountByStatus(huduerId: $huduerId) {
      result {
        key
        value
      }
      status
    }
  }
`;

export const PROJECT_GET_PROJECT_COUNT_BY_STATUS = gql`
  query project_getProjectCountByStatus($listerId: Int!) {
    project_getProjectCountByStatus(listerId: $listerId) {
      result {
        bidding
        inProgress
        failed
        finished
        cancelled
      }
      status
    }
  }
`;

export const PROJECT_CATEGORY = gql`
  query category_getCategories(
    $skip: Int
    $take: Int
    $where: CategoryDtoFilterInput
    $order: [CategoryDtoSortInput!]
  ) {
    category_getCategories {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isPined
          hasChild
          category {
            text
            spanishText
            userId
            id
            parentId
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

export const GPT_QUESTIONS = gql`
  query chatGpt_createChatUsingAzure(
    $projectTitle: String
    $projectDescription: String
  ) {
    chatGpt_createChatUsingAzure(
      projectTitle: $projectTitle
      projectDescription: $projectDescription
    ) {
      result {
        questionDto {
          question
        }
      }
      status
    }
  }
`;

export const GET_PROJECTS_BY_CITY = gql`
  query project_getProjectsGrouptedByCity(
    $skip: Int
    $take: Int
    $where: ProjectsGrouptedByCityDtoFilterInput
    $order: [ProjectsGrouptedByCityDtoSortInput!]
  ) {
    project_getProjectsGrouptedByCity {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          count
          city
          longitude
          latitude
          zipCode
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

export const GET_BIDS_GROUP_BY_STATUS = gql`
  query project_getProjectIBidOnGroupedByStatus(
    $skip: Int
    $take: Int
    $where: GetProjectIBidOnFilterInput
    $order: [GetProjectIBidOnSortInput!]
    $userId: Int!
  ) {
    project_getProjectIBidOnGroupedByStatus(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          projectStatus
          projectCount
          bidCount
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

export const PROJECT_GET_ENTHUSIASTIC_CITY_STATE = gql`
  query project_getEnthusiasticCistyState(
    $skip: Int
    $take: Int
    $where: EnthusiasticCistyStateFilterInput
    $order: [EnthusiasticCistyStateSortInput!]
  ) {
    project_getEnthusiasticCistyState {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          state
          city
          userId
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

export const PROJECT_GET_PROJECTS_GROUPTED_BY_CITY_FROM_MAP_DATA = gql`
  query project_getProjectsGrouptedByCityFromMapData(
    $skip: Int
    $take: Int
    $where: ProjectsGrouptedByCityDtoFilterInput
    $order: [ProjectsGrouptedByCityDtoSortInput!]
  ) {
    project_getProjectsGrouptedByCityFromMapData {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          count
          city
          longitude
          latitude
          zipCode
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
