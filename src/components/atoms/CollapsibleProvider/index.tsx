import React, {useEffect} from 'react';
import {LayoutAnimation, View, ViewStyle} from 'react-native';

const CollapsibleProvider = ({
  visible,
  children,
  style,
}: {
  visible: boolean;
  children: any;
  style?: ViewStyle | ViewStyle[];
}) => {
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [visible]);

  return <View style={style}>{children}</View>;
};

export default CollapsibleProvider;
