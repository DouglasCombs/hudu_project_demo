import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Share = ({
  fillColor = Colors.WHITE_F,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={19.5} height={19.811}>
    <Path
      fill="none"
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m12.75 4.061-3-3m0 0-3 3m3-3v14m4-7h2.6a2.4 2.4 0 0 1 2.4 2.4v6.2a2.4 2.4 0 0 1-2.4 2.4H3.15a2.4 2.4 0 0 1-2.4-2.4v-6.2a2.4 2.4 0 0 1 2.4-2.4h2.6"
    />
  </Svg>
);
export default Share;
