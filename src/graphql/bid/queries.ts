import {gql} from 'graphql-request';

export const BID_GET_BIDS = gql`
  query bid_getBids(
    $skip: Int
    $take: Int
    $where: BidFilterInput
    $order: [BidSortInput!]
    $projectFilter: ProjectFilter
    $location: Position
  ) {
    bid_getBids(projectFilter: $projectFilter, location: $location) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          bidStatus
          amount
          hudusComment
          hudusRate
          isHuduCommented
          listersComment
          listersRate
          isListerCommented
          huduId
          listerId
          projectId
          id
          lister {
            isDeletedAccount
            userName
            id
            firstName
            lastName
            imageAddress
          }
          hudu {
            isDeletedAccount
            userName
            id
            firstName
            lastName
            imageAddress
          }
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

export const BID_GET_BIDS_IN_PROJECT_DETAILS_TAB = gql`
  query bid_getBidsInProjectDetailsTab($projectId: Int!) {
    bid_getBidsInProjectDetailsTab(projectId: $projectId) {
      result {
        lowestBid {
          isListerDeletedAccount
          listerDeleteAccountDate
          isHuduDeletedAccount
          huduDeleteAccountDate
          hasPayment
          bidStatus
          cancelBidType
          cancellationReason
          awardDate
          huduFinishedProjectDate
          amount
          description
          hudusComment
          hudusRate
          isHuduCommented
          listersComment
          listersRate
          isListerCommented
          huduerWorkedHours
          huduId
          listerId
          projectId
          id
          isDeleted
          createdDate
          bidAnswerToQuestions {
            question
            answer
            id
          }
          lister {
            isDeletedAccount
            deleteAccountDate
            userName
            firstName
            lastName
            id
            asListerRates
            isVerified
            imageAddress
          }
          hudu {
            isDeletedAccount
            deleteAccountDate
            userName
            imageAddress
            averageRate
            id
            asHuduRates
            isVerified
            highestProjectCompletionRate
            backgroundCheckStatus
            userImages {
              imageAddress
            }
          }
          project {
            isDeletedAccount
            projectDeadLine
            projectStatus
            title
            description
            bids {
              amount
              id
              huduId
            }
          }
        }
        bestRate {
          isListerDeletedAccount
          listerDeleteAccountDate
          isHuduDeletedAccount
          huduDeleteAccountDate
          hasPayment
          bidStatus
          cancelBidType
          cancellationReason
          awardDate
          huduFinishedProjectDate
          amount
          description
          hudusComment
          hudusRate
          isHuduCommented
          listersComment
          listersRate
          isListerCommented
          huduerWorkedHours
          huduId
          listerId
          projectId
          id
          isDeleted
          createdDate
          bidAnswerToQuestions {
            question
            answer
            id
          }
          lister {
            isDeletedAccount
            deleteAccountDate
            userName
            firstName
            lastName
            id
            asListerRates
            isVerified
            imageAddress
          }
          hudu {
            isDeletedAccount
            deleteAccountDate
            userName
            imageAddress
            averageRate
            id
            asHuduRates
            isVerified
            highestProjectCompletionRate
            backgroundCheckStatus
            userImages {
              imageAddress
            }
          }
          project {
            isDeletedAccount
            projectDeadLine
            projectStatus
            title
            description
            bids {
              amount
              id
              huduId
            }
          }
        }
        highedtProjectCompletionRate {
          isListerDeletedAccount
          listerDeleteAccountDate
          isHuduDeletedAccount
          huduDeleteAccountDate
          hasPayment
          bidStatus
          cancelBidType
          cancellationReason
          awardDate
          huduFinishedProjectDate
          amount
          description
          hudusComment
          hudusRate
          isHuduCommented
          listersComment
          listersRate
          isListerCommented
          huduerWorkedHours
          huduId
          listerId
          projectId
          id
          isDeleted
          createdDate
          bidAnswerToQuestions {
            question
            answer
            id
          }
          lister {
            isDeletedAccount
            deleteAccountDate
            userName
            firstName
            lastName
            id
            asListerRates
            isVerified
            imageAddress
          }
          hudu {
            isDeletedAccount
            deleteAccountDate
            userName
            imageAddress
            averageRate
            id
            asHuduRates
            isVerified
            highestProjectCompletionRate
            backgroundCheckStatus
            userImages {
              imageAddress
            }
          }
          project {
            isDeletedAccount
            projectDeadLine
            projectStatus
            title
            description
            bids {
              amount
              id
              huduId
            }
          }
        }
      }
      status
    }
  }
`;

export const BID_GET_USER_BIDS = gql`
  query bid_get_user_Bids(
    $skip: Int
    $take: Int
    $where: BidFilterInput
    $order: [BidSortInput!]
    $projectFilter: ProjectFilter
    $location: Position
  ) {
    bid_getBids(projectFilter: $projectFilter, location: $location) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          bidStatus
          amount
          huduId
          listerId
          projectId
          id
          awardDate
          huduFinishedProjectDate
          lister {
            isDeletedAccount
            userName
            id
            firstName
            lastName
            imageAddress
          }
          project {
            title
            description
            availability
          }
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

export const BID_GET_BIDS_ORDED_BY_BID_SATATUS = gql`
  query bid_getBidsOrdedByBidSatatus(
    $skip: Int
    $take: Int
    $where: BidFilterInput
    $order: [BidSortInput!]
    $input: GetBidsOrdedByBidSatatusInput
  ) {
    bid_getBidsOrdedByBidSatatus(input: $input) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isListerDeletedAccount
          listerDeleteAccountDate
          isHuduDeletedAccount
          huduDeleteAccountDate
          bidStatus
          amount
          description
          hudusRate
          awardDate
          huduId
          bidAnswerToQuestions {
            question
            answer
            id
          }
          hudu {
            id
            userName
            asHuduRates
            highestProjectCompletionRate
            imageAddress
            email
            backgroundCheckStatus
          }
          listerId
          projectId
          project {
            isDeletedAccount
            projectDeadLine
            projectStatus
            title
          }
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

export const BID_GET_BIDS_MUTATION = gql`
  query bid_getBids_mutation(
    $skip: Int
    $take: Int
    $where: BidFilterInput
    $order: [BidSortInput!]
    $projectFilter: ProjectFilter
    $location: Position
  ) {
    bid_getBids(projectFilter: $projectFilter, location: $location) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          id
        }
        totalCount
      }
      status
    }
  }
`;

export const BID_GET_ACCEPT_BID_DETAILS = gql`
  query bid_getAcceptBidDetails($bidId: Int!) {
    bid_getAcceptBidDetails(bidId: $bidId) {
      result {
        clientSecret
        reduceFromWallet
        newBidAmount
        stripeAmount
        payType
        walletAmountIsEqualToBidAmount
      }
      status
    }
  }
`;
