import {createDrawerNavigator} from '@react-navigation/drawer';
import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {MainDrawerContent} from '~/components';
import {useClarity} from '~/hooks/clarity';
import MainStack from './MainStack';

const Drawer = createDrawerNavigator();

export type DrawerStackParamList = {
  MainTabs: 'MainStack';
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

export default function DrawerStack() {
  useClarity();

  return (
    <Drawer.Navigator
      drawerContent={(props: MainDrawerComponentProps) => (
        <MainDrawerContent {...props} />
      )}
      screenOptions={{
        ...publicScreenOption,
        drawerType: 'front',
        swipeEnabled: false,
      }}>
      <Drawer.Screen name="MainStack" component={MainStack} />
    </Drawer.Navigator>
  );
}
