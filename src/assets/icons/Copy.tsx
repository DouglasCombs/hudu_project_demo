import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function Copy(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={20}
      viewBox="0 0 18 20"
      {...props}>
      <G data-name="Layer 2" fill="#fff">
        <Path
          data-name="Path 31601"
          d="M20.609 18.9V6.808a2.561 2.561 0 00-2.56-2.558H7.81a2.561 2.561 0 00-2.56 2.558V18.9a2.561 2.561 0 002.56 2.558h10.239a2.561 2.561 0 002.56-2.558zm-13.962 0V6.808A1.165 1.165 0 017.81 5.645h10.239a1.165 1.165 0 011.164 1.163V18.9a1.165 1.165 0 01-1.164 1.163H7.81A1.165 1.165 0 016.646 18.9z"
          transform="translate(-2.25 -1.25) translate(-.359 -.208)"
        />
        <Path
          data-name="Path 31602"
          d="M15.98 1.25H4.81a2.562 2.562 0 00-2.56 2.56v9.308a.7.7 0 001.4 0V3.81a1.165 1.165 0 011.16-1.164h11.17a.7.7 0 100-1.4z"
          transform="translate(-2.25 -1.25)"
        />
      </G>
    </Svg>
  );
}

export default Copy;
