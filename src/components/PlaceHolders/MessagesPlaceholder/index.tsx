import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function MessagesPlaceholder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item marginHorizontal={24}>
        <SkeletonPlaceholder.Item
          marginTop={verticalScale(10)}
          flexDirection="row"
          alignItems="center">
          <SkeletonPlaceholder.Item
            width={scale(56)}
            height={scale(56)}
            borderRadius={100}
            marginRight={8}
          />
          <SkeletonPlaceholder.Item flex={1}>
            <SkeletonPlaceholder.Item
              width={'60%'}
              height={verticalScale(12)}
              marginBottom={8}
            />
            <SkeletonPlaceholder.Item
              width={'40%'}
              height={verticalScale(10)}
            />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={'15%'} height={verticalScale(6)} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return (
    <CustomFlatList
      data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
      hasItemSeparatorComponent={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
