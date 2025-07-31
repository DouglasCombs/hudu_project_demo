import {Center, Flex, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {EmptyGeneral} from '~/assets/icons';
import {CustomButton, CustomText} from '~/components';
import {goBack} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontSize, scale} from '~/utils/style';

type Props = {
  text?: any;
  description?: any;
  flex?: number;
  inverted?: boolean;
  showText?: boolean;
  customIcon?: JSX.Element;
  showButton?: boolean;
  px?: number | string;
  buttonOnPress?: any;
  buttonTitle?: any;
};

export default function EmptyData(props: Props) {
  const {t} = useTranslation();

  const {
    text = t('messages.emptyDataTitle'),
    description = t('messages.emptyDataDescription'),
    flex = 1,
    inverted,
    showText = true,
    customIcon = <EmptyGeneral />,
    showButton,
    buttonOnPress = goBack,
    buttonTitle = t('common.back'),
    px,
  } = props;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Flex flex={flex} px={px}>
        <Center flex={flex} style={inverted ? styles.inverted : {}}>
          {customIcon}
          {showText ? (
            <VStack px="20px" space="4px">
              {text && (
                <CustomText
                  marginTop={28}
                  textAlign="center"
                  color={Colors.BLACK}
                  fontSize={fontSize.xMedium}>
                  {text}
                </CustomText>
              )}
              {description && (
                <CustomText
                  marginTop={12}
                  textAlign="center"
                  color={Colors.Rhino}
                  fontSize={fontSize.normal}
                  lineHeight={28}>
                  {description}
                </CustomText>
              )}
            </VStack>
          ) : null}
        </Center>
        {showButton && (
          <CustomButton title={buttonTitle} onPress={buttonOnPress} />
        )}
      </Flex>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  lottie: {height: scale(150), width: scale(150)},
  inverted: {transform: [{rotateX: '-180deg'}]},
});
