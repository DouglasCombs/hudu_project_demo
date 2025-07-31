import React from 'react';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Box, HStack} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {fontSize} from '~/utils/style';
import {CustomText} from '~/components';

interface LinkItemProps {
  title: string;
  last?: boolean;
  onPress: () => void;
  mt?: string | number;
  icon?: string;
  iconStyle?: any;
  color?: string;
}
const LinkItem = ({
  title,
  last,
  onPress,
  mt,
  icon = 'log-out-outline',
  iconStyle = styles.icon,
  color = Colors.BLACK_1,
}: LinkItemProps) => {
  return (
    <Box mt={mt}>
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <HStack alignItems="center" p="2">
          {last && (
            <Icon size={24} style={iconStyle} color={color} name={icon} />
          )}
          <CustomText color={color} flex={1} fontSize={fontSize.medium}>
            {title}
          </CustomText>
          {!last && (
            <Icon size={16} name="chevron-forward" color={Colors.BLACK_3} />
          )}
        </HStack>
      </TouchableOpacity>
    </Box>
  );
};

export default LinkItem;

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
    transform: [{rotateY: '180deg'}],
  },
});
