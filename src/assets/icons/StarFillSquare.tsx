import * as React from 'react';
import Svg, {SvgProps, G, Rect, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const StarFillSquare = ({
  fillColor = Colors.WHITE_F,
  strokeColor = Colors.MySin,
  ...props
}: {fillColor?: string; strokeColor?: string} & SvgProps) => (
  <Svg {...props} width={59} height={48}>
    <G fill={fillColor} stroke={strokeColor} data-name="Rectangle 571">
      <Rect width={59} height={48} stroke="none" rx={4} />
      <Rect width={58} height={47} x={0.5} y={0.5} fill="none" rx={3.5} />
    </G>
    <Path
      fill={strokeColor}
      d="M29.526 12a1.639 1.639 0 0 0-1.06.419 2.245 2.245 0 0 0-.535.692 1.053 1.053 0 0 0-.052.125l-1.869 5.397h-6.253a1.639 1.639 0 0 0-1.06.419 2.247 2.247 0 0 0-.535.693 1.653 1.653 0 0 0-.073 1.249 1.671 1.671 0 0 0 .68.885l4.824 3.9-1.526 5.9a1.673 1.673 0 0 0-.018 1.121 1.649 1.649 0 0 0 .805.956 1.878 1.878 0 0 0 1.727 0 1.055 1.055 0 0 0 .14-.085l4.929-3.538 4.755 3.5A1.5 1.5 0 0 0 35.45 34h.033a1.506 1.506 0 0 0 1-.329 1.7 1.7 0 0 0 .629-2.018l-1.756-5.762 5-4.065a1.05 1.05 0 0 0 .277-.347l.023-.045A2.775 2.775 0 0 0 41 20.215a1.055 1.055 0 0 0-.111-.471 2.247 2.247 0 0 0-.534-.692 1.639 1.639 0 0 0-1.06-.419h-6.137l-1.991-5.416a1.047 1.047 0 0 0-.045-.105 2.247 2.247 0 0 0-.535-.693A1.644 1.644 0 0 0 29.526 12Z"
    />
  </Svg>
);
export default StarFillSquare;
