import {VStack} from 'native-base';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '~/styles';
import {scale, verticalScale, width} from '~/utils/style';

export default function CourseDetailsPlaceholder() {
  return (
    <VStack flex={1}>
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        flex={1}
        highlightColor={Colors.BACKGROUND}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={width}
            height={verticalScale(200)}
            alignSelf="flex-end"
          />

          <SkeletonPlaceholder.Item
            width={scale(50)}
            height={verticalScale(13)}
            marginTop={verticalScale(35)}
            marginStart={scale(15)}
          />
          <SkeletonPlaceholder.Item
            width={scale(25)}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
            marginStart={scale(15)}
          />
          <SkeletonPlaceholder.Item
            width={scale(80)}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
            marginStart={scale(15)}
          />

          <SkeletonPlaceholder.Item
            width={width * 0.9}
            marginTop={verticalScale(25)}
            height={verticalScale(13)}
            marginStart={scale(15)}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.9}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
            marginStart={scale(15)}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.9}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
            marginStart={scale(15)}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.9}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
            marginStart={scale(15)}
          />
          <SkeletonPlaceholder.Item
            width={width * 0.9}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
            marginStart={scale(15)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </VStack>
  );
}
