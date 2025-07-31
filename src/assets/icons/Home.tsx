import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Home = ({
  strokeColor = Colors.PRIMARY,
  ...props
}: {
  strokeColor?: string;
} & SvgProps) => (
  <Svg {...props} width={20} height={21.55}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M16.35 20.8H3.15a2.4 2.4 0 0 1-2.4-2.412V7.132a1.216 1.216 0 0 1 .48-.965l7.78-5.126a1.2 1.2 0 0 1 1.44 0l7.82 5.126a1.216 1.216 0 0 1 .48.965v11.256a2.4 2.4 0 0 1-2.4 2.412Z"
      data-name="Path 1"
    />
  </Svg>
);

export default Home;
