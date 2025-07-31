import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {Colors} from '~/styles';

export default function InProgressProjects({
  strokeColor = Colors.PRIMARY,
}: {
  strokeColor?: string;
}) {
  return (
    <Svg width={21.5} height={21.5} viewBox="0 0 21.5 21.5">
      <Path
        d="M10.75.75v4.167m0 11.666v4.167m10-10h-4.166m-11.667 0H.75m17.209-7.208l-2.917 2.917m-8.584 8.583l-2.917 2.916m14.418 0l-2.917-2.916M6.458 6.458L3.541 3.543"
        fill="none"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
