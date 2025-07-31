import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const ChevronRight2 = ({
  strokeColor = Colors.Ghost,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={9.811} height={18.121}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m1.061 17.061 8-8-8-8"
    />
  </Svg>
);
export default ChevronRight2;
