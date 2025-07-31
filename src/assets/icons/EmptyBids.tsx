import * as React from 'react';
import Svg, {SvgProps, Path, G, Mask, Defs} from 'react-native-svg';

const EmptyBids = (props: SvgProps) => (
  <Svg {...props} width={150} height={153} fill="none">
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
    />
    <G filter="url(#a)">
      <Mask
        id="b"
        width={150}
        height={150}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: 'alpha',
        }}>
        <Path
          fill="#3272DD"
          d="M75 150c41.421 0 75-33.579 75-75S116.421 0 75 0 0 33.579 0 75s33.579 75 75 75Z"
        />
      </Mask>
      <G mask="url(#b)">
        <Path
          fill="#fff"
          d="M118 43H32a5 5 0 0 0-5 5v105a5 5 0 0 0 5 5h86a5 5 0 0 0 5-5V48a5 5 0 0 0-5-5Z"
        />
      </G>
    </G>
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M66 53H40a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6ZM66 95H40a3 3 0 1 0 0 6h26a3 3 0 1 0 0-6Z"
    />
    <Path
      stroke="#3272DD"
      strokeWidth={2}
      d="M108 68H42a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h66a4 4 0 0 0 4-4V72a4 4 0 0 0-4-4Z"
    />
    <Path
      fill="#3272DD"
      fillOpacity={0.16}
      d="M108 109H42a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h66a5 5 0 0 0 5-5v-8a5 5 0 0 0-5-5Z"
    />
    <Path fill="#DFEAFB" d="M86 88a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
    <Path
      fill="#3272DD"
      stroke="#fff"
      d="M89.907 104.37c-.8 0-1.547 0-2.227-.043a4.567 4.567 0 0 1-3.884-2.749l-4.219-8.338a1.8 1.8 0 0 1 .182-2.529 1.628 1.628 0 0 1 1.035-.359 1.918 1.918 0 0 1 1.437.714l1.916 2.615.029.034V83.78a1.858 1.858 0 1 1 3.717 0v6.5a1.73 1.73 0 1 1 3.444 0v1.355a1.73 1.73 0 1 1 3.444 0v1.044a1.73 1.73 0 1 1 3.444 0v6.337c-.034 1.949-.915 5.235-4.014 5.235-.225.01-2.131.12-4.3.12l-.004-.001Z"
    />
    <Defs></Defs>
  </Svg>
);

export default EmptyBids;
