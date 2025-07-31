import {Center} from 'native-base';
import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import {Colors} from '~/styles';

export default function ChatIcon({badge}: {badge?: boolean}) {
  return (
    <View>
      {badge && (
        <Center
          size="12px"
          zIndex={4}
          position="absolute"
          rounded="full"
          bg={Colors.FINISHED}
          right="-3"
          top="-3"
        />
      )}
      <Svg width={24} height={24}>
        <G fill="none" data-name="Group 24524">
          <Path d="M0 0h24v24H0z" data-name="Rectangle 6143" />
          <Path
            stroke="#000"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M19 16.575h-2.525a.988.988 0 0 0-.775.377l-2.925 3.671a1 1 0 0 1-1.563 0l-2.925-3.671a.988.988 0 0 0-.775-.377H5a3 3 0 0 1-3-3.017V6.517A3 3 0 0 1 5 3.5h14a3 3 0 0 1 3 3.017v7.04a3 3 0 0 1-3 3.018Z"
          />
        </G>
      </Svg>
    </View>
  );
}
