import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function CartIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={17}
      viewBox="0 0 23 17"
      {...props}>
      <Path
        d="M.5 5.5h22m-3 3h-3M2.9.5h17.2a2.4 2.4 0 012.4 2.4v11.2a2.4 2.4 0 01-2.4 2.4H2.9a2.4 2.4 0 01-2.4-2.4V2.9A2.4 2.4 0 012.9.5z"
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

export default CartIcon;
