import {Center, HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomButton,
  CustomContainer,
  CustomText,
  CustomTouchable,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {navigate, replace} from '~/navigation/Methods';
import {getData} from '~/services/storage';
import {academyLangStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

type ItemProps = {
  language: languageType;
  title: string;
  isActive: boolean;
  onPress: (language: languageType) => void;
};

export default function LanguageScreen() {
  const {t, i18n} = useTranslation();
  const {languagesData} = useMockData();
  const {indexLang, setIndexLang} = academyLangStore(state => state);

  const [curLanguage, setCurLanguage] = useState<languageType>('en');

  const continueOnPress = async () => {
    const isOnboardingViewed = await getData('isOnboardingViewed');
    const isUserLoggedIn = await getData('isUserLoggedIn');
    i18n.changeLanguage(curLanguage);
    setIndexLang(curLanguage === 'sp' ? 1 : 0);

    if (isOnboardingViewed) {
      if (isUserLoggedIn) {
        replace('DrawerStack');
      } else {
        navigate('AuthStack');
      }
    } else {
      navigate('OnBoarding');
    }
  };

  return (
    <CustomContainer
      safeArea={false}
      statusBarBackgroundColor={Colors.WHITE_F}
      backgroundColor={Colors.WHITE_F}
      barStyle="dark-content">
      <VStack
        pb="58px"
        justifyContent="flex-end"
        flex={1}
        px="16px"
        alignItems="center"
        space="56px">
        <VStack space="16px">
          <CustomText
            textAlign="center"
            color={Colors.Rhino}
            fontFamily={fontFamily.medium}
            fontSize={fontSize.tooLarge}>
            {t('language.chooseYourLanguage')}
          </CustomText>
          <CustomText
            textAlign="center"
            color={Colors.Rhino}
            fontFamily={fontFamily.medium}
            fontSize={fontSize.small}>
            {t('language.selectTheLanguage')}
          </CustomText>
        </VStack>
        <VStack space="16px" w="100%">
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
        <CustomButton
          mt="18px"
          height={verticalScale(48)}
          title={t('common.continue')}
          onPress={continueOnPress}
        />
      </VStack>
    </CustomContainer>
  );
}

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
        px="16px"
        bg={Colors.SEARCH_BACKGROUND}>
        <CustomText
          color={isActive ? Colors.BLACK : Colors.Topaz}
          fontFamily={fontFamily.medium}
          fontSize={fontSize.xNormal}>
          {title}
        </CustomText>
        <Center
          bg={isActive ? Colors.WHITE : Colors.Gainsboro}
          borderColor={isActive ? Colors.PRIMARY : Colors.Gainsboro}
          rounded="full"
          borderWidth="1.5px"
          size="22px">
          {isActive && (
            <Center size="12px" rounded="full" bg={Colors.PRIMARY} />
          )}
        </Center>
      </HStack>
    </CustomTouchable>
  );
};
