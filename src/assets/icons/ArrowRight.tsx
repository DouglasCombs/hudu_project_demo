import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const ArrowRight = ({
  strokeColor = Colors.WHITE_F,
  ...props
}: {
  strokeColor?: string;
} & SvgProps) => (
  <Svg {...props} width={13.811} height={10.121}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m8.75 9.061 4-4m0 0-4-4m4 4h-12"
    />
  </Svg>
);

export default ArrowRight;
