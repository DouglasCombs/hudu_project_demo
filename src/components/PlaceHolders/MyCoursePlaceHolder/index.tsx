import {Box} from 'native-base';
import React, {useCallback} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale, width} from '~/utils/style';

export default function MyCoursePlaceHolder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <Box w={width * 0.8}>
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        highlightColor={Colors.BACKGROUND}>
        <SkeletonPlaceholder.Item marginBottom={scale(16)}>
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(10)}
            height={verticalScale(138)}
          />
          <SkeletonPlaceholder.Item
            width={'80%'}
            height={verticalScale(20)}
            marginTop={verticalScale(10)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width={'40%'}
            height={verticalScale(15)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width={'100%'}
            height={verticalScale(8)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width={'35%'}
            height={verticalScale(15)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    </Box>
  );

  return (
    <>
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        highlightColor={Colors.BACKGROUND}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            paddingHorizontal={24}
            width="100%"
            paddingVertical={verticalScale(8)}>
            <SkeletonPlaceholder.Item flex={1}>
              <SkeletonPlaceholder.Item width={scale(91)} height={scale(20)} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={scale(56)} height={scale(20)} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <Box px="24px">
        <CustomFlatList
          horizontal
          data={[0, 1, 2]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Box>
    </>
  );
}
