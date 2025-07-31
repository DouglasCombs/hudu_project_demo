import * as React from 'react';
import Svg, {Defs, G, Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const MarkerCount = ({
  fillColor = Colors.WHITE_F,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={67} height={76.983}>
    <Defs></Defs>
    <G data-name="Group 24729" filter="url(#a)">
      <Path
        fill={fillColor}
        d="m32.632 59.98-5.417-9.48H21.5a8 8 0 0 1-8-8v-24a8 8 0 0 1 8-8h24a8 8 0 0 1 8 8v24a8 8 0 0 1-8 8h-5.716l-5.417 9.479a.99.99 0 0 1-.868.5.989.989 0 0 1-.867-.499Z"
        data-name="Union 1"
      />
    </G>
  </Svg>
);

export default MarkerCount;
