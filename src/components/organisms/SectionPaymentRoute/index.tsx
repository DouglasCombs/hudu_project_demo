import {Box, Circle, HStack, VStack} from 'native-base';
import React, {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {CustomButton, CustomLoading, CustomText} from '~/components';
import {Project, ProjectStatus} from '~/generated/graphql';
import {
  useGetHasPaymentStripe,
  useGetHasPaymentStripeMutation,
  useGetProjectPaymentDetails,
  useGetPublishableKey,
  useOnboardingStripe,
} from '~/hooks/payment';
import {useGetProject} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize, fontFamily} from '~/utils/style';
import {showInfoMessage} from '~/utils/utils';

const SectionPaymentRoute = ({projectId}: {projectId: number}) => {
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });
  const {data: getPublishableKeyData, isLoading: isLoadingGetPublishableKey} =
    useGetPublishableKey();
  const result = getPublishableKeyData?.payment_getPublishableKey?.result;

  const projectData = getProject?.project_getProject?.result ?? {};
  const project: Project = projectData?.project;
  const projectStatus = project?.projectStatus;
  const isLister = userData?.id === project?.userId;
  const isDoer = projectData?.currentDoer?.id === userData?.id;
  const inProgress = projectStatus === ProjectStatus.InProgress;
  const isBidding = projectStatus === ProjectStatus.Bidding;
  const awardedBid = projectData.awardedBid;
  const cancelStatus =
    awardedBid?.cancellRequestStatus === 'PENDDING' ||
    awardedBid?.cancellRequestStatus === 'CANCELL';
  const listerCancelStatus =
    project?.cancellRequestStatus === 'PENDDING' ||
    project?.cancellRequestStatus === 'CANCELL';

  const listerFee = useMemo(() => {
    const commission =
      (result?.listerApplicationFee * awardedBid?.amount) / 100 ?? 0;
    return commission;
  }, [result, awardedBid]);

  const isDoerFinishProject = projectData?.isHuduFinished;

  const {data: getPaymentDetails, isLoading: isLoadingGetPayment} =
    useGetProjectPaymentDetails({projectId, projectStatus});
  const {
    mutate: mutateCheckHasStripe,
    isLoading: isLoadingMutateCheckHasStripe,
  } = useGetHasPaymentStripeMutation();
  const {mutate: mutateOnBoarding, isLoading: onBoardingLoading} =
    useOnboardingStripe();
  const {data, isLoading: isLoadingCheckHasStripe} = useGetHasPaymentStripe();
  const hasStripeAccount = data?.payment_hasStripeAccount?.result;

  const paymentDetails =
    getPaymentDetails?.payment_getProjectPaymentDetails?.result;

  const cancelOnPress = () => {
    if (hasStripeAccount) {
      navigate('ProjectCancelation', {projectId, projectStatus});
    } else {
      mutateCheckHasStripe(
        {},
        {
          onSuccess: successData => {
            if (successData?.payment_hasStripeAccount?.result) {
              navigate('ProjectCancelation', {projectId, projectStatus});
            } else {
              showInfoMessage(
                t('messages.completeStripe'),
                t('messages.takeMeThere'),
                goToStripe,
              );
            }
          },
        },
      );
    }
  };

  const doerCancelOnPress = () => {
    navigate('ProjectCancelation', {
      projectId,
      isLister: false,
      bidId: awardedBid?.id,
      projectStatus,
    });
  };

  const goToStripe = () => {
    mutateOnBoarding({});
  };

  if (isLoadingGetPayment || getProjectLoading || isLoadingGetPublishableKey) {
    return <CustomLoading />;
  }

  return (
    <VStack flex={1}>
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <VStack space="8px" p="16px" rounded="sm" bg={Colors.SEARCH_BACKGROUND}>
          <CustomText marginBottom={8} fontSize={fontSize.xNormal}>
            {t('projects.payment.paymentStatus')}
          </CustomText>
          <Item
            title={
              isDoer
                ? t('projects.payment.bidAmount')
                : t('projects.payment.inEscrow')
            }
            value={awardedBid?.amount}
            badgeColor={Colors.Ronchi}
          />
          <Item
            title={t('projects.payment.huduCommission')}
            value={isDoer ? paymentDetails?.doerFee : listerFee}
          />
          {!isDoer && (
            <Item
              title={t('projects.payment.coupon')}
              value={parseFloat(paymentDetails?.couponUsed).toFixed(2)}
            />
          )}
          <Item
            title={
              isDoer
                ? t('projects.payment.received')
                : t('projects.payment.paid')
            }
            value={
              isDoer
                ? paymentDetails?.doerReceipt
                : parseFloat(paymentDetails?.listerPayForAcceptingBidFee) +
                  parseFloat(paymentDetails?.listerPayForAcceptingBid)
            }
            badgeColor={Colors.LimeGreen}
          />
        </VStack>
      </ScrollView>
      {isLister &&
        !isDoerFinishProject &&
        (inProgress || isBidding) &&
        !listerCancelStatus &&
        !cancelStatus && (
          <VStack px="24px" pb="24px">
            <CustomButton
              title={
                isBidding
                  ? t('projects.deleteThisProject')
                  : t('projects.cancelThisProject')
              }
              loading={onBoardingLoading || isLoadingMutateCheckHasStripe}
              onPress={cancelOnPress}
              color={Colors.FrenchRose}
            />
          </VStack>
        )}
      {isDoer && !isDoerFinishProject && inProgress && !cancelStatus && (
        <VStack px="24px" pb="24px">
          <CustomButton
            title={t('projects.cancelMyBid')}
            onPress={doerCancelOnPress}
            color={Colors.FrenchRose}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default memo(SectionPaymentRoute);

const Item = ({
  title,
  value,
  badgeColor,
}: {
  title: string;
  value: string;
  badgeColor?: string;
}) => {
  return (
    <HStack py="10px" px="8px" bg={Colors.WHITE_F} rounded="sm">
      <VStack space="1" flex={1}>
        <CustomText fontSize={fontSize.xTiny} color={Colors.Topaz}>
          {title}
        </CustomText>
        <CustomText fontSize={fontSize.small} fontFamily={fontFamily.medium}>
          {value ? `$${parseFloat(value)?.toFixed(2)}` : '$0.00'}
        </CustomText>
      </VStack>
      {/* {badgeColor && <Circle size="6px" bg={badgeColor} />} */}
    </HStack>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
});
