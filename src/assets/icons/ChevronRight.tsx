import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const ChevronRight = ({
  strokeColor = Colors.DEEP_FIR,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={5.811} height={10.121}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m1.061 9.061 4-4-4-4"
    />
  </Svg>
);

export default ChevronRight;
