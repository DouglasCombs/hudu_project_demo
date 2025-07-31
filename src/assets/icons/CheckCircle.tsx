import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

function CheckCircle(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}>
      <Circle data-name="Ellipse 241" cx={10} cy={10} r={10} fill="#3272dd" />
    </Svg>
  );
}

export default CheckCircle;
