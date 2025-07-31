import {Spacer} from 'native-base';
import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

export default function ProjectBidsPlaceholder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item marginBottom={scale(16)}>
        <SkeletonPlaceholder.Item width={scale(123)} height={scale(20)} />
        <SkeletonPlaceholder.Item
          marginTop={verticalScale(10)}
          height={verticalScale(42)}
        />
        <SkeletonPlaceholder.Item
          marginTop={verticalScale(10)}
          flexDirection="row"
          alignItems="center">
          <SkeletonPlaceholder.Item
            width={scale(32)}
            height={scale(32)}
            marginRight={scale(12)}
            borderRadius={scale(16)}
          />
          <SkeletonPlaceholder.Item
            width={scale(68)}
            height={verticalScale(15)}
          />
        </SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          marginTop={verticalScale(10)}
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
          marginTop={scale(16)}
          width={scale(83)}
          height={verticalScale(13)}
        />
        <SkeletonPlaceholder.Item
          marginTop={scale(8)}
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
          height={verticalScale(38)}
          borderRadius={verticalScale(38)}
        />
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
        data={[0, 1, 2]}
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
