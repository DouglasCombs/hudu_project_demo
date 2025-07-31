import {Box} from 'native-base';
import React, {useCallback} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {verticalScale, width} from '~/utils/style';

export default function ProjectsByCityPlaceHolder() {
  const keyExtractor = useCallback((item: number) => item, []);

  const renderItem = () => (
    <SkeletonPlaceholder
      borderRadius={4}
      speed={1000}
      highlightColor={Colors.BACKGROUND}>
      <SkeletonPlaceholder.Item width={width * 0.8}>
        <SkeletonPlaceholder.Item height={verticalScale(113)} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  const itemSeparatorComponent = useCallback(() => <Box w="12px" />, []);

  return (
    <Box px="24px">
      <CustomFlatList
        horizontal
        data={[0, 1, 2]}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        itemSeparatorComponent={itemSeparatorComponent}
      />
    </Box>
  );
}
