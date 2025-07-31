import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {ConfirmationModalV2, CustomButton} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useRejectBid} from '~/hooks/bid';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';

export default function SectionRejectBid({bidId}: {bidId: number}) {
  const {t} = useTranslation();

  const {mutate: mutateRejectBid, isLoading: rejectBidLoading} = useRejectBid();
  const modalRef = useRef<ModalRef>(null);

  const rejectBidOnPress = () => {
    modalRef?.current?.open();
  };

  const onSubmitRejectModal = () => {
    mutateRejectBid(bidId, {
      onSuccess: successData => {
        if (successData?.bid_rejectBid?.status === ResponseStatus.Success) {
          modalRef?.current?.close();
        }
      },
    });
  };

  return (
    <>
      <CustomButton
        outline
        flex={1}
        height={38}
        title={t('common.decline')}
        borderRadius={'full'}
        fontSize={fontSize.small}
        onPress={rejectBidOnPress}
        color={Colors.FrenchRose}
        spinnerColor={Colors.FrenchRose}
      />
      <ConfirmationModalV2
        ref={modalRef}
        onSubmit={onSubmitRejectModal}
        title={t('common.decline')}
        description={t('alerts.rejectBid')}
        submitTitle={t('alerts.ok')}
        submitColor={Colors.FrenchRose}
        isLoading={rejectBidLoading}
      />
    </>
  );
}
