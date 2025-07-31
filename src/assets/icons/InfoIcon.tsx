import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function InfoIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15}
      height={15}
      viewBox="0 0 15 15"
      {...props}>
      <Path
        d="M7.5 4.7h.006M7.5 10.3V6.8m7 .7a7 7 0 11-7-7 7 7 0 017 7z"
        fill="none"
        stroke="#b1b1b3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </Svg>
  );
}

export default InfoIcon;
