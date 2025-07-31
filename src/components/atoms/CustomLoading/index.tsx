import React from 'react';
import {Colors} from '~/styles';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Spinner} from 'native-base';
import {height} from '~/utils/style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const CustomLoading = ({
  style = styles.loading,
  size = 'lg',
  color = Colors.PRIMARY,
}: {
  style?: ViewStyle;
  size?: string | number;
  color?: string;
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[style, {top: -insets.top}]}>
      <Spinner color={color} size={size} />
    </View>
  );
};

export default CustomLoading;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    zIndex: 999,
    width: '100%',
    height: height,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.SEMI_TRANSPARENT,
  },
});
