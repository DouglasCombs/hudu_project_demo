import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Info = ({
  fillColor = Colors.WHITE_F,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={21.5} height={21.5}>
    <Path
      fill="none"
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M10.75 6.75h.008m-.008 8v-5m10 1a10 10 0 1 1-10-10 10 10 0 0 1 10 10Z"
    />
  </Svg>
);

export default Info;
