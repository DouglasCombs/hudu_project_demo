import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ReplyIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.811}
      height={15.811}
      viewBox="0 0 15.811 15.811"
      {...props}>
      <Path
        d="M14.75 10.75h-9.6a4.4 4.4 0 01-4.4-4.4V.75m14 10l-4 4m4-4l-4-4"
        fill="none"
        stroke="#b1b1b3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default ReplyIcon;
