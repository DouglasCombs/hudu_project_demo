import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Plus = ({
  fillColor = Colors.PRIMARY,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={32} height={32}>
    <Path
      fill={fillColor}
      d="M16 32A16 16 0 1 0 0 16a16 16 0 0 0 16 16Zm-1.5-10.5v-4h-4a1.5 1.5 0 1 1 0-3h4v-4a1.5 1.5 0 1 1 3 0v4h4a1.5 1.5 0 1 1 0 3h-4v4a1.5 1.5 0 1 1-3 0Z"
    />
  </Svg>
);
export default Plus;
