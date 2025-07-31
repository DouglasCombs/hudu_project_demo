import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function CategoriesPlaceholder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item marginBottom={scale(16)}>
        <SkeletonPlaceholder.Item
          width={scale(88)}
          height={verticalScale(29)}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return (
    <CustomFlatList
      horizontal
      data={[0, 1, 2, 4, 5, 6]}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
