import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const WithDraw = ({
  strokeColor = Colors.BLACK,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={23.5} height={17.5}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.75 11.75h5m-5-3h5m-5-3h5m3 3 2 2 4-4m-15.6-6h17.2a2.4 2.4 0 0 1 2.4 2.4v11.2a2.4 2.4 0 0 1-2.4 2.4H3.15a2.4 2.4 0 0 1-2.4-2.4V3.15a2.4 2.4 0 0 1 2.4-2.4Z"
    />
  </Svg>
);
export default WithDraw;
