import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const EmptyNotifications = (props: SvgProps) => (
  <Svg {...props} width={150} height={150} fill="none">
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
    />
    <Path
      fill="#fff"
      d="M120 150H30V53a16.018 16.018 0 0 0 16-16h58a15.906 15.906 0 0 0 4.691 11.308A15.89 15.89 0 0 0 120 53v97Z"
    />
    <Path
      fill="#3272DD"
      d="M75 102c13.255 0 24-10.745 24-24S88.255 54 75 54 51 64.745 51 78s10.745 24 24 24Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M69 74a6 6 0 1 1 12 0c0 7 3 9 3 9H66s3-2 3-9ZM73.3 87a1.94 1.94 0 0 0 3.4 0"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M88 108H62a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6ZM97 120H53a3 3 0 1 0 0 6h44a3 3 0 1 0 0-6Z"
    />
  </Svg>
);

export default EmptyNotifications;
