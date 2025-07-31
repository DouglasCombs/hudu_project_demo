import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Locate = ({
  strokeColor = Colors.WHITE_F,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={21} height={21}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M.5 10.5h4m12 0h4m-10 10v-4m0-12v-4m8 10a8 8 0 1 1-8-8 8 8 0 0 1 8 8Zm-5 0a3 3 0 1 1-3-3 3 3 0 0 1 3 3Z"
    />
  </Svg>
);

export default Locate;
