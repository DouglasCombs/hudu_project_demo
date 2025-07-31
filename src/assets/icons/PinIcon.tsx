import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function PinIcon(props) {
  const {stroke = '#b1b1b3'} = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12.121}
      height={15.811}
      viewBox="0 0 10.121 13.811"
      {...props}>
      <Path
        d="M1.061 5.061l4-4m0 0l4 4m-4-4v12"
        fill="none"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      />
    </Svg>
  );
}

export default PinIcon;
