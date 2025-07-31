import {Circle, FormControl, HStack, VStack} from 'native-base';
import React, {useCallback, useImperativeHandle, useState} from 'react';
import {useController} from 'react-hook-form';
import {Keyboard, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {
  CustomTouchable,
  CustomText,
  CustomFlatList,
  CustomDivider,
  ActionSheetContainer,
} from '~/components';
import {useTranslation} from 'react-i18next';
import {Down2} from '~/assets/icons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

type Props = {
  name: any;
  data: any;
  label?: any;
  modalTitle?: any;
  labelColor?: string;
  iconColor?: string;
  placeholder?: string;
  backgroundColor?: string;
  valueKey?: string;
  titleKey?: string;
  isHorizontal?: boolean;
  disabled?: boolean;
  onChange?: any;
  outline?: boolean;
  nestedTitleKey?: string;
  nestedValueKey?: string;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  activeFieldOnChange?: boolean;
  handleCloseInComponent?: boolean;
  rightComponent?: JSX.Element;
  minHeight?: string | number;
  onLoadMore?: () => void;
};

export default React.forwardRef((props: Props, ref: any) => {
  const {t} = useTranslation();

  const {
    name,
    data,
    label,
    modalTitle,
    labelColor = Colors.Topaz,
    iconColor = Colors.DEEP_FIR,
    placeholder = t('common.select'),
    backgroundColor = Colors.SEARCH_BACKGROUND,
    valueKey,
    titleKey,
    isHorizontal,
    disabled,
    onChange,
    outline,
    nestedTitleKey,
    nestedValueKey,
    isLoading,
    isFetchingNextPage,
    activeFieldOnChange = true,
    handleCloseInComponent = true,
    rightComponent,
    minHeight,
    onLoadMore,
  } = props;

  const {field, fieldState} = useController({name});

  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    onClose() {
      onCloseModal();
    },
  }));

  const onCloseModal = () => {
    setVisible(false);
  };

  const openDropdown = (): void => {
    Keyboard.dismiss();
    setVisible(true);
  };

  const itemSeparatorComponent = useCallback(() => <CustomDivider />, []);

  const renderItem = useCallback(
    ({item}: {item: any}) => {
      const itemOnPress = () => {
        if (valueKey) {
          if (nestedValueKey) {
            if (
              item?.[valueKey]?.[nestedValueKey] !==
              field.value?.[valueKey]?.[nestedValueKey]
            ) {
              activeFieldOnChange && field.onChange?.(item);
              onChange?.(item);
            }
          } else {
            if (item?.[valueKey] !== field.value?.[valueKey]) {
              activeFieldOnChange && field.onChange?.(item);
              onChange?.(item);
            }
          }
        } else {
          if (item !== field.value) {
            activeFieldOnChange && field.onChange?.(item);
            onChange?.(item);
          }
        }
        handleCloseInComponent && setVisible(false);
      };

      const isActive = valueKey
        ? nestedValueKey
          ? item?.[valueKey]?.[nestedValueKey] ===
            field.value?.[valueKey]?.[nestedValueKey]
          : item?.[valueKey] === field.value?.[valueKey]
        : item === field.value;
      const textColor = isActive ? Colors.PRIMARY : Colors.BLACK;
      const color = isActive ? Colors.PRIMARY : Colors.Gainsboro;
      const backGroundColor = isActive ? Colors.WHITE_F : Colors.Gainsboro;

      return (
        <CustomTouchable onPress={itemOnPress}>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            space="8px">
            <CustomText color={textColor}>
              {titleKey
                ? nestedTitleKey
                  ? item?.[titleKey]?.[nestedTitleKey]
                  : item?.[titleKey]
                : item}
            </CustomText>
            {rightComponent ? (
              rightComponent
            ) : (
              <Circle
                size="22px"
                borderWidth="1"
                bg={backGroundColor}
                borderColor={color}>
                {isActive && <Circle size="14px" bg={color} />}
              </Circle>
            )}
          </HStack>
        </CustomTouchable>
      );
    },
    [field, titleKey, valueKey, onChange, nestedTitleKey, nestedValueKey],
  );

  return (
    <FormControl
      isInvalid={fieldState.error}
      w={{base: '100%'}}
      mb={isHorizontal ? -4 : undefined}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        onPress={openDropdown}>
        {label && outline && (
          <CustomText color={labelColor} marginBottom={8}>
            {label}
          </CustomText>
        )}
        <HStack
          borderRadius="sm"
          alignItems="center"
          borderWidth={outline ? '1' : undefined}
          borderColor={Colors.Ghost}
          pt="2"
          pb="3"
          px="4"
          bg={outline ? undefined : backgroundColor}>
          <VStack flex={1}>
            {label && !outline && (
              <CustomText marginBottom={16}>{label}</CustomText>
            )}
            <CustomText color={field.value ? Colors.BLACK : Colors.PLACEHOLDER}>
              {field.value
                ? titleKey
                  ? nestedTitleKey
                    ? field.value?.[titleKey]?.[nestedTitleKey]
                    : field.value?.[titleKey]
                  : field.value
                : placeholder}
            </CustomText>
          </VStack>
          <Down2 fillColor={iconColor} />
        </HStack>
      </TouchableOpacity>
      <ActionSheetContainer isVisible={visible} onClose={onCloseModal}>
        <VStack w="100%" minH={minHeight}>
          {modalTitle && (
            <VStack w="100%">
              <HStack px="16px" alignItems="center">
                <CustomText
                  flex={1}
                  fontFamily={fontFamily.medium}
                  fontSize={fontSize.xMedium}>
                  {modalTitle}
                </CustomText>
                <TouchableOpacity activeOpacity={0.7} onPress={onCloseModal}>
                  <AntDesignIcon name="close" size={24} />
                </TouchableOpacity>
              </HStack>
              <CustomDivider />
            </VStack>
          )}
          <CustomFlatList
            data={data ?? []}
            keyValue={nestedValueKey ?? valueKey}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainerStyle}
            itemSeparatorComponent={itemSeparatorComponent}
            onEndReached={onLoadMore}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            hasInternalLoading
          />
        </VStack>
      </ActionSheetContainer>
      <FormControl.ErrorMessage
        fontSize={fontSize.small}
        fontFamily={fontFamily.regular}
        mt="0">
        {fieldState?.error?.message}
      </FormControl.ErrorMessage>
      {isHorizontal && !fieldState.error && (
        <FormControl.HelperText
          fontSize={fontSize.small}
          fontFamily={fontFamily.regular}
          mt="0">
          {''}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
});

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
  contentContainerStyle: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 116,
  },
});
