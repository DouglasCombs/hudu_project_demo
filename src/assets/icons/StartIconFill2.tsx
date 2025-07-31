import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const StartIconFill2 = ({
  fillColor = Colors.MySin,
  ...props
}: {
  fillColor?: string;
} & SvgProps) => (
  <Svg {...props} width={23} height={22}>
    <Path
      fill={fillColor}
      d="m22.709 8.8-6.1 4.987 2.178 7.187a.709.709 0 0 1-.29.88.722.722 0 0 1-.872 0l-5.954-4.4-6.1 4.4a.918.918 0 0 1-.872 0 .709.709 0 0 1-.29-.88L6.3 13.64.347 8.8a.708.708 0 0 1-.29-.879.965.965 0 0 1 .725-.588h7.7L10.8.587A.971.971 0 0 1 11.529 0a.968.968 0 0 1 .726.587l2.469 6.746h7.551a.967.967 0 0 1 .726.588 2.085 2.085 0 0 1-.291.879Z"
    />
  </Svg>
);
export default StartIconFill2;
