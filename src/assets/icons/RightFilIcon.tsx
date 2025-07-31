import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function RightFilIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      viewBox="0 0 18 18"
      {...props}>
      <G data-name="Group 24870" transform="translate(-150 -106)">
        <Circle
          data-name="Ellipse 9"
          cx={9}
          cy={9}
          r={9}
          transform="translate(150 106)"
          fill="#fff"
        />
        <Path
          d="M157 119l4-4-4-4"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </G>
    </Svg>
  );
}

export default RightFilIcon;
