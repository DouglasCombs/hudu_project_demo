import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';

const Error = (props: SvgProps) => (
  <Svg {...props} xmlns="http://www.w3.org/2000/svg" width={24} height={24}>
    <G data-name="Group 24182">
      <G data-name="Group 24181" transform="translate(-36 -288)">
        <Rect
          width={24}
          height={24}
          fill="rgba(247,72,108,0.16)"
          data-name="Rectangle 6083"
          rx={4}
          transform="translate(36 288)"
        />
        <Path
          fill="#f7486c"
          fillRule="evenodd"
          d="m40.207 304.677 6.484-10.936a1.524 1.524 0 0 1 2.619 0l6.485 10.936a1.561 1.561 0 0 1 0 1.539 1.529 1.529 0 0 1-1.313.781H41.515a1.528 1.528 0 0 1-1.314-.78 1.56 1.56 0 0 1 0-1.54Zm7.794-7.425a.923.923 0 0 1 .919.928v2.784a.919.919 0 1 1-1.838 0v-2.782a.924.924 0 0 1 .919-.93Zm-.919 6.5a.923.923 0 0 1 .919-.928h.006a.928.928 0 0 1 0 1.856H48a.924.924 0 0 1-.918-.931Z"
        />
      </G>
    </G>
  </Svg>
);

export default Error;
