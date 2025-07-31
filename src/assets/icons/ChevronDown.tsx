import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const ChevronDown = ({
  fillColor = Colors.PRIMARY,
  width = 10.121,
  height = 5.811,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={width} height={height}>
    <Path
      fill="none"
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m1.061 1.061 4 4 4-4"
    />
  </Svg>
);

export default ChevronDown;
