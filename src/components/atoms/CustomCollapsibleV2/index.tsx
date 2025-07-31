import {HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {LayoutAnimation} from 'react-native';
import {ChevronDown, ChevronUp} from '~/assets/icons';
import {CustomTouchable} from '~/components';
import {Colors} from '~/styles';

export default function CustomCollapsibleV2({
  children,
  header,
  staticComponent,
  visibleComponent = <ChevronUp />,
  inVisibleComponent = <ChevronDown />,
}: {
  children: any;
  header?: JSX.Element;
  staticComponent?: JSX.Element;
  visibleComponent?: JSX.Element;
  inVisibleComponent?: JSX.Element;
}) {
  const [visible, setVisible] = useState<boolean>(false);

  const handleVisible = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setVisible(prevState => !prevState);
  };

  return (
    <VStack>
      <CustomTouchable onPress={handleVisible}>
        <HStack
          alignItems="center"
          bg={Colors.SEARCH_BACKGROUND}
          px="16px"
          py="12px">
          {header}
          {visible ? visibleComponent : inVisibleComponent}
        </HStack>
      </CustomTouchable>
      {staticComponent}
      {visible && <VStack mb="16px">{children}</VStack>}
    </VStack>
  );
}
