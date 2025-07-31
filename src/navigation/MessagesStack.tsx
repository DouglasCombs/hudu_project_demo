import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {MessagesDrawerContent} from '~/components';
import {ChatScreen, MessagesScreen} from '~/screens';
import {Colors} from '~/styles';

const Drawer = createDrawerNavigator();

export type MessagesStackParamList = {
  Messages: undefined;
  Chat: {
    conversationId?: number;
    projectId?: number;
    user?: object;
  };
};

const screens = [
  {
    name: 'Messages',
    component: MessagesScreen,
  },
  {
    name: 'Chat',
    component: ChatScreen,
    initialParams: {
      conversationId: undefined,
      user: undefined,
      projectId: undefined,
    },
  },
];

export default function MessagesStack() {
  return (
    <Drawer.Navigator
      drawerContent={(props: DrawerContentComponentProps) => (
        <MessagesDrawerContent {...props} />
      )}
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {width: '76%', backgroundColor: Colors.TRANSPARENT},
        swipeEnabled: false,
        headerShown: false,
        drawerType: 'front',
        overlayColor: 'transparent',
      }}>
      {screens.map(screen => (
        //@ts-ignore
        <Drawer.Screen key={screen.name} {...screen} />
      ))}
    </Drawer.Navigator>
  );
}
