import {Box, HStack, VStack, View} from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {CustomText, CustomTouchable} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import {useTranslation} from 'react-i18next';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {useGetUserTaworkRate} from '~/hooks/JDP';
import {ActivityIndicator} from 'react-native';
import {Bronze, Gold, Silver} from '~/assets/icons';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const SectionBackgroundCheck = ({
  my = '16px',
  mx = '24px',
}: {
  my?: string | number;
  mx?: string | number;
}) => {
  const {t} = useTranslation();
  const {userData} = userDataStore();
  const [selectProductType, setSelectProductType] = useState<
    'BRONZE' | 'SILVER' | 'GOLD' | 'NONE'
  >('NONE');
  const {isLoading: isLoadingGetUserTazworkRate, data: dataGetUserTazworkRate} =
    useGetUserTaworkRate(userData?.id);

  const userTazworkRate =
    dataGetUserTazworkRate?.tazworkOrders_getUserTazWorkRate?.result;

  useEffect(() => {
    if (userTazworkRate?.hasBackgroundCheck) {
      if (userTazworkRate?.gold === 'APPROVED') {
        setSelectProductType('GOLD');
      } else if (userTazworkRate?.silver === 'APPROVED') {
        setSelectProductType('SILVER');
      } else if (userTazworkRate?.bronze === 'APPROVED') {
        setSelectProductType('BRONZE');
      }
    } else {
      setSelectProductType('NONE');
    }
  }, [userTazworkRate]);

  const quizOnPress = () => {
    navigate('BackgroundCheckDetails');
  };

  const icon = () => {
    switch (selectProductType) {
      case 'GOLD':
        return <Gold />;
      case 'SILVER':
        return <Silver />;
      case 'BRONZE':
        return <Bronze />;
      default:
        return <View />;
    }
  };

  return (
    <VStack
      my={my}
      mx={mx}
      borderWidth="1px"
      borderColor={Colors.SEARCH_BACKGROUND}
      rounded="sm"
      overflow="hidden">
      <Box bg={Colors.SEARCH_BACKGROUND} py="10px" px="16px">
        <CustomText
          fontSize={fontSize.xTiny}
          fontFamily={fontFamily.medium}
          color={Colors.Topaz}>
          {t('home.backgroundCheck.backgroundCheck')}
        </CustomText>
      </Box>
      <Box pt="10px" pb="20px" px="16px">
        <CustomTouchable onPress={quizOnPress}>
          <HStack alignItems="center" space="2">
            {isLoadingGetUserTazworkRate ? (
              <ActivityIndicator color={Colors.PRIMARY} size={'small'} />
            ) : selectProductType === 'NONE' ? (
              <CustomText
                underline
                fontSize={fontSize.xNormal}
                color={Colors.Topaz}>
                {t('home.backgroundCheck.notYetStarted')}
              </CustomText>
            ) : (
              <CustomText
                underline
                fontSize={fontSize.xNormal}
                color={Colors.Topaz}>
                {capitalizeFirstLetter(selectProductType?.toLowerCase?.())}
              </CustomText>
            )}

            <EntypoIcon
              name="chevron-right"
              color={Colors.Topaz}
              size={scale(18)}
            />
          </HStack>
        </CustomTouchable>
      </Box>
    </VStack>
  );
};

export default memo(SectionBackgroundCheck);
