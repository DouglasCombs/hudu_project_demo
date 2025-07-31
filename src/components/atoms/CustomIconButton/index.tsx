import React from 'react';
import {TouchableOpacity} from 'react-native';
import {HStack} from 'native-base';
import {CustomText} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';
import {Colors} from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomIconButton = ({
  title,
  name,
  onPress,
}: {
  title: string;
  name: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <HStack space="1" alignItems="center">
        <Icon size={24} color={Colors.PRIMARY} name={name} />
        <CustomText
          fontSize={fontSize.medium}
          fontFamily={fontFamily.medium}
          color={Colors.PRIMARY}>
          {title}
        </CustomText>
      </HStack>
    </TouchableOpacity>
  );
};

export default CustomIconButton;
