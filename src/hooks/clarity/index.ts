import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {setCurrentScreenName} from 'react-native-clarity';
import {navigationRef} from '~/navigation/Methods';

const useClarity = () => {
  const navigation = navigationRef?.getCurrentRoute?.();
  const currentRoute = navigation?.name;
  useFocusEffect(
    useCallback(() => {
      setCurrentScreenName(currentRoute);

      return () => {
        setCurrentScreenName(undefined);
      };
    }, [currentRoute]),
  );
};

export {useClarity};
