import {yupResolver} from '@hookform/resolvers/yup';
import {Flex, VStack} from 'native-base';
import React, {useCallback, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  ConfirmationModal,
  CustomButton,
  CustomKeyboardAwareScrollView,
  CustomRadioGroup,
  CustomText,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {useGetUserAddresses, useRemoveAddress} from '~/hooks/user';
import {navigate, push} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {isAllowState} from '~/utils/helper';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';

const schema = yup.object().shape({
  address: yup.string().required('Please provide a valid address.'),
});

const SectionAddProjectStep2 = () => {
  const {t} = useTranslation();

  const {projectData, setProjectData} = projectStore(state => state);
  const {userData} = userDataStore(state => state);
  const [isModal, setIsModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const {isLoading: isLoadingDelete, mutate: mutateDelete} = useRemoveAddress();
  const {
    data: userAddresses,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
  } = useGetUserAddresses({
    userId: userData?.id,
  });

  const addresses = userAddresses?.pages || [];

  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register} = methods;

  function onLongPress(addressId) {
    const addressIds = [currentItem];
    mutateDelete(
      {addressIds},
      {
        onSuccess: success => {
          if (
            success?.user_removeAddressFromUser?.status ===
            ResponseStatus.Success
          ) {
            showSuccessMessage('Success Removed!');
          }
          queryClient.invalidateQueries(queryKeys.getUserAddresses);
        },
      },
    );
    onCloseCancelModal();
  }

  const onCloseCancelModal = () => {
    setIsModal(false);
  };

  const listHeaderComponent = useCallback(() => {
    return (
      <>
        <CustomText
          fontSize={fontSize.tooLarge}
          fontFamily={fontFamily.medium}
          marginTop={verticalScale(8)}>
          {t('projects.createProject.driveToDetails')}
        </CustomText>
        <CustomText
          marginTop={16}
          marginBottom={30}
          fontSize={fontSize.small}
          fontFamily={fontFamily.regular}>
          {t('projects.createProject.deriveToDetailsDescription')}
        </CustomText>
      </>
    );
  }, [t]);

  const listFooterComponent = useCallback(() => {
    return (
      <CustomButton
        color={Colors.WHITE}
        textColor={Colors.PRIMARY}
        mt="4"
        title={t('projects.createProject.addNewAddress')}
        onPress={() => navigate('AddNewAddress')}
      />
    );
  }, [t]);

  const nextHandler = (formData: any) => {
    const selectedAddress = addresses?.find(
      (address: any) => address?.id == formData?.address,
    );
    if (isAllowState(selectedAddress?.state, 'title')) {
      const data = {
        ...projectData,
        addressTitle: selectedAddress?.addressTitle,
        streetAddress: selectedAddress?.streetAddress,
        city: selectedAddress?.city,
        state: selectedAddress?.state,
        zipCode: selectedAddress?.zipCode,
        point: [selectedAddress?.latitude, selectedAddress?.longitude],
        addressId: selectedAddress?.id,
      };
      setProjectData(data);
      push('createProjectStep3');
    } else {
      showErrorMessage(t('alerts.addressAlerts'));
    }
  };

  return (
    <Flex flex={1} pb="6">
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView>
          <VStack py="4" space="4" flex={1}>
            <CustomRadioGroup
              {...register('address')}
              data={addresses?.map(address => {
                return {
                  title: address?.addressTitle,
                  description: address?.streetAddress,
                  value: address?.id,
                };
              })}
              onLongPress={id => {
                setCurrentItem(id);
                setIsModal(true);
              }}
              onEditPress={item => navigate('AddNewAddress', {item})}
              {...{
                fetchNextPage,
                hasNextPage,
                refetch,
                isRefetching,
                ListHeaderComponent: listHeaderComponent,
                ListFooterComponent: listFooterComponent,
              }}
            />
          </VStack>
        </CustomKeyboardAwareScrollView>
      </FormProvider>

      <VStack alignSelf={'center'} w={'90%'}>
        <CustomButton
          title={t('projects.createProject.continue')}
          onPress={handleSubmit(nextHandler)}
        />
      </VStack>
      <ConfirmationModal
        isVisible={isModal}
        onClose={onCloseCancelModal}
        onSubmit={onLongPress}
        title={t('alerts.deleteAddress')}
        description={t('alerts.areYouSureToDeleteAddress')}
        submitTitle={t('alerts.ok')}
        submitColor={Colors.FrenchRose}
      />
    </Flex>
  );
};

export default SectionAddProjectStep2;
