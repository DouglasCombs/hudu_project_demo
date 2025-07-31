import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const TimerCircle = ({
  strokeColor = Colors.BLACK,
  fillColor = Colors.SEARCH_BACKGROUND,
  ...props
}: {strokeColor?: string; fillColor?: string} & SvgProps) => (
  <Svg {...props} width={28} height={28}>
    <Circle cx={14} cy={14} r={14} fill={fillColor} data-name="Ellipse 1" />
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M14 9.8v4.091a.14.14 0 0 0 .106.136l2.694.673M21 14a7 7 0 1 1-7-7 7 7 0 0 1 7 7Z"
    />
  </Svg>
);
export default TimerCircle;
