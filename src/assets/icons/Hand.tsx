import * as React from 'react';
import Svg, {SvgProps, G, Circle, Path} from 'react-native-svg';

const Hand = (props: SvgProps) => (
  <Svg {...props} width={40} height={40}>
    <G data-name="Group 25160" transform="translate(-8996 -5808)">
      <Circle
        cx={20}
        cy={20}
        r={20}
        fill="#fff"
        data-name="Ellipse 303"
        transform="translate(8996 5808)"
      />
      <Path
        fill="#3272dd"
        d="M9021.721 5819.33a1.308 1.308 0 0 0-1.318 1.287v6.836a.556.556 0 0 1-1.112 0v-10.085a1.319 1.319 0 0 0-2.637 0v7.923a.556.556 0 0 1-1.112 0v-9a1.319 1.319 0 0 0-2.637 0v10.081a.556.556 0 0 1-1.112 0v-7.923a1.319 1.319 0 0 0-2.637 0v13.641l-1.737-1.475c-1.631-1.418-3.012-2.025-4.137-.981-.756.737.431 1.931 1.675 3.324 1.2 1.343 4.374 5.742 7.08 7.329a4.878 4.878 0 0 0 2.537.712h3.574c2.881 0 4.9-2.368 4.9-5.824v-14.558a1.318 1.318 0 0 0-1.327-1.287Z"
        data-name="Path 31815"
      />
    </G>
  </Svg>
);
export default Hand;
