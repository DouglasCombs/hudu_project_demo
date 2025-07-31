import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Menu = ({
  strokeColor = Colors.BLACK,
  size = 24,
}: {
  strokeColor?: string;
  size?: number;
}) => (
  <Svg width={size} height={size}>
    <G fill="none" data-name="Group 24525">
      <Path d="M0 0h24v24H0z" data-name="Rectangle 6144" />
      <Path
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M3 12h18M3 7h18M3 17h18"
      />
    </G>
  </Svg>
);

export default Menu;
