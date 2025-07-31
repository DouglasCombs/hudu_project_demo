import React, {memo, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

type AnimationProviderProps = {
  visible: boolean;
  visibleChildren: React.ReactNode;
  inVisibleChildren?: React.ReactNode;
  animationType?: 'opacity' | 'transform';
  duration?: number;
};

const AnimationProvider: React.FC<AnimationProviderProps> = ({
  visible,
  visibleChildren,
  inVisibleChildren,
  animationType = 'transform',
  duration = 150,
}) => {
  const animationValue = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: visible ? 1 : 0,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const style =
    animationType === 'transform'
      ? {
          transform: [
            {
              translateY: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [visible ? 48 : 0, visible ? 0 : 48],
              }),
            },
          ],
        }
      : {
          opacity: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        };

  return (
    <Animated.View style={style}>
      {visible ? visibleChildren : inVisibleChildren}
    </Animated.View>
  );
};

export default memo(AnimationProvider);
