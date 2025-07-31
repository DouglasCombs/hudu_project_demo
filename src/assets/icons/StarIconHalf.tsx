import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {Colors} from '~/styles';

export default function StarIconHalf({
  size = 32,
  fillColor = Colors.MySin,
  halfColor = Colors.Ghost,
}: {
  size?: number;
  fillColor?: string;
  halfColor?: string;
}) {
  return (
    <Svg width={19} height={18.004} viewBox="0 0 32.386 32.374">
      <G
        id="Group_24115"
        data-name="Group 24115"
        transform="translate(-1487.625 -4679.004)">
        <Path
          id="Subtraction_5"
          data-name="Subtraction 5"
          d="M6.839,36.378A1.022,1.022,0,0,1,6.067,36a1.265,1.265,0,0,1-.273-1.027l1.68-10.207L.346,17.527a1.265,1.265,0,0,1-.276-1.293,1.077,1.077,0,0,1,.85-.759l9.909-1.5,4.42-9.336A1.041,1.041,0,0,1,16.187,4V31.388L7.3,36.255A.941.941,0,0,1,6.839,36.378Z"
          transform="translate(1487.626 4675)"
          fill={fillColor}
        />
        <Path
          id="Subtraction_10"
          data-name="Subtraction 10"
          d="M29.158,34.377a.967.967,0,0,1-.466-.122l-8.88-4.869v-2.5a.941.941,0,0,1,.463.12l7.459,4.086-1.4-8.537a1.307,1.307,0,0,1,.039-.592,1.287,1.287,0,0,1,.291-.5l5.88-5.976-8.2-1.243a1.037,1.037,0,0,1-.47-.2,1.144,1.144,0,0,1-.327-.418L19.812,5.731V2a.971.971,0,0,1,.554.172,1.065,1.065,0,0,1,.385.46l4.419,9.339,9.91,1.5a1.075,1.075,0,0,1,.85.758,1.265,1.265,0,0,1-.281,1.3l-7.125,7.241L30.2,32.976A1.263,1.263,0,0,1,29.931,34,1.023,1.023,0,0,1,29.158,34.377Z"
          transform="translate(1484.013 4677)"
          fill={halfColor}
        />
      </G>
    </Svg>
  );
}
