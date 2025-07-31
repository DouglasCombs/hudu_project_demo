import * as React from 'react';
import Svg, {G, Circle, Path} from 'react-native-svg';

function PlayIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24.001}
      height={26}
      viewBox="0 0 24.001 26"
      {...props}>
      <Path
        d="M6.886 3.725l21.47 11.768a1.218 1.218 0 010 2.149L6.886 29.41a1.3 1.3 0 01-1.26-.011A1.228 1.228 0 015 28.334V4.8a1.228 1.228 0 01.627-1.064 1.3 1.3 0 011.259-.01z"
        transform="translate(-5 -3.568)"
        fill="#fff"
      />
    </Svg>
  );
}

export default PlayIcon;
