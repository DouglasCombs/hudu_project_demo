import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Google = ({
  fillColor = Colors.WHITE,
  ...props
}: {
  fillColor?: string;
} & SvgProps) => (
  <Svg {...props} width={20} height={20}>
    <Path
      fill={fillColor}
      d="M20 10.237c0 5.706-3.971 9.766-9.836 9.766A10.071 10.071 0 0 1 0 10 10.071 10.071 0 0 1 10.164 0a9.862 9.862 0 0 1 6.816 2.616l-2.767 2.621C10.594 1.798 3.865 4.379 3.865 10a6.314 6.314 0 0 0 6.3 6.315 5.473 5.473 0 0 0 5.77-4.31h-5.77V8.564h9.675a8.63 8.63 0 0 1 .16 1.673Z"
      data-name="Icon awesome-google"
    />
  </Svg>
);
export default Google;
