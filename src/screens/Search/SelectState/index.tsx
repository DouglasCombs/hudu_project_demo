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
import {stateStore} from '~/stores';
import {Colors} from '~/styles';

export default function SelectStateScreen() {
  const {t} = useTranslation();
  const {stateList, allStateObject} = useMockData();
  const {stateTempData} = stateStore(state => state);

  const currentState = stateTempData?.state;

  const stateOnPressHandler = (state?: stateType) => {
    if (state?.value === allStateObject.value) {
      stateStore.setState({
        stateTempData: {
          defaultState: stateTempData.defaultState,
          state: undefined,
          city: undefined,
        },
      });
      goBack();
    } else {
      stateStore.setState({
        stateTempData: {
          defaultState: stateTempData.defaultState,
          state,
        },
      });
      goBack();
      // navigation.push('SelectCity', {state});
    }
  };

  const renderItem = ({item}: {item: stateType}) => {
    const isActive = item?.value === currentState?.value;
    return (
      <SelectRow
        item={item}
        borderBottom
        isActive={isActive}
        onPress={stateOnPressHandler}
        titleKey="title"
        enabled={item?.enabled}
        checkEnabled
      />
    );
  };

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('location.locations')} />
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      <CustomFlatList
        keyValue="Value"
        data={stateList}
        renderItem={renderItem}
        hasItemSeparatorComponent={false}
        contentContainerStyle={styles.contentContainerStyle}
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
