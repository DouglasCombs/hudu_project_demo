import {Box, HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomDivider,
  CustomText,
  ModalContainer,
} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  title?: any;
  description?: any;
  submitTitle?: any;
  submitColor?: string;
  submitTextColor?: string;
};

export default function InfoModal(props: Props) {
  const {t} = useTranslation();

  const {
    isVisible,
    onClose,
    submitTitle = t('common.edit'),
    title = t('projects.bids.editBid'),
    description = t('projects.bids.editBidDescription'),
    submitTextColor = Colors.WHITE_F,
    submitColor = Colors.PRIMARY,
  } = props;

  return (
    <ModalContainer
      style={styles.modal}
      isVisible={isVisible}
      onClose={onClose}>
      <VStack pt="32px" pb="16px">
        <Box px="24px" flex={1}>
          <CustomText
            fontSize={fontSize.xLarge}
            fontFamily={fontFamily.medium}
            marginBottom={12}>
            {title}
          </CustomText>
          <CustomText
            color={Colors.Topaz}
            fontSize={fontSize.xNormal}
            marginBottom={12}>
            {description}
          </CustomText>
        </Box>
        <CustomDivider />
        <HStack space="16px" px="16px">
          <CustomButton
            flex={1}
            height={verticalScale(32)}
            color={submitColor}
            textColor={submitTextColor}
            onPress={onClose}
            title={submitTitle}
          />
        </HStack>
      </VStack>
    </ModalContainer>
  );
}

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 16,
  },
});
