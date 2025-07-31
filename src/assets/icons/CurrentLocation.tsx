import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const CurrentLocation = ({
  strokeColor = Colors.PRIMARY,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={15} height={15}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M.5 7.5h2.8m8.4 0h2.8m-7 7v-2.8m0-8.4V.5m5.6 7a5.6 5.6 0 1 1-5.6-5.6 5.6 5.6 0 0 1 5.6 5.6Zm-3.5 0a2.1 2.1 0 1 1-2.1-2.1 2.1 2.1 0 0 1 2.1 2.1Z"
    />
  </Svg>
);
export default CurrentLocation;
