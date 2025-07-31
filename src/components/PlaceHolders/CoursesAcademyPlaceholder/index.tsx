import {Box, HStack, ScrollView} from 'native-base';
import React, {useCallback} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomFlatList} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale, width} from '~/utils/style';

export default function CoursesAcademyPlaceholder() {
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
    <ScrollView>
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1000}
        highlightColor={Colors.BACKGROUND}>
        <Box px="24px" w={'90%'} alignSelf={'center'}>
          <SkeletonPlaceholder.Item
            width={'90%'}
            alignSelf="center"
            marginTop={scale(15)}
            height={verticalScale(150)}></SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            marginTop={scale(12)}
            width={'40%'}
            marginLeft="5%"
            height={verticalScale(18)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width={'90%'}
            alignSelf="center"
            height={verticalScale(18)}
          />
          <SkeletonPlaceholder.Item
            marginTop={scale(8)}
            width={'40%'}
            marginLeft="5%"
            height={verticalScale(18)}
          />
        </Box>
      </SkeletonPlaceholder>

      <Box px="24px" mt="8">
        <CustomFlatList
          horizontal
          data={[0, 1, 2]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
        <CustomFlatList
          horizontal
          data={[0, 1, 2]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
        <CustomFlatList
          horizontal
          data={[0, 1, 2]}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </Box>
    </ScrollView>
  );
}
