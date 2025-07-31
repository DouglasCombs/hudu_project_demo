import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import {
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  AuthScreen,
  EmailVerificationScreen,
  CompleteProfileStepOneScreen,
  CompleteProfileStepTwoScreen,
  SelectLocationScreen,
} from '~/screens';
import {CustomHeader} from '~/components';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();

export type AuthStackParamList = {
  Auth: {parent: 'appNavigator' | 'mainStack' | 'mainTabs'};
  EmailVerification: {email: string};
  CompleteProfileStepOne: {parent: 'appNavigator' | 'mainStack' | 'mainTabs'};
  CompleteProfileStepTwo: {parent: 'appNavigator' | 'mainStack' | 'mainTabs'};
  SelectLocation: {value?: any; onChange?: any};
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

export default function AuthStack({route}: any) {
  const parent = route?.params!.parent;

  const authScreens = [
    {
      name: 'Auth',
      component: AuthScreen,
      initialParams: {parent},
      options: publicScreenOption,
    },
    {
      name: 'EmailVerification',
      component: EmailVerificationScreen,
      initialParams: {parent},
      options: publicScreenOption,
    },
    {
      name: 'CompleteProfileStepOne',
      component: CompleteProfileStepOneScreen,
      options: publicScreenOption,
      initialParams: {parent},
    },
    {
      name: 'CompleteProfileStepTwo',
      component: CompleteProfileStepTwoScreen,
      options: publicScreenOption,
      initialParams: {parent},
    },
    {
      name: 'Login',
      component: LoginScreen,
      options: publicScreenOption,
    },
    {
      name: 'SignUp',
      component: SignUpScreen,
      options: publicScreenOption,
    },
    {
      name: 'ForgotPassword',
      component: ForgotPasswordScreen,
      options: publicScreenOption,
    },
    {
      name: 'SelectLocation',
      component: SelectLocationScreen,
      options: publicScreenOption,
      initialParams: {parent},
    },
  ];

  return (
    <Stack.Navigator
      initialRouteName="Auth"
      // initialRouteName="CompleteProfileStepTwo"
    >
      {authScreens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
