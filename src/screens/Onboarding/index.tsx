import {VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Carousel} from 'react-native-snap-carousel-v4';
import {
  CustomButton,
  CustomContainer,
  CustomText,
  ScreensHeader,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {goBack, replace} from '~/navigation/Methods';
import {storeData} from '~/services/storage';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {fontFamily, fontSize, height, width} from '~/utils/style';

export default function OnboardingScreen() {
  const {onBoardingData} = useMockData();

  const {t} = useTranslation();

  const {setIsOnboardingViewed} = userDataStore(state => state);

  const [page, setPage] = useState(0);

  const CarouselRef = useRef<Carousel<any>>(null);

  const move = (inputPage: number, delta: number) => {
    CarouselRef?.current?.snapToItem(inputPage + delta);
  };

  const backOnPress = () => {
    if (page < 1) {
      goBack();
    } else {
      CarouselRef?.current?.snapToItem(page - 1);
    }
  };

  const onPressDone = async () => {
    await storeData('isOnboardingViewed', true);
    setIsOnboardingViewed(true);
    replace('AuthStack');
  };

  const renderItem = ({item}: {item: any}) => {
    const {title, description, image} = item;
    return (
      <FastImage
        style={styles.background}
        source={image}
        resizeMode={FastImage.resizeMode.stretch}>
        <VStack space="2" px="4" w={width} mb="128px">
          <CustomText
            fontSize={fontSize.xxLarge}
            fontFamily={fontFamily.bold}
            color={Colors.WHITE}>
            {title}
          </CustomText>
          <CustomText
            fontSize={fontSize.large}
            fontFamily={fontFamily.medium}
            color={Colors.WHITE}>
            {description}
          </CustomText>
        </VStack>
      </FastImage>
    );
  };

  return (
    <CustomContainer safeArea={isIos ? false : false} barStyle="light-content">
      <ScreensHeader
        position="absolute"
        backAction
        zIndex={100}
        backgroundColor={Colors.TRANSPARENT}
        backActionHandler={backOnPress}
      />
      <Carousel
        ref={CarouselRef}
        sliderWidth={width}
        layout={'default'}
        itemWidth={width}
        data={onBoardingData}
        renderItem={renderItem}
        pagingEnabled
        onSnapToItem={index => setPage(index)}
        contentContainerCustomStyle={styles.contentContainerCustomStyle}
      />

      <VStack
        space="8"
        alignItems="center"
        position="absolute"
        bottom="48px"
        px="24px"
        w="100%">
        <CustomButton
          outline
          color={Colors.WHITE}
          textColor={Colors.BLACK_1}
          width="100%"
          title={
            page !== onBoardingData.length - 1
              ? t('onBoarding.next')
              : t('onBoarding.letsGo')
          }
          onPress={() => {
            if (page !== onBoardingData.length - 1) {
              move(page, 1);
            } else {
              onPressDone();
            }
          }}
        />
      </VStack>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1},
  flex1: {flex: 1},
  contentContainerCustomStyle: {
    backgroundColor: Colors.Rhino,
    flexGrow: 1,
  },
  background: {
    flex: 1,
    width: width,
    height: height,
    padding: 0,
    justifyContent: 'flex-end',
  },
});
