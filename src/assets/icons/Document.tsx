import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const Document = ({
  fillColor = Colors.WHITE,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg {...props} width={19} height={23}>
    <Path
      fill="none"
      stroke={fillColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M13.5 2.5h2.6a2.4 2.4 0 0 1 2.4 2.4v15.2a2.4 2.4 0 0 1-2.4 2.4H2.9a2.4 2.4 0 0 1-2.4-2.4V4.9a2.4 2.4 0 0 1 2.4-2.4h2.6m-1 10h10m-10-3h10m-10 6h6M6.3.5h6.4a.8.8 0 0 1 .8.8v2.4a.8.8 0 0 1-.8.8H6.3a.8.8 0 0 1-.8-.8V1.3a.8.8 0 0 1 .8-.8Z"
    />
  </Svg>
);

export default Document;
