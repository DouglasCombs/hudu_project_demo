import React, {useState} from 'react';
import {LayoutAnimation, StyleSheet} from 'react-native';
import {CustomTouchable, CustomText} from '~/components';
import {VStack} from 'native-base';
import {fontSize as font_size, fontFamily as font_family} from '~/utils/style';
import {ChevronDown, ChevronUp} from '~/assets/icons';

export default function CustomCollapsible({
  title,
  children,
  fontSize = font_size.medium,
  fontFamily = font_family.medium,
  visibleComponent = <ChevronUp />,
  inVisibleComponent = <ChevronDown />,
}: {
  title: string;
  children: any;
  fontSize?: any;
  fontFamily?: string;
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
      <CustomTouchable onPress={handleVisible} style={styles.direction}>
        <CustomText fontFamily={fontFamily} flex={1} fontSize={fontSize}>
          {title}
        </CustomText>
        {visible ? visibleComponent : inVisibleComponent}
      </CustomTouchable>
      {visible && <VStack>{children}</VStack>}
    </VStack>
  );
}

const styles = StyleSheet.create({
  direction: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
