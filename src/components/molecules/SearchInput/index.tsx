import debounce from 'lodash.debounce';
import {HStack} from 'native-base';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchIcon} from '~/assets/icons';
import CustomTouchable from '~/components/atoms/CustomTouchable';
import {Colors} from '~/styles';
import {
  autoCorrect,
  keyboardType,
  returnKeyType,
  spellCheck,
} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';

interface Props extends TextInputProps {
  onChange?: () => void;
  onClear?: () => void;
  onClose?: () => void;
  placeholder?: string;
  flex?: number;
  backgroundColor?: string;
  height?: string | number;
  mx?: string | number;
  placeholderTextColor?: string;
  color?: string;
  iconColor?: string;
  numberOfLines?: number;
}

const SearchInput = (props: Props) => {
  const {t} = useTranslation();

  const {
    onChange,
    onClear,
    onClose,
    placeholder: placeholderProp = t('common.search'),
    flex,
    backgroundColor = Colors.SEARCH_BACKGROUND,
    height = '36px',
    placeholderTextColor = Colors.WHITE_F,
    color = Colors.WHITE_F,
    iconColor = Colors.WHITE_F,
    numberOfLines = 1,
    autoFocus,
    mx = '4',
    ...restProps
  } = props;

  const [userQuery, setUserQuery] = useState('');

  const updateQueryRef = useRef<(text: string) => void>(() => {});
  useEffect(() => {
    updateQueryRef.current = debounce(onChange, 500);
  }, [onChange]);

  const onChangeText = useCallback(
    (text: string) => {
      setUserQuery(text);
      updateQueryRef.current(text?.toLowerCase());
    },
    [setUserQuery],
  );

  useEffect(() => {
    return updateQueryRef.current.cancel;
  }, []);

  const onClearHandler = () => {
    setUserQuery('');
    onClear?.();
  };

  const onCloseHandler = () => {
    setUserQuery('');
    onClose?.();
  };

  const placeholder = useMemo(() => placeholderProp, [placeholderProp]);

  return (
    <HStack
      flex={flex}
      alignItems="center"
      borderRadius="sm"
      h={height}
      mx={mx}
      px="2"
      space="8px"
      bg={backgroundColor}>
      <SearchIcon fillColor={color} />
      <TextInput
        autoCorrect={autoCorrect}
        spellCheck={spellCheck}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        autoCapitalize="sentences"
        value={userQuery}
        numberOfLines={numberOfLines}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={[styles.input, {color}]}
        autoFocus={autoFocus}
        {...restProps}
      />
      {onClear && userQuery?.length > 0 && (
        <CustomTouchable onPress={onClearHandler}>
          <MaterialCommunityIcons
            name={'close-circle'}
            color={iconColor}
            size={18}
          />
        </CustomTouchable>
      )}
      {onClose && (
        <CustomTouchable onPress={onCloseHandler}>
          <MaterialCommunityIcons
            name={'close-circle'}
            color={iconColor}
            size={18}
          />
        </CustomTouchable>
      )}
    </HStack>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  input: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.xNormal,
    flex: 1,
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
  },
});
