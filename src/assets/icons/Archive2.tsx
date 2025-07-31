import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Archive2 = ({
  strokeColor = Colors.WHITE_F,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={23.5} height={19.5}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m20.75 4.75-1 11.6a2.394 2.394 0 0 1-2.4 2.4H6.15a2.394 2.394 0 0 1-2.4-2.4l-1-11.6m13 0v2.2a.8.8 0 0 1-.8.8h-6.4a.8.8 0 0 1-.8-.8v-2.2m-5.4-4h18.8a1.6 1.6 0 0 1 1.6 1.6v.8a1.6 1.6 0 0 1-1.6 1.6H2.35a1.6 1.6 0 0 1-1.6-1.6v-.8a1.6 1.6 0 0 1 1.6-1.6Z"
    />
  </Svg>
);

export default Archive2;
