import React from 'react';
import {verticalScale} from '~/utils/style';
import {Colors} from '~/styles';
import {CustomButton} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useWithdrawBidForHudu} from '~/hooks/bid';

const SectionWithdrawForHudur = ({bidId}: {bidId: number}) => {
  const {mutate: mutateWithDrawBid, isLoading: isLoadingWithdrawBid} =
    useWithdrawBidForHudu();

  const withdrawOnPress = () => {
    mutateWithDrawBid(bidId, {
      onSuccess: successData => {
        if (
          successData?.bid_withdrawBidForHudu?.status === ResponseStatus.Success
        ) {
        }
      },
    });
  };

  return (
    <>
      <CustomButton
        outline
        title="Authorize payment"
        onPress={withdrawOnPress}
        color={Colors.BLACK_3}
        height={verticalScale(35)}
        spinnerColor={Colors.BLACK_3}
      />
    </>
  );
};

export default SectionWithdrawForHudur;
