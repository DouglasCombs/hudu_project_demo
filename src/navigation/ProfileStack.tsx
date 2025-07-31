import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CommonActions} from '@react-navigation/native';
import {
  ReviewsScreen,
  EditProfileScreen,
  NotificationScreen,
  LoginScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  AuthScreen,
  ProfileScreen,
  SettingsScreen,
} from '~/screens';
import {CustomHeader} from '~/components';
import {authStore} from '~/stores';

const Stack = createNativeStackNavigator();

export type ProfileStackParamList = {
  Profile: undefined;
  EditProfile: undefined;
  Reviews: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Auth: undefined;
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const profileScreens = [
  {
    name: 'Profile',
    component: ProfileScreen,
    options: publicScreenOption,
  },
  {
    name: 'EditProfile',
    component: EditProfileScreen,
    options: publicScreenOption,
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    options: publicScreenOption,
  },
  {
    name: 'Reviews',
    component: ReviewsScreen,
    options: {
      headerTitle: 'Reviews',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'Notification',
    component: NotificationScreen,
    options: {
      headerTitle: 'Notifications',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
];

const authScreens = [
  {
    name: 'Auth',
    component: AuthScreen,
    options: {
      headerTitle: '',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: {
      headerTitle: 'Login',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
    options: {
      headerTitle: 'Create account',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
  {
    name: 'ForgotPassword',
    component: ForgotPasswordScreen,
    options: {
      headerTitle: 'Forgot password',
      headerShown: true,
      header: ({route, options, navigation}: any) => (
        <CustomHeader back {...{route, options, navigation}} />
      ),
    },
  },
];

export default function ProfileStack() {
  const {isUserLoggedIn} = authStore(state => state);

  return (
    <Stack.Navigator>
      {isUserLoggedIn
        ? profileScreens.map(screen => (
            //@ts-ignore
            <Stack.Screen key={screen.name} {...screen} />
          ))
        : authScreens.map(screen => (
            //@ts-ignore
            <Stack.Screen key={screen.name} {...screen} />
          ))}
    </Stack.Navigator>
  );
}
