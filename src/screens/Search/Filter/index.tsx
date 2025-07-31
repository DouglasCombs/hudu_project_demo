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
import {goBack} from '~/navigation/Methods';
import {filterStore} from '~/stores';
import {Colors} from '~/styles';

export default function FilterScreen({navigation}: NavigationProp) {
  const {t} = useTranslation();
  const {filterData, allProjectObject} = useMockData();
  const {resetFilterTempData} = filterStore(state => state);

  const itemOnPressHandler = (item?: any) => {
    navigation.push(item.route);
  };

  const selectAllOnPress = () => {
    resetFilterTempData();
    goBack();
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
        item={allProjectObject}
        onPress={selectAllOnPress}
        textColor={Colors.PRIMARY}
      />
    );
  };

  const renderItem = ({item}: {item: stateType}) => {
    const isActive = false;
    return (
      <SelectRow
        item={item}
        borderBottom
        titleKey="title"
        isActive={isActive}
        onPress={itemOnPressHandler}
      />
    );
  };

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('filter.filterBy')} />
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      <CustomFlatList
        keyValue="Value"
        data={filterData}
        renderItem={renderItem}
        hasItemSeparatorComponent={false}
        listHeaderComponent={listHeaderComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 24,
  },
});
