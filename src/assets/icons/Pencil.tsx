import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';
import {Colors} from '~/styles';

function Pencil({
  fillColor = Colors.WHITE,
  ...props
}: {fillColor?: string} & SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
      <Path
        d="M20.994 12a1 1 0 00-1 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h6a1 1 0 000-2H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3v-6a1 1 0 00-1.006-1zm-15 .76V17a1 1 0 001 1h4.239a1 1 0 00.71-.29l6.918-6.928L21.7 8a1 1 0 000-1.42l-4.234-4.29a1 1 0 00-1.42 0l-2.819 2.829-6.938 6.928a1 1 0 00-.289.71zm10.762-8.351l2.829 2.829-1.42 1.42-2.829-2.829zM8 13.167l5.928-5.928 2.829 2.829L10.827 16H8z"
        transform="translate(-2 -1.994)"
        fill={fillColor}
      />
    </Svg>
  );
}

export default Pencil;
