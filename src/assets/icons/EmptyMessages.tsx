import * as React from 'react';
import Svg, {SvgProps, Path, G, Defs} from 'react-native-svg';

const EmptyMessages = (props: SvgProps) => (
  <Svg {...props} width={200} height={141} fill="none">
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M162 0H42c-5.523 0-10 4.477-10 10v120c0 5.523 4.477 10 10 10h120c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10Z"
    />
    <G filter="url(#a)">
      <Path
        fill="#fff"
        d="M54 54h135a5.002 5.002 0 0 1 5 5v25a5.002 5.002 0 0 1-5 5H54a5 5 0 0 1-5-5V59a5 5 0 0 1 5-5Z"
      />
    </G>
    <Path
      fill="#3272DD"
      d="M125 62H99a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
      opacity={0.32}
    />
    <Path
      fill="#3272DD"
      d="M143 75H99a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
      opacity={0.16}
    />
    <Path fill="#3272DD" d="M74.5 81a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z" />
    <G filter="url(#b)">
      <Path
        fill="#fff"
        d="M11 97h135a5.002 5.002 0 0 1 5 5v25a5.004 5.004 0 0 1-1.464 3.536A5.004 5.004 0 0 1 146 132H11a5.002 5.002 0 0 1-5-5v-25a5 5 0 0 1 5-5Z"
      />
    </G>
    <Path
      fill="#3272DD"
      d="M82 105H56a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
      opacity={0.32}
    />
    <Path
      fill="#3272DD"
      d="M100 118H56a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
      opacity={0.16}
    />
    <Path
      fill="#3272DD"
      d="M31.5 124a9.5 9.5 0 0 0 9.5-9.5 9.5 9.5 0 0 0-9.5-9.5 9.5 9.5 0 0 0-9.5 9.5 9.5 9.5 0 0 0 9.5 9.5Z"
      opacity={0.4}
    />
    <G filter="url(#c)">
      <Path
        fill="#fff"
        d="M146 11H11a5 5 0 0 0-5 5v25a5 5 0 0 0 5 5h135a5 5 0 0 0 5-5V16a5 5 0 0 0-5-5Z"
      />
    </G>
    <Path
      fill="#3272DD"
      d="M78 19H52a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
      opacity={0.32}
    />
    <Path
      fill="#3272DD"
      d="M96 32H52a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
      opacity={0.16}
    />
    <Path
      fill="#3272DD"
      d="M31.5 38a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z"
      opacity={0.4}
    />
    <Defs></Defs>
  </Svg>
);
export default EmptyMessages;
