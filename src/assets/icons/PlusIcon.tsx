import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function PlusIcon({
  strokeColor = Colors.WHITE_F,
  w = 24,
  h = 24,
}: {
  strokeColor?: string;
  w?: number;
  h?: number;
}) {
  return (
    <Svg width={w} height={h}>
      <Path
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={4}
        d="M2 12h20M12 22V2"
      />
    </Svg>
  );
}
