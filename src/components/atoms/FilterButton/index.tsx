import {Menu, VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, TouchableOpacityProps} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Filter} from '~/assets/icons';
import {CustomDropDown, CustomText} from '~/components';
import {useMockData} from '~/constants/mockData';
import {push} from '~/navigation/Methods';
import {authStore, filterStore} from '~/stores';
import {Colors} from '~/styles';

function FilterButton() {
  const {t} = useTranslation();

  const {defaultSortObject, defaultSortData, defaultAuthSortData} =
    useMockData();

  const modalRef = useRef<ModalRef>(null);

  const [shouldOverlapWithTrigger] = useState(false);
  const {filterTempData, setFilterTempData} = filterStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);

  const sortOnPress = () => {
    modalRef?.current?.open();
  };

  const onChangeSort = (item: any) => {
    if (item) {
      setFilterTempData({...filterTempData, sort: item});
    }
  };

  const locationOnPress = () => {
    push('SelectState');
  };

  const filterOnPress = () => {
    push('Filter');
  };

  const renderTrigger = (triggerProps: TouchableOpacityProps) => {
    return (
      <TouchableOpacity activeOpacity={0.7} {...triggerProps}>
        <Filter />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Menu
        w="160"
        shadow="3"
        rounded="lg"
        shouldOverlapWithTrigger={shouldOverlapWithTrigger}
        placement="bottom right"
        trigger={renderTrigger}>
        <VStack space="16px">
          <Menu.Item onPress={filterOnPress}>
            <CustomText>{t('search.filter')}</CustomText>
          </Menu.Item>
          <Menu.Item onPress={sortOnPress}>
            <CustomText>{t('search.sorting')}</CustomText>
          </Menu.Item>
          <Menu.Item onPress={locationOnPress}>
            <CustomText>{t('search.location')}</CustomText>
          </Menu.Item>
        </VStack>
      </Menu>
      <CustomDropDown
        ref={modalRef}
        data={isUserLoggedIn ? defaultSortData : defaultAuthSortData}
        onChange={onChangeSort}
        value={filterTempData?.sort ?? defaultSortObject}
        titleKey="title"
        alignItems="center"
        justifyContent="center"
        modalTitle={t('search.sorting')}
        showButton={false}
      />
    </>
  );
}

export default FilterButton;
