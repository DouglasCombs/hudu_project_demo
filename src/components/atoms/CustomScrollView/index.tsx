import React, {forwardRef} from 'react';
import {ScrollView, StyleSheet, ViewStyle} from 'react-native';

const CustomScrollView = forwardRef(
  (
    props: {
      contentContainerStyle?: any;
      style?: ViewStyle | ViewStyle[];
      horizontal?: boolean;
      pagingEnabled?: boolean;
      children?: any;
    },
    ref,
  ) => {
    const {
      contentContainerStyle,
      style,
      horizontal,
      pagingEnabled,
      children,
      ...rest
    } = props;

    return (
      <ScrollView
        pagingEnabled={pagingEnabled}
        horizontal={horizontal}
        ref={ref}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          contentContainerStyle ?? {
            ...(!horizontal && styles.contentContainerStyle),
          }
        }
        style={style}
        {...rest}>
        {children}
      </ScrollView>
    );
  },
);

export default CustomScrollView;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
