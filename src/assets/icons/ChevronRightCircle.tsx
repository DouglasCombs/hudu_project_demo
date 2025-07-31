import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const ChevronRightCircle = ({
  fillColor = Colors.MidnightExpress,
  strokeColor = Colors.WHITE,
  ...props
}: {fillColor?: string; strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={24} height={24}>
    <Circle cx={12} cy={12} r={12} fill={fillColor} data-name="Ellipse 9" />
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m10 16 4-4-4-4"
    />
  </Svg>
);

export default ChevronRightCircle;
