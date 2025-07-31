import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {
  Academy,
  Home,
  Plus,
  PlusOutline,
  Profile,
  Projects,
} from '~/assets/icons';
import {TabBarButton} from '~/components';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {verticalScale} from '~/utils/style';

const CustomTabBar = ({state, navigation}: {state?: any; navigation?: any}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        switch (route.name) {
          case 'HomeTab':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text={t('common.home')}
                isFocused={isFocused}>
                <Home
                  strokeColor={isFocused ? Colors.PRIMARY : Colors.DEEP_FIR}
                />
              </TabBarButton>
            );
          case 'ProjectsTab':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text={t('common.myProjects')}
                isFocused={isFocused}>
                <Projects
                  strokeColor={isFocused ? Colors.PRIMARY : Colors.DEEP_FIR}
                />
              </TabBarButton>
            );
          case 'CreateProjectTab':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                isFocused={isFocused}>
                {isFocused ? <PlusOutline /> : <Plus />}
              </TabBarButton>
            );
          case 'AcademyTab':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text={t('common.academy')}
                isFocused={isFocused}>
                <Academy
                  strokeColor={isFocused ? Colors.PRIMARY : Colors.DEEP_FIR}
                />
              </TabBarButton>
            );
          case 'ProfileTab':
            return (
              <TabBarButton
                key={route.name}
                onPress={onPress}
                text={t('common.profile')}
                isFocused={isFocused}>
                <Profile
                  strokeColor={isFocused ? Colors.PRIMARY : Colors.DEEP_FIR}
                />
              </TabBarButton>
            );

          default:
            return;
        }
      })}
    </View>
  );
};

export default CustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: verticalScale(88),
    backgroundColor: Colors.WHITE_F,
    borderTopColor: Colors.SEARCH_BACKGROUND,
    borderTopWidth: isIos ? 0.5 : 1,
    alignItems: 'flex-start',
  },
});
