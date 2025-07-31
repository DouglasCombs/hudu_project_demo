import {VStack} from 'native-base';
import React, {useState} from 'react';
import {authStore, userDataStore} from '~/stores';
import {CustomButton, EditModal, QuestionModal} from '~/components';
import {verticalScale} from '~/utils/style';
import {useAddBid} from '~/hooks/bid';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {ResponseStatus} from '~/generated/graphql';
import {useOnboardingStripe} from '~/hooks/payment';
import {useGetMessages} from '~/utils/helper';
import {showErrorMessage} from '~/utils/utils';

const SectionAddBid = ({
  userId,
  projectStatus,
  projectId,
}: {
  userId: number;
  projectStatus: string;
  projectId: number;
}) => {
  const {isUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);

  const {showResponseMessage} = useGetMessages();

  const {mutate: mutateAddBid, isLoading: addBidLoading} = useAddBid();
  const {mutate: mutateOnBoarding, isLoading: onBoardingLoading} =
    useOnboardingStripe();

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [stripeModalVisible, setStripeModalVisible] = useState<boolean>(false);
  const [completeUserNameModal, setCompleteUserNameModal] =
    useState<boolean>(false);

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const submitEditModal = (formData: any, reset: any) => {
    const input = {
      description: formData?.description,
      projectId,
      amount: formData?.amount,
    };
    mutateAddBid(input as any, {
      onSuccess: successData => {
        setEditModalVisible(false);
        reset();
        if (successData?.bid_addBid?.status === ResponseStatus.Success) {
        } else if (
          successData?.bid_addBid?.status ===
          ResponseStatus.UserDontHaveStripeAccount
        ) {
          openStripeModal();
        } else if (
          successData?.bid_addBid?.status === ResponseStatus.NotAllowed
        ) {
          showErrorMessage(
            'You can only have 3 active bids at one time. Please cancel one of the bids to place a new one.',
          );
        } else {
          showResponseMessage(successData?.bid_addBid?.status);
        }
      },
      onError: () => {
        setEditModalVisible(false);
      },
    });
  };

  const openStripeModal = () => {
    setStripeModalVisible(true);
  };

  const submitBidOnPress = () => {
    if (isUserLoggedIn) {
      if (userData?.userName) {
        setEditModalVisible(true);
      } else {
        setCompleteUserNameModal(true);
      }
    } else {
      navigate('AuthStack');
    }
  };

  const option1OnPress = () => {
    mutateOnBoarding(
      {},
      {
        onSuccess: successData => {
          if (
            successData?.payment_onboardUserInStripeConnect?.status ===
            ResponseStatus.Success
          ) {
            setStripeModalVisible(false);
          }
        },
      },
    );
  };

  const option2OnPress = () => {
    onCloseStripeModal();
  };

  const onCloseStripeModal = () => {
    setStripeModalVisible(false);
  };

  const onCloseCompleteUserNameModal = () => {
    setCompleteUserNameModal(false);
  };

  const goToEditProfile = () => {
    setCompleteUserNameModal(false);
    navigate('AuthStack', {screen: 'EditProfile'});
  };

  return (
    <>
      {userData?.id !== userId && projectStatus === 'BIDDING' && (
        <VStack px="4" pb="4" pt="1" bg={Colors.WHITE}>
          <CustomButton
            onPress={submitBidOnPress}
            title="Submit bid"
            height={verticalScale(45)}
          />
        </VStack>
      )}
      {editModalVisible && (
        <EditModal
          visible={editModalVisible}
          onClose={closeEditModal}
          onSubmit={submitEditModal}
          title="Bid details"
          loading={addBidLoading}
        />
      )}
      {stripeModalVisible && (
        <QuestionModal
          visible={stripeModalVisible}
          onClose={onCloseStripeModal}
          title="Before you can bid on a project, you must first verify your identity and tell us how you would like to be paid!
To do this, go to MyHUDU and click “Manage Payment Account” or click the button below!"
          option1="Take Me There"
          option2="Cancel"
          option1OnPress={option1OnPress}
          option2OnPress={option2OnPress}
          closeOnTouchOutSide={false}
          loading={onBoardingLoading}
        />
      )}
      {completeUserNameModal && (
        <QuestionModal
          visible={completeUserNameModal}
          onClose={onCloseCompleteUserNameModal}
          title="Your username is not registered. Please enter your username"
          option1="Complete profile"
          option2="Cancel"
          option1OnPress={goToEditProfile}
          option2OnPress={onCloseCompleteUserNameModal}
          closeOnTouchOutSide={false}
        />
      )}
    </>
  );
};

export default SectionAddBid;
