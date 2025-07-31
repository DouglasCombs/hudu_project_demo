import React from 'react';
import {Divider} from 'native-base';

export default function CustomDivider({
  h = '0.7px',
  w,
  bg,
  my = '16px',
  mx,
  mt,
  mb,
  orientation = 'horizontal',
  ...otherProps
}: {
  h?: number | string;
  w?: number | string;
  bg?: string;
  my?: number | string;
  mx?: number | string;
  mt?: number | string;
  mb?: number | string;
  orientation?: 'vertical' | 'horizontal';
}) {
  return (
    <Divider {...{...otherProps, h, w, bg, mx, my, mt, mb, orientation}} />
  );
}
