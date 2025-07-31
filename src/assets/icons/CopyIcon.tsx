import * as React from 'react';
import Svg, {Path, SvgProps, G, Circle} from 'react-native-svg';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';

const CopyIcon = ({
  size = scale(24),
  fillColor = Colors.WHITE,
  strokeColor = Colors.PRIMARY,
  otherColor = Colors.BLACK_3,
  ...props
}: {
  size?: number;
  fillColor?: string;
  strokeColor?: string;
  otherColor?: string;
} & SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 28 28"
    {...props}>
    <G data-name="Group 24300" transform="translate(-24 -647)">
      <Circle
        data-name="Ellipse 1"
        cx={14}
        cy={14}
        r={14}
        transform="translate(24 647)"
        fill="#f5f5f5"
      />
      <Path
        d="M33.333 663.333h-.466A1.862 1.862 0 0131 661.467v-5.6A1.862 1.862 0 0132.867 654h5.6a1.862 1.862 0 011.867 1.867v.467m-2.8 2.333h5.6A1.867 1.867 0 0145 660.533v5.6A1.867 1.867 0 0143.133 668h-5.6a1.867 1.867 0 01-1.867-1.867v-5.6a1.867 1.867 0 011.867-1.866z"
        fill="none"
        stroke="#3272dd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </G>
  </Svg>
);
export default CopyIcon;
