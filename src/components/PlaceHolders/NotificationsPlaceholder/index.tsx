import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {verticalScale} from '~/utils/style';

export default function NotificationsPlaceholder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item
        marginHorizontal={24}
        flexDirection="row"
        alignItems="center">
        <SkeletonPlaceholder.Item
          width={32}
          height={32}
          borderRadius={16}
          marginRight={12}
        />
        <SkeletonPlaceholder.Item flex={1}>
          <SkeletonPlaceholder.Item
            width={'70%'}
            height={verticalScale(12)}
            marginBottom={8}
          />
          <SkeletonPlaceholder.Item
            width={'40%'}
            height={verticalScale(12)}
            marginBottom={8}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={'12%'} height={verticalScale(8)} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  return (
    <CustomFlatList
      data={Array(10)}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 24,
  },
});
