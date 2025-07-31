import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Frame = ({
  strokeColor = Colors.WHITE,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={21.5} height={21.5}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M4.75 20.75h-1.6a2.4 2.4 0 0 1-2.4-2.4v-1.6m16 4h1.6a2.4 2.4 0 0 0 2.4-2.4v-1.6m0-12v-1.6a2.4 2.4 0 0 0-2.4-2.4h-1.6m-12 0h-1.6a2.4 2.4 0 0 0-2.4 2.4v1.6"
    />
  </Svg>
);

export default Frame;
