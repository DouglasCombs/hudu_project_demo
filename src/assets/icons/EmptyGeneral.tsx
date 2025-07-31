import * as React from 'react';
import Svg, {SvgProps, Path, G, Defs} from 'react-native-svg';

const EmptyGeneral = (props: SvgProps) => (
  <Svg {...props} width={150} height={178} fill="none">
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M75 167c41.421 0 75-33.579 75-75s-33.579-75-75-75S0 50.579 0 92s33.579 75 75 75Z"
    />
    <G filter="url(#a)">
      <Path
        fill="#fff"
        d="M118 60H32a5 5 0 0 0-5 5v105a5 5 0 0 0 5 5h86a5 5 0 0 0 5-5V65a5 5 0 0 0-5-5Z"
      />
    </G>
    <Path
      fill="#3272DD"
      fillOpacity={0.24}
      d="M65 75H39a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M83 88H39a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.24}
      d="M65 102H39a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M83 115H39a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.24}
      d="M65 129H39a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M83 142H39a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
    />
    <G filter="url(#b)">
      <Path
        fill="#3272DD"
        d="M118 9H32a5 5 0 0 0-5 5v30a5 5 0 0 0 5 5h86a5 5 0 0 0 5-5V14a5 5 0 0 0-5-5Z"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M81 23 69 35M69 23l12 12"
      />
    </G>
    <Defs></Defs>
  </Svg>
);

export default EmptyGeneral;
