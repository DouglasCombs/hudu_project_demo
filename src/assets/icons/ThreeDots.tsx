import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ThreeDots(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={3.5}
      height={17.5}
      viewBox="0 0 3.5 17.5"
      {...props}>
      <Path
        d="M.75 8.75a1 1 0 101-1 1 1 0 00-1 1zm0-7a1 1 0 101-1 1 1 0 00-1 1zm0 14a1 1 0 101-1 1 1 0 00-1 1z"
        fill="none"
        stroke="#fff"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default ThreeDots;
