import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const Information = (props: SvgProps) => (
  <Svg {...props} width={24} height={24}>
    <G data-name="Group 24832" transform="translate(-40 -170)">
      <Rect
        width={24}
        height={24}
        fill="rgba(230,166,81,0.16)"
        data-name="Rectangle 6083"
        rx={4}
        transform="translate(40 170)"
      />
      <Path
        fill="none"
        stroke="#e6a651"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M52 185.111h.006M52 178.889v3.889m-6.821-3.957 3.64-3.642a.617.617 0 0 1 .443-.179h5.483a.63.63 0 0 1 .443.179l3.632 3.635a.617.617 0 0 1 .18.443v5.486a.63.63 0 0 1-.179.443l-3.632 3.635a.617.617 0 0 1-.443.179h-5.492a.63.63 0 0 1-.443-.179l-3.632-3.634a.617.617 0 0 1-.179-.444v-5.486a.63.63 0 0 1 .179-.443v.008Z"
      />
    </G>
  </Svg>
);

export default Information;
