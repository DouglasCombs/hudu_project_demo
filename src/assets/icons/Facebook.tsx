import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Facebook = ({
  fillColor = Colors.WHITE,
  ...props
}: {
  fillColor?: string;
} & SvgProps) => (
  <Svg {...props} width={20} height={19.999}>
    <Path
      fill={fillColor}
      d="M20 10.06a10 10 0 1 0-11.563 9.938v-7.03h-2.54V10.06h2.54V7.843c0-2.521 1.492-3.914 3.777-3.914a15.3 15.3 0 0 1 2.239.2V6.6h-1.262a1.45 1.45 0 0 0-1.629 1.571v1.888h2.775l-.444 2.908h-2.33v7.03A10.045 10.045 0 0 0 20 10.06Z"
      data-name="Icon awesome-facebook"
    />
  </Svg>
);

export default Facebook;
