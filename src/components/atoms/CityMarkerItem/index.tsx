import {Box, Center} from 'native-base';
import React, {memo, useCallback, useMemo} from 'react';
import {Marker} from 'react-native-maps';
import {MarkerCount} from '~/assets/icons';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

type Props = {
  item: any;
  onPress?: (item: any) => void;
  currentItem: any;
};

function CityMarkerItem({item, onPress, currentItem}: Props) {
  const onPressHandler = useCallback(() => {
    onPress?.(item);
  }, [onPress, item]);

  const isActive = useMemo(
    () => item?.city === currentItem?.city,
    [item, currentItem],
  );

  if (!item?.latitude || !item?.longitude) {
    return null;
  }

  return (
    <>
      <Marker
        onPress={onPressHandler}
        coordinate={{
          latitude: parseFloat(item?.latitude) || 41.657847,
          longitude: parseFloat(item?.longitude) || -91.534627,
        }}>
        <Box>
          <MarkerCount />
          <Center
            h="28px"
            w="28px"
            top="50%"
            mt="-20px"
            rounded="full"
            alignSelf="center"
            position="absolute"
            bg={isActive ? Colors.PRIMARY : Colors.Gainsboro}>
            <CustomText
              fontSize={item?.count > 99 ? fontSize.xTiny : fontSize.xNormal}
              color={isActive ? Colors.WHITE_F : Colors.Topaz}>
              {item?.count > 99 ? '99+' : item?.count}
            </CustomText>
          </Center>
        </Box>
      </Marker>
    </>
  );
}

export default memo(CityMarkerItem);
