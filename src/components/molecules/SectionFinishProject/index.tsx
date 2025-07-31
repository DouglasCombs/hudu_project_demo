import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ReviewModal} from '~/components';
import {useAddFeedBack, useFinishProject} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';
import {useQueryClient} from '@tanstack/react-query';
import queryKeys from '~/constants/queryKeys';

const SectionFinishProject = ({
  projectId,
  currentBid,
  disabled,
}: {
  projectId: number;
  currentBid: any;
  disabled?: boolean;
}) => {
  const queryClient = useQueryClient();
  const {mutate: mutateFinishProject, isLoading: finishProjectLoading} =
    useFinishProject();
  const {mutate: mutateAddFeedBack, isLoading: addFeedBackLoading} =
    useAddFeedBack();

  const [reviewModalVisible, setReviewModalVisible] = useState(false);

  const finishProjectOnPress = () => {
    setReviewModalVisible(true);
  };

  const onCloseReviewModal = () => {
    setReviewModalVisible(false);
  };

  const onSubmitReviewModal = (formData: any, resetForm: any) => {
    mutateFinishProject(projectId, {
      onSuccess: successData => {
        if (
          successData?.project_finisheProject?.status === ResponseStatus.Success
        ) {
          const input = {
            bidId: currentBid?.id,
            hudusRate: 0,
            hudusComment: '',
            listersRate: formData?.rate,
            listersComment: formData?.review,
          };
          mutateAddFeedBack(input, {
            onSuccess: feedBackSuccessData => {
              if (
                feedBackSuccessData?.project_addFeedBack?.status ===
                ResponseStatus.Success
              ) {
                queryClient.invalidateQueries(queryKeys.projects);
                setReviewModalVisible(false);
                resetForm();
              }
            },
          });
        }
      },
    });
  };

  const loading = addFeedBackLoading || finishProjectLoading;

  return (
    <>
      <CustomButton
        outline
        title={disabled ? 'Waiting on Doer' : 'Release Payment'}
        onPress={finishProjectOnPress}
        height={verticalScale(35)}
        spinnerColor={Colors.BLACK_3}
        disabled={disabled}
        textColor={disabled ? Colors.ORANGE_800 : Colors.WHITE}
        color={disabled ? Colors.ORANGE_800 : Colors.CYAN_1}
      />
      {reviewModalVisible && (
        <ReviewModal
          visible={reviewModalVisible}
          onClose={onCloseReviewModal}
          onSubmit={onSubmitReviewModal}
          title={`Rate ${currentBid?.hudu?.userName ?? 'Doer'}`}
          loading={loading}
        />
      )}
    </>
  );
};

export default SectionFinishProject;
