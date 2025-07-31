import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CustomLoading, CustomTopTabContent} from '~/components';

const Tab = createMaterialTopTabNavigator();

const TopTabContainer = ({
  screens,
  initialRouteName,
  swipeEnabled,
  backgroundColor,
}: {
  screens: any;
  initialRouteName?: string;
  swipeEnabled?: boolean;
  backgroundColor?: string;
}) => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <CustomTopTabContent {...props} backgroundColor={backgroundColor} />
      )}
      initialRouteName={initialRouteName}
      backBehavior="initialRoute"
      screenOptions={() => ({
        swipeEnabled: swipeEnabled,
        lazy: true,
        lazyPlaceholder: () => <CustomLoading />,
        tabBarScrollEnabled: true,
      })}>
      {screens.map((screen: any) => (
        <Tab.Screen key={screen.name} {...screen} />
      ))}
    </Tab.Navigator>
  );
};

export default TopTabContainer;
