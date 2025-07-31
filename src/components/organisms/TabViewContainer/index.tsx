import {Box} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {Route, TabBar, TabBarProps, TabView} from 'react-native-tab-view';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

type TabBarPropsType<T extends Route> = TabBarProps<T>;

type RouteType = {
  key: string;
  title: string;
  component: JSX.Element;
  disabled?: boolean;
};

type Props = {
  routes: RouteType[];
  defaultIndex?: number;
  swipeEnabled?: boolean;
  setRoute?: (routeNumber: number) => void;
  backgroundColor?: string;
};

export default function TabViewContainer({
  routes,
  defaultIndex = 0,
  swipeEnabled,
  setRoute,
  backgroundColor = Colors.WHITE_F,
}: Props) {
  const {width} = useWindowDimensions();
  const [index, setIndex] = useState<number>(defaultIndex);

  useEffect(() => {
    setIndex(defaultIndex);
  }, [defaultIndex]);

  const renderTabBar = (props: TabBarPropsType<RouteType>) => {
    return (
      <Box bg={backgroundColor}>
        <Box shadow="4" mb="8px">
          <TabBar
            onTabPress={({route, preventDefault}) => {
              if (route?.disabled) {
                preventDefault();
              }
            }}
            {...props}
            indicatorStyle={{
              backgroundColor: Colors.Rhino,
            }}
            style={{backgroundColor: Colors.WHITE_F}}
            renderLabel={({route, focused}) => (
              <CustomText
                fontFamily={fontFamily.medium}
                fontSize={fontSize.xNormal}
                color={focused ? Colors.Rhino : Colors.Topaz}>
                {route.title}
              </CustomText>
            )}
          />
        </Box>
      </Box>
    );
  };

  const renderScene = useCallback(({route}: {route: RouteType}) => {
    return route.component;
  }, []);

  const onIndexChange = (value: number) => {
    setIndex(value);
    setRoute?.(value);
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      initialLayout={{width}}
      renderTabBar={renderTabBar}
      swipeEnabled={swipeEnabled}
    />
  );
}
