import * as React from 'react';
import Svg, {SvgProps, G, Circle, Path} from 'react-native-svg';

const ClockCircle = (props: SvgProps) => (
  <Svg {...props} width={28} height={28}>
    <G data-name="Group 24298" transform="translate(-22 -601)">
      <Circle
        cx={14}
        cy={14}
        r={14}
        fill="#f5f5f5"
        data-name="Ellipse 1"
        transform="translate(22 601)"
      />
      <Path
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        d="M40.667 608 43 610.333m-14 0L31.333 608m10.889 7.778a6.331 6.331 0 0 1-3.839 5.749A5.832 5.832 0 0 1 36 622a6.222 6.222 0 1 1 6.222-6.222Z"
      />
    </G>
  </Svg>
);
export default ClockCircle;
