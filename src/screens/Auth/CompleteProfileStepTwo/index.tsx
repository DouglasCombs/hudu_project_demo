import {yupResolver} from '@hookform/resolvers/yup';
import {VStack} from 'native-base';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import * as yup from 'yup';
import {Locate} from '~/assets/icons';
import SmallHuduLogo from '~/assets/images/smallHuduLogo';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAvoidingView,
  CustomKeyboardAwareScrollViewV2,
  CustomText,
  FormInput,
  ScreensHeader,
  TextButton,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useFetchIP} from '~/hooks/location';
import {useAddUserAddress} from '~/hooks/user';
import {navigate, resetRoot} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {storeData} from '~/services/storage';
import {authStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function CompleteProfileStepTwoScreen({route}: NavigationProp) {
  const parent = route?.params!.parent;
  const {completeProfileSchemaStep2} = useSchemas();
  const {t} = useTranslation();
  const {locationData} = useFetchIP();

  const {setIsUserLoggedIn} = authStore(state => state);
  const {userData, setUserData} = userDataStore(state => state);

  const {mutate: mutateAddAddress, isLoading: isLoadingAddAddress} =
    useAddUserAddress();

  const {...methods} = useForm({
    resolver: yupResolver(completeProfileSchemaStep2),
    mode: 'onChange',
    defaultValues: {
      streetAddress: undefined,
    },
  });

  const {handleSubmit, register, formState, setValue, watch} = methods;

  const location = watch('location');

  const onSelectLocation = () => {
    let region;
    if (watch('location')?.region) {
      region = watch('location')?.region;
    } else if (locationData?.loc) {
      const [lat, long] = locationData?.loc.split(',').map(parseFloat);
      region = {
        latitude: lat,
        longitude: long,
      };
    }
    navigate('SelectLocation', {
      value: region,
      onChange: (location: any) => {
        setValue('streetAddress', location?.address);
        setValue('location', location);
      },
    });
  };

  const ContinueOnPress = (f_data: any) => {
    const region = f_data?.location?.region;
    const input = {
      point: [region?.latitude, region?.longitude],
      city: f_data?.location?.city,
      zipCode: f_data?.location?.zipCode,
      state: f_data?.location?.state,
      streetAddress: f_data?.streetAddress,
      addressTitle: t('auth.completeProfile.homeLocated'),
    };
    handleAddAddress(input);
  };

  const handleAddAddress = (address: any) => {
    mutateAddAddress(
      {input: [address]},
      {
        onSuccess: async successData => {
          if (
            successData?.user_addAddressesToUser?.status ===
            ResponseStatus.Success
          ) {
            setUserData({
              ...userData,
              zipCode: address?.zipCode,
              state: address?.state,
              streetAddress: address?.streetAddress,
              city: address?.city,
            });
            await storeData('isUserLoggedIn', true);
            setIsUserLoggedIn(true);
            if (parent !== 'mainTabs') {
              resetRoot('DrawerStack');
            }
          }
        },
      },
    );
  };

  const skipOnPress = async () => {
    await storeData('isUserLoggedIn', true);
    setIsUserLoggedIn(true);
    if (parent !== 'mainTabs') {
      resetRoot('DrawerStack');
    }
  };

  const isLoading = isLoadingAddAddress;

  return (
    <CustomContainer pb={0} isLoading={isLoading}>
      <ScreensHeader
        centerHeader={<SmallHuduLogo />}
        rightHeader={
          <TextButton title={t('auth.skip')} onPress={skipOnPress} />
        }
      />
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView androidKeyboardVerticalOffset={10}>
          <VStack flex={1} px="24px">
            <CustomKeyboardAwareScrollViewV2
              contentContainerStyle={styles.contentContainerStyle}>
              <VStack flex={1} py="6" space="4">
                <CustomText
                  color={Colors.Rhino}
                  fontSize={fontSize.tooLarge}
                  fontFamily={fontFamily.medium}>
                  {t('auth.completeProfile.step2Title')}
                </CustomText>
                <CustomText
                  marginBottom={26}
                  fontSize={fontSize.small}
                  fontFamily={fontFamily.regular}>
                  {t('auth.completeProfile.step2Description')}
                </CustomText>
                {location && (
                  <FormInput
                    multiline
                    {...register('streetAddress')}
                    {...{formState}}
                    label={t('auth.completeProfile.streetAddress')}
                    disabled={!location}
                  />
                )}
                <CustomButton
                  color={Colors.Rhino}
                  title={t('common.selectFromMap')}
                  onPress={onSelectLocation}
                  leftIcon={<Locate />}
                />
              </VStack>
            </CustomKeyboardAwareScrollViewV2>
            <CustomButton
              mb="6"
              title={t('common.done')}
              onPress={handleSubmit(ContinueOnPress)}
            />
          </VStack>
        </CustomKeyboardAvoidingView>
      </FormProvider>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 48,
  },
});
