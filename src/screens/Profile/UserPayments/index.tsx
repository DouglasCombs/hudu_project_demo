import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomContainer,
  ScreensHeader,
  SectionPaymentMethod,
  SectionPaymentHistory,
  TabViewContainer,
} from '~/components';
import {useGetHasPaymentStripe} from '~/hooks/payment';

export default function UserPayments({route}: NavigationProp) {
  const {t} = useTranslation();
  const initialRoute = route!.params!.initialRoute;

  const {data, isLoading: isLoadingCheckHastStripe} = useGetHasPaymentStripe();

  const hasStripeAccount = data?.payment_hasStripeAccount?.result;

  const routes = [
    {
      component: <SectionPaymentHistory />,
      title: t('profile.payment.history'),
      key: 'history',
      disabled: !hasStripeAccount,
    },
    {
      component: <SectionPaymentMethod />,
      title: t('profile.payment.wallet'),
      key: 'method',
    },
  ];

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('profile.payment.payment')} />
      <TabViewContainer defaultIndex={initialRoute} routes={routes} />
    </CustomContainer>
  );
}
