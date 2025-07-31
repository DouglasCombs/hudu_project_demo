import React from 'react';
import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProjectsScreen, ProjectDetailsScreen} from '~/screens';
import {authStore} from '~/stores';

const Stack = createNativeStackNavigator();

export type ProjectStackParamList = {
  Projects: {initialRoute?: number};
  ProjectDetails: {projectId?: number};
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'Projects',
    component: ProjectsScreen,
    options: publicScreenOption,
    initialParams: {initialRoute: 0},
  },
  {
    name: 'ProjectDetails',
    component: ProjectDetailsScreen,
    options: publicScreenOption,
  },
];

const screensAuth = [
  {
    name: 'Projects',
    component: ProjectsScreen,
    options: publicScreenOption,
    initialParams: {pageNumber: 0},
  },
];

export default function ProjectsStack() {
  const {isUserLoggedIn} = authStore(state => state);

  return (
    <Stack.Navigator>
      {isUserLoggedIn
        ? screens.map(screen => (
            //@ts-ignore
            <Stack.Screen key={screen.name} {...screen} />
          ))
        : screensAuth.map(screen => (
            //@ts-ignore
            <Stack.Screen key={screen.name} {...screen} />
          ))}
    </Stack.Navigator>
  );
}
