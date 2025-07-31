import * as React from 'react';
import Svg, {SvgProps, Text, TSpan} from 'react-native-svg';
import {Colors} from '~/styles';

const DollarIcon = ({
  fillColor = Colors.PRIMARY,
  ...props
}: {
  fillColor?: string;
} & SvgProps) => (
  <Svg width={8} height={19} viewBox="0 0 8 19" {...props}>
    <Text
      data-name="$"
      transform="translate(0 15)"
      fill={fillColor}
      fontSize={14}
      fontFamily="SegoeUI, Segoe UI">
      <TSpan x={0} y={0}>
        {'$'}
      </TSpan>
    </Text>
  </Svg>
);

export default DollarIcon;
