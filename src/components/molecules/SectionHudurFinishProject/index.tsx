import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, QuestionModal} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useHuduFinishedProject} from '~/hooks/bid';

const SectionHudurFinishProject = ({bidId}: {bidId: number}) => {
  const {mutate: mutateDoneProject, isLoading: doneProjectLoading} =
    useHuduFinishedProject();

  const [questionModalVisible, setQuestionModalVisible] = useState(false);

  const finishProjectOnPress = () => {
    setQuestionModalVisible(true);
  };

  const onCloseQuestionModal = () => {
    setQuestionModalVisible(false);
  };

  const onSubmitQuestionModal = () => {
    mutateDoneProject(bidId, {
      onSuccess: successData => {
        if (
          successData?.bid_huduFinsihedProject?.status ===
          ResponseStatus.Success
        ) {
          setQuestionModalVisible(false);
        }
      },
    });
  };

  return (
    <>
      <CustomButton
        outline
        title="Mark as completed"
        onPress={finishProjectOnPress}
        color={Colors.BLACK_3}
        height={verticalScale(35)}
        spinnerColor={Colors.BLACK_3}
      />
      {questionModalVisible && (
        <QuestionModal
          option1="Cancel"
          option2="Done"
          loading={doneProjectLoading}
          visible={questionModalVisible}
          onClose={onCloseQuestionModal}
          option1OnPress={onCloseQuestionModal}
          option2OnPress={onSubmitQuestionModal}
          title="Are you sure you want to mark the project as completed?"
        />
      )}
    </>
  );
};

export default SectionHudurFinishProject;
