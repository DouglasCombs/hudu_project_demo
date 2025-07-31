import {Box, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomContainer,
  CustomFlatList,
  ScreensHeader,
  SelectRow,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {filterStore} from '~/stores';
import {Colors} from '~/styles';

export default function SelectTimeFilterScreen({navigation}: NavigationProp) {
  const {t} = useTranslation();
  const {timeStatusData, allTimeObject} = useMockData();

  const {filterTempData, setFilterTempData} = filterStore(state => state);
  const [selectedItems, setSelectedItems] = useState<any>();

  useEffect(() => {
    setSelectedItems(filterTempData.time);
  }, [filterTempData]);

  const itemOnPressHandler = (item: any, isActive: boolean) => {
    if (item?.value === allTimeObject?.value) {
      if (isActive) {
        setSelectedItems([]);
      } else {
        setSelectedItems([...timeStatusData, item]);
      }
    } else {
      if (isActive) {
        let filtered = selectedItems?.filter(function (itm: any) {
          return itm?.value === item?.value;
        });
        setSelectedItems(filtered);
      } else {
        setSelectedItems([item]);
      }
    }
  };

  const confirmOnPress = () => {
    setFilterTempData({
      ...filterTempData,
      time: selectedItems,
    });
    navigation.popToTop();
  };

  const isEnable = (item: any) => {
    if (selectedItems?.length > 0) {
      const selectedValues = selectedItems?.map(
        (selectedItem: any) => selectedItem?.value,
      );
      return selectedValues.includes(item?.value);
    } else {
      return false;
    }
  };

  const listHeaderComponent = () => {
    const isActive = isEnable(allTimeObject);
    return (
      <SelectRow
        px="0"
        mb="16px"
        borderBottom
        titleKey="title"
        internalPx="24px"
        type="multiSelect"
        isActive={isActive}
        item={allTimeObject}
        onPress={() => itemOnPressHandler(allTimeObject, isActive)}
        textColor={Colors.PRIMARY}
      />
    );
  };

  const renderItem = ({item}: {item: any}) => {
    const isActive = isEnable(item);
    return (
      <SelectRow
        item={item}
        borderBottom
        titleKey="title"
        type="multiSelect"
        isActive={isActive}
        onPress={() => itemOnPressHandler(item, isActive)}
      />
    );
  };

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('filter.time')} />
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      <CustomFlatList
        keyValue="Value"
        data={timeStatusData}
        renderItem={renderItem}
        hasItemSeparatorComponent={false}
        listHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <VStack px="24px" pb="24px" pt="8px">
        <CustomButton title={t('common.done')} onPress={confirmOnPress} />
      </VStack>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 24,
  },
});
