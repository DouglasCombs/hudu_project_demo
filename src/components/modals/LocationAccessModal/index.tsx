import {Box, HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {openSettings} from 'react-native-permissions';
import {
  CustomButton,
  CustomDivider,
  CustomText,
  Loading,
  ModalContainer,
} from '~/components';
import {locationStore, stateStore} from '~/stores';
import {stateStoreInitialState} from '~/stores/stateStore';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

type Props = {
  isLoading?: boolean;
  title?: any;
  description?: any;
  cancelTitle?: any;
  submitTitle?: any;
  cancelColor?: string;
  submitColor?: string;
  cancelTextColor?: string;
  submitTextColor?: string;
};

export default function LocationAccessModal(props: Props) {
  const {t} = useTranslation();
  const {isVisibleLocationModal, setIsVisibleLocationModal} = locationStore();
  const {
    isLoading,
    title = 'Location!',
    description = 'Please give location access to the app!',
    cancelTitle = t('common.cancel'),
    submitTitle = t('common.ok'),
    cancelColor = Colors.Solitude,
    submitColor = Colors.PRIMARY,
    cancelTextColor = Colors.Topaz,
    submitTextColor = Colors.WHITE_F,
  } = props;

  const onSubmit = () => {
    setIsVisibleLocationModal(false);
    openSettings().catch();
  };

  const onClose = () => {
    setIsVisibleLocationModal(false);
    stateStore.setState({stateTempData: stateStoreInitialState});
  };

  return (
    <ModalContainer style={styles.modal} isVisible={isVisibleLocationModal}>
      <VStack pt="20px" pb="20px">
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
            marginBottom={48}>
            {description}
          </CustomText>
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
