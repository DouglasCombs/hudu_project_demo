import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '~/styles';
import {HStack, Center} from 'native-base';
import {CustomText} from '~/components';

const CustomTopTabContent = ({
  state,
  navigation,
  descriptors,
  backgroundColor = Colors.WHITE_F,
}: {
  state?: any;
  navigation?: any;
  descriptors?: any;
  backgroundColor?: string;
}) => {
  return (
    <HStack mb="2" shadow="4" h="44px" alignItems="center" bg={backgroundColor}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        return (
          <TouchableOpacity
            key={route.name}
            activeOpacity={0.7}
            style={[
              styles.flex1,
              {
                ...(isFocused && {
                  borderBottomWidth: 1,
                  borderBottomColor: Colors.Rhino,
                }),
              },
            ]}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}>
            <Center flex={1} bg={Colors.TRANSPARENT}>
              <CustomText color={isFocused ? Colors.Rhino : Colors.Topaz}>
                {label}
              </CustomText>
            </Center>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};

export default CustomTopTabContent;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
