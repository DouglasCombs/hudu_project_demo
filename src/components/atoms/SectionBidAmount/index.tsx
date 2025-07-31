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
  color?: string;
  titleColor?: string;
  flex?: number;
};

const SectionBidAmount = ({
  listerId,
  currentLowBid,
  color = Colors.WHITE_F,
  titleColor = Colors.WHITE_F,
  flex,
}: Props) => {
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
    <HStack flex={flex} alignItems="center" space="8px">
      <CustomText
        flex={flex}
        color={titleColor}
        fontSize={fontSize.xTiny}
        numberOfLines={1}>
        {hasCurrentLowBid
          ? t('projects.bidAmount.currentLowBid')
          : isNoBidsYet
          ? t('projects.bidAmount.noBidsYet')
          : isBeTheFirstOne
          ? t('projects.bidAmount.beTheFirstOne')
          : ''}
      </CustomText>
      {hasCurrentLowBid ? (
        <CustomText fontSize={fontSize.xTiny} color={color} numberOfLines={1}>
          {formattedBidAmount}
        </CustomText>
      ) : (
        <Fragment />
      )}
    </HStack>
  );
};

export default SectionBidAmount;
