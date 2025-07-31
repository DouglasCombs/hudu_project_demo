import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {VStack} from 'native-base';
import {AuthProfileLinks, CustomContainer} from '~/components';
import {Colors} from '~/styles';
import {scale, verticalScale} from '~/utils/style';

const AuthProfileScreen = () => {
  return (
    <CustomContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <VStack space="2" p="4" shadow="5" borderRadius="lg" bg={Colors.WHITE}>
          <AuthProfileLinks />
        </VStack>
      </ScrollView>
    </CustomContainer>
  );
};

export default AuthProfileScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: verticalScale(32),
    flexGrow: 1,
    paddingHorizontal: scale(16),
    justifyContent: 'center',
  },
});
