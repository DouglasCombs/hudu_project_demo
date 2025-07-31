import * as React from 'react';
import Svg, {Circle, G, Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const DateIcon = ({
  fillColor = Colors.SEARCH_BACKGROUND,
  strokeColor = Colors.PRIMARY,
  ...props
}: {
  fillColor?: string;
  strokeColor?: string;
} & SvgProps) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
    <G data-name="Group 24298" transform="translate(-22 -601)">
      <Circle
        data-name="Ellipse 1"
        cx={14}
        cy={14}
        r={14}
        transform="translate(22 601)"
        fill={fillColor}
      />
      <Path
        d="M36 617.333h3.889M36 612.667h3.889M30.867 608h10.266A1.867 1.867 0 0143 609.867v10.266A1.867 1.867 0 0141.133 622H30.867A1.867 1.867 0 0129 620.133v-10.266A1.867 1.867 0 0130.867 608zm2.8 9.333a.778.778 0 11-.778-.778.778.778 0 01.778.778zm0-4.667a.778.778 0 11-.778-.778.778.778 0 01.778.779z"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </G>
  </Svg>
);
export default DateIcon;
