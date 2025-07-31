import React from 'react';
import {StatusBar, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {CustomImage, CustomLoading} from '~/components';
import {Colors} from '~/styles';

type Props = {
  children: any;
  isLoading?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
  safeArea?: boolean;
  statusBarBackgroundColor?: string;
  barStyle?: 'dark-content' | 'light-content' | 'default';
  backgroundImage?: any;
  headerBackground?: any;
  backgroundImageResizeMode?: 'cover' | 'center' | 'contain' | 'stretch';
  localBackgroundImage?: boolean;
  statusBar?: boolean;
  pb?: number;
};

export default function CustomContainer(props: Props) {
  const insets = useSafeAreaInsets();

  const {
    style,
    children,
    isLoading = false,
    backgroundColor = Colors.WHITE_F,
    safeArea = true,
    statusBarBackgroundColor,
    barStyle,
    backgroundImage,
    headerBackground,
    backgroundImageResizeMode = 'cover',
    localBackgroundImage = true,
    statusBar = true,
    pb = insets.bottom,
  } = props;

  if (headerBackground) {
    return (
      <View style={[styles.flex1, {backgroundColor}]}>
        <CustomImage
          local
          resizeMode={backgroundImageResizeMode}
          imageSource={headerBackground}
          style={styles.authBackground}
          containerStyle={styles.authBackgroundContainer}
        />
        <View style={[styles.flex1, {paddingTop: insets.top}]}>
          {statusBar && (
            <StatusBar
              barStyle={barStyle}
              backgroundColor={statusBarBackgroundColor}
              translucent
            />
          )}
          {children}
        </View>
      </View>
    );
  }

  if (backgroundImage) {
    return (
      <CustomImage
        resizeMode={backgroundImageResizeMode}
        local={localBackgroundImage}
        imageSource={backgroundImage}
        backgroundColor={backgroundColor}
        style={{
          ...styles.imageBackground,
          paddingTop: insets.top,
        }}>
        {statusBar && (
          <StatusBar
            barStyle={barStyle ?? 'light-content'}
            backgroundColor={statusBarBackgroundColor ?? Colors.Rhino}
            translucent
          />
        )}
        {isLoading && <CustomLoading />}
        {children}
      </CustomImage>
    );
  }

  if (safeArea) {
    return (
      <View
        style={[
          styles.container,
          style,
          {
            backgroundColor: statusBarBackgroundColor ?? Colors.Rhino,
            paddingTop: insets.top,
          },
        ]}>
        <View
          style={[
            styles.container,
            style,
            {backgroundColor, paddingBottom: pb},
          ]}>
          {statusBar && (
            <StatusBar
              translucent
              barStyle={barStyle ?? 'light-content'}
              backgroundColor={statusBarBackgroundColor ?? Colors.Rhino}
            />
          )}
          {isLoading && <CustomLoading />}
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, style, {backgroundColor}]}>
      {statusBar && (
        <StatusBar
          translucent
          barStyle={barStyle ?? 'light-content'}
          backgroundColor={statusBarBackgroundColor ?? Colors.Rhino}
        />
      )}
      {isLoading && <CustomLoading />}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex1: {
    flex: 1,
  },
  topSafeArea: {
    flex: 0,
  },
  imageBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  authBackground: {
    width: '100%',
    height: 96,
  },
  authBackgroundContainer: {
    position: 'absolute',
  },
});

/*

      <>
        <SafeAreaView
          style={[
            styles.topSafeArea,
            {backgroundColor: statusBarBackgroundColor ?? Colors.Rhino},
          ]}
        />
        <SafeAreaView
          style={[
            styles.flex1,
            style,
            {
              backgroundColor: isIos
                ? backgroundColor
                : statusBarBackgroundColor ?? Colors.Rhino,
              paddingTop: insets.top,
              paddingBottom: insets.bottom,
              ...(hasMarginBottom && {
                marginBottom: marginBottom ?? -insets.bottom,
              }),
            },
          ]}>
          {statusBar && (
            <StatusBar
              barStyle={barStyle ?? 'light-content'}
              backgroundColor={statusBarBackgroundColor ?? Colors.Rhino}
              translucent
            />
          )}
          <View style={[{backgroundColor}, styles.flex1]}>
            {children}
            {isLoading && <CustomLoading />}
          </View>
        </SafeAreaView>
      </>


*/
