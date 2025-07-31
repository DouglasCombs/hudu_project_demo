import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Lock = ({
  fillColor = Colors.Topaz,
  ...props
}: {fillColor?: string} & SvgProps) => {
  return (
    <Svg {...props} width={15.5} height={19.5}>
      <Path
        fill="none"
        stroke={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
        d="M3.75 7.75v-3a4 4 0 0 1 8 0v3m-9.4 0h10.8a1.6 1.6 0 0 1 1.6 1.6v7a2.407 2.407 0 0 1-2.4 2.4h-9.2a2.407 2.407 0 0 1-2.4-2.4v-7a1.6 1.6 0 0 1 1.6-1.6Z"
      />
    </Svg>
  );
};
export default Lock;
