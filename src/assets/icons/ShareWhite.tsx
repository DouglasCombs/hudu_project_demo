import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ShareWhite(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={19.5}
      height={19.811}
      viewBox="0 0 19.5 19.811"
      {...props}>
      <Path
        d="M12.75 4.061l-3-3m0 0l-3 3m3-3v14m4-7h2.6a2.4 2.4 0 012.4 2.4v6.2a2.4 2.4 0 01-2.4 2.4H3.15a2.4 2.4 0 01-2.4-2.4v-6.2a2.4 2.4 0 012.4-2.4h2.6"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default ShareWhite;
