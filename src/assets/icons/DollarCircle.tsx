import * as React from 'react';
import Svg, {Circle, Text, SvgProps, TSpan} from 'react-native-svg';
import {Colors} from '~/styles';

const DollarCircle = ({
  fillColor = Colors.SEARCH_BACKGROUND,
  strokeColor = Colors.BLACK,
  ...props
}: {strokeColor?: string; fillColor?: string} & SvgProps) => (
  <Svg {...props} width={28} height={28}>
    <Circle cx={14} cy={14} r={14} fill={fillColor} data-name="Ellipse 1" />
    <Text
      data-name="$"
      fontFamily="Helvetica"
      fontSize={15}
      transform="translate(9 19)">
      <TSpan fill={strokeColor} x={0} y={0}>
        {'$'}
      </TSpan>
    </Text>
  </Svg>
);
export default DollarCircle;
