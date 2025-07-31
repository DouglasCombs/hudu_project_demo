import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FourDots(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.5}
      height={15.5}
      viewBox="0 0 17.5 15.5"
      {...props}>
      <Path
        d="M4.75 2.75a2 2 0 10-2 2 2 2 0 002-2zm0 0h8m0 0a2 2 0 102-2 2 2 0 00-2 2zm-8 10a2 2 0 10-2 2 2 2 0 002-2zm0 0h8m0 0a2 2 0 102-2 2 2 0 00-2 2z"
        fill="none"
        stroke="#3272dd"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default FourDots;
