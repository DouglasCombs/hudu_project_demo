import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Academy = ({
  strokeColor = Colors.DEEP_FIR,
  ...props
}: {
  strokeColor?: string;
} & SvgProps) => (
  <Svg {...props} width={22} height={17.5}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M6.75 8.75h8m-8 3h4m-4-6h8m-11.6-5h15.2a2.4 2.4 0 0 1 2.4 2.4v11.2a2.4 2.4 0 0 1-2.4 2.4H3.15a2.4 2.4 0 0 1-2.4-2.4V3.15a2.4 2.4 0 0 1 2.4-2.4Z"
    />
  </Svg>
);

export default Academy;
