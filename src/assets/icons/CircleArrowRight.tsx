import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const CircleArrowRight = ({
  fillColor = Colors.PRIMARY,
  strokeColor = Colors.WHITE_F,
  ...props
}: {
  fillColor?: string;
  strokeColor?: string;
} & SvgProps) => (
  <Svg {...props} width={32} height={32}>
    <G data-name="Group 24379" transform="translate(-311 -602)">
      <Rect
        width={32}
        height={32}
        fill={fillColor}
        data-name="Rectangle 6129"
        rx={16}
        transform="translate(311 602)"
      />
      <Path
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="m329 622 4-4m0 0-4-4m4 4h-12"
      />
    </G>
  </Svg>
);
export default CircleArrowRight;
