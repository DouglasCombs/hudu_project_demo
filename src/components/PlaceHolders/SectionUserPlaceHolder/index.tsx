import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function SectionUserPlaceHolder() {
  return (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item
        flexDirection="row"
        alignItems="center"
        paddingHorizontal={scale(24)}
        paddingVertical={verticalScale(8)}>
        <SkeletonPlaceholder.Item flex={1}>
          <SkeletonPlaceholder.Item width={scale(46)} height={scale(17)} />
          <SkeletonPlaceholder.Item
            width={scale(56)}
            height={scale(17)}
            marginTop={8}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
          <SkeletonPlaceholder.Item width={scale(24)} height={scale(24)} />
          <SkeletonPlaceholder.Item
            marginLeft={scale(16)}
            width={scale(24)}
            height={scale(24)}
          />
          <SkeletonPlaceholder.Item
            marginLeft={scale(16)}
            width={scale(24)}
            height={scale(24)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
