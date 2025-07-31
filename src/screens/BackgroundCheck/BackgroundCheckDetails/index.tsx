import {StripeProvider, usePaymentSheet} from '@stripe/stripe-react-native';
import {Box, Center, HStack, ScrollView, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Linking, StyleSheet, TouchableOpacity} from 'react-native';
import {Bronze, Gold, Silver} from '~/assets/icons';
import {
  ConfirmationModal,
  CustomButton,
  CustomContainer,
  CustomImage,
  CustomText,
  CustomTouchable,
  ScreensHeader,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {OrderStatus, ProductType, ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {
  useGetTazworkProducts,
  useGetUserTaworkRate,
  useSubmitOrderTazwork,
} from '~/hooks/JDP';
import {
  useCreateEphemeralKeyMutation,
  useGetPublishableKey,
} from '~/hooks/payment';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isAndroid, useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize, scale} from '~/utils/style';
import {
  showErrorMessage,
  showInfoMessage,
  showSuccessMessage,
} from '~/utils/utils';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const BackgroundCheckDetailsScreen = () => {
  const {t} = useTranslation();
  const {userData} = userDataStore();
  const {showResponseMessage} = useGetMessages();

  const [isModal, setIsModal] = useState(false);
  const [selectProductType, setSelectProductType] = useState<
    'BRONZE' | 'SILVER' | 'GOLD' | 'NONE'
  >('NONE');

  const [productStatus, setProductStatus] = useState({
    key: 'GOLD',
    value: OrderStatus.Pendding,
  });

  const {isLoading: isLoadingMutate, mutate} = useSubmitOrderTazwork();

  const {isLoading: isLoadingGetProduct, data: dataGetProducts} =
    useGetTazworkProducts();

  const {isLoading: isLoadingGetUserTazworkRate, data: dataGetUserTazworkRate} =
    useGetUserTaworkRate(userData?.id);
  const {data: getPublishableKeyData, isLoading: isLoadingGetPublishableKey} =
    useGetPublishableKey();
  const {mutate: mutateEphemeralKey, isLoading: createEphemeralKeyLoading} =
    useCreateEphemeralKeyMutation();
  const {
    initPaymentSheet,
    presentPaymentSheet,
    loading: stripeLoading,
  } = usePaymentSheet();

  const result = getPublishableKeyData?.payment_getPublishableKey?.result;

  const userTazworkRate =
    dataGetUserTazworkRate?.tazworkOrders_getUserTazWorkRate?.result;

  const goldStatus = userTazworkRate?.gold;
  const silverStatus = userTazworkRate?.silver;
  const bronzeStatus = userTazworkRate?.bronze;

  const getProducts = dataGetProducts?.pages;
  const goldPrice =
    getProducts?.find?.(el => el?.productType === ProductType.Gold)?.price ||
    '59.95';
  const silverPrice =
    getProducts?.find?.(el => el?.productType === ProductType.Silver)?.price ||
    '29.95';
  const bronzePrice =
    getProducts?.find?.(el => el?.productType === ProductType.Bronze)?.price ||
    '9.95';

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

  const onCloseCancelModal = () => {
    setIsModal(false);
  };

  const goToEditProfile = () => {
    navigate('MainTabs', {screen: 'ProfileTab'});
  };

  const submit = () => {
    if (selectProductType !== 'NONE') {
      if (userData?.userName) {
        setIsModal(true);
      } else {
        showInfoMessage(
          t('messages.completeProfile'),
          t('messages.completeYourProfile'),
          goToEditProfile,
        );
      }
    } else {
      showInfoMessage(t('messages.pleaseSelectOrder'));
    }
  };

  const onSubmit = () => {
    setIsModal(false);
    const productData = getProducts?.find(
      product => product.productType === selectProductType,
    );
    const productId = productData?.id;
    mutate(
      {productId},
      {
        onSuccess: successData => {
          if (
            successData?.tazwork_submitOrder?.status === ResponseStatus.Success
          ) {
            paymentOnPress(successData?.tazwork_submitOrder?.result);
          } else {
            showResponseMessage(successData?.tazwork_submitOrder?.status);
          }
        },
      },
    );
  };

  const paymentOnPress = async (clientSecretKey: any) => {
    mutateEphemeralKey(
      {},
      {
        onSuccess: successData => {
          if (
            successData?.payment_createEphemeralKey?.status ===
            ResponseStatus.Success
          ) {
            const ephemeralKey =
              successData?.payment_createEphemeralKey?.result?.secret;
            onPayCourse(ephemeralKey, clientSecretKey);
          }
        },
      },
    );
  };

  const onPayCourse = async (ephemeralKey: any, clientSecretKey: any) => {
    const clientSecret = clientSecretKey ?? '';

    const {error: initPaymentError} = await initPaymentSheet({
      customerId: userData?.stripeCustomerId,
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'HUDU Inc.',
      allowsDelayedPaymentMethods: true,
      customerEphemeralKeySecret: ephemeralKey,
    });

    if (initPaymentError) {
      showErrorMessage(initPaymentError?.message);
    } else {
      const {error: paymentError} = await presentPaymentSheet();

      if (paymentError) {
        showErrorMessage(paymentError?.message);
      } else {
        queryClient.invalidateQueries(queryKeys.getUserTazworkRate);
        queryClient.invalidateQueries(queryKeys.getProductsTazwork);
        queryClient.invalidateQueries(queryKeys.getOrderTazwork);

        showSuccessMessage(t('messages.paymentSuccessfully'));
        navigate('EmailSent');
      }
    }
  };

  const learnMoreOnPress = () => {
    Linking.openURL(
      'https://support.heyhudu.com/knowledge-base/hudu-background-checks/',
    );
  };

  const loading =
    isLoadingMutate ||
    isLoadingGetProduct ||
    isLoadingGetUserTazworkRate ||
    stripeLoading ||
    createEphemeralKeyLoading ||
    isLoadingGetPublishableKey;

  return (
    <CustomContainer backgroundColor={Colors.BACKGROUND} isLoading={loading}>
      <ScreensHeader
        backAction
        title={t('home.backgroundCheck.backgroundCheck')}
      />
      <ScrollView flex={1}>
        <VStack px="4" space="4" pt="6">
          <CustomText fontSize={fontSize.xLarge} fontFamily={fontFamily.bold}>
            {t('home.jdp.backgroundCheckTitle')}
          </CustomText>
          <CustomTouchable onPress={learnMoreOnPress}>
            <CustomText
              underline
              color={Colors.PRIMARY}
              fontSize={fontSize.xNormal}
              fontFamily={fontFamily.regular}>
              {t('home.jdp.learnMore')}
            </CustomText>
          </CustomTouchable>
          <VStack py="4" space="4" flex={1}>
            <RadioButton
              isSelected={selectProductType === 'GOLD'}
              icon={<Gold />}
              status={goldStatus}
              price={goldPrice}
              item={{
                title: t('home.jdp.gold'),
                description: t('home.jdp.goldDescription'),
              }}
              onPressHandler={() => {
                setSelectProductType('GOLD');
              }}
            />
            <RadioButton
              isSelected={selectProductType === 'SILVER'}
              icon={<Silver />}
              disabled={
                goldStatus === 'APPROVED' || silverStatus === 'APPROVED'
                  ? true
                  : false
              }
              status={silverStatus}
              price={silverPrice}
              item={{
                title: t('home.jdp.silver'),
                description: t('home.jdp.silverDescription'),
              }}
              onPressHandler={() => {
                setSelectProductType('SILVER');
              }}
            />
            <RadioButton
              isSelected={selectProductType === 'BRONZE'}
              icon={<Bronze />}
              price={bronzePrice}
              disabled={
                goldStatus === 'APPROVED' ||
                silverStatus === 'APPROVED' ||
                bronzeStatus === 'APPROVED'
                  ? true
                  : false
              }
              status={bronzeStatus}
              item={{
                title: t('home.jdp.bronze'),
                description: t('home.jdp.bronzeDescription'),
              }}
              onPressHandler={() => {
                setSelectProductType('BRONZE');
              }}
            />
          </VStack>
        </VStack>
      </ScrollView>

      <Box pb={isAndroid && '4'} px="4">
        <StripeProvider
          merchantIdentifier="merchant.com.hudu"
          publishableKey={result?.publishableKey}>
          <CustomButton
            title={t('projects.createProject.continue')}
            onPress={submit}
          />
        </StripeProvider>
      </Box>

      <ConfirmationModal
        isVisible={isModal}
        onClose={onCloseCancelModal}
        onSubmit={onSubmit}
        title={capitalizeFirstLetter(selectProductType?.toLowerCase?.()) + '!'}
        description={t('alerts.areYouSureJDP')}
        submitTitle={t('alerts.ok')}
        submitColor={Colors.PRIMARY}
      />
    </CustomContainer>
  );
};

export default BackgroundCheckDetailsScreen;

const RadioButton = ({
  isActive = true,
  isSelected,
  item,
  onPressHandler,
  image,
  icon = null,
  status,
  disabled,
  price,
}: {
  isActive: boolean;
  item: any;
  onPressHandler: () => void;
  image?: any;
  icon?: any;
  isSelected: boolean;
  status: string;
  disabled: boolean;
  price: string | number;
}) => {
  return (
    <TouchableOpacity
      key={item?.value}
      disabled={!isActive || disabled || status === 'PENDDING'}
      onPress={() => onPressHandler(item)}
      activeOpacity={0.7}
      style={[
        styles.item,
        disabled && {
          opacity: 0.4,
        },
      ]}>
      {image && (
        <CustomImage
          local
          style={styles.image}
          imageSource={image}
          resizeMode="cover"
        />
      )}
      {icon && icon}
      <VStack flex={1} ml="2">
        <HStack alignItems="center" space="1">
          <CustomText
            color={Colors.BLACK_2}
            flex={1}
            fontSize={fontSize.xNormal}
            fontFamily={fontFamily.medium}>
            {item?.title}
          </CustomText>
          <HStack
            justifyContent={'flex-end'}
            alignItems={'center'}
            space="2"
            flex={1}>
            <CustomText
              color={Colors.BLACK_2}
              fontSize={fontSize.xNormal}
              fontFamily={fontFamily.medium}>
              ${price}
            </CustomText>
            <Center
              borderRadius="full"
              size="6"
              p="0.5"
              overflow="hidden"
              borderWidth="0.5"
              borderColor={isSelected ? Colors.PRIMARY : Colors.GRAY_6}
              bg={Colors.GRAY_6}>
              <Center
                size="full"
                borderRadius="full"
                bg={isSelected ? Colors.PRIMARY : Colors.GRAY_6}
              />
            </Center>
          </HStack>
        </HStack>
        {item?.description && (
          <CustomText
            color={Colors.BLACK_2}
            flex={1}
            fontSize={fontSize.tiny}
            fontFamily={fontFamily.medium}>
            {item?.description}
          </CustomText>
        )}
        {status === 'PENDDING' && (
          <CustomText color={Colors.Topaz} fontSize={fontSize.xNormal}>
            {status === 'PENDDING' ? 'Pending' : ''}
          </CustomText>
        )}
      </VStack>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingVertical: scale(16),
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: scale(5),
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: Colors.RED_LOVE,
    alignSelf: 'flex-start',
  },
});
