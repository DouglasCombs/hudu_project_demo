import {Center} from 'native-base';
import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import images from '~/assets/images';
import {CustomContainer, CustomImage} from '~/components';
import {replace} from '~/navigation/Methods';
import {getData} from '~/services/storage';
import {tempStore} from '~/stores';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {height, width} from '~/utils/style';

export default function SplashScreen({route}: NavigationProp) {
  const params = route?.params;

  useEffect(() => {
    continueApp();
  }, []);

  const continueApp = async () => {
    if (params?.referral) {
      tempStore.setState({referralCode: params?.referral});
    }
    const timer = setTimeout(() => {
      goToNext();
    }, 2000);
    return () => clearTimeout(timer);
  };

  const goToNext = async () => {
    const isOnboardingViewed = await getData('isOnboardingViewed');
    const isUserLoggedIn = await getData('isUserLoggedIn');
    if (isOnboardingViewed) {
      if (isUserLoggedIn) {
        replace('DrawerStack');
      } else {
        replace('AuthStack');
      }
    } else {
      replace('Language');
    }
  };

  return (
    <CustomContainer
      statusBarBackgroundColor={Colors.PRIMARY_2}
      barStyle="dark-content"
      safeArea={isIos ? false : true}>
      <ImageBackground
        source={images.splashImage}
        style={styles.image}
        resizeMode="cover">
        <Center w={width} h={height} position={'absolute'}>
          <CustomImage
            local
            imageSource={images.huduLogoWhite}
            style={styles.logo}
            resizeMode="contain"
          />
        </Center>
      </ImageBackground>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  image: {
    width,
    height,
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
    width: width / 1.7,
    height: width / (1.7 * (1000 / 233)),
  },
});
