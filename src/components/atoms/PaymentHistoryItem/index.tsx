import {HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Bid} from '~/generated/graphql';
import {Colors} from '~/styles';
import {CustomButton, CustomText} from '~/components';
import {fontSize, scale, verticalScale} from '~/utils/style';
import {ClockCircle, DollarCircle} from '~/assets/icons';
import dayjs from 'dayjs';
import {appFormatDate} from '~/utils/helper';

export default function PaymentHistoryItem({item}: {item: Bid}) {
  const {t} = useTranslation();

  const invoiceOnPress = () => {};

  const awardDate = item?.awardDate;
  const huduFinishedProjectDate = item?.huduFinishedProjectDate;

  const timeDifference = dayjs(huduFinishedProjectDate).diff(awardDate);
  const duration = dayjs.duration(timeDifference);

  let displayText = '';

  if (duration.as('hours') < 1) {
    displayText = `${duration.as('minutes').toFixed()} ${t('common.minutes')}`;
  } else if (duration.as('days') < 1) {
    displayText = `${duration.as('hours').toFixed()} ${t('common.hours')}`;
  } else {
    displayText = `${duration.as('days').toFixed()} ${t('common.days')}`;
  }

  return (
    <VStack borderWidth="1" borderColor={Colors.Ghost} rounded="sm" p="24px">
      <HStack mb="20px">
        <VStack flex={1} space="5px">
          <CustomText numberOfLines={1} fontSize={fontSize.xNormal}>
            {item?.project?.title}
          </CustomText>
          <CustomText
            color={Colors.Topaz}
            numberOfLines={1}
            fontSize={fontSize.xTiny}>
            {item?.lister?.userName ?? ''}
          </CustomText>
        </VStack>
        {/* TODO temporary
        <CustomButton
          title={t('profile.payment.invoice')}
          outline
          disabled={true}
          onPress={invoiceOnPress}
          height={verticalScale(20)}
          width={scale(51)}
          fontSize={fontSize.xTiny}
        /> */}
      </HStack>
      <HStack space="24px" mb="16px" alignItems="center">
        <Item
          title={t('profile.payment.amount')}
          value={`$${item?.amount?.toFixed(2) ?? 0}`}
          icon={<DollarCircle />}
        />
        <Item
          title={t('profile.payment.status')}
          valueColor={Colors.LimeGreen}
          value={t('profile.payment.paid')}
          icon={<DollarCircle />}
        />
      </HStack>
      <HStack space="24px" alignItems="center">
        <Item
          title={t('profile.payment.dueDate')}
          value={appFormatDate(awardDate)}
          icon={<ClockCircle />}
        />
        <Item
          title={t('profile.payment.duration')}
          value={displayText}
          icon={<ClockCircle />}
        />
      </HStack>
    </VStack>
  );
}

const Item = ({
  icon,
  title,
  value,
  titleColor = Colors.Topaz,
  valueColor = Colors.BLACK,
}: {
  icon: JSX.Element;
  title: any;
  value: any;
  titleColor?: string;
  valueColor?: string;
}) => {
  return (
    <HStack flex={1} alignItems="center" space="8px">
      {icon}
      <VStack space="1">
        <CustomText fontSize={fontSize.xTiny} color={titleColor}>
          {title}
        </CustomText>
        <CustomText fontSize={fontSize.small} color={valueColor}>
          {value}
        </CustomText>
      </VStack>
    </HStack>
  );
};
