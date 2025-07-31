import {ScrollView} from 'native-base';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function ProjectDetailsPlaceholder() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} flex={1} mx="4" mt="8">
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        highlightColor={Colors.BACKGROUND}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(10)}
            height={verticalScale(200)}
          />
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(10)}
            flexDirection="row"
            alignItems="center">
            <SkeletonPlaceholder.Item
              width={scale(15)}
              height={scale(15)}
              marginRight={scale(12)}
              borderRadius={scale(16)}
            />
            <SkeletonPlaceholder.Item
              width={scale(80)}
              height={verticalScale(8)}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={scale(250)}
            height={verticalScale(13)}
            marginTop={verticalScale(10)}
          />
          <SkeletonPlaceholder.Item
            width={scale(265)}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
          />
          <SkeletonPlaceholder.Item
            width={scale(200)}
            marginTop={verticalScale(10)}
            height={verticalScale(13)}
          />
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(25)}
            flexDirection="row"
            alignItems="center">
            <SkeletonPlaceholder.Item flex={1}>
              <SkeletonPlaceholder.Item
                width={scale(101)}
                height={verticalScale(13)}
              />
              <SkeletonPlaceholder.Item
                marginTop={scale(8)}
                width={scale(84)}
                height={verticalScale(13)}
              />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item flex={1}>
              <SkeletonPlaceholder.Item
                width={scale(101)}
                height={verticalScale(13)}
              />
              <SkeletonPlaceholder.Item
                marginTop={scale(8)}
                width={scale(84)}
                height={verticalScale(13)}
              />
            </SkeletonPlaceholder.Item>
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
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </ScrollView>
  );
}
