import * as React from 'react';
import Svg, {SvgProps, G, Circle, Path} from 'react-native-svg';

const TrashCircle = (props: SvgProps) => (
  <Svg {...props} width={28} height={28}>
    <G data-name="Group 25134" transform="translate(-323 -238)">
      <Circle
        cx={14}
        cy={14}
        r={14}
        fill="#f5f5f5"
        data-name="Ellipse 301"
        transform="translate(323 238)"
      />
      <G
        fill="none"
        stroke="#7f7f83"
        strokeLinecap="round"
        strokeLinejoin="round"
        data-name="Group 25130">
        <Path d="M331 247.8h12.5" data-name="Path 31809" />
        <Path
          d="M342.1 247.8v9.8a1.5 1.5 0 0 1-1.386 1.4h-6.928a1.5 1.5 0 0 1-1.386-1.4v-9.8"
          data-name="Path 31810"
        />
        <Path
          d="M334.45 247.8v-1.4a1.506 1.506 0 0 1 1.4-1.4h2.8a1.506 1.506 0 0 1 1.4 1.4v1.4"
          data-name="Path 31811"
        />
        <Path d="M336.258 251v5" data-name="Line 185" />
        <Path d="M338.242 251v5" data-name="Line 186" />
      </G>
    </G>
  </Svg>
);
export default TrashCircle;
