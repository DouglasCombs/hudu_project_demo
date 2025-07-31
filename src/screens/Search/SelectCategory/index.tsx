import {Box} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CustomContainer,
  CustomFlatList,
  ScreensHeader,
  SelectRow,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {useGetProjectCategories} from '~/hooks/project';
import {goBack} from '~/navigation/Methods';
import {filterStore} from '~/stores';
import {Colors} from '~/styles';
import {useGetLanguageTitle} from '~/utils/utils';

export default function SelectCategoryScreen({navigation}: NavigationProp) {
  const {t} = useTranslation();
  const {getLanguageText} = useGetLanguageTitle();
  const {allCategoryObject} = useMockData();

  const {filterTempData} = filterStore(state => state);

  const {
    data: categoryData,
    isLoading: isLoadingGetCategory,
    isFetchingNextPage: isFetchingNextPageCategories,
    refetch: refetchCategories,
    fetchNextPage: fetchNextPageCategories,
    hasNextPage: hasNextPageCategories,
  } = useGetProjectCategories({
    pageSize: 20,
    where: {
      category: {
        parentId: {eq: null},
      },
    },
  });

  const isEnable = (item: any) => {
    const temp = filterTempData?.category?.find((el: any) => el?.id === item);
    if (temp) {
      return true;
    } else {
      return false;
    }
  };

  const itemOnPress = (item?: any) => {
    if (item?.value === allCategoryObject.value) {
      goBack();
    } else {
      navigation.push('SelectSubCategory', item);
    }
  };

  const onLoadMore = () => {
    if (hasNextPageCategories) {
      fetchNextPageCategories();
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <SelectRow
        titleKey={getLanguageText()}
        item={item?.category}
        borderBottom
        onPress={itemOnPress}
      />
    );
  };

  const listHeaderComponent = () => {
    const isActive = false;
    return (
      <SelectRow
        px="0"
        mb="16px"
        borderBottom
        titleKey="title"
        internalPx="24px"
        isActive={isActive}
        item={allCategoryObject}
        onPress={() => itemOnPress(allCategoryObject)}
        textColor={Colors.PRIMARY}
      />
    );
  };

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('filter.category')} />
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      <CustomFlatList
        isLoading={isLoadingGetCategory}
        data={categoryData?.pages ?? []}
        renderItem={renderItem}
        hasItemSeparatorComponent={false}
        listHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
        isFetchingNextPage={isFetchingNextPageCategories}
        onEndReached={onLoadMore}
        onRefresh={refetchCategories}
      />
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 16,
  },
});
