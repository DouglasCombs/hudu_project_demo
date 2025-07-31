import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

function BidIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.501}
      height={26}
      viewBox="0 0 15.501 26"
      {...props}>
      <G data-name="Group 24859" fill="#3272dd">
        <Path
          data-name="Path 31603"
          d="M14.15 0a7.8 7.8 0 107.75 7.8A7.776 7.776 0 0014.15 0z"
          transform="translate(-14736.4 -660) translate(14730 660)"
        />
        <Path
          data-name="Path 31604"
          d="M17.333 21.141v7.089a1.733 1.733 0 11-3.467 0v-7.089a9.707 9.707 0 003.467 0z"
          transform="translate(-14736.4 -660) translate(14728.551 656.036)"
        />
      </G>
    </Svg>
  );
}

export default BidIcon;
