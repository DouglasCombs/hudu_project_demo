import {HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet} from 'react-native';
import {StartIcon2, StartIconFill2} from '~/assets/icons';
import {
  CustomButton,
  CustomDivider,
  CustomText,
  ModalContainer,
  RatingStar,
} from '~/components';
import {APP_STORE_LINK, PLAY_STORE_LINK} from '~/constants/constants';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

export default function RateUsModal({
  visible,
  onClose,
  defaultRate = 5,
}: {
  visible: boolean;
  onClose: () => void;
  defaultRate?: number;
}) {
  const {t} = useTranslation();

  const [rate, setRate] = useState<number>(defaultRate);

  function onSubmit() {
    if (isIos) {
      Linking.openURL(APP_STORE_LINK).catch(err =>
        console.error('An error occurred', err),
      );
    } else {
      Linking.openURL(PLAY_STORE_LINK).catch(err =>
        console.error('An error occurred', err),
      );
    }
  }

  return (
    <ModalContainer
      loading={false}
      style={styles.modal}
      isVisible={visible}
      onClose={onClose}>
      <VStack pt="32px" pb="24px">
        <VStack space="34px" mb="50px" alignItems="center" px="24px" flex={1}>
          <CustomText fontSize={fontSize.xLarge} fontFamily={fontFamily.medium}>
            {t('common.rateOnStore')}
          </CustomText>
          <RatingStar
            half={false}
            rate={rate}
            onChange={setRate}
            customFullStar={<StartIconFill2 />}
            customEmptyStar={<StartIcon2 />}
            disabled={false}
          />
        </VStack>
        <CustomDivider />
        <HStack space="16px" px="16px">
          <CustomButton
            flex={1}
            height={verticalScale(32)}
            color={Colors.Solitude}
            textColor={Colors.Topaz}
            onPress={onClose}
            title={t('common.notNow')}
          />
          <CustomButton
            flex={1}
            height={verticalScale(32)}
            onPress={onSubmit}
            title={t('common.rate')}
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
