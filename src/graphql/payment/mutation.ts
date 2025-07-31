import {gql} from 'graphql-request';

export const WITHDRAW_REFERRAL_INCOME = gql`
  mutation payment_widthrawlReferallIncome {
    payment_widthrawlReferallIncome {
      result
      status
    }
  }
`;

export const PAYMENT_ONBOARD_USER_IN_STRIPE_CONNECT = gql`
  mutation payment_onboardUserInStripeConnect($isByApp: Boolean!) {
    payment_onboardUserInStripeConnect(isByApp: $isByApp) {
      result
      status
    }
  }
`;

export const PAYMENT_CREATE_EPHEMERAL_KEY = gql`
  mutation payment_createEphemeralKey {
    payment_createEphemeralKey {
      result {
        id
        object
        created
        deleted
        expires
        livemode
        secret
        rawJson
      }
      status
    }
  }
`;

export const PAYMENT_WITHDRAW_USER_WALLET = gql`
  mutation payment_widthrawUsersWallet(
    $amount: Decimal!
    $widthrawWalletType: WidthrawWalletType!
  ) {
    payment_widthrawUsersWallet(
      amount: $amount
      widthrawWalletType: $widthrawWalletType
    ) {
      result
      status
    }
  }
`;

export const PAYMENT_PAYOUT_FOR_CONNECT = gql`
  mutation payment_payoutForConnects($amount: Decimal!) {
    payment_payoutForConnects(amount: $amount) {
      result
      status
    }
  }
`;
