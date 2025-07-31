import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {VStack, Center, HStack} from 'native-base';
import {
  ModalContainer,
  CustomButton,
  ImageBoxViewer,
  CustomKeyboardAwareScrollView,
  CustomText,
} from '~/components';
import {fontFamily, verticalScale, fontSize} from '~/utils/style';
import {Colors} from '~/styles';
import {getStateNameFromShortName, isIos} from '~/utils/helper';
import dayjs from 'dayjs';
interface Toast {
  message: string;
  type: string;
  icon: string;
}

const PreviewPostModal = ({
  visible,
  onClose,
  loading,
  data,
  listProjectOnPress,
  editOnPress,
  cancelOnPress,
  availability,
  showToast,
  setShowToast,
  toastMessage,
  setToastMessage,
}: {
  visible: boolean;
  onClose: () => void;
  loading: boolean;
  data: any;
  listProjectOnPress: () => void;
  editOnPress: () => void;
  cancelOnPress: () => void;
  availability: any;
  showToast?: boolean;
  setShowToast?: any;
  toastMessage?: Toast;
  setToastMessage?: any;
}) => {
  const renderItem = ({item, index}: {item: any; index: number}) => (
    <Center ml="4" mr={index === data?.images?.length ? '4' : '0'}>
      <ImageBoxViewer {...{item}} />
    </Center>
  );

  return (
    <ModalContainer
      keyboardAware={false}
      isVisible={visible}
      onClose={onClose}
      style={styles.modal}
      loading={loading}
      {...{showToast, setShowToast, toastMessage, setToastMessage}}>
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack py="4" space="6">
          <HStack px="8" space="4" h="35px">
            <Center flex={1}>
              <CustomButton
                outline
                color={Colors.BLACK_3}
                title="Edit"
                onPress={editOnPress}
                height={verticalScale(35)}
              />
            </Center>
            <Center flex={1}>
              <CustomButton
                color={Colors.CANCEL_BUTTON}
                borderColor={Colors.ERROR}
                textColor={Colors.ERROR}
                title="Cancel"
                onPress={cancelOnPress}
                height={verticalScale(35)}
              />
            </Center>
          </HStack>
          <FlatList
            data={data?.projectImages || []}
            renderItem={renderItem}
            keyExtractor={(_, index: number) => `img${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <VStack px="4" space="6">
            <CustomText
              fontSize={fontSize.xLarge}
              fontFamily={fontFamily.medium}
              color={Colors.BLACK}>
              {data?.title}
            </CustomText>
            <CustomText fontSize={fontSize.medium} color={Colors.PLACEHOLDER}>
              {data?.description}
            </CustomText>
            <HStack alignItems="center" justifyContent="space-between">
              <CustomText fontSize={fontSize.medium}>Time left</CustomText>
              <CustomText fontSize={fontSize.medium}>
                {dayjs(data?.projectDeadLine).format('MMM DD, YYYY hh:mm A')}
              </CustomText>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <CustomText fontSize={fontSize.medium}>Availability</CustomText>
              <CustomText fontSize={fontSize.medium}>
                {availability
                  ? availability === 'Specific time'
                    ? dayjs(data?.duration).format('MMM DD, YYYY hh:mm A')
                    : availability
                  : ''}
              </CustomText>
            </HStack>
            <CustomText fontSize={fontSize.medium}>
              Address: {data?.streetAddress}, {data?.city},{' '}
              {getStateNameFromShortName(data?.state)}, {data?.zipCode}
            </CustomText>
          </VStack>
        </VStack>
      </CustomKeyboardAwareScrollView>
      <Center px="4" pt="2" pb="16">
        <CustomButton
          title="List project"
          onPress={listProjectOnPress}
          height={verticalScale(45)}
          disabled={loading}
        />
      </Center>
    </ModalContainer>
  );
};

export default PreviewPostModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingTop: isIos ? 50 : 0,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
});
