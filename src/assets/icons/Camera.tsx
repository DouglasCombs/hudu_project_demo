import * as React from 'react';
import Svg, {SvgProps, G, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Camera = ({
  strokeColor = Colors.PRIMARY,
  ...props
}: {strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={26} height={21.5}>
    <G
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      data-name="Icon feather-camera">
      <Path
        d="M25.25 18.528a2.225 2.225 0 0 1-2.227 2.222H2.977A2.225 2.225 0 0 1 .75 18.528V6.306a2.225 2.225 0 0 1 2.227-2.223h4.455L9.659.75h6.682l2.227 3.333h4.455a2.225 2.225 0 0 1 2.227 2.223Z"
        data-name="Path 31502"
      />
      <Path
        d="M17.445 11.861A4.444 4.444 0 1 1 13 7.417a4.444 4.444 0 0 1 4.445 4.444Z"
        data-name="Path 31503"
      />
    </G>
  </Svg>
);

export default Camera;
