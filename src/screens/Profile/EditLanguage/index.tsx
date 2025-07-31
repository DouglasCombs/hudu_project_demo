import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomButton,
  CustomContainer,
  CustomText,
  CustomTouchable,
  ScreensHeader,
} from '~/components';
import {Center, HStack, VStack, View} from 'native-base';
import {useMockData} from '~/constants/mockData';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {Stop, TickSquare} from 'iconsax-react-native';
import {goBack} from '~/navigation/Methods';
import {isAndroid} from '~/utils/helper';
import {academyLangStore} from '~/stores';

const EditLanguageScreen = () => {
  const {t, i18n} = useTranslation();
  const {languagesData} = useMockData();
  const {indexLang, setIndexLang} = academyLangStore(state => state);

  const [curLanguage, setCurLanguage] = useState<languageType>('en');

  useEffect(() => {
    setCurLanguage(i18n.language);
  }, []);

  const continueOnPress = async () => {
    i18n.changeLanguage(curLanguage);
    setIndexLang(curLanguage === 'sp' ? 1 : 0);
    goBack();
  };

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('profile.settings.language')} />
      <View h="4" w="100%" bg={Colors.SEARCH_BACKGROUND} />
      <VStack mt="4" px="4" flex={1}>
        {languagesData.map((item: any) => {
          const isActive = item?.language === curLanguage;
          return (
            <Item
              key={item?.language}
              onPress={setCurLanguage}
              language={item?.language}
              isActive={isActive}
              title={item?.title}
            />
          );
        })}
      </VStack>
      <Center px="4" pb={isAndroid ? '4' : undefined}>
        <CustomButton
          title={t('projects.createProject.save')}
          onPress={continueOnPress}
        />
      </Center>
    </CustomContainer>
  );
};

export default EditLanguageScreen;

const Item = ({language, title, isActive, onPress}: ItemProps) => {
  const onPressHandler = () => {
    onPress?.(language);
  };

  return (
    <CustomTouchable onPress={onPressHandler}>
      <HStack
        h="48px"
        rounded="sm"
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        px="16px">
        <CustomText fontFamily={fontFamily.medium} fontSize={fontSize.xNormal}>
          {title}
        </CustomText>
        {isActive ? (
          <TickSquare size="24" color={Colors.PRIMARY} variant="Bold" />
        ) : (
          <Stop size="24" color={Colors.Ghost} variant="Outline" />
        )}
      </HStack>
    </CustomTouchable>
  );
};
