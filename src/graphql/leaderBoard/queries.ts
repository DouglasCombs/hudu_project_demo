import {gql} from 'graphql-request';

export const LEADER_BOARD_GET_LEADER_BOARDS = gql`
  query leaderBoard_getLeaderBoards(
    $skip: Int
    $take: Int
    $where: LeaderBoardFilterInput
    $order: [LeaderBoardSortInput!]
  ) {
    leaderBoard_getLeaderBoards {
      result(skip: $skip, take: $take, where: $where, order: $order) {
        items {
          leaderBoardType
          point
          userId
          id
          isDeleted
          createdDate
          user {
            userName
            email
            id
            imageAddress
            city
            state
            leaderBoardPoint
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

export const LEADER_BOARD_GET_LEADER_BOARD_RANK = gql`
  query leaderBoard_getUsersLeaderBoardRank($userId: Int!) {
    leaderBoard_getUsersLeaderBoardRank(userId: $userId) {
      result
      status
    }
  }
`;
