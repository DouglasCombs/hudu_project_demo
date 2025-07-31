import * as React from 'react';
import Svg, {G, Circle} from 'react-native-svg';

function UnCheckCircle(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 20 20"
      {...props}>
      <G data-name="Ellipse 241" fill="#fff" stroke="#c6c6c7" strokeWidth={1}>
        <Circle cx={10} cy={10} r={10} stroke="none" />
        <Circle cx={10} cy={10} r={9.5} fill="none" />
      </G>
    </Svg>
  );
}

export default UnCheckCircle;
