import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Down2 = ({
  fillColor = Colors.Topaz,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={18} height={9}>
    <Path
      fill={fillColor}
      d="m0 0 9 9 9-9Z"
      data-name="Icon ionic-md-arrow-dropdown"
    />
  </Svg>
);
export default Down2;
