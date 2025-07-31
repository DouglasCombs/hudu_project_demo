import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Center, HStack, VStack} from 'native-base';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {
  CustomButton,
  CustomImage,
  RatingStar,
  QuestionModal,
  SectionBidLabelV2,
  HuduVerified,
  CustomText,
} from '~/components';
import {userDataStore} from '~/stores';
import {useCancelBid, useRejectBid} from '~/hooks/bid';
import images from '~/assets/images';
import {BidStatus, ProjectStatus, ResponseStatus} from '~/generated/graphql';
import {useGetConversationId} from '~/hooks/message';
import {showInfoMessage} from '~/utils/utils';

const ActiveBidItem = ({
  item,
  index,
  projectStatus,
}: {
  item?: any;
  index: number;
  projectStatus: string;
}) => {
  const {userData} = userDataStore(state => state);
  const {mutate: mutateCancelBid, isLoading: cancelBidLoading} = useCancelBid();
  const {mutate: mutateRejectBid, isLoading: rejectBidLoading} = useRejectBid();
  const {mutate: mutateGetConversationId, isLoading: getConversationIdLoading} =
    useGetConversationId();

  const [cancelBidModalVisible, setCancelBidModalVisible] =
    useState<boolean>(false);
  const [awardModalVisible, setAwardModalVisible] = useState<boolean>(false);
  const [rejectModalVisible, setRejectModalVisible] = useState<boolean>(false);

  const currentUser = userData?.id === item?.huduId;
  const isLister = userData?.id === item?.listerId;

  const onPressHandler = () => {
    if (item?.isHuduDeletedAccount === false) {
      navigate('HudurProfile', {userId: item?.huduId, isLister});
    } else {
      showInfoMessage("Doer's account has been deleted");
    }
  };

  const cancelOnPress = () => {
    setCancelBidModalVisible(true);
  };

  const onCloseCancelBidModal = () => {
    setCancelBidModalVisible(false);
  };

  const onCloseAwardModal = () => {
    setAwardModalVisible(false);
  };

  const onCloseRejectModal = () => {
    setRejectModalVisible(false);
  };

  const onAcceptCancelBidModal = async () => {
    mutateCancelBid(item?.id, {
      onSuccess: successData => {
        if (successData?.bid_cancellBid?.status === ResponseStatus.Success) {
          setCancelBidModalVisible(false);
        }
      },
    });
  };

  const onAcceptAwardModal = async () => {
    setAwardModalVisible(false);
    navigate('Payment', {bid: item, projectId: item?.projectId});
  };

  const onAcceptRejectModal = async () => {
    mutateRejectBid(item?.id, {
      onSuccess: successData => {
        if (successData?.bid_rejectBid?.status === ResponseStatus.Success) {
          setRejectModalVisible(false);
        }
      },
    });
  };

  const awardOnPress = () => {
    setAwardModalVisible(true);
  };

  const rejectOnPress = () => {
    setRejectModalVisible(true);
  };

  const confirmPaymentOnPress = () => {
    navigate('Payment', {projectId: item?.projectId, type: 'project'});
  };

  const messageOnPress = () => {
    const input = {
      otherUserId: item?.huduId,
      projectId: item?.projectId,
      currentUserId: userData?.id,
    };
    mutateGetConversationId(input, {
      onSuccess: successData => {
        const conversationId =
          successData?.message_getConversationForUser?.result?.id;
        navigate('Chat', {conversationId, user: item?.hudu});
      },
    });
  };

  const isCancelled = item?.bidStatus === BidStatus.Cancell;
  const isNotLucky = item?.bidStatus === BidStatus.NotLucky;
  const inProgress = item?.bidStatus === BidStatus.InProgress;
  const isWaiting = item?.bidStatus === BidStatus.Waiting;
  const isFinished = projectStatus === ProjectStatus.Finished;
  const isBidding = projectStatus === ProjectStatus.Bidding;

  return (
    <>
      <Center
        mt={index === 0 ? '6' : '2'}
        mb="2"
        mx="4"
        px="4"
        py="4"
        borderRadius="lg"
        bg={
          isCancelled || isNotLucky
            ? Colors.CANCEL_CARD_BACKGROUND
            : inProgress || isFinished || isBidding
            ? Colors.WHITE
            : Colors.CANCEL_CARD_BACKGROUND
        }
        shadow="2">
        <TouchableOpacity
          disabled={isCancelled || isNotLucky || inProgress || isFinished}
          activeOpacity={0.7}
          style={styles.item}
          onPress={onPressHandler}>
          <VStack space="2">
            <HStack space="2">
              <CustomImage
                imageSource={item?.hudu?.imageAddress}
                resizeMode="cover"
                style={styles.avatar}
                errorImage={images.avatarErrorImage}
                errorText={item?.hudu?.userName ?? item?.hudu?.email}
              />
              <VStack flex={1}>
                <CustomText fontFamily={fontFamily.medium}>
                  {currentUser ? 'you' : item?.hudu?.userName ?? 'Doer'}
                </CustomText>
                {item?.hudu?.isVerified && <HuduVerified />}
              </VStack>
              <VStack alignItems="center">
                <RatingStar
                  size={14}
                  rate={item?.hudu?.asHuduRates}
                  showRating="right"
                  total={item?.hudu?.listersWhoRatedToMeCount}
                  disabled
                  fillColor={
                    isCancelled || isNotLucky
                      ? Colors.PLACEHOLDER
                      : inProgress || isFinished || isWaiting
                      ? Colors.GOLDEN
                      : Colors.CANCEL_CARD_BACKGROUND
                  }
                />
              </VStack>
            </HStack>
            <HStack space="2">
              <HStack flex={1} space="2">
                <CustomText>{'Note: '}</CustomText>
                <CustomText flex={1} color={Colors.PLACEHOLDER}>
                  {item?.description}
                </CustomText>
              </HStack>
              <SectionBidLabelV2 item={item} />
            </HStack>
            <HStack justifyContent="space-between">
              <CustomText>{currentUser ? 'Your bid' : 'Bid amount'}</CustomText>
              <CustomText
                color={
                  isCancelled || isNotLucky
                    ? Colors.PLACEHOLDER
                    : inProgress || isFinished || isWaiting
                    ? Colors.PRIMARY
                    : Colors.PLACEHOLDER
                }>
                {item?.amount && `$${Number(item?.amount)?.toFixed(2) ?? ''}`}
              </CustomText>
            </HStack>
            {currentUser &&
              item?.bidStatus === 'WAITING' &&
              projectStatus !== 'IN_CONFIRM_PAYMENT' && (
                <CustomButton
                  color={Colors.BLACK_3}
                  outline
                  title="Cancel"
                  onPress={cancelOnPress}
                />
              )}
            {item?.bidStatus === 'WAITING' &&
              isLister &&
              projectStatus === 'BIDDING' && (
                <VStack space="4">
                  <CustomButton
                    title="Ask Bidder a Question"
                    onPress={messageOnPress}
                    height={verticalScale(35)}
                    loading={getConversationIdLoading}
                  />
                  <HStack space="4" h="35px">
                    <Center flex={1}>
                      <CustomButton
                        title="Award"
                        onPress={awardOnPress}
                        height={verticalScale(35)}
                      />
                    </Center>
                    <Center flex={1}>
                      <CustomButton
                        color={Colors.BLACK_3}
                        outline
                        title="Decline"
                        onPress={rejectOnPress}
                        height={verticalScale(35)}
                      />
                    </Center>
                  </HStack>
                </VStack>
              )}
            {projectStatus === 'IN_CONFIRM_PAYMENT' &&
              item?.bidStatus === 'IN_PROGRESS' && (
                <CustomButton
                  color={Colors.BLACK_3}
                  outline
                  title="Confirm payment"
                  onPress={confirmPaymentOnPress}
                />
              )}
          </VStack>
        </TouchableOpacity>
      </Center>
      {cancelBidModalVisible && (
        <QuestionModal
          visible={cancelBidModalVisible}
          onClose={onCloseCancelBidModal}
          title="Are you sure you want to cancel this bid?"
          option1="No"
          option2="Yes"
          option1OnPress={onCloseCancelBidModal}
          option2OnPress={onAcceptCancelBidModal}
          loading={cancelBidLoading}
        />
      )}
      {awardModalVisible && (
        <QuestionModal
          visible={awardModalVisible}
          onClose={onCloseAwardModal}
          title="Are you sure you want to award this bid?"
          option1="No"
          option2="Yes"
          option1OnPress={onCloseAwardModal}
          option2OnPress={onAcceptAwardModal}
        />
      )}
      {rejectModalVisible && (
        <QuestionModal
          visible={rejectModalVisible}
          onClose={onCloseRejectModal}
          title="Are you sure you want to decline this bid?"
          option1="No"
          option2="Yes"
          option1OnPress={onCloseRejectModal}
          option2OnPress={onAcceptRejectModal}
          loading={rejectBidLoading}
        />
      )}
    </>
  );
};

export default ActiveBidItem;

const styles = StyleSheet.create({
  avatar: {
    height: scale(33),
    width: scale(33),
    borderRadius: 100,
  },
  item: {
    flex: 1,
    width: '100%',
  },
});
