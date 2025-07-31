import React, {useState} from 'react';
import {Keyboard} from 'react-native';
import {Camera} from '~/assets/icons';
import {AttachmentPickerModal, CustomTouchable} from '~/components';
import {Colors} from '~/styles';

const AttachmentButton = ({
  onSubmitImage,
  disabled,
}: {
  onSubmitImage: any;
  disabled?: boolean;
}) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onPressHandler = () => {
    Keyboard.dismiss();
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <CustomTouchable
        disabled={disabled ? true : false}
        onPress={onPressHandler}>
        <Camera strokeColor={disabled ? Colors.DEEP_FIR : Colors.PRIMARY} />
      </CustomTouchable>
      {visible && (
        <AttachmentPickerModal
          onClose={onClose}
          visible={visible}
          onChangeImage={onSubmitImage}
        />
      )}
    </>
  );
};

export default AttachmentButton;
