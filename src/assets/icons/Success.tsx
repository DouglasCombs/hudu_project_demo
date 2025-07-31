import * as React from 'react';
import Svg, {
  Defs,
  G,
  Rect,
  Text,
  TSpan,
  Path,
  SvgProps,
} from 'react-native-svg';

const Success = (props: SvgProps) => (
  <Svg {...props} width={24} height={24}>
    <G data-name="Group 24182">
      <G data-name="Group 24181" transform="translate(-36 -288)">
        <Rect
          width={24}
          height={24}
          fill="rgba(30,203,64,0.16)"
          data-name="Rectangle 6083"
          rx={4}
          transform="translate(36 288)"
        />
        <Path
          fill="#1ecb40"
          fillRule="evenodd"
          d="M55 300a7 7 0 1 1-7-7 7 7 0 0 1 7 7Zm-3.63-1.693a.7.7 0 0 0-1.14-.813l-3.02 4.227-1.515-1.516a.7.7 0 1 0-.99.99l2.1 2.1a.7.7 0 0 0 1.064-.088l3.5-4.9Z"
        />
      </G>
    </G>
  </Svg>
);

export default Success;
