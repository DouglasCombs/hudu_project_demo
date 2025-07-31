import * as React from 'react';
import Svg, {G, Path, SvgProps, Text, TSpan} from 'react-native-svg';
import {Colors} from '~/styles';

const BackgroundBadge = ({
  fillColor = Colors.Rhino,
  textColor = Colors.WHITE_F,
  badge,
  ...props
}: {fillColor?: string; textColor?: string; badge?: number} & SvgProps) => (
  <Svg {...props} width={25} height={28}>
    <G data-name="Group 24707">
      <Path
        fill={fillColor}
        d="M25 19.776V8.209a2.422 2.422 0 0 0-1.235-2.114L13.735.311A2.432 2.432 0 0 0 12.5 0a2.512 2.512 0 0 0-1.235.311L1.235 6.094A2.487 2.487 0 0 0 0 8.209v11.567a2.422 2.422 0 0 0 1.235 2.114l10.031 5.783a2.439 2.439 0 0 0 2.438 0l10.061-5.783A2.422 2.422 0 0 0 25 19.776Z"
        data-name="Path 31533"
      />
      <Text
        fill={textColor}
        data-name={0}
        fontFamily="Helvetica"
        fontSize={15}
        transform="translate(8 19)">
        <TSpan x={badge > 9 ? -4 : 0} y={0}>
          {badge > 9 ? '+9' : badge}
        </TSpan>
      </Text>
    </G>
  </Svg>
);

export default BackgroundBadge;
