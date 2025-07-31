import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

const Filter = (props: SvgProps) => (
  <Svg {...props} width={21} height={19}>
    <Path
      fill="none"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.5.5H.5l8 9.46v6.54l4 2V9.96Z"
    />
  </Svg>
);

export default Filter;
