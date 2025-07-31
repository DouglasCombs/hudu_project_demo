import {Box, VStack} from 'native-base';
import React, {useMemo, useRef, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {Carousel} from 'react-native-snap-carousel-v4';
import {Frame} from '~/assets/icons';
import {CustomImage, CustomText, CustomTouchable} from '~/components';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import {fontSize, scale, verticalScale} from '~/utils/style';

export default function CustomCarousel(props: {
  height?: number;
  data?: any;
  scrollEnabled?: boolean;
  firstItem?: number;
  children: any;
}) {
  const {width} = useWindowDimensions();
  const {
    height = verticalScale(275),
    data,
    scrollEnabled = true,
    firstItem = 0,
    children,
  } = props;

  const imageRef = useRef();

  const [activeSlide, setActiveSlide] = useState(0);

  const imageArrayData = useMemo(() => {
    return data?.map((imageItem: any) => ({
      url: getFullImageUrl(imageItem?.imageAddress),
      alt: imageItem?.alt,
    }));
  }, [data]);

  const zoomHandler = () => {
    imageRef.current.onPress();
  };

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
        }}
      />
    );
  };

  if (data && data?.length > 0) {
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

  return (
    <CustomImage
      ref={imageRef}
      style={[styles.image, {height}]}
      imageSource={data?.[0]?.imageAddress}
      resizeMode="cover"
      imageSourceArray={data}>
      <VStack style={styles.pagination}>
        <CustomText fontSize={fontSize.xTiny} color={Colors.BLACK}>
          {activeSlide + 1}/{data?.length}
        </CustomText>
      </VStack>
      {children}
      <CustomTouchable onPress={zoomHandler} style={styles.zoomFrame}>
        <Frame />
      </CustomTouchable>
    </CustomImage>
  );
}

const CarouselItem = ({
  item,
  imageArrayData,
  height,
  dataLength,
  index,
}: {
  item: any;
  imageArrayData: any;
  height: number;
  dataLength?: any;
  index: number;
}) => {
  const imageRef = useRef();

  const zoomHandler = () => {
    imageRef.current.onPress(index);
  };

  return (
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
      <CustomTouchable onPress={zoomHandler} style={styles.zoomFrame}>
        <Frame />
      </CustomTouchable>
    </CustomImage>
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
    right: scale(24),
    top: scale(16),
    alignSelf: 'flex-end',
  },
  zoomFrame: {
    position: 'absolute',
    right: 16,
    bottom: 20,
  },
});
