import * as React from 'react';
import Svg, {Path, G} from 'react-native-svg';
import {fontSize} from '~/utils/style';
import {Colors} from '~/styles';
import {View} from 'react-native';
import {Center} from 'native-base';
import {CustomText} from '~/components';

export default function BellIcon({badgeCount}: {badgeCount?: number}) {
  return (
    <View>
      {badgeCount && (
        <Center
          zIndex={4}
          position="absolute"
          rounded="full"
          bg={Colors.FINISHED}
          px="1"
          py="1px"
          right="-4"
          top="-4">
          <CustomText
            flex={1}
            numberOfLines={1}
            color={Colors.WHITE_F}
            fontSize={fontSize.xxTiny}>
            {badgeCount}
          </CustomText>
        </Center>
      )}
      <Svg width={24} height={24}>
        <G fill="none" data-name="Group 24523">
          <Path d="M0 0h24v24H0z" data-name="Rectangle 6142" />
          <Path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4a6 6 0 0 0-6 6v8m6-14a6 6 0 0 1 6 6v8M12 4a1 1 0 1 0-1-1 1 1 0 0 0 1 1Zm8 14H4m10 2a2 2 0 0 1-4 0"
          />
        </G>
      </Svg>
    </View>
  );
}
