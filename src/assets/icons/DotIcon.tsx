import * as React from 'react';
import Svg, {Circle} from 'react-native-svg';

function DotIcon(props) {
  const {color = '#3272dd'} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={6}
      height={6}
      viewBox="0 0 6 6"
      {...props}>
      <Circle data-name="Ellipse 57" cx={3} cy={3} r={3} fill={color} />
    </Svg>
  );
}

export default DotIcon;
