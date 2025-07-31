import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

const ArchiveOutline = ({
  strokeColor = Colors.Topaz,
}: {
  strokeColor?: string;
}) => (
  <Svg width={13.5} height={21.51}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M6.75 15.775a1.368 1.368 0 0 0-.588.208 7.187 7.187 0 0 0-.835.56c-.614.464-1.317 1.085-1.983 1.706Q2.083 19.43.889 20.679l-.04.041-.013.014A.05.05 0 0 1 .75 20.7V3.188A2.428 2.428 0 0 1 3.18.75h7.14a2.428 2.428 0 0 1 2.43 2.438V20.7a.05.05 0 0 1-.085.034l-.015-.014-.04-.041q-1.2-1.247-2.455-2.43c-.666-.621-1.37-1.242-1.983-1.707a7.187 7.187 0 0 0-.835-.56 1.377 1.377 0 0 0-.587-.207Z"
    />
  </Svg>
);

export default ArchiveOutline;
