import {HStack, Spinner, VStack} from 'native-base';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Pin} from '~/assets/icons';
import {
  CustomButton,
  CustomContainer,
  CustomFlatList,
  CustomText,
  CustomTouchable,
  PinOnBoardingModal,
  ScreensHeader,
  SelectRow,
} from '~/components';
import {Category} from '~/generated/graphql';
import {usePinCategory, useUnPinCategory} from '~/hooks/category';
import {useGetProjectCategories} from '~/hooks/project';
import {filterStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {useGetLanguageTitle} from '~/utils/utils';

export default function SelectSubCategoryScreen({
  navigation,
  route,
}: NavigationProp) {
  const category: any = route!.params;
  const {t} = useTranslation();
  const {getLanguageText} = useGetLanguageTitle();

  const {isOnboardingPinnedCategories} = userDataStore(state => state);
  const {filterTempData, setFilterTempData} = filterStore(state => state);
  const [selectedSubCategories, setSelectedSubCategories] = useState<any>();

  const {mutate: mutatePinCategory, isLoading: isLoadingPinCategory} =
    usePinCategory();
  const {mutate: mutateUnPinCategory, isLoading: isLoadingUnPinCategory} =
    useUnPinCategory();

  const {
    data: categoryData,
    isLoading: isLoadingGetCategory,
    isFetchingNextPage: isFetchingNextPageCategories,
    refetch: refetchCategories,
    fetchNextPage: fetchNextPageCategories,
    hasNextPage: hasNextPageCategories,
  } = useGetProjectCategories({
    where: {
      category: {
        or: [
          {
            parentId: {eq: category?.id},
          },
          {
            id: {eq: category?.id},
          },
        ],
      },
    },
  });

  const categories = categoryData?.pages ?? [];

  const isPinned = useMemo(() => {
    let pinned = false;
    if (categories?.length > 0) {
      const res = categories?.find(el => el?.category?.id === category?.id);
      if (res?.isPined) {
        pinned = true;
      }
    }
    return pinned;
  }, [categories, category]);

  useEffect(() => {
    if (filterTempData?.category?.length > 0) {
      setSelectedSubCategories(filterTempData?.category);
    }
  }, [filterTempData]);

  const isEnable = (item: number) => {
    if (selectedSubCategories) {
      const temp = selectedSubCategories?.find((el: any) => el?.id === item);
      if (temp) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const itemOnPress = (item: Category, isActive: boolean) => {
    if (item?.id === category?.id) {
      if (isActive) {
        setSelectedSubCategories([]);
      } else {
        setSelectedSubCategories(categories?.map((el: any) => el?.category));
      }
    } else {
      if (isActive) {
        let filtered = selectedSubCategories?.filter(function (itm: any) {
          return itm?.id !== item?.id && itm?.id !== category?.id;
        });
        setSelectedSubCategories(filtered);
      } else {
        let filtered = selectedSubCategories?.filter(function (itm: any) {
          return itm?.id !== category?.id;
        });
        let checkboxData = [...(filtered ? [...filtered] : []), item];
        setSelectedSubCategories(checkboxData);
      }
    }
  };

  const confirmOnPress = () => {
    if (selectedSubCategories?.length > 0) {
      const filteredData = filterTempData?.category?.filter((itm: any) => {
        return itm?.parentId !== category?.id;
      });
      setFilterTempData({
        ...filterTempData,
        category: [
          ...(filteredData?.length > 0 ? [...filteredData] : []),
          ...selectedSubCategories,
        ],
      });
      navigation.popToTop();
    } else {
      const filteredData = filterTempData?.category?.filter((itm: any) => {
        return itm?.parentId !== category?.id;
      });

      setFilterTempData({
        ...filterTempData,
        category: filteredData,
      });
      navigation.popToTop();
    }
  };

  const clearAllOnPress = () => {
    setSelectedSubCategories([]);
  };

  const pinOnPress = () => {
    if (category?.id) {
      if (isPinned) {
        mutateUnPinCategory({categoryId: category?.id});
      } else {
        mutatePinCategory({categoryId: category?.id});
      }
    }
  };

  const onLoadMore = () => {
    if (hasNextPageCategories) {
      fetchNextPageCategories();
    }
  };

  const renderItem = ({
    item,
  }: {
    item: {category: Category; isPinned: boolean};
  }) => {
    const isActive = isEnable(item?.category?.id);
    const textColor =
      item?.category?.id === category?.id ? Colors.PRIMARY : undefined;

    return (
      <SelectRow
        item={item?.category}
        borderBottom
        titleKey={getLanguageText()}
        type="multiSelect"
        isActive={isActive}
        onPress={() => itemOnPress(item?.category, isActive)}
        textColor={textColor}
      />
    );
  };

  const keyExtractor = useCallback((_, item: string) => item, []);

  return (
    <CustomContainer>
      <ScreensHeader
        backAction
        title={category?.text || t('filter.subCategory')}
        rightHeader={
          <CustomTouchable
            disabled={isLoadingPinCategory || isLoadingUnPinCategory}
            onPress={pinOnPress}>
            {isLoadingPinCategory || isLoadingUnPinCategory ? (
              <Spinner size="sm" color={Colors.WHITE} />
            ) : (
              <Pin fillColor={isPinned ? Colors.WHITE : 'none'} />
            )}
          </CustomTouchable>
        }
      />
      <HStack
        px="24px"
        h="44px"
        w="100%"
        alignItems="center"
        justifyContent="flex-end"
        bg={Colors.SEARCH_BACKGROUND}>
        <CustomTouchable onPress={clearAllOnPress}>
          <CustomText
            fontFamily={fontFamily.medium}
            color={Colors.PRIMARY}
            fontSize={fontSize.xNormal}>
            {t('common.clearAll')}
          </CustomText>
        </CustomTouchable>
      </HStack>
      <CustomFlatList
        isLoading={isLoadingGetCategory}
        data={categories}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        hasItemSeparatorComponent={false}
        contentContainerStyle={styles.contentContainerStyle}
        hasListEmptyComponent={false}
        isFetchingNextPage={isFetchingNextPageCategories}
        onEndReached={onLoadMore}
        onRefresh={refetchCategories}
      />
      <VStack px="24px" pb="24px" pt="8px">
        <CustomButton title={t('common.done')} onPress={confirmOnPress} />
      </VStack>
      {!isOnboardingPinnedCategories && <PinOnBoardingModal />}
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 24,
  },
});
