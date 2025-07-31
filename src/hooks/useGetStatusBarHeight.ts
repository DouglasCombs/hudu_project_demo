import {NativeModules, StatusBar} from 'react-native';
import {isIos} from '~/utils/helper';
const {StatusBarManager} = NativeModules;

export const useGetStatusBarHeight = () => {
  if (isIos) {
    StatusBarManager.getHeight((statusBarFrameData: any) => {
      return {statusBarHeight: statusBarFrameData.height};
    });
  }

  return {statusBarHeight: StatusBar.currentHeight};
};
