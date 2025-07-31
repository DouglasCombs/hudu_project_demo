import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import {Colors} from '~/styles';

const ClosedBids = ({
  fillColor = Colors.PRIMARY,
  ...props
}: {fillColor?: string} & SvgProps) => (
  <Svg width={24} height={22} viewBox="0 0 24 22" {...props}>
    <Path
      data-name="Path 31416"
      d="M121.777 81.69h-.838v-22h.838zm6.383-8.808h5.2V68.5h-5.2v-2.27l-5.155 4.463 5.155 4.463v-2.274zm-.838-4.818v1.275h5.2v2.707h-5.2v1.275l-3.035-2.628 3.035-2.628zm-7.654 2.628l-5.155-4.463V68.5h-5.155v4.384h5.155v2.271zM110.2 69.34h5.155v-1.275l3.035 2.628-3.035 2.628v-1.275H110.2V69.34z"
      transform="translate(-109.359 -59.69)"
      fill={fillColor}
    />
  </Svg>
);

export default ClosedBids;
