import {gql} from 'graphql-request';

export const USER_EDIT_IMAGES = gql`
  mutation user_editImage($input: UserImageInput) {
    user_editImage(input: $input) {
      status
    }
  }
`;

export const USER_DELETE_IMAGES = gql`
  mutation user_removeImage($userImageids: [Int!]) {
    user_removeImage(userImageids: $userImageids) {
      result
      status
    }
  }
`;

export const USER_ADD_IMAGES = gql`
  mutation user_addImage($input: [UserImageInput]) {
    user_addImage(input: $input) {
      status
    }
  }
`;

export const GENERATE_REFERRAL_CODE = gql`
  mutation referall_generateReferallCode {
    referall_generateReferallCode {
      result
      status
    }
  }
`;

export const USER_LOGIN = gql`
  query user_login {
    user_login {
      result {
        email
        userName
        imageAddress
        firstName
        lastName
        phoneNumber
        bio
        streetAddress
        city
        state
        zipCode
        id
        isDeleted
        isActive
        isVerified
        stripeAccountId
        stripeCustomerId
      }
      status
    }
  }
`;

export const USER_DELETE_USER = gql`
  mutation user_DeleteUser($userId: Int) {
    user_DeleteUser(userId: $userId) {
      result {
        id
      }
      status
    }
  }
`;

export const USER_SIGN_UP = gql`
  mutation user_signUp($email: String) {
    user_signUp(email: $email) {
      result {
        isActive
        email
        id
      }
      status
    }
  }
`;

export const USER_SIGN_UP_REFERRAL_CODE = gql`
  mutation user_signUpReferallCode($referallCode: String) {
    user_signUpReferallCode(referallCode: $referallCode) {
      result {
        id
      }
      status
    }
  }
`;

export const USER_UPDATE_LAST_SEEN = gql`
  mutation user_UpdateLastSeen {
    user_UpdateLastSeen {
      result {
        id
      }
      status
    }
  }
`;

export const USER_UPDATE_PROFILE = gql`
  mutation user_updateProfile($userInput: UserInput) {
    user_updateProfile(userInput: $userInput) {
      result {
        email
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
        asListerRates
        averageRate
        id
        isDeleted
        isVerified
        stripeAccountId
        stripeCustomerId
      }
      status
    }
  }
`;

export const USER_SEND_EMAIL = gql`
  mutation user_sendEmail($email: EmailInput) {
    user_sendEmail(email: $email)
  }
`;

export const USER_CHECK_USER_NAME = gql`
  query user_usernameExist($userId: Int, $username: String) {
    user_usernameExist(userId: $userId, username: $username) {
      result
      status
    }
  }
`;

export const USER_EDIT_ADDRESS = gql`
  mutation user_editAddressesOfUser($input: UserAddressIputInput) {
    user_editAddressesOfUser(input: $input) {
      result {
        id
      }
      status
    }
  }
`;

export const USER_ADD_ADDRESSES_TO_USER = gql`
  mutation user_addAddressesToUser(
    $input: [UserAddressIputInput]
  ) {
    user_addAddressesToUser(input: $input) {
      result() {
        items {
          id
        }
      }
      status
    }
  }
`;

export const USER_REMOVE_ADDRESSES_FROM_USER = gql`
  mutation user_removeAddressFromUser($userAddressIds: [Int!]) {
    user_removeAddressFromUser(userAddressIds: $userAddressIds) {
      result
      status
    }
  }
`;

export const USER_ADD_PHONE_NUMBER = gql`
  mutation user_addPhoneNumber($phoneNumber: String, $countryCode: String) {
    user_addPhoneNumber(phoneNumber: $phoneNumber, countryCode: $countryCode) {
      result
      status
    }
  }
`;

export const USER_CONFIRM_PHONE_NUMBER = gql`
  mutation user_confirmPhoneNumber($verificationCode: String) {
    user_confirmPhoneNumber(verificationCode: $verificationCode) {
      result
      status
    }
  }
`;

export const USER_ACTIVATION_NOTIFICATION = gql`
  mutation user_activationNotifications($input: ActivationNotificationInput) {
    user_activationNotifications(input: $input) {
      result {
        id
      }
      status
    }
  }
`;
