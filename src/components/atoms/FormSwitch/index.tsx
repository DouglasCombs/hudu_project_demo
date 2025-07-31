import {HStack, Switch} from 'native-base';
import React, {FC} from 'react';
import {useController} from 'react-hook-form';
import {Colors} from '~/styles';
import {CustomText} from '~/components';

type PropsType = {
  name: string;
  label: string;
};
const FormSwitch: FC<PropsType> = ({label, name}) => {
  const {field} = useController({name});

  const handelOnPress = () => {
    field.onChange(!field.value);
  };
  return (
    <HStack space="2" alignItems="center" justifyContent="space-between">
      <CustomText color={Colors.PLACEHOLDER2}>{label}</CustomText>
      <Switch
        onTrackColor={Colors.DISABLE}
        onThumbColor={Colors.PRIMARY}
        onChange={handelOnPress}
        value={field.value}
        size="sm"
      />
    </HStack>
  );
};

export default FormSwitch;
