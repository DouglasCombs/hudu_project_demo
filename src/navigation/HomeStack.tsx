import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import {HomeScreen, SearchScreen} from '~/screens';
import {isIos} from '~/utils/helper';

const Stack = createNativeStackNavigator();

export type HomeStackParamList = {
  Home: undefined;
  Search: undefined;
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Home',
    component: HomeScreen,
    options: publicScreenOption,
  },
  {
    name: 'Search',
    component: SearchScreen,
    options: {
      headerShown: false,
      presentation: 'card',
      ...(isIos
        ? TransitionPresets.ModalTransition
        : TransitionPresets.FadeFromBottomAndroid),
    },
  },
];

export default function HomeStack() {
  return (
    <Stack.Navigator>
      {screens.map(screen => (
        //@ts-ignore
        <Stack.Screen key={screen.name} {...screen} />
      ))}
    </Stack.Navigator>
  );
}
