import {yupResolver} from '@hookform/resolvers/yup';
import {VStack} from 'native-base';
import React, {useEffect} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  CustomButton,
  CustomContainer,
  CustomKeyboardAwareScrollView,
  FormInput,
  ScreensHeader,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {
  useAddUserAddress,
  useEditAddress,
  useGetUserAddresses,
} from '~/hooks/user';
import {goBack, navigate} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {userDataStore} from '~/stores';

export default function AddNewAddressScreen({route}: NavigationProp) {
  const formaData = route?.params?.formData;
  const address = route?.params?.item;
  const {userData} = userDataStore(state => state);

  const {data: userAddress} = useGetUserAddresses({
    userId: userData?.id,
    where: {
      id: {eq: parseInt(address?.value)},
    },
  });
  const addressUser = userAddress?.pages?.[0];
  const {addNewAddress} = useSchemas();
  const {t} = useTranslation();

  const {mutate: mutateAddAddress, isLoading: isLoadingAddAddress} =
    useAddUserAddress();

  const {mutate: mutateEditAddress, isLoading: isLoadingEditAddress} =
    useEditAddress();

  const {...methods} = useForm({
    resolver: yupResolver(addNewAddress),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState, setValue, watch} = methods;

  useEffect(() => {
    if (addressUser) {
      setValue('streetAddress', addressUser?.streetAddress);
      setValue('addressTitle', addressUser?.addressTitle);
      setValue('location', {
        region: {
          latitude: addressUser?.longitude,
          longitude: addressUser?.latitude,
        },
        zipCode: addressUser?.zipCode,
        state: addressUser?.state,
        city: addressUser?.city,
      });
    }
  }, [addressUser]);

  const onSelectLocation = () => {
    navigate('SelectLocation', {
      value: watch('location')?.region,
      onChange: (location: any) => {
        setValue('streetAddress', location?.address);
        setValue('location', location);
      },
      currentLocation: address?.value ? addressUser : null,
    });
  };

  const ContinueOnPress = (f_data: any) => {
    const data = {...formaData, ...f_data};
    const region = data?.location?.region;
    const input = {
      point: [region?.latitude, region?.longitude],
      city: data?.location?.city,
      zipCode: data?.location?.zipCode,
      state: data?.location?.state,
      streetAddress: data?.streetAddress,
      addressTitle: data?.addressTitle,
      id: address?.value || null,
    };

    handleUpdateProfile({input});
  };

  const handleUpdateProfile = (formData: any) => {
    if (address?.value) {
      mutateEditAddress(formData as any, {
        onSuccess: async successData => {
          if (
            successData?.user_editAddressesOfUser?.status ===
            ResponseStatus.Success
          ) {
            queryClient.invalidateQueries(queryKeys.getUserAddresses);
            goBack();
          }
        },
      });
    } else {
      mutateAddAddress(formData as any, {
        onSuccess: async successData => {
          if (
            successData?.user_addAddressesToUser?.status ===
            ResponseStatus.Success
          ) {
            queryClient.invalidateQueries(queryKeys.getUserAddresses);
            goBack();
          }
        },
      });
    }
  };

  const isLoading = isLoadingAddAddress || isLoadingEditAddress;

  return (
    <CustomContainer isLoading={isLoading}>
      <ScreensHeader
        title={t('projects.createProject.addAddress')}
        backAction
      />
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView>
          <VStack flex={1} py="6" space="4">
            <FormInput
              {...register('addressTitle')}
              {...{formState}}
              label={t('auth.completeProfile.addressTitle')}
              autoComplete="given-name"
            />
            <FormInput
              multiline
              {...register('streetAddress')}
              {...{formState}}
              label={t('auth.completeProfile.streetAddress')}
              placeholder="Select your address" //TODO
              autoComplete="street-address"
              isReadOnly
              onPress={onSelectLocation}
            />
          </VStack>
          <CustomButton
            mb="6"
            title={t('projects.createProject.save')}
            onPress={handleSubmit(ContinueOnPress)}
          />
        </CustomKeyboardAwareScrollView>
      </FormProvider>
    </CustomContainer>
  );
}
