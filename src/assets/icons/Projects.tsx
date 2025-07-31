import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

const Projects = ({
  strokeColor = Colors.DEEP_FIR,
  ...props
}: {
  strokeColor?: string;
} & SvgProps) => (
  <Svg {...props} width={22} height={18.5}>
    <Path
      fill={strokeColor}
      d="M3.15 4.5h15.2V3H3.15Zm15.2 0A1.65 1.65 0 0 1 20 6.15h1.5A3.15 3.15 0 0 0 18.35 3v1.5ZM20 6.15v9.2h1.5v-9.2Zm0 9.2A1.65 1.65 0 0 1 18.35 17v1.5a3.15 3.15 0 0 0 3.15-3.15ZM18.35 17H3.15v1.5h15.2Zm-15.2 0a1.65 1.65 0 0 1-1.65-1.65H0a3.15 3.15 0 0 0 3.15 3.15ZM1.5 15.35v-9.2H0v9.2h1.5Zm0-9.2A1.65 1.65 0 0 1 3.15 4.5V3A3.15 3.15 0 0 0 0 6.15h1.5ZM8.55 1.5h4.4V0h-4.4Zm4.4 0a.05.05 0 0 1 .05.05h1.5A1.55 1.55 0 0 0 12.95 0Zm.05.05v2.2h1.5v-2.2Zm-4.5 2.2v-2.2H7v2.2Zm0-2.2a.05.05 0 0 1 .05-.05V0A1.55 1.55 0 0 0 7 1.55Z"
    />
  </Svg>
);

export default Projects;
