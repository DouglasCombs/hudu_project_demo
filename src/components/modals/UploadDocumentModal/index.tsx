import {Center, HStack, Input, VStack, View} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import ReactNativeModal from 'react-native-modal';
import {GreenCheck} from '~/assets/icons';
import {CustomButton, CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

export default function UploadDocumentModal({
  visible,
  onClose,
  onSubmitPress,
  loading,
  file,
}: {
  visible: boolean;
  onClose: any;
  onSubmitPress: any;
  loading?: boolean;
  file?: any;
}) {
  const {t} = useTranslation();
  const [text, setText] = useState('');
  const onChangeText = (value: any) => {
    setText(value);
  };
  return (
    <ReactNativeModal
      onBackdropPress={onClose}
      style={styles.modal}
      avoidKeyboard
      backdropColor={Colors.BLACK_TRANSPARENT_2}
      isVisible={visible}>
      <VStack
        space="4"
        bg={Colors.WHITE_F}
        rounded="lg"
        py="16px"
        w="100%"
        mb="58px"
        space="8">
        <TouchableWithoutFeedback>
          <View>
            <View
              alignSelf={'center'}
              h="1"
              bg={Colors.Ghost}
              w="15%"
              borderRadius="full"
            />
            <Center mt="8" px="6" alignSelf={'flex-start'}>
              <GreenCheck />
            </Center>

            <VStack
              mt="8"
              space="16"
              alignItems={'flex-start'}
              px="6"
              justifyContent={'center'}>
              <VStack
                alignItems={'flex-start'}
                justifyContent={'center'}
                space="2">
                <CustomText
                  fontFamily={fontFamily.regular}
                  fontSize={fontSize.medium}
                  color={Colors.BLACK}>
                  {t('profile.document.documentUploaded')}
                </CustomText>
                <CustomText
                  fontFamily={fontFamily.regular}
                  color={Colors.Topaz}
                  fontSize={fontSize.normal}>
                  {file?.name || 'no name'}
                </CustomText>
              </VStack>
            </VStack>
            <VStack mt="8" px="6" space="2" width="100%">
              <CustomText
                fontFamily={fontFamily.regular}
                color={Colors.Topaz}
                fontSize={fontSize.normal}>
                {t('profile.document.fileName')}
              </CustomText>
              <Input
                borderColor={Colors.Topaz}
                borderWidth={'1'}
                fontSize={fontSize.xNormal}
                fontFamily={fontFamily.regular}
                value={text}
                variant="unstyled"
                onChangeText={onChangeText}
              />
            </VStack>
          </View>
        </TouchableWithoutFeedback>

        <VStack mt="4" space="4">
          <View h="1" width="100%" bg={Colors.Solitude} />
          <HStack
            px="6"
            justifyContent={'space-between'}
            alignItems={'center'}
            space="4">
            <CustomButton
              height={verticalScale(36)}
              title={t('common.save')}
              loading={loading}
              onPress={() => {
                onSubmitPress(text);
                setText('');
              }}
            />
          </HStack>
        </VStack>
      </VStack>
    </ReactNativeModal>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(183),
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  modal: {
    justifyContent: 'center',
    // paddingHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
