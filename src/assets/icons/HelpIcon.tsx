import {Center} from 'native-base';
import * as React from 'react';
import {View} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';
import {Colors} from '~/styles';

export default function HelpIcon({badge}: {badge?: boolean}) {
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
      <Svg width={18.001 * 1.2} height={17 * 1.2} viewBox="0 0 18.001 17">
        <G data-name="Group 24868">
          <Path
            data-name="Path 31605"
            d="M10.1 1.694c-4.963 0-9 3.54-9 7.891s4.037 7.891 9 7.891a10.08 10.08 0 002.876-.42L15 18.558a.683.683 0 00.709.067.659.659 0 00.376-.6v-2.547A7.483 7.483 0 0019.1 9.585c0-4.351-4.037-7.891-9-7.891zm5.113 13.092a.532.532 0 00-.219.43v2l-1.586-1.179a.548.548 0 00-.5-.081 8.981 8.981 0 01-2.807.451c-4.363 0-7.913-3.059-7.913-6.821S5.737 2.764 10.1 2.764s7.913 3.059 7.913 6.821a6.472 6.472 0 01-2.8 5.201z"
            transform="translate(-1.1 -1.694)"
          />
          <Path
            data-name="Path 31606"
            d="M14.983 9.157a2.346 2.346 0 00-2.864 2.288.544.544 0 101.087 0 1.243 1.243 0 01.134-.565 1.256 1.256 0 011.412-.66 1.225 1.225 0 01.933.924 1.259 1.259 0 01-.653 1.421 1.992 1.992 0 00-1.113 1.77.544.544 0 001.087 0 .91.91 0 01.52-.8 2.359 2.359 0 001.22-2.629 2.318 2.318 0 00-1.763-1.749z"
            transform="translate(-1.1 -1.694) translate(-4.363 -3.043)"
          />
          <Path
            data-name="Path 31607"
            d="M16.03 20.019a.562.562 0 00-.773 0 .491.491 0 00-.115.175.48.48 0 00-.042.205.509.509 0 00.042.211.491.491 0 00.115.175.554.554 0 00.773 0 .569.569 0 00.157-.387.5.5 0 00-.042-.205.491.491 0 00-.115-.174z"
            transform="translate(-1.1 -1.694) translate(-5.543 -7.386)"
          />
        </G>
      </Svg>
    </View>
  );
}
