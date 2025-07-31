import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const PlusOutline = ({
  fillColor = Colors.PRIMARY,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={32} height={32}>
    <Path
      fill={fillColor}
      d="M15 22v-5h-5a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2h-5v5a1 1 0 0 1-2 0Zm17-6A16 16 0 1 1 16 0a16 16 0 0 1 16 16ZM16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2Z"
    />
  </Svg>
);

export default PlusOutline;
