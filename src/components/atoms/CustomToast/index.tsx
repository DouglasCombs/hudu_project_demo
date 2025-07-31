import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Success} from '~/assets/icons';
import {useGetStatusBarHeight} from '~/hooks/useGetStatusBarHeight';
import {Colors} from '~/styles';
import {fontSize, scale, verticalScale} from '~/utils/style';
import {CustomText} from '~/components';

const CustomToast = ({
  text1,
  text2,
  icon = <Success />,
  backgroundColor = Colors.WHITE_F,
  color = Colors.LimeGreen,
  text1Color = Colors.BLACK,
  top,
  onPress,
}: {
  text1: string;
  text2?: string;
  icon?: JSX.Element;
  backgroundColor: string;
  color?: string;
  text1Color?: string;
  top?: number;
  onPress?: () => void;
}) => {
  const {statusBarHeight} = useGetStatusBarHeight();

  return (
    <View
      style={[
        {backgroundColor, top: top ?? statusBarHeight},
        styles.container,
      ]}>
      <View style={styles.direction}>
        <View style={{marginTop: text2 ? 6 : -3}}>{icon}</View>
        <ScrollView style={styles.scrollView}>
          <CustomText fontSize={fontSize.small} flex={1} color={text1Color}>
            {text1}
          </CustomText>
          {text2 && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onPress}
              disabled={!onPress}>
              <CustomText marginTop={2} fontSize={fontSize.small} color={color}>
                {text2}
              </CustomText>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default CustomToast;

const styles = StyleSheet.create({
  scrollView: {
    marginLeft: 12,
  },
  container: {
    borderRadius: 8,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    width: '90%',
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  direction: {
    flexDirection: 'row',
  },
});
