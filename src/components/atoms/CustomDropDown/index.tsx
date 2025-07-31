import {Circle, HStack, VStack} from 'native-base';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import {
  ActionSheetContainer,
  CustomDivider,
  CustomFlatList,
  CustomLoading,
  CustomText,
} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {ChevronDown, ChevronUp} from '~/assets/icons';

type Props = {
  data: any;
  loading?: boolean;
  titleKey?: string;
  valueKey?: string;
  value: any;
  onChange?: any;
  title?: string;
  disabled?: boolean;
  flex?: number;
  titleFlex?: number;
  width?: any;
  alignItems?: ViewStyle['alignItems'];
  justifyContent?: ViewStyle['justifyContent'];
  modalTitle?: any;
  showChevronIcon?: boolean;
  titleColor?: string;
  showSelectedValue?: boolean;
  backgroundColor?: string;
  titleFontSize?: number;
  underline?: boolean;
  chevronColor?: string;
  showButton?: boolean;
};

function CustomDropDown(
  {
    data,
    loading,
    titleKey = 'title',
    valueKey = 'value',
    titleFontSize = fontSize.small,
    value,
    onChange,
    title = 'Select',
    disabled,
    flex,
    titleFlex,
    width,
    alignItems,
    justifyContent,
    modalTitle,
    showChevronIcon,
    titleColor = Colors.BLACK,
    showSelectedValue,
    backgroundColor,
    underline,
    chevronColor = Colors.PRIMARY,
    showButton = true,
  }: Props,
  ref: any,
) {
  const [visible, setVisible] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    open: () => {
      openModal();
    },
    close: () => {
      closeModal();
    },
  }));

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const renderItem = useCallback(
    ({item}: {item: any}) => {
      const itemOnPress = () => {
        if (item?.[valueKey] !== value?.[valueKey]) {
          onChange?.(item);
        }
        setVisible(false);
      };

      const isActive = item?.[valueKey] === value?.[valueKey];
      const textColor = isActive ? Colors.PRIMARY : Colors.BLACK;
      const color = isActive ? Colors.PRIMARY : Colors.Gainsboro;
      const backGroundColor = isActive ? Colors.WHITE_F : Colors.Gainsboro;
      const disabledItem = item?.disabled;
      return (
        <TouchableOpacity
          disabled={disabledItem}
          activeOpacity={0.7}
          onPress={itemOnPress}>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            space="8px">
            <CustomText color={textColor}>{item?.[titleKey]}</CustomText>
            <Circle
              size="22px"
              borderWidth="1"
              bg={backGroundColor}
              borderColor={color}>
              {isActive && <Circle size="14px" bg={color} />}
            </Circle>
          </HStack>
        </TouchableOpacity>
      );
    },
    [value, titleKey, valueKey, onChange],
  );

  const itemSeparatorComponent = useCallback(() => <CustomDivider />, []);

  return (
    <>
      {showButton && (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              flex,
              width,
              alignItems,
              justifyContent,
              backgroundColor,
            }}
            disabled={disabled}
            onPress={openModal}>
            <HStack space="1" alignItems="center">
              <CustomText
                flex={titleFlex}
                color={titleColor}
                fontsize={titleFontSize}
                fontFamily={fontFamily.medium}>
                {showSelectedValue ? value?.[titleKey] : title}
              </CustomText>
              {showChevronIcon && (
                <>
                  {visible ? (
                    <ChevronUp fillColor={chevronColor} />
                  ) : (
                    <ChevronDown fillColor={chevronColor} />
                  )}
                </>
              )}
            </HStack>
          </TouchableOpacity>
          {underline && <CustomDivider />}
        </>
      )}
      {visible && (
        <ActionSheetContainer isVisible={visible} onClose={closeModal}>
          <VStack w="100%">
            {modalTitle && (
              <VStack w="100%">
                <HStack px="16px" alignItems="center">
                  <CustomText
                    flex={1}
                    fontFamily={fontFamily.medium}
                    fontSize={fontSize.xMedium}>
                    {modalTitle}
                  </CustomText>
                  <TouchableOpacity activeOpacity={0.7} onPress={closeModal}>
                    <AntDesignIcon name="close" size={24} />
                  </TouchableOpacity>
                </HStack>
                <CustomDivider />
              </VStack>
            )}
            <CustomFlatList
              data={data ?? []}
              keyValue={valueKey}
              isLoading={loading}
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainerStyle}
              itemSeparatorComponent={itemSeparatorComponent}
            />
            {loading && <CustomLoading />}
          </VStack>
        </ActionSheetContainer>
      )}
    </>
  );
}

export default forwardRef(CustomDropDown);

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
