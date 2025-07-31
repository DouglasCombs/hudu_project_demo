import * as React from 'react';
import Svg, {SvgProps, Path, G, Defs} from 'react-native-svg';

const EmptyQuestions = (props: SvgProps) => (
  <Svg {...props} width={200} height={140} fill="none">
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M162 0H42c-5.523 0-10 4.477-10 10v120c0 5.523 4.477 10 10 10h120c5.523 0 10-4.477 10-10V10c0-5.523-4.477-10-10-10Z"
    />
    <G filter="url(#a)">
      <Path
        fill="#fff"
        d="M146 10H11a5 5 0 0 0-5 5v25a5 5 0 0 0 5 5h135a5 5 0 0 0 5-5V15a5 5 0 0 0-5-5Z"
      />
    </G>
    <Path
      fill="#3272DD"
      fillOpacity={0.24}
      d="M75 18H49a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M93 31H49a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.4}
      d="M33 13H14a5 5 0 0 0-5 5v19a5 5 0 0 0 5 5h19a5 5 0 0 0 5-5V18a5 5 0 0 0-5-5Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.09 24a3 3 0 0 1 5.83 1c0 2-3 3-3 3M23 32h.01"
    />
    <G filter="url(#b)">
      <Path
        fill="#fff"
        d="M54 53h135a5.002 5.002 0 0 1 5 5v25a5.002 5.002 0 0 1-5 5H54a5 5 0 0 1-5-5V58a5 5 0 0 1 5-5Z"
      />
    </G>
    <Path
      fill="#3272DD"
      fillOpacity={0.24}
      d="M118 61H92a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M136 74H92a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      d="M76 56H57a5 5 0 0 0-5 5v19a5 5 0 0 0 5 5h19a5 5 0 0 0 5-5V61a5 5 0 0 0-5-5Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M63.09 67a3 3 0 0 1 5.83 1c0 2-3 3-3 3M66 75h.01"
    />
    <G filter="url(#c)">
      <Path
        fill="#fff"
        d="M11 96h135a5.002 5.002 0 0 1 5 5v25a5.004 5.004 0 0 1-1.464 3.536A5.004 5.004 0 0 1 146 131H11a5.002 5.002 0 0 1-5-5v-25a5 5 0 0 1 5-5Z"
      />
    </G>
    <Path
      fill="#3272DD"
      fillOpacity={0.24}
      d="M75 104H49a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M93 117H49a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.4}
      d="M33 99H14a5 5 0 0 0-5 5v19a5 5 0 0 0 5 5h19a5 5 0 0 0 5-5v-19a5 5 0 0 0-5-5Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.09 110a3.002 3.002 0 0 1 5.125-.936A3 3 0 0 1 25.92 111c0 2-3 3-3 3M23 118h.01"
    />
    <Defs></Defs>
  </Svg>
);
export default EmptyQuestions;
