import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Colors} from '~/styles';

export default function SafeAreaContainer({
  children,
  backgroundColor = Colors.WHITE,
}: {
  children: any;
  backgroundColor?: string;
}) {
  return (
    <SafeAreaView style={[styles.safeArea, {backgroundColor}]}>
      <StatusBar backgroundColor={backgroundColor} barStyle="dark-content" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {flex: 1},
});
