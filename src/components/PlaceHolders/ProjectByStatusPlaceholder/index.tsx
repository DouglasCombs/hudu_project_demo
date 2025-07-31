import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {verticalScale} from '~/utils/style';

export default function ProjectByStatusPlaceholder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item
        marginHorizontal={24}
        height={verticalScale(96)}
        alignItems="center"
        borderRadius={8}
      />
    </SkeletonPlaceholder>
  );

  return (
    <CustomFlatList
      data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 16,
  },
});
