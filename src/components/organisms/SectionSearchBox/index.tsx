import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HStack, Box} from 'native-base';
import {fontFamily, fontSize} from '~/utils/style';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';
import {SearchIcon} from '~/assets/icons';
import {CustomText} from '~/components';

const SectionSearchBox = ({
  my,
  mx,
  mt,
  mb,
  flex,
  placeholder = 'Search',
  onPress,
  backgroundColor = Colors.SEARCH_BACKGROUND,
}: {
  my?: string | number;
  mx?: string | number;
  mt?: string | number;
  mb?: string | number;
  flex?: number;
  onPress?: () => void;
  placeholder?: string;
  backgroundColor?: string;
}) => {
  const onPressHandler = () => {
    onPress ? onPress() : navigate('Search');
  };

  return (
    <Box
      my={my}
      mt={mt}
      mb={mb}
      mx={mx}
      flex={flex}
      height="36px"
      bg={backgroundColor}
      borderRadius="sm">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressHandler}
        style={styles.touchable}>
        <HStack
          borderRadius="sm"
          flex={1}
          alignItems="center"
          px="2"
          space="2"
          bg={backgroundColor}>
          <SearchIcon />
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.Topaz}
            fontFamily={fontFamily.regular}>
            {placeholder}
          </CustomText>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default SectionSearchBox;

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    flex: 1,
  },
});
