import {Box, HStack, VStack} from 'native-base';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomDivider,
  CustomText,
  Loading,
  ModalContainer,
} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

type Props = {
  isLoading?: boolean;
  onSubmit: () => void;
  title?: any;
  description?: any;
  cancelTitle?: any;
  submitTitle?: any;
  cancelColor?: string;
  submitColor?: string;
  cancelTextColor?: string;
  submitTextColor?: string;
  children?: any;
};

function ConfirmationModalV2(props: Props, ref: any) {
  const {t} = useTranslation();

  const {
    isLoading,
    onSubmit,
    title = t('projects.bids.editBid'),
    description,
    cancelTitle = t('common.cancel'),
    submitTitle = t('common.edit'),
    cancelColor = Colors.Solitude,
    submitColor = Colors.PRIMARY,
    cancelTextColor = Colors.Topaz,
    submitTextColor = Colors.WHITE_F,
    children,
  } = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = () => {
    Keyboard.dismiss();
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContainer
      style={styles.modal}
      isVisible={isVisible}
      onClose={closeModal}>
      <VStack pt="20px" pb="20px">
        <Box px="24px" flex={1}>
          <CustomText
            fontSize={fontSize.xLarge}
            fontFamily={fontFamily.medium}
            marginBottom={12}>
            {title}
          </CustomText>
          {description && (
            <CustomText
              color={Colors.Topaz}
              fontSize={fontSize.xNormal}
              marginBottom={48}>
              {description}
            </CustomText>
          )}
          {children}
        </Box>
        <CustomDivider />
        <HStack space="16px" px="16px">
          <CustomButton
            flex={1}
            height={verticalScale(32)}
            color={cancelColor}
            textColor={cancelTextColor}
            onPress={closeModal}
            title={cancelTitle}
          />
          <CustomButton
            flex={1}
            height={verticalScale(32)}
            color={submitColor}
            textColor={submitTextColor}
            onPress={onSubmit}
            title={submitTitle}
          />
        </HStack>
      </VStack>
      {isLoading && <Loading />}
    </ModalContainer>
  );
}

export default forwardRef(ConfirmationModalV2);

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 16,
  },
});
