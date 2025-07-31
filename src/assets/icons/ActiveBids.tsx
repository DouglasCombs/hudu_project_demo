import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function ActiveBids({
  strokeColor = Colors.PRIMARY,
}: {
  strokeColor?: string;
}) {
  return (
    <Svg width={20.121} height={19.811} viewBox="0 0 20.121 19.811">
      <Path
        d="M16.061 1.061l3 3m-18 0l3-3m14 10a8 8 0 11-8-8 8 8 0 018 8z"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
