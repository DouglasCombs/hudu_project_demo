import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Email = ({
  fillColor = Colors.PRIMARY,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={21.5} height={17.5}>
    <Path
      fill="none"
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3.75 3.81 6.87 5.89a.21.21 0 0 0 .26 0l6.87-5.89M1.95.75h17.6a1.2 1.2 0 0 1 1.2 1.2v12.4a2.407 2.407 0 0 1-2.4 2.4H3.15a2.407 2.407 0 0 1-2.4-2.4V1.95a1.2 1.2 0 0 1 1.2-1.2Z"
    />
  </Svg>
);
export default Email;
