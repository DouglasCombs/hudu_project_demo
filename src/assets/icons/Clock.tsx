import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Clock = ({
  strokeColor = Colors.SEMI_TRANSPARENT,
}: {
  strokeColor?: string;
}) => (
  <Svg width={15.414} height={15.207}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="m12.374.707 2.333 2.333m-14 0L3.04.707m10.889 7.778a6.331 6.331 0 0 1-3.839 5.749 5.832 5.832 0 0 1-2.383.473 6.222 6.222 0 1 1 6.222-6.222Z"
    />
  </Svg>
);

export default Clock;
