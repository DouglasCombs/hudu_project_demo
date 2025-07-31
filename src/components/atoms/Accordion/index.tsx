import {HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {LayoutAnimation, StyleSheet, View} from 'react-native';
import {ChevronDown, ChevronUp} from '~/assets/icons';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import CustomText from '../CustomText';
import CustomTouchable from '../CustomTouchable';

const Accordion = ({
  title = '',
  icon,
  disabled = false,
  children,
  open = false,
  onPress,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleOpen = () => {
    setIsOpen(value => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  return (
    <VStack
      mx="4"
      px="4"
      py="3"
      borderWidth={'1'}
      borderColor={Colors.LABEL}
      borderRadius={'sm'}>
      <CustomTouchable disabled={disabled} onPress={onPress ?? toggleOpen}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <CustomText fontSize={fontSize.medium} fontFamily={fontFamily.light}>
            {title}
          </CustomText>
          {icon ? (
            icon
          ) : isOpen ? (
            <ChevronDown fillColor={Colors.PLACEHOLDER} />
          ) : (
            <ChevronUp fillColor={Colors.PLACEHOLDER} />
          )}
          {}
        </HStack>
      </CustomTouchable>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {children}
      </View>
    </VStack>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  hidden: {
    height: 0,
  },
  list: {
    overflow: 'hidden',
  },
});
