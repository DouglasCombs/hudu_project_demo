import {Spacer} from 'native-base';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function ManageBidsPlaceholder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginBottom={16}
          flexDirection="row"
          alignItems="center">
          <SkeletonPlaceholder.Item flex={1}>
            <SkeletonPlaceholder.Item
              marginBottom={8}
              width={scale(65)}
              height={scale(16)}
            />
            <SkeletonPlaceholder.Item width={scale(85)} height={scale(13)} />
          </SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={scale(24)} height={scale(24)} />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          height={verticalScale(16)}
          marginBottom={8}
          width={scale(65)}
        />
        <SkeletonPlaceholder.Item marginBottom={8} height={verticalScale(13)} />
        <SkeletonPlaceholder.Item marginBottom={8} height={verticalScale(13)} />
        <SkeletonPlaceholder.Item
          width={'80%'}
          marginBottom={16}
          height={verticalScale(13)}
        />
        <SkeletonPlaceholder.Item
          height={verticalScale(16)}
          marginBottom={8}
          width={scale(165)}
        />
        <SkeletonPlaceholder.Item
          height={verticalScale(16)}
          marginBottom={16}
          width={scale(35)}
        />
        <SkeletonPlaceholder.Item
          height={verticalScale(16)}
          marginBottom={8}
          width={scale(265)}
        />
        <SkeletonPlaceholder.Item
          height={verticalScale(16)}
          width={scale(35)}
          marginBottom={16}
        />
        <SkeletonPlaceholder.Item height={verticalScale(1)} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  const itemSeparatorComponent = useCallback(() => <Spacer my="16px" />, []);

  return (
    <CustomFlatList
      data={[0, 1, 2]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      itemSeparatorComponent={itemSeparatorComponent}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
});
