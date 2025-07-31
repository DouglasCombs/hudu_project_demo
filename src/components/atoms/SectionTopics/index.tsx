import {Box, Center, Spacer, VStack} from 'native-base';
import React, {memo} from 'react';
import {useGetTopCategoryCourses} from '~/hooks/course';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';
import CustomFlatList from '../CustomFlatList';
import CustomText from '../CustomText';
import CustomTouchable from '../CustomTouchable';
import {useTranslation} from 'react-i18next';

const SectionTopics = () => {
  const {t} = useTranslation();

  const {isLoading, data: getCategories} = useGetTopCategoryCourses({
    order: {
      courseCount: 'DESC',
    },
  });
  const categories = getCategories?.pages ?? [];

  const renderItem = ({item}: {item: any}) => {
    return (
      <CustomTouchable
        onPress={() =>
          navigate('Courses', {
            category: {
              id: item?.category?.id,
              title: item?.category?.text,
            },
          })
        }>
        <Center
          px="4"
          py="1.5"
          borderRadius={'sm'}
          bg={Colors.WHITE}
          shadow={'2'}>
          <CustomText color={Colors.Topaz}>{item?.category?.text}</CustomText>
        </Center>
      </CustomTouchable>
    );
  };

  const itemSeparatorComponent = () => {
    return <Spacer w={scale(15)} />;
  };

  if (categories?.length === 0) return null;
  return (
    <VStack space="3">
      <Box px="4">
        <CustomText
          fontSize={fontSize.large}
          fontFamily={fontFamily.bold}
          color={Colors.BLACK}>
          {t('courses.Topics')}
        </CustomText>
      </Box>
      <CustomFlatList
        contentContainerStyle={{
          paddingVertical: 10,
          paddingStart: scale(18),
          paddingEnd: scale(18),
        }}
        renderItem={renderItem}
        {...{itemSeparatorComponent}}
        data={categories}
        horizontal
      />
    </VStack>
  );
};

export default memo(SectionTopics);
