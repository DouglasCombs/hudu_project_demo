import {Box} from 'native-base';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function MyBidPlaceHolder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <Box>
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        highlightColor={Colors.BACKGROUND}>
        <SkeletonPlaceholder.Item marginBottom={scale(16)}>
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(10)}
            height={verticalScale(183)}
          />
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(10)}
            flexDirection="row">
            <SkeletonPlaceholder.Item
              width={scale(84)}
              height={verticalScale(20)}
              marginRight={scale(8)}
            />
            <SkeletonPlaceholder.Item
              width={scale(68)}
              height={verticalScale(20)}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width={'90%'}
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
              <SkeletonPlaceholder.Item width={scale(123)} height={scale(20)} />
            </SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={scale(56)} height={scale(20)} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <CustomFlatList
        data={[0, 1, 2]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
});
