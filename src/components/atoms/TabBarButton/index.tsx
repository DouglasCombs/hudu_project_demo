import {Center, HStack} from 'native-base';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const TabBarButton = (props: any) => {
  const {onPress, children, style = styles.container, text, isFocused} = props;

  const textColor = isFocused ? Colors.PRIMARY : Colors.Topaz;

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={style}>
      <View style={styles.button}>
        {children}
        <Text style={[styles.text, {color: textColor}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TabBarButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: fontSize.xTiny,
    fontFamily: fontFamily.medium,
    // marginTop: 10,
  },
  label: {fontSize: fontSize.normal},
  button: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    // backgroundColor: 'lightblue',
    height: 41,
  },
});
