import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Map = ({
  fillColor = Colors.WHITE_F,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={20} height={18.011}>
    <Path
      fill={fillColor}
      d="m19.32 2.05-6-2h-.07a.7.7 0 0 0-.14 0h-.43L7 2 1.32.05A1.008 1.008 0 0 0 0 1v14a1 1 0 0 0 .68.95l6 2a1 1 0 0 0 .62 0l5.7-1.9L18.68 18a1.19 1.19 0 0 0 .32 0 .94.94 0 0 0 .58-.19A1 1 0 0 0 20 17V3a1 1 0 0 0-.68-.95ZM6 15.61l-4-1.33V2.39l4 1.33Zm6-1.33-4 1.33V3.72l4-1.33Zm6 1.33-4-1.33V2.39l4 1.33Z"
    />
  </Svg>
);

export default Map;
