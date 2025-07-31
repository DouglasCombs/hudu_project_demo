import * as React from 'react';
import Svg, {SvgProps, Circle, Text, TSpan} from 'react-native-svg';
import {Colors} from '~/styles';

const PlusCircle = ({
  fillColor = Colors.PRIMARY,
  backgroundColor = Colors.WHITE_F,
  ...props
}: {fillColor?: string; backgroundColor?: string} & SvgProps) => (
  <Svg {...props} width={40} height={40}>
    <Circle
      cx={20}
      cy={20}
      r={20}
      fill={backgroundColor}
      data-name="Ellipse 246"
    />
    <Text
      fill={fillColor}
      data-name="+"
      fontFamily="Helvetica"
      fontSize={29}
      transform="translate(11 29)">
      <TSpan x={0} y={0}>
        {'+'}
      </TSpan>
    </Text>
  </Svg>
);

export default PlusCircle;
