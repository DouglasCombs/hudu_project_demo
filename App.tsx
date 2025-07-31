import auth from '@react-native-firebase/auth';
import {NativeBaseProvider} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {LogBox, Platform, StyleSheet, UIManager} from 'react-native';
import {initialize} from 'react-native-clarity';
import Config from 'react-native-config';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import Toast from 'react-native-toast-message';
import 'react-native-url-polyfill/auto';
import graphQLClient from 'src/graphql/graphQLClient';
import AuthProvider, {queryClient} from '~/graphql/AuthProvider';
import {useSignOutAuth} from '~/hooks/auth';
import '~/i18n/i18n';
import AppNavigator from '~/navigation/AppNavigator';
import {authStore, userDataStore} from '~/stores';
import {toastConfig} from '~/utils/utils';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {config} from '@gluestack-ui/config';

console.disableYellowBox = true;
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

initialize(Config.CLARITY);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const nativeBaseConfig = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = () => {
  const {setIsUserLoggedIn} = authStore(state => state);
  const {setUserData} = userDataStore(state => state);

  const [initializing, setInitializing] = useState<boolean>(true);
  const {signOut} = useSignOutAuth();

  const logOut = async () => {
    await signOut();
    queryClient.cancelQueries();
    queryClient.clear();
    authStore.setState({token: undefined});
    graphQLClient.setHeader('authorization', '');
    setUserData({});
    setIsUserLoggedIn(false);
  };

  const handleUser = useCallback(
    async (user: any) => {
      if (user) {
        const idToken = await auth().currentUser?.getIdToken();
        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);
          authStore.setState({token: idToken});
        } else {
          await logOut();
        }
      } else {
        graphQLClient.setHeader('authorization', '');
        queryClient.clear();
      }
      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  useEffect(() => {
    const unSubscriber = auth().onIdTokenChanged(handleUser);
    return unSubscriber(); // unsubscribe on unmount
  }, [handleUser]);

  return (
    <AuthProvider>
      <GestureHandlerRootView style={styles.flex1}>
        <NativeBaseProvider config={nativeBaseConfig}>
          <GluestackUIProvider config={config}>
            <AppNavigator />
          </GluestackUIProvider>
        </NativeBaseProvider>
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
