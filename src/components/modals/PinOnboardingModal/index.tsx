import {t} from 'i18next';
import {Center, Flex, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {Pin} from '~/assets/icons';
import {CustomText, ModalContainer} from '~/components';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function PinOnboardingModal() {
  const [visible, setVisible] = useState<boolean>(true);
  const {setIsOnboardingPinnedCategories} = userDataStore(state => state);

  const onClose = () => {
    setVisible(false);
    setIsOnboardingPinnedCategories(true);
  };

  return (
    <ModalContainer useBody={false} isVisible={visible} onClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose} style={styles.flex1}>
        <Flex flex={1} w="100%">
          <Flex flex={1} w="100%" bg={Colors.BLACK_TRANSPARENT_3}>
            <HStack justifyContent="flex-end">
              <Center
                mr="-36px"
                bg={Colors.Portage}
                rounded="full"
                h="136px"
                w="136px">
                <Center
                  bg={Colors.JordyBlue}
                  rounded="full"
                  h="100px"
                  w="100px">
                  <Center bg={Colors.PRIMARY} rounded="full" h="52px" w="52px">
                    <Pin />
                    <Ring delay={0} />
                    <Ring delay={1000} />
                    <Ring delay={2000} />
                    <Ring delay={3000} />
                  </Center>
                </Center>
              </Center>
            </HStack>
            <VStack space="2" px="24px">
              <CustomText
                fontSize={fontSize.xMedium}
                fontFamily={fontFamily.medium}
                color={Colors.WHITE_F}>
                {t('search.pinACategory')}
              </CustomText>
              <CustomText
                fontSize={fontSize.small}
                fontFamily={fontFamily.medium}
                color={Colors.WHITE_F}>
                {t('search.onBoardingPinCategory')}
              </CustomText>
            </VStack>
          </Flex>
        </Flex>
      </TouchableWithoutFeedback>
    </ModalContainer>
  );
}

const Ring = ({delay}: {delay: number}) => {
  const ring = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      opacity: 0.8 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });

  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
      ),
    );
  }, []);
  return <Animated.View style={[styles.ring, style]} />;
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  icon: {
    height: 52,
    width: 52,
    borderRadius: 26,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 24,
    borderColor: Colors.JordyBlue,
  },
});
