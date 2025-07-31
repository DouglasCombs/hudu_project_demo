import React, {Fragment} from 'react';
import {HStack} from 'native-base';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {userDataStore} from '~/stores';
import {CustomText} from '~/components';
import {useTranslation} from 'react-i18next';

type Props = {
  listerId: number | undefined;
  currentLowBid?: number;
};

const SectionDoerBidAmount = ({listerId, currentLowBid}: Props) => {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);

  const isLister = listerId === userData?.id;
  const hasCurrentLowBid = currentLowBid && currentLowBid > 0;
  const isNoBidsYet = !hasCurrentLowBid && isLister;
  const isBeTheFirstOne = !hasCurrentLowBid && !isLister;
  const formattedBidAmount =
    currentLowBid && currentLowBid > 0
      ? `$${Number(currentLowBid)?.toFixed(2)}`
      : '';

  return (
    <HStack alignItems="center" space="8px">
      <CustomText
        color={Colors.Ronchi}
        fontSize={fontSize.xTiny}
        numberOfLines={1}>
        {t('projects.bidAmount.yourLowestBid')}
      </CustomText>
      {hasCurrentLowBid ? (
        <CustomText
          fontSize={fontSize.xTiny}
          color={Colors.Ronchi}
          numberOfLines={1}>
          {formattedBidAmount}
        </CustomText>
      ) : (
        <Fragment />
      )}
    </HStack>
  );
};

export default SectionDoerBidAmount;
