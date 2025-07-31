import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';
import {View} from 'native-base';
import {Colors} from '~/styles';
import {
  fontFamily as font_family,
  fontSize as font_size,
  isIos,
} from '~/utils/style';
import ViewMoreText from 'react-native-view-more-text';
import {isAndroid} from '~/utils/helper';
import {YourMindParser} from '~/components';

const CustomCollapseText = ({
  text = '',
  textStyle,
  numberOfLines = 2,
  flex = 1,
  color = Colors.BLACK_3,
  fontSize = font_size.small,
  fontFamily = font_family.regular,
  px,
  linkColor = Colors.GRAY_7,
  linkStyle = styles.link,
}: {
  text?: string;
  textStyle?: any;
  numberOfLines?: number;
  flex?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  px?: number | string;
  linkColor?: string;
  linkStyle?: TextStyle;
}) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isAndroid) {
      setTimeout(() => {
        setShouldRender(true);
      }, 10);
    }
  }, []);

  const renderViewMore = (onPress: any) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={[linkStyle, {color: linkColor, fontSize: fontSize}]}>
          See more
        </Text>
      </TouchableOpacity>
    );
  };

  const renderViewLess = (onPress: any) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={[linkStyle, {color: linkColor, fontSize: fontSize}]}>
          See less
        </Text>
      </TouchableOpacity>
    );
  };

  if ((isAndroid && shouldRender) || isIos) {
    return (
      <View flex={flex} px={px}>
        <YourMindParser
          {...{text, fontSize, fontFamily, maxLine: numberOfLines}}
          collapsible
        />
        {/* <ViewMoreText
          numberOfLines={numberOfLines}
          renderViewMore={renderViewMore}
          renderViewLess={renderViewLess}
          textStyle={textStyle}>

        <YourMindParser
          {...{text, fontSize, fontFamily, maxLine: numberOfLines}}
        />
        </ViewMoreText> */}
      </View>
    );
  }

  return null;
};

export default CustomCollapseText;

const styles = StyleSheet.create({
  link: {
    fontFamily: font_family.regular,
    marginTop: 4,
  },
});
