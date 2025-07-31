import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const GoalIcon = ({
  strokeColor = Colors.PRIMARY,
  ...props
}: {
  strokeColor?: string;
} & SvgProps) => (
  <Svg width={15} height={15} viewBox="0 0 15 15" {...props}>
    <Path
      d="M.5 7.5h2.8m8.4 0h2.8m-7 7v-2.8m0-8.4V.5m5.6 7a5.6 5.6 0 11-5.6-5.6 5.6 5.6 0 015.6 5.6zm-3.5 0a2.1 2.1 0 11-2.1-2.1 2.1 2.1 0 012.1 2.1z"
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1}
    />
  </Svg>
);
export default GoalIcon;
