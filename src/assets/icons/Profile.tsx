import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Profile = ({
  strokeColor = Colors.DEEP_FIR,
  ...props
}: {
  strokeColor?: string;
} & SvgProps) => (
  <Svg {...props} width={22} height={21.5}>
    <Path
      fill="none"
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.276 20.74H3.241a2.336 2.336 0 0 1-2.466-2.624l.114-.869a2.988 2.988 0 0 1 2.5-2.214l7.292-1.283h.144l7.3 1.283a2.963 2.963 0 0 1 2.5 2.214l.114.88a2.336 2.336 0 0 1-2.474 2.623l.01-.01ZM15.753 5.75a5 5 0 1 1-5-5 5 5 0 0 1 5 5Z"
    />
  </Svg>
);

export default Profile;
