import {Modal} from 'native-base';
import React from 'react';
import {ViewStyle} from 'react-native';
import {CustomLoading} from '~/components';
import {Colors} from '~/styles';

function ModalContainer({
  isVisible,
  onClose,
  children,
  backdropColor = Colors.BLACK_TRANSPARENT,
  justify = 'center',
  loading,
  closeOnTouchOutSide = true,
  px = 0,
  mx,
  py = 0,
  useBody = true,
  style,
  avoidKeyboard = false,
  mb = '48px',
}: {
  isVisible: boolean;
  onClose: any;
  children: any;
  onModalHide?: any;
  backdropColor?: string;
  justify?: 'flex-end' | 'flex-start' | 'center';
  loading?: boolean;
  closeOnTouchOutSide?: boolean;
  px?: string | number;
  mx?: string | number;
  py?: string | number;
  useBody?: boolean;
  style?: ViewStyle | ViewStyle[];
  avoidKeyboard?: boolean;
  mb?: string | number;
}) {
  return (
    <Modal
      justifyContent={justify}
      closeOnOverlayClick={closeOnTouchOutSide}
      isKeyboardDismissable
      isOpen={isVisible}
      onClose={onClose}
      avoidKeyboard={avoidKeyboard}
      style={style}
      backgroundColor={backdropColor}>
      {useBody ? (
        <Modal.Content w="100%" mb={mb}>
          <Modal.Body px={px} py={py} mx={mx}>
            {loading && <CustomLoading />}
            {children}
          </Modal.Body>
        </Modal.Content>
      ) : (
        <>
          {loading && <CustomLoading />}
          {children}
        </>
      )}
    </Modal>
  );
}

export default React.memo(ModalContainer);

/*

import {Modal} from 'native-base';
import React from 'react';
import {
  Modal as ReactNativeModal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import {CustomKeyboardAwareScrollView, CustomLoading} from '~/components';
import {isIos} from '~/utils/helper';
import {scale} from '~/utils/style';

function ModalContainer({
  isVisible,
  onClose,
  children,
  backdropColor,
  backgroundColor,
  justify = 'center',
  style = styles.modalInnerContainer,
  loading,
  closeOnTouchOutSide = true,
  keyboardAware = true,
}: {
  isVisible: boolean;
  onClose: any;
  children: any;
  onModalHide?: any;
  backdropColor?: string;
  backgroundColor?: string;
  justify?: any;
  style?: ViewStyle | ViewStyle[];
  loading?: boolean;
  closeOnTouchOutSide?: boolean;
  keyboardAware?: boolean;
}) {
  if (isIos) {
    return (
      <Modal isKeyboardDismissable isOpen={isVisible} onClose={onClose}>
        <TouchableWithoutFeedback
          onPress={closeOnTouchOutSide ? onClose : undefined}>
          <View
            style={[
              styles.modalContainer,
              {
                justifyContent: justify,
                backgroundColor: backdropColor || 'rgba(0,0,0,0.75)',
              },
            ]}>
            {keyboardAware ? (
              <CustomKeyboardAwareScrollView
                contentContainerStyle={styles.contentContainerStyle}>
                <TouchableWithoutFeedback>
                  <View
                    style={[
                      style,
                      {
                        backgroundColor: backgroundColor || '#F8F8F8',
                      },
                    ]}>
                    {loading && <CustomLoading />}
                    {children}
                  </View>
                </TouchableWithoutFeedback>
              </CustomKeyboardAwareScrollView>
            ) : (
              <TouchableWithoutFeedback>
                <View
                  style={[
                    style,
                    {
                      backgroundColor: backgroundColor || '#F8F8F8',
                    },
                  ]}>
                  {loading && <CustomLoading />}
                  {children}
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <ReactNativeModal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback
        onPress={closeOnTouchOutSide ? onClose : undefined}>
        <View
          style={[
            styles.flex1,
            {
              justifyContent: justify,
              backgroundColor: backdropColor || 'rgba(0,0,0,0.75)',
            },
          ]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                style,
                {
                  backgroundColor: backgroundColor || '#F8F8F8',
                },
              ]}>
              {loading && <CustomLoading />}
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </ReactNativeModal>
  );
}

export default React.memo(ModalContainer);

const styles = StyleSheet.create({
  modalContainer: {flex: 1, width: '100%'},
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  modalInnerContainer: {
    borderRadius: 8,
    margin: scale(48),
    overflow: 'hidden',
  },
  toastMessage: {paddingRight: 10},
  flex1: {
    flex: 1,
  },
});


*/
