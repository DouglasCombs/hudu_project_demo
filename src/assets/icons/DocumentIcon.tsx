import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DocumentIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17}
      height={21}
      viewBox="0 0 17 21"
      {...props}>
      <Path
        d="M10.278 2.318a1.778 1.778 0 11-3.556 0m3.556 0a1.778 1.778 0 10-3.556 0m3.556 0h4.089A2.158 2.158 0 0116.5 4.5v13.818a2.158 2.158 0 01-2.133 2.182H2.633A2.158 2.158 0 01.5 18.318V4.5a2.158 2.158 0 012.133-2.182h4.089m-2.666 9.091h8.889M4.056 8.682h8.889m-8.889 5.454h5.333"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </Svg>
  );
}

export default DocumentIcon;
