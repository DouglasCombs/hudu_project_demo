import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function DeleteIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={20}
      viewBox="0 0 18 20"
      {...props}>
      <Path
        d="M20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 000-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10z"
        transform="translate(-3 -2)"
        fill="#7f7f83"
      />
    </Svg>
  );
}

export default DeleteIcon;
