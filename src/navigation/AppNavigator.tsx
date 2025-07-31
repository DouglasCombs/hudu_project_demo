import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OnboardingScreen, SplashScreen, LanguageScreen} from '~/screens';
import DrawerStack from './DrawerStack';
import {navigationRef} from './Methods';
import {CustomLoading} from '~/components';
import AuthStack from './AuthStack';
import linking from './linking';

const Stack = createNativeStackNavigator();

export type AppNavigatorParamList = {
  Splash: undefined;
  OnBoarding: undefined;
  Language: undefined;
  DrawerStack: undefined;
  AuthStack: undefined;
};

const navigatorOptions = {
  headerShown: false,
};

export default function AppNavigator() {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<CustomLoading />}
      ref={navigationRef}>
      <Stack.Navigator screenOptions={navigatorOptions}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="DrawerStack" component={DrawerStack} />
        <Stack.Screen
          initialParams={{parent: 'appNavigator'}}
          name="AuthStack"
          component={AuthStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
