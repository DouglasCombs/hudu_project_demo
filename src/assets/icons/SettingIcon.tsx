import * as React from 'react';
import Svg, {Defs, ClipPath, Path, G} from 'react-native-svg';

function SettingIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}>
      <Defs>
        <ClipPath id="a">
          <Path
            data-name="Path 28"
            d="M0 0h24v24H0z"
            fill={props?.color || '#fff'}
          />
        </ClipPath>
      </Defs>
      <G
        clipPath="url(#a)"
        fill="none"
        stroke={props?.color || '#fff'}
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}>
        <Path
          data-name="Path 26"
          d="M21 10h-2.29a7.454 7.454 0 00-.54-1.32l1.62-1.62a2 2 0 00-2.83-2.83l-1.62 1.62c-.21-.11-.42-.21-.64-.3h-.01c-.22-.09-.44-.17-.67-.24V3a2 2 0 00-4 0v2.29c-.23.07-.45.15-.67.24h-.01c-.22.09-.43.19-.64.3L7.08 4.21a2 2 0 00-2.83 2.83l1.62 1.62a7.454 7.454 0 00-.54 1.32H3a2 2 0 000 4h2.29c.07.23.15.46.24.68a5.514 5.514 0 00.31.65l-1.62 1.62a2 2 0 002.83 2.83l1.62-1.62c.21.11.43.21.65.31s.45.17.68.24v2.29a2 2 0 004 0v-2.29c.23-.07.46-.15.68-.24a5.514 5.514 0 00.65-.31l1.62 1.62a2 2 0 002.83-2.83l-1.62-1.62c.11-.21.21-.43.31-.65s.17-.45.24-.68H21a2 2 0 000-4z"
        />
        <Path data-name="Path 27" d="M12 16a4 4 0 10-4-4 4 4 0 004 4z" />
      </G>
    </Svg>
  );
}

export default SettingIcon;
