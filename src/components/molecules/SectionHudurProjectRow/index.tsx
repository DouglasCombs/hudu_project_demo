import {Center, HStack, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CustomButton,
  CustomImage,
  CustomText,
  EditModal,
  QuestionModal,
  SectionBidLabel,
  SectionHudurFinishProject,
  SectionLeaveReview,
  SectionWithdrawForHudur,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {BidStatus, ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {useCancelBid, useDeleteBid, useEditBid} from '~/hooks/bid';
import {useGetConversationId} from '~/hooks/message';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';
import {showInfoMessage} from '~/utils/utils';

const SectionHudurProjectRow = ({item}: {item: any}) => {
  const {userData} = userDataStore(state => state);
  const swipeable = useRef<Swipeable>(null);

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [questionModalVisible, setQuestionModalVisible] =
    useState<boolean>(false);
  const {mutate: mutateEditBid, isLoading: editBidLoading} = useEditBid();
  const {mutate: mutateCancelBid, isLoading: cancelBidLoading} = useCancelBid();
  const {mutate: mutateDeleteBid, isLoading: deleteBidLoading} = useDeleteBid();
  const {mutate: mutateGetConversationId, isLoading: getConversationIdLoading} =
    useGetConversationId();

  const isPending = item?.bidStatus === BidStatus.PenndingHuduWithdraw;
  const inProgress = item?.bidStatus === BidStatus.InProgress;
  const isWaiting = item?.bidStatus === BidStatus.Waiting;
  const isCancelled = item?.bidStatus === BidStatus.Cancell;
  const isFinished = item?.bidStatus === BidStatus.Finished;
  const isHuduFinished = item?.bidStatus === BidStatus.HuduFinishedProject;

  const isLeaveReview =
    isFinished && item?.isListerCommented && !item?.isHuduCommented;

  const itemOnPress = () => {
    if (item?.isListerDeletedAccount) {
      showInfoMessage("Lister's account has been deleted");
    } else {
      if (isWaiting || isFinished || isPending || isHuduFinished) {
        navigate('ProjectDetails', {
          projectId: item?.projectId,
          isDeepLinking: false,
        }); //Phase 1
      } else if (inProgress) {
        if (item?.huduId === userData?.id) {
          navigate('ProjectDetails', {
            projectId: item?.projectId,
            isDeepLinking: false,
          }); //Phase 1
        }
      }
    }
  };

  const deleteOnPress = () => {
    if (isWaiting || isCancelled) {
      setQuestionModalVisible(true);
    }
  };

  const onCloseQuestionModal = () => {
    discardSwipe();
    setQuestionModalVisible(false);
  };

  const deleteHandler = () => {
    if (isWaiting) {
      mutateCancelBid(item?.id, {
        onSuccess: successData => {
          if (successData?.bid_cancellBid?.status === ResponseStatus.Success) {
            discardSwipe();
            setQuestionModalVisible(false);
          }
        },
      });
    } else {
      mutateDeleteBid(item?.id, {
        onSuccess: successData => {
          if (successData?.bid_deleteBid?.status === ResponseStatus.Success) {
            discardSwipe();
            setQuestionModalVisible(false);
          }
        },
      });
    }
  };

  const editOnPress = () => {
    if (isWaiting) {
      setEditModalVisible(true);
    }
  };

  const chatOnPress = () => {
    const input = {
      otherUserId: item?.lister?.id,
      projectId: item?.projectId,
      currentUserId: userData?.id,
    };

    mutateGetConversationId(input, {
      onSuccess: successData => {
        const conversationId =
          successData?.message_getConversationForUser?.result?.id;
        navigate('Chat', {conversationId, user: item?.lister});
      },
    });
  };

  const closeEditModal = () => {
    discardSwipe();
    setEditModalVisible(false);
  };

  const submitEditModal = (formData: any) => {
    const input = {
      id: item?.id,
      amount: formData?.amount,
      description: formData?.description,
      bidStatus: item?.bidStatus,
    };
    mutateEditBid(input, {
      onSuccess: successData => {
        if (successData?.bid_editBid?.status === ResponseStatus.Success) {
          queryClient.invalidateQueries(queryKeys.projects);
          queryClient.invalidateQueries(queryKeys.bids);
          queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
          discardSwipe();
          setEditModalVisible(false);
        }
      },
    });
  };

  const discardSwipe = () => {
    swipeable.current?.close();
  };

  const renderLeftActions = () => {
    return (
      <HStack>
        {isWaiting && (
          <TouchableOpacity activeOpacity={1} onPress={editOnPress}>
            <Center
              flex={1}
              bg={Colors.RIGHT_ACTION_BACKGROUND}
              my="1"
              mr={inProgress || isHuduFinished ? '2' : '1'}
              w={`${scale(59)}px`}
              borderRightRadius="lg">
              <Feather name="edit" size={scale(24)} color={Colors.BLACK_3} />
            </Center>
          </TouchableOpacity>
        )}
      </HStack>
    );
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={deleteOnPress}>
        <Center
          flex={1}
          bg={Colors.LEFT_ACTION_BACKGROUND}
          my="1"
          ml="1"
          w={`${scale(59)}px`}
          borderLeftRadius="lg">
          <Ionicons
            name="trash-outline"
            size={scale(24)}
            color={Colors.DELETE}
          />
        </Center>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Swipeable
        ref={swipeable}
        renderRightActions={(isWaiting || isCancelled) && renderRightActions}
        renderLeftActions={isWaiting && renderLeftActions}>
        <Center
          px="2"
          py="2"
          mx="1"
          my="1"
          flex={1}
          borderRadius="lg"
          bg={Colors.WHITE}
          shadow="4">
          <VStack flex={1} w="100%">
            <TouchableOpacity
              style={styles.item}
              activeOpacity={0.7}
              onPress={itemOnPress}>
              <HStack space="2">
                <CustomImage
                  imageSource={item?.project?.projectImages?.[0]?.imageAddress}
                  style={styles.image}
                  resizeMode="cover"
                />
                <VStack flex={1} space="1">
                  <HStack alignItems="center" space="1">
                    <CustomText
                      flex={1}
                      numberOfLines={1}
                      fontSize={fontSize.xNormal}
                      fontFamily={fontFamily.medium}>
                      {item?.project?.title}
                    </CustomText>
                    <SectionBidLabel {...{item}} />
                  </HStack>
                  <CustomText
                    flex={1}
                    numberOfLines={2}
                    color={Colors.PLACEHOLDER}>
                    {item?.description}
                  </CustomText>
                  <HStack alignItems="center" justifyContent="space-between">
                    <CustomText>Your bid</CustomText>
                    <CustomText fontSize={fontSize.medium} color={Colors.INFO}>
                      ${Number(item?.amount)?.toFixed(2)}
                    </CustomText>
                  </HStack>
                </VStack>
              </HStack>
            </TouchableOpacity>
            {(inProgress ||
              item?.bidStatus === BidStatus.HuduFinishedProject ||
              item.bidStatus === BidStatus.Finished) && (
              <HStack space="2" mt="2">
                <Center style={styles.first} />
                <VStack flex={1}>
                  <CustomButton
                    title="Ask Lister a Question"
                    onPress={chatOnPress}
                    height={verticalScale(35)}
                    loading={getConversationIdLoading}
                  />
                </VStack>
              </HStack>
            )}
            {(isLeaveReview || inProgress || isLeaveReview) && (
              <HStack space="2" mt="2">
                <Center style={styles.first} />
                <VStack flex={1}>
                  {isLeaveReview && (
                    <SectionLeaveReview {...{bidId: item?.id, item}} />
                  )}
                  {inProgress && (
                    <SectionHudurFinishProject {...{bidId: item?.id}} />
                  )}
                  {isPending && (
                    <SectionWithdrawForHudur {...{bidId: item?.id}} />
                  )}
                </VStack>
              </HStack>
            )}
          </VStack>
        </Center>
      </Swipeable>
      {editModalVisible && (
        <EditModal
          visible={editModalVisible}
          onClose={closeEditModal}
          onSubmit={submitEditModal}
          title="Bid details"
          buttonTitle="Save"
          loading={editBidLoading}
          defaultData={{
            amount: item?.amount,
            description: item?.description,
          }}
        />
      )}
      {questionModalVisible && (
        <QuestionModal
          visible={questionModalVisible}
          onClose={onCloseQuestionModal}
          title={`Are you sure you want to ${
            isWaiting ? 'cancel' : 'delete'
          } this bid?`}
          option1="No"
          option2="Yes"
          option1OnPress={onCloseQuestionModal}
          option2OnPress={deleteHandler}
          loading={cancelBidLoading || deleteBidLoading}
        />
      )}
    </>
  );
};

export default SectionHudurProjectRow;

const styles = StyleSheet.create({
  image: {
    minHeight: scale(97),
    width: scale(97),
    borderRadius: 10,
  },
  item: {
    width: '100%',
    flex: 1,
  },
  first: {width: scale(97)},
});
