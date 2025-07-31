import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function CompletedProjects({
  strokeColor = Colors.PRIMARY,
}: {
  strokeColor?: string;
}) {
  return (
    <Svg width={17.5} height={21.5} viewBox="0 0 17.5 21.5">
      <Path
        d="M10.528 2.568a1.778 1.778 0 11-3.556 0m3.556 0a1.778 1.778 0 10-3.556 0m3.556 0h4.089A2.158 2.158 0 0116.75 4.75v13.818a2.158 2.158 0 01-2.133 2.182H2.883A2.158 2.158 0 01.75 18.568V4.75a2.158 2.158 0 012.133-2.182h4.089m-1.778 10l2.667 2.727 4.444-6.364"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  );
}
