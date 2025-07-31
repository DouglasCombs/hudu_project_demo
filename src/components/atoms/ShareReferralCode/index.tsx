import {
  Center,
  HStack,
  Input,
  VStack,
  useClipboard,
  useToast,
} from 'native-base';
import React, {useCallback} from 'react';
import Share from 'react-native-share';
import {Copy, ShareWhite} from '~/assets/icons';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import CustomText from '../CustomText';
import CustomTouchable from '../CustomTouchable';
import {Platform} from 'react-native';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';

const ShareReferralCode = ({referralCode}: {referralCode: string}) => {
  const {value, onCopy} = useClipboard();
  const toast = useToast();
  const {t} = useTranslation();

  const copyPressed = useCallback(() => {
    onCopy(referralCode);
    toast.show({
      description: 'Copy to clipboard!',
    });
  }, [referralCode]);

  const shareReferralCode = async () => {
    try {
      let shareImage = Platform.select({
        ios: {
          message: `${Config.DEEP_LINKING}auth/signup?referral=${referralCode}`,
          type: 'text',
        },
        default: {
          title: t('profile.referral.huduReferralCode'),
          message: `${Config.DEEP_LINKING}auth/signup?referral=${referralCode}`,
          url: referralCode,
          failOnCancel: false,
        },
      });

      await Share.open(shareImage);
    } catch (error) {}
  };

  return (
    <VStack
      px="4"
      mt="4"
      py="4"
      borderRadius={'sm'}
      space="3"
      bg={Colors.RhinoShadow}>
      <CustomText
        color={Colors.WHITE}
        fontSize={fontSize.small}
        fontFamily={fontFamily.medium}>
        {t('profile.referral.shareReferralCode')}
      </CustomText>
      <HStack space="3">
        <Input
          bg={Colors.WHITE}
          borderRadius={'sm'}
          editable={false}
          value={referralCode}
          fontSize={fontSize.xNormal}
          w="65%"
        />
        <CustomTouchable onPress={copyPressed}>
          <Center size="10" bg={Colors.PRIMARY} borderRadius={'sm'}>
            <Copy />
          </Center>
        </CustomTouchable>
        <CustomTouchable onPress={shareReferralCode}>
          <Center size="10" bg={Colors.PRIMARY} borderRadius={'sm'}>
            <ShareWhite />
          </Center>
        </CustomTouchable>
      </HStack>
    </VStack>
  );
};

export default ShareReferralCode;
