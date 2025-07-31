import {VStack} from 'native-base';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomButton, DeleteAccountModal} from '~/components';
import {useDeleteAccount} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';

const SectionDeleteAccount = () => {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);
  const modalRef = useRef<ModalRef>(null);
  const {mutate: mutateDeleteAccount, isLoading: deleteAccountLoading} =
    useDeleteAccount();

  const deleteAccountOnPress = () => {
    modalRef?.current?.open();
  };

  const onCloseDeleteModal = () => {
    modalRef?.current?.close();
  };

  const onAcceptDeleteModal = async () => {
    mutateDeleteAccount(userData?.id, {
      onSuccess: () => {
        modalRef?.current?.close();
      },
      onError: () => {
        modalRef?.current?.close();
      },
    });
  };

  return (
    <>
      <VStack px="24px" pb="24px" pt="8px">
        <CustomButton
          loading={deleteAccountLoading}
          color={Colors.FrenchRose}
          title={t('common.deleteMyAccount')}
          onPress={deleteAccountOnPress}
        />
      </VStack>
      <DeleteAccountModal
        ref={modalRef}
        option1="Cancel"
        option2="Delete"
        loading={deleteAccountLoading}
        option1OnPress={onCloseDeleteModal}
        option2OnPress={onAcceptDeleteModal}
        title={t('common.deleteAccountTitle')}
        description={t('common.deleteAccountDescription')}
      />
    </>
  );
};

export default SectionDeleteAccount;
