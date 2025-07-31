import * as React from 'react';
import Svg, {SvgProps, G, Circle, Path} from 'react-native-svg';

const EditCircle = (props: SvgProps) => (
  <Svg {...props} width={28} height={28}>
    <G data-name="Group 25135" transform="translate(-283 -238)">
      <Circle
        cx={14}
        cy={14}
        r={14}
        fill="#f5f5f5"
        data-name="Ellipse 302"
        transform="translate(283 238)"
      />
      <G
        fill="none"
        stroke="#3272dd"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-name="Group 25131">
        <Path
          d="M300.478 245.712a2 2 0 0 1 3.465.826 1.973 1.973 0 0 1-.67 1.973l-9.434 9.442-3.844 1.049 1.048-3.848Z"
          data-name="Path 31812"
        />
        <Path d="m299.079 247.108 2.8 2.8" data-name="Path 31813" />
      </G>
    </G>
  </Svg>
);
export default EditCircle;
