import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const ChevronRightCircle2 = ({
  fillColor = Colors.WHITE_F,
  strokeColor = Colors.BLACK,
  ...props
}: {fillColor?: string; strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={18} height={18}>
    <Circle cx={9} cy={9} r={9} fill={fillColor} data-name="Ellipse 9" />
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7 13 4-4-4-4"
    />
  </Svg>
);

export default ChevronRightCircle2;
