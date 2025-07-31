import {yupResolver} from '@hookform/resolvers/yup';
import {VStack} from 'native-base';
import React, {useCallback, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  ConfirmationModal,
  CustomButton,
  CustomContainer,
  ScreensHeader,
  SectionUserAddresses,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {useGetUserAddresses, useRemoveAddress} from '~/hooks/user';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {showSuccessMessage} from '~/utils/utils';
const schema = yup.object().shape({
  address: yup.string().required('Please provide a valid address.'),
});

const UserAddressesScreen = () => {
  const {t} = useTranslation();
  const [isModal, setIsModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const {userData} = userDataStore(state => state);

  const {isLoading: isLoadingDelete, mutate: mutateDelete} = useRemoveAddress();
  const {
    data: userAddresses,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useGetUserAddresses({
    userId: userData?.id,
  });
  const addresses = userAddresses?.pages || [];

  function onDeletePress() {
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
  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const {handleSubmit, register, formState} = methods;

  const onCloseCancelModal = () => {
    setIsModal(false);
  };

  const listFooterComponent = useCallback(() => {
    return (
      <CustomButton
        color={Colors.PRIMARY}
        textColor={Colors.PRIMARY}
        outline
        mt="4"
        title={t('projects.createProject.addNewAddress')}
        onPress={() => navigate('AddNewAddress')}
      />
    );
  }, [addresses]);

  const loading = isLoadingDelete || isLoading;
  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader backAction title={t('profile.drawer.addresses')} />
      <FormProvider {...methods}>
        <VStack py="4" space="4" px="4" flex={1}>
          <SectionUserAddresses
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

              ListFooterComponent: listFooterComponent,
            }}
          />
        </VStack>

        {/* <VStack alignSelf={'center'} w={'90%'}>
          <CustomButton
            title={t('projects.createProject.save')}
            onPress={handleSubmit(nextHandler)}
          />
        </VStack> */}
      </FormProvider>
      <ConfirmationModal
        isVisible={isModal}
        onClose={onCloseCancelModal}
        onSubmit={onDeletePress}
        title={t('alerts.deleteAddress')}
        description={t('alerts.areYouSureToDeleteAddress')}
        submitTitle={t('alerts.ok')}
        submitColor={Colors.FrenchRose}
      />
    </CustomContainer>
  );
};

export default UserAddressesScreen;
