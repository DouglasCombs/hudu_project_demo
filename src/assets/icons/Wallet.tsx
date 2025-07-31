import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Wallet = ({
  strokeColor = Colors.BLACK,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={19.5} height={19.5}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M.75 6.25v-3m0 0a1.5 1.5 0 0 1 1.5-1.5l11.99-1a2.442 2.442 0 0 1 2.51 2.38v1.62H2.25a1.5 1.5 0 0 1-1.5-1.5Zm18 5.5h-6.286a1.659 1.659 0 0 0-1.714 1.6v2.8a1.66 1.66 0 0 0 1.714 1.6h6.286m-5-3h.01m-11.81-7h14.4a2.407 2.407 0 0 1 2.4 2.4v9.2a2.407 2.407 0 0 1-2.4 2.4H3.15a2.407 2.407 0 0 1-2.4-2.4V5.95a1.2 1.2 0 0 1 1.2-1.2Z"
    />
  </Svg>
);
export default Wallet;
