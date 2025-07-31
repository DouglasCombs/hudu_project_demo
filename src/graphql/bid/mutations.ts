import {gql} from 'graphql-request';

export const BID_ACCEPT_BID = gql`
  mutation bid_acceptBid($bidId: Int!, $couponCode: String) {
    bid_acceptBid(bidId: $bidId, couponCode: $couponCode) {
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

export const BID_ADD_BID = gql`
  mutation bid_addBid($bidInput: BidInput) {
    bid_addBid(bidInput: $bidInput) {
      result {
        id
      }
      status
    }
  }
`;

export const BID_CANCELL_BID = gql`
  mutation bid_cancellBid(
    $bidId: Int!
    $cancelBidType: CancelBidType
    $cancellationReason: String
  ) {
    bid_cancellBid(
      bidId: $bidId
      cancelBidType: $cancelBidType
      cancellationReason: $cancellationReason
    ) {
      result {
        id
      }
      status
    }
  }
`;

export const BID_ACTIVE_BID = gql`
  mutation bid_activateBid($bidId: Int!) {
    bid_activateBid(bidId: $bidId) {
      result {
        id
      }
      status
    }
  }
`;

export const BID_DELETE_BID = gql`
  mutation bid_deleteBid($bidId: Int!) {
    bid_deleteBid(bidId: $bidId) {
      result {
        id
      }
      status
    }
  }
`;

export const BID_EDIT_BID = gql`
  mutation bid_editBid($editBidInput: EditBidInput) {
    bid_editBid(editBidInput: $editBidInput) {
      result {
        id
      }
      status
    }
  }
`;

export const BID_REJECT_BID = gql`
  mutation bid_rejectBid($bidId: Int!) {
    bid_rejectBid(bidId: $bidId) {
      result {
        id
      }
      status
    }
  }
`;

export const BID_HUDU_FINISHED_PROJECT = gql`
  mutation bid_huduFinsihedProject($bidId: Int!) {
    bid_huduFinsihedProject(bidId: $bidId) {
      result {
        id
      }
      status
    }
  }
`;

export const BID_WITHDRAW_BID_FOR_HUDU = gql`
  mutation bid_withdrawBidForHudu($bidId: Int!) {
    bid_withdrawBidForHudu(bidId: $bidId) {
      result {
        id
      }
      status
    }
  }
`;

export const BID_ADD_WORKING_HOURS = gql`
  mutation bid_addWorkingHours($bidId: Int!, $workedHours: Float!) {
    bid_addWorkingHours(bidId: $bidId, workedHours: $workedHours) {
      result {
        id
      }
      status
    }
  }
`;
