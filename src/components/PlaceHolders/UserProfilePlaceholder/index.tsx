import {ScrollView} from 'native-base';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function UserProfilePlaceholder() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} flex={1} mx="4" mt="8">
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        highlightColor={Colors.BACKGROUND}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(70)}
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <SkeletonPlaceholder.Item
              width={scale(70)}
              height={scale(70)}
              marginRight={scale(50)}
              borderRadius={scale(1000)}
            />
            <SkeletonPlaceholder.Item
              width={scale(100)}
              height={verticalScale(35)}
              borderRadius={1000}
              alignSelf="flex-end"
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={scale(250)}
            height={verticalScale(13)}
            marginTop={verticalScale(35)}
          />
          <SkeletonPlaceholder.Item
            width={scale(265)}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
          />

          <SkeletonPlaceholder.Item
            marginTop={verticalScale(25)}
            flexDirection="row"
            alignItems="center">
            <SkeletonPlaceholder.Item
              width={scale(100)}
              height={verticalScale(100)}
              marginRight={scale(12)}
            />
            <SkeletonPlaceholder.Item
              width={scale(100)}
              height={verticalScale(100)}
              marginRight={scale(12)}
            />
            <SkeletonPlaceholder.Item
              width={scale(100)}
              height={verticalScale(100)}
              marginRight={scale(12)}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            marginTop={scale(25)}
            width={scale(83)}
            height={verticalScale(13)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(15)}
            width={'80%'}
            height={verticalScale(8)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width={'85%'}
            height={verticalScale(8)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width={'75%'}
            height={verticalScale(8)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(16)}
            height={verticalScale(150)}
            borderRadius={verticalScale(10)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(16)}
            height={verticalScale(150)}
            borderRadius={verticalScale(10)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </ScrollView>
  );
}
