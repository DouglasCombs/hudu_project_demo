import React from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton} from '~/components';
import {navigate} from '~/navigation/Methods';

const SectionConfirmPayment = ({project}: {project: any}) => {
  const onConfirmPayment = () => {
    navigate('Payment', {type: 'project', projectId: project?.id});
  };

  return (
    <>
      <CustomButton
        outline
        title="Confirm payment"
        onPress={onConfirmPayment}
        color={Colors.BLACK_3}
        height={verticalScale(35)}
      />
    </>
  );
};

export default SectionConfirmPayment;
