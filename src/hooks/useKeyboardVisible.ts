import {useState, useEffect} from 'react';
import {Keyboard} from 'react-native';
import {isIos} from '~/utils/helper';

export const useKeyboardVisible = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const keyboardShow = isIos ? 'keyboardWillShow' : 'keyboardDidShow';
  const keyboardHide = isIos ? 'keyboardWillHide' : 'keyboardDidHide';

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(keyboardShow, () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener(keyboardHide, () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
