import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

export default function StarIconFill({
  fillColor = Colors.MySin,
  ...props
}: {
  fillColor?: string;
} & SvgProps) {
  return (
    <Svg {...props} width={19} height={18.004}>
      <Path
        fill={fillColor}
        d="m18.76 7.2-5.038 4.081 1.8 5.881a.577.577 0 0 1-.239.721.6.6 0 0 1-.72 0l-4.918-3.6-5.038 3.6a.764.764 0 0 1-.72 0 .577.577 0 0 1-.239-.721l1.559-6L.287 7.2a.576.576 0 0 1-.239-.72A.8.8 0 0 1 .646 6H7L8.923.48a.8.8 0 0 1 .6-.48.8.8 0 0 1 .6.48L12.163 6H18.4a.8.8 0 0 1 .6.481 1.7 1.7 0 0 1-.24.72Z"
      />
    </Svg>
  );
}
