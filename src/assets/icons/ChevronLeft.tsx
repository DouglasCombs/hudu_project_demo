import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const ChevronLeft = ({
  strokeColor = Colors.WHITE_F,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={9.811} height={18.121}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.75 17.061-8-8 8-8"
    />
  </Svg>
);

export default ChevronLeft;
