import {HStack, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomContainer,
  CustomFlatList,
  CustomText,
  CustomTouchable,
  ScreensHeader,
  SelectRow,
} from '~/components';
import {useUSCities} from '~/hooks/location';
import {stateStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function SelectCityScreen({navigation, route}: NavigationProp) {
  const currentState = route!.params!.state;
  const {t} = useTranslation();

  const {stateTempData} = stateStore(state => state);
  const [selectedCities, setSelectedCities] = useState<any>();

  const {data, isLoading} = useUSCities(currentState?.title);

  useEffect(() => {
    setSelectedCities(stateTempData.city);
  }, [stateTempData]);

  const isEnable = (item: string) => {
    if (selectedCities) {
      if (selectedCities.indexOf(item) !== -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const itemOnPress = (city: string, isActive: boolean) => {
    if (city === t('location.allCity')) {
      if (isActive) {
        setSelectedCities([]);
      } else {
        setSelectedCities([...data, city]);
      }
    } else {
      if (isActive) {
        let filtered = selectedCities.filter(function (itm: any) {
          return itm !== city && itm !== t('location.allCity');
        });
        setSelectedCities(filtered);
      } else {
        let checkboxData = [
          ...(selectedCities ? [...selectedCities] : []),
          city,
        ];
        setSelectedCities(checkboxData);
      }
    }
  };

  const confirmOnPress = () => {
    stateStore.setState({
      stateTempData: {
        ...stateTempData,
        city: selectedCities,
      },
    });
    navigation.popToTop();
  };

  const clearAllOnPress = () => {
    setSelectedCities([]);
  };

  const listHeaderComponent = () => {
    const isActive = isEnable(t('location.allCity'));
    return (
      <SelectRow
        px="0"
        mb="16px"
        borderBottom
        internalPx="24px"
        type="multiSelect"
        isActive={isActive}
        item={t('location.allCity')}
        onPress={() => itemOnPress(t('location.allCity'), isActive)}
        textColor={Colors.PRIMARY}
      />
    );
  };

  const renderItem = ({item}: {item: string}) => {
    const isActive = isEnable(item);
    return (
      <SelectRow
        item={item}
        enabled={false}
        borderBottom
        type="multiSelect"
        isActive={isActive}
        onPress={() => itemOnPress(item, isActive)}
      />
    );
  };

  const keyExtractor = useCallback((_, item: string) => item, []);

  return (
    <CustomContainer isLoading={isLoading}>
      <ScreensHeader
        backAction
        title={stateTempData?.state?.title || t('location.locations')}
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
        data={data ?? []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
