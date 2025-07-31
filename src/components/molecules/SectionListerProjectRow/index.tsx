import {Center, HStack, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CustomButton,
  CustomImage,
  CustomText,
  QuestionModal,
  SectionBidAmountLabel,
  SectionChooseHudur,
  SectionFinishProject,
  SectionProjectLabel,
} from '~/components';
import {BidStatus, ProjectStatus, ResponseStatus} from '~/generated/graphql';
import {useGetConversationId} from '~/hooks/message';
import {useDeleteProject} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';

const SectionListerProjectRow = ({item}: {item: any}) => {
  const huduFinishedProject =
    item?.lowestBid?.bidStatus === BidStatus.HuduFinishedProject;

  const swipeable = useRef<Swipeable>(null);
  const {userData} = userDataStore(state => state);

  const {mutate: mutateDeleteProject, isLoading: deleteProjectLoading} =
    useDeleteProject();
  const {mutate: mutateGetConversationId, isLoading: getConversationIdLoading} =
    useGetConversationId();

  const [questionModalVisible, setQuestionModalVisible] =
    useState<boolean>(false);

  const chooseHudur =
    item?.project?.projectStatus === ProjectStatus.Bidding &&
    item?.currentLowBid &&
    item?.currentLowBid > 0;

  const inProgress = item?.project?.projectStatus === ProjectStatus.InProgress;

  const isFinished = item?.project?.projectStatus === ProjectStatus.Finished;

  const isFinish = inProgress && !item?.isListerCommented;

  const deleteOnPress = () => {
    if (item?.project?.projectStatus === 'BIDDING') {
      setQuestionModalVisible(true);
    }
  };

  const onCloseQuestionModal = () => {
    discardSwipe();
    setQuestionModalVisible(false);
  };

  const deleteHandler = () => {
    mutateDeleteProject(item?.project?.id, {
      onSuccess: successData => {
        if (
          successData?.project_deleteProject?.status === ResponseStatus.Success
        ) {
          discardSwipe();
          setQuestionModalVisible(false);
        }
      },
    });
  };

  const discardSwipe = () => {
    swipeable.current?.close();
  };

  const itemOnPress = () => {
    navigate('ProjectDetails', {
      projectId: item?.project?.id,
      isDeepLinking: false,
    }); //phase1
  };

  const chatOnPress = () => {
    const input = {
      otherUserId: item?.lowestBid?.hudu?.id,
      projectId: item?.project?.id,
      currentUserId: userData?.id,
    };

    mutateGetConversationId(input, {
      onSuccess: successData => {
        const conversationId =
          successData?.message_getConversationForUser?.result?.id;
        navigate('Chat', {conversationId, user: item?.lowestBid?.hudu});
      },
    });
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={deleteOnPress}>
        <Center
          flex={1}
          bg={Colors.LEFT_ACTION_BACKGROUND}
          my="1"
          mr="1"
          w={`${scale(59)}px`}
          borderRightRadius="lg">
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
        renderRightActions={
          item?.project?.projectStatus === ProjectStatus.Bidding &&
          renderRightActions
        }>
        <Center
          px="2"
          py="2"
          mx="1"
          my="1"
          flex={1}
          borderRadius="lg"
          bg={Colors.WHITE}
          shadow="4">
          <VStack w="100%" flex={1}>
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
                    <SectionProjectLabel {...{item}} />
                  </HStack>
                  <CustomText
                    flex={1}
                    numberOfLines={2}
                    color={Colors.PLACEHOLDER}>
                    {item?.project?.description}
                  </CustomText>
                  <HStack alignItems="center" justifyContent="space-between">
                    <SectionBidAmountLabel
                      {...{
                        projectStatus: item?.project?.projectStatus,
                        listerId: item?.project?.userId,
                        currentLowBid: item?.currentLowBid,
                      }}
                    />
                    {item?.currentLowBid && item?.currentLowBid > 0 ? (
                      <CustomText
                        fontSize={fontSize.medium}
                        color={Colors.INFO}>
                        {item?.currentLowBid && item?.currentLowBid > 0
                          ? `$${Number(item?.currentLowBid)?.toFixed(2)}`
                          : ''}
                      </CustomText>
                    ) : (
                      <></>
                    )}
                  </HStack>
                </VStack>
              </HStack>
            </TouchableOpacity>
            {(inProgress || isFinished) && (
              <HStack space="2" mt="2">
                <Center style={styles.first} />
                <VStack flex={1}>
                  <CustomButton
                    title="Ask Doer a Question"
                    onPress={chatOnPress}
                    height={verticalScale(35)}
                    loading={getConversationIdLoading}
                  />
                </VStack>
              </HStack>
            )}
            {(chooseHudur || isFinish) && (
              <HStack space="2" mt="2">
                <Center style={styles.first} />
                <VStack flex={1}>
                  {chooseHudur && (
                    <SectionChooseHudur {...{projectId: item?.project?.id}} />
                  )}
                  {isFinish && (
                    <SectionFinishProject
                      {...{
                        projectId: item?.project?.id,
                        currentBid: item?.lowestBid,
                        disabled: !huduFinishedProject,
                      }}
                    />
                  )}
                </VStack>
              </HStack>
            )}
          </VStack>
        </Center>
      </Swipeable>
      {questionModalVisible && (
        <QuestionModal
          visible={questionModalVisible}
          onClose={onCloseQuestionModal}
          title="Are you sure you want to delete this project?"
          option1="Cancel"
          option2="Delete"
          option1OnPress={onCloseQuestionModal}
          option2OnPress={deleteHandler}
          loading={deleteProjectLoading}
        />
      )}
    </>
  );
};

export default SectionListerProjectRow;

const styles = StyleSheet.create({
  image: {
    minHeight: scale(97),
    width: scale(97),
    borderRadius: 10,
  },
  first: {width: scale(97)},
  item: {
    width: '100%',
    flex: 1,
  },
});
