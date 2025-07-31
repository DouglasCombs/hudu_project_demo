import React, {useState} from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton, ChooseHudurModal} from '~/components';
import {navigate} from '~/navigation/Methods';

const SectionChooseHudur = ({projectId}: {projectId: number}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const chooseHudurOnPress = () => {
    setModalVisible(true);
  };

  const onCloseModal = () => {
    setModalVisible(false);
  };

  const onAwardBid = (bid: any) => {
    setModalVisible(false);
    navigate('Payment', {bid, projectId: bid?.projectId});
  };

  return (
    <>
      <CustomButton
        outline
        title="Choose a Doer"
        onPress={chooseHudurOnPress}
        color={Colors.BLACK_3}
        height={verticalScale(35)}
      />
      {modalVisible && (
        <ChooseHudurModal
          visible={modalVisible}
          onClose={onCloseModal}
          onAwardBid={onAwardBid}
          title={'Active bids'}
          projectId={projectId}
        />
      )}
    </>
  );
};

export default SectionChooseHudur;
