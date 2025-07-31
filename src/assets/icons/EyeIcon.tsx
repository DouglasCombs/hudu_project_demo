import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function EyeIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={13.5}
      viewBox="0 0 20 13.5"
      {...props}>
      <Path
        data-name="Icon ionic-md-eye"
        d="M12.25 7.383a10.753 10.753 0 00-10 6.75 10.782 10.782 0 0020 0 10.753 10.753 0 00-10-6.75zm0 11.251a4.5 4.5 0 114.545-4.5 4.536 4.536 0 01-4.545 4.5zm0-7.2a2.7 2.7 0 102.728 2.7 2.723 2.723 0 00-2.728-2.701z"
        transform="translate(-2.25 -7.383)"
        fill="#7f7f83"
      />
    </Svg>
  );
}

export default EyeIcon;
