import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function StarReviewIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={21.003}
      height={20}
      viewBox="0 0 21.003 20"
      {...props}>
      <Path
        d="M20.25 8.1l-5.3 4.307 1.894 6.207a.61.61 0 01-.252.76.631.631 0 01-.758 0l-5.177-3.8-5.3 3.8a.8.8 0 01-.758 0 .61.61 0 01-.252-.76l1.635-6.334L.803 8.1a.609.609 0 01-.252-.759.838.838 0 01.63-.508h6.695l2.02-5.826A.843.843 0 0110.528.5a.84.84 0 01.631.507l2.144 5.826h6.566a.84.84 0 01.634.508 1.793 1.793 0 01-.253.759z"
        fill="none"
        stroke="#000"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </Svg>
  );
}

export default StarReviewIcon;
