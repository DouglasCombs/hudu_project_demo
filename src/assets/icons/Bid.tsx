import * as React from 'react';
import Svg, {SvgProps, Circle, G, Path} from 'react-native-svg';

const Bid = (props: SvgProps) => (
  <Svg {...props} width={40} height={40}>
    <Circle cx={20} cy={20} r={20} fill="#fff" data-name="Ellipse 246" />
    <G fill="#3272dd" data-name="Group 24859">
      <Path
        d="M19.75 7a7.8 7.8 0 1 0 7.75 7.8A7.776 7.776 0 0 0 19.75 7Z"
        data-name="Path 31603"
      />
      <Path
        d="M21.484 24.177v7.089a1.733 1.733 0 1 1-3.467 0v-7.089a9.707 9.707 0 0 0 3.467 0Z"
        data-name="Path 31604"
      />
    </G>
  </Svg>
);
export default Bid;
