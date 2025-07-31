import {Box, HStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet} from 'react-native';
import {ChevronRight} from '~/assets/icons';
import {
  CustomContainer,
  CustomFlatList,
  CustomText,
  CustomTouchable,
  ScreensHeader,
  SectionDeleteAccount,
} from '~/components';
import {PrivacyUrl, TermsUrl} from '~/constants/constants';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';

const SettingsScreen = () => {
  const {t} = useTranslation();

  const data = [
    {
      title: t('profile.settings.account'),
      onPress: () => navigate('EditProfile'),
    },
    {
      title: t('profile.settings.language'),
      onPress: () => navigate('EditLanguage'),
    },
    {
      title: t('profile.settings.notification'),
      onPress: () => navigate('NotificationSettings'),
    },
    {
      title: t('profile.settings.termsOfAgreement'),
      onPress: () => onItemPressHandler(TermsUrl),
    },
    {
      title: t('profile.settings.privacyPolicy'),
      onPress: () => onItemPressHandler(PrivacyUrl),
    },
  ];

  const onItemPressHandler = (item: any) => {
    if (item) {
      Linking.openURL(item);
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <CustomTouchable onPress={item?.onPress}>
        <HStack
          py="4"
          mx="4"
          borderBottomWidth={'1'}
          borderColor={Colors.Gainsboro}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <CustomText>{item?.title}</CustomText>
          <ChevronRight />
        </HStack>
      </CustomTouchable>
    );
  };

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('profile.settings.settings')} />
      <Box h="4" w="100%" bg={Colors.SEARCH_BACKGROUND} />
      <CustomFlatList
        data={data}
        renderItem={renderItem}
        hasItemSeparatorComponent={false}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <SectionDeleteAccount />
    </CustomContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
