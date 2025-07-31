import {Spacer} from 'native-base';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function ProjectQAPlaceholder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginTop={verticalScale(10)}
          flexDirection="row"
          alignItems="center">
          <SkeletonPlaceholder.Item
            width={scale(40)}
            height={scale(40)}
            marginRight={scale(12)}
            borderRadius={scale(1000)}
          />
          <SkeletonPlaceholder.Item
            width={scale(100)}
            height={verticalScale(15)}
          />
        </SkeletonPlaceholder.Item>

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
          marginTop={verticalScale(20)}
          flexDirection="row"
          width={'75%'}
          alignItems="center">
          <SkeletonPlaceholder.Item
            width={scale(50)}
            marginRight={scale(12)}
            height={verticalScale(15)}
          />
          <SkeletonPlaceholder.Item
            width={scale(50)}
            marginRight={scale(12)}
            height={verticalScale(15)}
          />
          <SkeletonPlaceholder.Item
            width={scale(50)}
            height={verticalScale(15)}
          />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  const itemSeparatorComponent = useCallback(() => <Spacer my="16px" />, []);

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
            <SkeletonPlaceholder.Item flex={1} />
            <SkeletonPlaceholder.Item width={scale(56)} height={scale(20)} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
      <CustomFlatList
        data={[0, 1, 2, 3, 4, 5]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        itemSeparatorComponent={itemSeparatorComponent}
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
