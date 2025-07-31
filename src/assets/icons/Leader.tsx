import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Leader = ({
  fillColor = Colors.Ronchi,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={25} height={18.001}>
    <Path
      fill={fillColor}
      d="m24.983 3.777-2.247 11.325a3.616 3.616 0 0 1-1.24 2.076 3.565 3.565 0 0 1-2.263.818H5.767a3.565 3.565 0 0 1-2.263-.818 3.616 3.616 0 0 1-1.24-2.076L.016 3.772a.907.907 0 0 1 .133-.675.889.889 0 0 1 1.237-.251l4.749 3.191L11.868.259a.888.888 0 0 1 1.263 0l5.733 5.778 4.749-3.191a.89.89 0 0 1 1.237.251.907.907 0 0 1 .134.674Z"
    />
  </Svg>
);

export default Leader;
