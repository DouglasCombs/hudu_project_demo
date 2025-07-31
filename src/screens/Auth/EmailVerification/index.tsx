import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from '~/styles';
import {VStack} from 'native-base';
import {
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomText,
  ScreensHeader,
} from '~/components';
import {scale, verticalScale, fontSize, fontFamily} from '~/utils/style';
import {useAuth, useLogin, useSignUp, useFirebaseLink} from '~/hooks/auth';
import {useGetMessages} from '~/utils/helper';
import {authStore, userDataStore} from '~/stores';
import {ResponseStatus} from '~/generated/graphql';
import animations from '~/assets/animations';
import Lottie from 'lottie-react-native';
import {resetRoot} from '~/navigation/Methods';
import {storeData} from '~/services/storage';
import {useTranslation} from 'react-i18next';

export default function EmailVerificationScreen({route}: NavigationProp) {
  const email = route?.params!.email;
  const parent = route?.params!.parent;

  const {t} = useTranslation();
  const {showResponseMessage} = useGetMessages();

  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData} = userDataStore(state => state);

  const [loading, setLoading] = useState<boolean>(false);

  const {isSignedIn, isLoading: isSignedInLoading} = useAuth();
  const [firebaseLoading] = useFirebaseLink(email);

  const {mutate: loginMutate} = useLogin();
  const {mutate: signUpMutate} = useSignUp();

  useEffect(() => {
    const handleUser = async () => {
      if (isSignedIn) {
        completeLogin();
      }
    };

    handleUser().catch((err: any) => {});
  }, [isSignedIn]);

  const completeLogin = () => {
    setLoading(true);
    loginMutate(
      {},
      {
        onSuccess: async successData => {
          if (successData?.user_login?.status === ResponseStatus.Success) {
            if (successData?.user_login?.result?.isActive) {
              setUserData(successData?.user_login?.result);
              await storeData('isUserLoggedIn', true);
              setIsUserLoggedIn(true);
              setLoading(false);
              if (parent === 'appNavigator') {
                resetRoot('DrawerStack');
              }
            } else if (!successData?.user_login?.result?.isActive) {
              setLoading(false);
              showResponseMessage(ResponseStatus.UserIsNotActive);
            }
          } else if (
            successData?.user_login?.status === ResponseStatus.UserNotFound
          ) {
            completeSignUp();
          } else {
            setLoading(false);
            showResponseMessage(successData?.user_login?.status);
          }
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  const completeSignUp = async () => {
    signUpMutate(
      {},
      {
        onSuccess: () => {
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
        },
      },
    );
  };

  const isLoading = isSignedInLoading || loading || firebaseLoading;

  return (
    <CustomContainer
      statusBarBackgroundColor={Colors.WHITE_F}
      barStyle="dark-content"
      isLoading={isLoading}>
      <ScreensHeader
        backAction
        backgroundColor={Colors.WHITE_F}
        contentColor={Colors.BLACK}
      />
      <CustomKeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack flex={1} px="4" alignItems="center" justifyContent="center">
          <Lottie
            style={styles.lottie}
            source={animations.emailSend}
            loop={true}
            autoPlay
          />
        </VStack>
        <VStack flex={1} px="8" alignItems="center">
          <CustomText
            fontSize={fontSize.xLarge}
            fontFamily={fontFamily.bold}
            textAlign="center"
            marginTop={verticalScale(28)}>
            {t('auth.join')}
          </CustomText>
          <CustomText
            lineHeight={18}
            fontSize={fontSize.small}
            textAlign="center"
            marginTop={verticalScale(8)}>
            {t('auth.sentEmail')}
            {email}
          </CustomText>
          <CustomText
            lineHeight={18}
            fontSize={fontSize.small}
            textAlign="center"
            marginTop={verticalScale(2)}>
            {t('auth.check_your_email')}
          </CustomText>
        </VStack>
      </CustomKeyboardAwareScrollView>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  lottie: {height: scale(150), width: scale(150)},
});
