import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Pin = ({
  strokeColor = Colors.WHITE_F,
  fillColor = 'none',
  ...props
}: {strokeColor?: string; fillColor?: string} & SvgProps) => (
  <Svg {...props} width={21.788} height={21.792}>
    <Path
      fill={fillColor}
      stroke={strokeColor}
      d="M13.831.603a.307.307 0 0 0-.526.218v1.3a1.8 1.8 0 0 1-.526 1.275L9.664 6.523a1.789 1.789 0 0 1-1.27.528H4.323a.309.309 0 0 0-.217.528l10.063 10.1a.307.307 0 0 0 .526-.218V13.37a1.8 1.8 0 0 1 .526-1.275l3.116-3.127a1.79 1.79 0 0 1 1.27-.528h1.292c.41 0 .507-.237.217-.528l-5.895-5.915L14.168.94ZM8.099 12.445l-5.3 5.322-1.515 2.739 2.73-1.52 5.3-5.322Z"
    />
  </Svg>
);
export default Pin;
