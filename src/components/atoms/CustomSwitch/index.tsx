import {HStack, VStack} from 'native-base';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import {trigger} from 'react-native-haptic-feedback';
import {Colors} from '~/styles';
import CustomText from '../CustomText';
import {fontFamily, fontSize} from '~/utils/style';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const hapticTriggerType = Platform.select({
  ios: 'selection',
  android: 'impactMedium',
});

interface Props {
  name: string;
  vibrate?: boolean;
  disabled?: boolean;
  title?: any;
  description?: any;
}
export default function CustomSwitch({
  name,
  vibrate,
  disabled,
  title,
  description,
}: Props) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field: {value, onChange}}) => (
        <HStack space="24px">
          <VStack space="4px" flex={1}>
            {title && (
              <CustomText
                fontFamily={fontFamily.medium}
                fontSize={fontSize.xNormal}>
                {title}
              </CustomText>
            )}
            {description && (
              <CustomText color={Colors.Topaz} fontSize={fontSize.small}>
                {description}
              </CustomText>
            )}
          </VStack>
          <Switch
            value={value}
            vibrate={vibrate}
            onChange={onChange}
            disabled={disabled}
          />
        </HStack>
      )}
    />
  );
}

type SwitchProps = Partial<Props> & {
  value: boolean;
  disabled?: boolean;
  vibrate?: boolean;
  onChange: (value: boolean) => void;
};

function Switch({value, vibrate, disabled, onChange}: SwitchProps) {
  const onChangeHandler = () => {
    onChange?.(!value);
    if (!value && vibrate) {
      trigger(hapticTriggerType, hapticOptions);
    }
    LayoutAnimation.easeInEaseOut();
  };

  const alignSelf = value ? 'flex-end' : 'flex-start';
  const backgroundColor = value ? Colors.LimeGreen : Colors.Gainsboro;
  const toggleColor = value ? Colors.WHITE_F : Colors.SEARCH_BACKGROUND;

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={1}
      style={[styles.container, {backgroundColor}]}
      onPress={onChangeHandler}>
      <View
        style={[styles.toggleButton, {alignSelf, backgroundColor: toggleColor}]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 24,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 2,
    width: 48,
  },
  toggleButton: {
    alignItems: 'center',
    borderRadius: 11,
    height: 22,
    justifyContent: 'center',
    width: 22,
  },
});
