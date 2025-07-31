import * as React from 'react';
import Svg, {SvgProps, G, Circle, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const ArrowUp = ({
  fillColor = Colors.SEARCH_BACKGROUND,
  strokeColor = Colors.DEEP_FIR,
  ...props
}: {fillColor?: string; strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={32} height={32}>
    <G data-name="Group 24042" transform="translate(-303 -709)">
      <Circle
        cx={16}
        cy={16}
        r={16}
        fill={fillColor}
        data-name="Ellipse 55"
        transform="translate(303 709)"
      />
      <Path
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="m315 723 4-4m0 0 4 4m-4-4v12"
      />
    </G>
  </Svg>
);

export default ArrowUp;
