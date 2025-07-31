import React from 'react';
import {VStack} from 'native-base';
import {CustomIconButton, CustomText} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';
import {Colors} from '~/styles';
import {navigate} from '~/navigation/Methods';

const LogOutView = () => {
  const loginHandler = () => {
    navigate('AuthStack');
  };

  return (
    <VStack
      bg={Colors.WHITE}
      flex={1}
      space="30px"
      alignItems="center"
      justifyContent="center">
      <CustomText
        fontSize={fontSize.medium}
        fontFamily={fontFamily.medium}
        color={Colors.BLACK_3}>
        Log in to use the app features
      </CustomText>
      <CustomIconButton
        name="log-in-outline"
        title="Log in"
        onPress={loginHandler}
      />
    </VStack>
  );
};

export default LogOutView;
