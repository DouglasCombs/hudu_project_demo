import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function BluePlus(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 14 14"
      {...props}>
      <Path
        data-name="Icon awesome-plus"
        d="M13 7.75H8.5v-4.5a1 1 0 00-1-1h-1a1 1 0 00-1 1v4.5H1a1 1 0 00-1 1v1a1 1 0 001 1h4.5v4.5a1 1 0 001 1h1a1 1 0 001-1v-4.5H13a1 1 0 001-1v-1a1 1 0 00-1-1z"
        transform="translate(0 -2.25)"
        fill="#3272dd"
      />
    </Svg>
  );
}

export default BluePlus;
