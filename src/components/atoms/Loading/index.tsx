import {Center, Spinner} from 'native-base';
import React from 'react';
import {Colors} from '~/styles';

export default function Loading({
  size = 'sm',
  color = Colors.PRIMARY,
  backDropColor = Colors.BLACK_TRANSPARENT_2,
}: {
  size?: 'lg' | 'sm';
  color?: string;
  backDropColor?: string;
}) {
  return (
    <Center bg={backDropColor} position="absolute" w="100%" h="100%" flex={1}>
      <Spinner color={color} size={size} />
    </Center>
  );
}
