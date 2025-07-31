import {Box, HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
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
  isVisible: boolean;
  isLoading?: boolean;
  onClose: () => void;
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

export default function ConfirmationModal(props: Props) {
  const {t} = useTranslation();

  const {
    isVisible,
    isLoading,
    onClose,
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

  return (
    <ModalContainer
      style={styles.modal}
      isVisible={isVisible}
      onClose={onClose}>
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
            onPress={onClose}
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

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 16,
  },
});
