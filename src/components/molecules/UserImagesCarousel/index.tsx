import {Trash} from 'iconsax-react-native';
import {Box, Center, VStack} from 'native-base';
import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Carousel} from 'react-native-snap-carousel-v4';
import {CustomImage, CustomText, CustomTouchable} from '~/components';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {fontSize, scale, verticalScale, width} from '~/utils/style';
import {Frame} from '~/assets/icons';

export default function UserImagesCarousel(props: {
  height?: number;
  data?: any;
  scrollEnabled?: boolean;
  firstItem?: number;
  children?: any;
  onDeletePress: (id: number) => void;
  onEditPress: (id: number) => void;
}) {
  const {width} = useWindowDimensions();
  const {
    height = verticalScale(275),
    data,
    scrollEnabled = true,
    firstItem = 0,
    children,
    onDeletePress,
    onEditPress,
  } = props;

  const imageRef = useRef();

  const [activeSlide, setActiveSlide] = useState(0);

  const imageArrayData = useMemo(() => {
    return data?.map((imageItem: any) => ({
      url: getFullImageUrl(imageItem?.imageAddress),
      alt: imageItem?.alt,
    }));
  }, [data]);

  const _renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <CarouselItem
        {...{
          item,
          height,
          index,
          dataLength: data?.length,
          imageArrayData,
          children,
          onDeletePress,
          onEditPress,
        }}
      />
    );
  };

  return (
    <Box height={height} width={width}>
      <Carousel
        scrollEnabled={scrollEnabled}
        sliderWidth={width}
        layout={'default'}
        itemWidth={width}
        data={data ?? []}
        renderItem={_renderItem}
        firstItem={firstItem}
        pagingEnabled
        onSnapToItem={index => setActiveSlide(index)}
      />
      {children}
    </Box>
  );
}

const CarouselItem = ({
  item,
  imageArrayData,
  height,
  dataLength,
  index,
  onDeletePress,
  onEditPress,
}: {
  item: any;
  imageArrayData: any;
  height: number;
  dataLength?: any;
  index: number;
  onDeletePress: () => void;
  onEditPress?: () => void;
}) => {
  const imageRef = useRef();

  const zoomHandler = () => {
    imageRef.current.onPress(index);
  };

  const onDelete = () => {
    onDeletePress?.(item?.id);
  };

  const onEdit = () => {
    onEditPress?.(item?.id);
  };

  return (
    <CustomTouchable onLongPress={onEdit} onPress={zoomHandler}>
      <CustomImage
        style={[styles.image, {height}]}
        imageSource={item?.imageAddress}
        resizeMode="cover"
        ref={imageRef}
        imageSourceArray={imageArrayData}>
        <VStack style={styles.pagination}>
          <CustomText fontSize={fontSize.xTiny} color={Colors.BLACK}>
            {index + 1}/{dataLength}
          </CustomText>
        </VStack>
      </CustomImage>
      <CustomTouchable onPress={onDelete} style={styles.zoomFrame}>
        <Center p="2" px="3" borderRadius={'full'} bg={Colors.WHITE}>
          <Trash color={Colors.BLACK} />
        </Center>
      </CustomTouchable>
      <CustomTouchable onPress={zoomHandler} style={styles.zoomFrame1}>
        <Frame />
      </CustomTouchable>
    </CustomTouchable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
  },
  pagination: {
    backgroundColor: Colors.SEMI_TRANSPARENT,
    borderRadius: 11,
    paddingHorizontal: 8,
    paddingVertical: 4,
    left: scale(24),
    top: width * 0.6,
    alignSelf: 'flex-end',
    position: 'absolute',
  },
  zoomFrame: {
    position: 'absolute',
    right: scale(24),
    top: scale(16),
  },
  zoomFrame1: {
    position: 'absolute',
    right: scale(24),
    bottom: scale(16),
  },
});
