import {gql} from 'graphql-request';

export const PAYMENT_HS_STRIPE_ACCOUNT = gql`
  query payment_hasStripeAccount {
    payment_hasStripeAccount {
      result
      status
    }
  }
`;

export const COUPON_IS_COUPON_VALID = gql`
  query coupon_isCouponValid($couponCode: String) {
    coupon_isCouponValid(couponCode: $couponCode) {
      result {
        coupon {
          percent
          id
        }
      }
      status
    }
  }
`;
export const PAYMENT_GET_PROJECT_PAYMENT_DETAILS = gql`
  query payment_getProjectPaymentDetails($projectId: Int!) {
    payment_getProjectPaymentDetails(projectId: $projectId) {
      result {
        listerPayForAcceptingBidFee
        listerPayForAcceptingBid
        couponUsed
        doerReceipt
        doerFee
      }
      status
    }
  }
`;

export const PAYMENT_GET_PUBLISHABLE_KEY = gql`
  query payment_getPublishableKey {
    payment_getPublishableKey {
      result {
        publishableKey
        listerApplicationFee
        hudurApplicationFee
        referalDiscountPercent
        isFirstAcceptingProject
      }
      status
    }
  }
`;

export const PAYMENT_GET_STRIPE_CONNECT_USER_BLANCE = gql`
  query payment_getStripeConnectUserBlance {
    payment_getStripeConnectUserBlance {
      result
      status
    }
  }
`;

export const PAYMENT_GET_PROJECT_DOER_PAYMENT_DETAILS = gql`
  query payment_getProjectDoerPaymentDetails($userId: Int!) {
    payment_getProjectDoerPaymentDetails(userId: $userId) {
      result {
        huduerReceiveForCompletingTheJobFee
        huduerReceiveForCompletingTheJob
      }
      status
    }
  }
`;

export const PAYMENT_GET_CLIENT_SECRET_OF_PROJECT = gql`
  query payment_getClientSecretOfProject($projectId: Int!) {
    payment_getClientSecretOfProject(projectId: $projectId) {
      result {
        clientSecret
        bid {
          isListerDeletedAccount
          listerDeleteAccountDate
          isHuduDeletedAccount
          huduDeleteAccountDate
          bidStatus
          amount
          description
          hudusComment
          hudusRate
          isHuduCommented
          listersComment
          listersRate
          isListerCommented
          huduId
          listerId
          projectId
          project {
            id
          }
          id
          isDeleted
        }
      }
      status
    }
  }
`;

export const PAYMENT_GET_CONNECT_USER_BALANCE = gql`
  query payment_getConnectUserBlance {
    payment_getConnectUserBlance {
      result
      status
    }
  }
`;
