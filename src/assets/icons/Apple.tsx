import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Apple = ({
  fillColor = Colors.WHITE,
  ...props
}: {
  fillColor?: string;
} & SvgProps) => (
  <Svg {...props} width={17} height={20.005}>
    <Path
      fill={fillColor}
      d="M14.214 10.571a4.162 4.162 0 0 1 2.258-3.787 4.868 4.868 0 0 0-3.825-1.992c-1.6-.125-3.356.925-4 .925-.677 0-2.231-.88-3.451-.88-2.52.04-5.2 1.987-5.2 5.949a11.02 11.02 0 0 0 .65 3.627c.583 1.637 2.673 5.658 4.846 5.591 1.138-.027 1.942-.8 3.423-.8 1.436 0 2.181.8 3.451.8 2.2-.031 4.083-3.685 4.634-5.328a4.419 4.419 0 0 1-2.787-4.1Zm-2.557-7.333A4.174 4.174 0 0 0 12.741 0a4.807 4.807 0 0 0-3.066 1.559A4.244 4.244 0 0 0 8.519 4.77a3.809 3.809 0 0 0 3.138-1.532Z"
      data-name="Icon awesome-apple"
    />
  </Svg>
);

export default Apple;
