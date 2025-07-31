import {gql} from 'graphql-request';

export const GET_REFERRAL_INFO = gql`
  query referall_getReferallInfo($userId: Int!) {
    referall_getReferallInfo(userId: $userId) {
      result {
        sucessfullReferall
        totalRewarded
        earnedPts
      }
      status
    }
  }
`;

export const GET_USER_IMAGES = gql`
  query user_getUserImages(
    $skip: Int
    $take: Int
    $where: UserImageFilterInput
    $order: [UserImageSortInput!]
    $userId: Int!
  ) {
    user_getUserImages(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          imageAddress
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

export const USER_GET_REVIEW = gql`
  query user_getReviews(
    $skip: Int
    $take: Int
    $where: ReviewsDtoFilterInput
    $order: [ReviewsDtoSortInput!]
    $getReviewType: GetReviewType!
    $userId: Int!
  ) {
    user_getReviews(getReviewType: $getReviewType, userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          score
          count
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

export const USER_GET_ADDRESSES = gql`
  query user_getUserAddresses(
    $skip: Int
    $take: Int
    $where: UserAddressFilterInput
    $order: [UserAddressSortInput!]
    $userId: Int!
  ) {
    user_getUserAddresses(userId: $userId) {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          addressTitle
          streetAddress
          city
          state
          longitude
          latitude
          zipCode
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

export const USER_GET_PROFILE = gql`
  query user_getProfile($userId: Int!) {
    user_getProfile(userId: $userId) {
      result {
        isDeletedAccount
        userName
        imageAddress
        firstName
        lastName
        phoneNumber
        bio
        streetAddress
        city
        state
        isActive
        zipCode
        asHuduRates
        earnPtsFromReferall
        totalRewardedFromReferall
        asListerRates
        asListerRates
        averageRate
        email
        id
        isDeleted
        isVerified
        stripeAccountId
        stripeCustomerId
        highestProjectCompletionRate
        createdDate
        leaderBoardPoint
        wallet
        userImages {
          imageAddress
          id
        }
      }
      status
    }
  }
`;

export const USER_GET_MINIMAL_PROFILE = gql`
  query user_getMinimalProfile($userId: Int!) {
    user_getProfile(userId: $userId) {
      result {
        isDeletedAccount
        userName
        imageAddress
        id
        phoneNumber
        averageRate
        email
        leaderBoardPoint
      }
      status
    }
  }
`;

export const USER_GET_NOTIFICATION_STATUS = gql`
  query user_getNotificationStatus($userId: Int!) {
    user_getProfile(userId: $userId) {
      result {
        id
        projectNotification
        bidNotification
        chatNotification
        questionNotification
      }
      status
    }
  }
`;

export const USER_GET_USERS_SAFE = gql`
  query user_getUsersSafe($where: UserDtoSafeFilterInput) {
    user_getUsersSafe {
      result(where: $where) {
        items {
          id
          userName
          email
          userTypes
          imageAddress
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

export const GET_USERS = gql`
  query user_getUsers(
    $skip: Int
    $take: Int
    $where: UsersFilterInput
    $order: [UsersSortInput!]
  ) {
    user_getUsers {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          isDeletedAccount
          userName
          imageAddress
          city
          state
          isActive
          leaderBoardPoint
          email
          id
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
