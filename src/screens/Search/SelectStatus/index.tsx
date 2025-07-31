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
import {showInfoMessage} from '~/utils/utils';

export default function SelectStatusScreen({navigation}: NavigationProp) {
  const {t} = useTranslation();
  const {projectStatusData, allStatusObject} = useMockData();

  const {filterTempData, setFilterTempData} = filterStore(state => state);
  const [selectedItems, setSelectedItems] = useState<any>();
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    if (filterTempData?.status && filterTempData?.status?.length > 0) {
      setSelectedItems(filterTempData?.status);
    }
  }, [filterTempData]);

  const itemOnPressHandler = (item: any, isActive: boolean) => {
    setSelectAll(false);
    if (isActive) {
      let filtered = selectedItems.filter(function (itm: any) {
        return itm?.value !== item?.value;
      });
      setSelectedItems(filtered);
    } else {
      let checkboxData = [...(selectedItems ? [...selectedItems] : []), item];
      setSelectedItems(checkboxData);
    }
  };

  const selectAllOnPress = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(projectStatusData);
    }
    setSelectAll(prevState => !prevState);
  };

  const confirmOnPress = () => {
    if (selectAll) {
      setFilterTempData({
        ...filterTempData,
        status: projectStatusData,
      });
      navigation.popToTop();
    } else if (selectedItems?.length > 0) {
      setFilterTempData({
        ...filterTempData,
        status: selectedItems,
      });
      navigation.popToTop();
    } else {
      showInfoMessage(t('messages.errors.selectOneItem'));
    }
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
    const isActive = selectAll;
    return (
      <SelectRow
        px="0"
        mb="16px"
        borderBottom
        titleKey="title"
        internalPx="24px"
        type="multiSelect"
        isActive={isActive}
        item={allStatusObject}
        onPress={selectAllOnPress}
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
      <ScreensHeader backAction title={t('filter.status')} />
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      <CustomFlatList
        keyValue="Value"
        data={projectStatusData}
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
