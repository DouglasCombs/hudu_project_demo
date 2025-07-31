import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Search = ({
  strokeColor = Colors.DEEP_FIR,
  ...props
}: {
  strokeColor?: string;
} & SvgProps) => (
  <Svg {...props} width={20} height={19.811}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m18.75 18.75-4-4m2-6a8 8 0 1 1-8-8 8 8 0 0 1 8 8Z"
    />
  </Svg>
);

export default Search;
