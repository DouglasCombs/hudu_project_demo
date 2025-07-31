import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CommonActions} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {CustomTabBar} from '~/components';
import {
  AcademyScreen,
  CreateProjectStep1,
  OnboardingCreateProjectScreen,
  ProfileScreen,
  ProjectsScreen,
} from '~/screens';
import {authStore, userDataStore} from '~/stores';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export type MainTabParamList = {
  HomeTab: undefined;
  ProjectsTab: undefined;
  CreateProjectTab: undefined;
  AcademyTab: {initialRoute?: number};
  ProfileTab: undefined;
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const MainTabs = () => {
  const {isUserLoggedIn} = authStore(state => state);
  const {isOnboardingCreateProject} = userDataStore(state => state);

  const CreateProjectComponent = useMemo(() => {
    return isUserLoggedIn
      ? isOnboardingCreateProject
        ? CreateProjectStep1
        : OnboardingCreateProjectScreen
      : AuthStack;
  }, [isUserLoggedIn, isOnboardingCreateProject]);

  const ProjectsComponent = useMemo(() => {
    return isUserLoggedIn ? ProjectsScreen : AuthStack;
  }, [isUserLoggedIn]);

  const ProfileComponent = useMemo(() => {
    return isUserLoggedIn ? ProfileScreen : AuthStack;
  }, [isUserLoggedIn]);

  return (
    <Tab.Navigator
      initialRouteName={'HomeTab'}
      tabBar={(props: any) => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={publicScreenOption}
      />
      <Tab.Screen
        name="ProjectsTab"
        component={ProjectsComponent}
        options={publicScreenOption}
        initialParams={{parent: 'mainTabs'}}
      />
      <Tab.Screen
        name="CreateProjectTab"
        component={CreateProjectComponent}
        options={publicScreenOption}
        initialParams={{parent: 'mainTabs'}}
      />
      <Tab.Screen
        name="AcademyTab"
        component={AcademyScreen}
        options={publicScreenOption}
        initialParams={{initialRoute: 0}}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileComponent}
        options={publicScreenOption}
        initialParams={{parent: 'mainTabs'}}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
