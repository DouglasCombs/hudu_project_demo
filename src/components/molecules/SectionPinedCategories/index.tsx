import React, {useState} from 'react';
import {Box, Center, HStack} from 'native-base';
import {
  CustomFlatList,
  CustomText,
  CustomTouchable,
  CategoriesPlaceholder,
} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';
import {Colors} from '~/styles';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Category} from '~/generated/graphql';
import {useGetPinedCategories} from '~/hooks/category';
import {filterStore, userDataStore} from '~/stores';
import {useTranslation} from 'react-i18next';
import {navigate} from '~/navigation/Methods';

export default function SectionPinedCategories({
  onChange,
}: {
  onChange?: (cat: Category | undefined) => void;
}) {
  const {t} = useTranslation();

  const {userData, isOnboardingPinnedCategories} = userDataStore(
    state => state,
  );
  const {filterTempData, setFilterTempData} = filterStore(state => state);
  const [currentItem, setCurrentItem] = useState<Category | undefined>();

  const categoryOnChange = (inCategory: Category | undefined) => {
    setFilterTempData({
      ...filterTempData,
      category: inCategory ? [inCategory] : undefined,
    });
    onChange?.(inCategory);
  };

  const {data: categoryData, isLoading} = useGetPinedCategories({
    where: {
      userId: {eq: userData?.id},
    },
  });

  const onChangeHandler = (item: Category) => {
    if (currentItem?.id === item?.id) {
      setCurrentItem(undefined);
      categoryOnChange?.(undefined);
    } else {
      setCurrentItem(item);
      categoryOnChange?.(item);
    }
  };

  const pinTourOnPress = () => {
    navigate('SelectCategory');
  };

  const renderItem = ({item}: {item: {category: Category}}) => {
    const isActive = item?.category?.id === currentItem?.id;

    return (
      <CustomTouchable onPress={() => onChangeHandler(item?.category)}>
        <Center
          h="29px"
          minW="88px"
          shadow="4"
          rounded="sm"
          px="2"
          bg={isActive ? Colors.PRIMARY : Colors.WHITE}>
          <CustomText
            color={isActive ? Colors.WHITE : Colors.Topaz}
            fontFamily={fontFamily.regular}
            fontSize={fontSize.xTiny}>
            {item?.category?.text}
          </CustomText>
        </Center>
      </CustomTouchable>
    );
  };

  if (!isOnboardingPinnedCategories) {
    return (
      <HStack px="28px" mt="8px" mb="16px">
        <TouchableOpacity activeOpacity={0.7} onPress={pinTourOnPress}>
          <Center bg={Colors.WHITE_F} shadow="4" px="16px" py="8px">
            <CustomText fontSize={fontSize.xTiny} color={Colors.PRIMARY}>
              {t('search.tapToPinACategory')}
            </CustomText>
          </Center>
        </TouchableOpacity>
      </HStack>
    );
  }

  if (isLoading) {
    return <CategoriesPlaceholder />;
  }

  if (categoryData?.pages && categoryData?.pages?.length > 0) {
    return (
      <Box>
        <CustomFlatList
          horizontal
          data={categoryData?.pages ?? []}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
        />
      </Box>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
