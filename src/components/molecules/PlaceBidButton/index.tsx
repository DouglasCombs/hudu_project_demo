import dayjs from 'dayjs';
import {Center, HStack} from 'native-base';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Hand} from '~/assets/icons';
import {
  CustomFloatActionButton,
  CustomText,
  CustomTouchable,
} from '~/components';
import {BidStatus, ProjectFilter, ProjectStatus} from '~/generated/graphql';
import {useGetUserTaworkRate} from '~/hooks/JDP';
import {useGetBids, useGetBidsMutation} from '~/hooks/bid';
import {
  useGetHasPaymentStripe,
  useGetHasPaymentStripeMutation,
  useOnboardingStripe,
} from '~/hooks/payment';
import {useGetProjectQuestions} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {bidStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {getTazWorkRate} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';
import {showErrorMessage, showInfoMessage} from '~/utils/utils';

export default function PlaceBidButton(props: {
  projectId: number;
  title?: any;
  icon?: JSX.Element;
  bottom?: number | string;
  acceptBid?: boolean;
  onPress?: () => void;
  price?: string | number;
}) {
  const {t} = useTranslation();

  const {
    projectId,
    title = t('projects.bids.PlaceABid'),
    icon = <Hand />,
    bottom = '24px',
    acceptBid = false,
    onPress = null,
    price = 0,
  } = props;

  const {userData} = userDataStore();
  const {bidTempData, setBidTempData} = bidStore(state => state);

  const {data: getProject, isLoading: isLoadingGetProject} =
    useGetProjectQuestions({
      projectId,
    });
  const {data: dataGetUserTazWorkRate, isLoading: isLoadingGetUserTazWorkRate} =
    useGetUserTaworkRate(userData?.id);

  const {mutate: mutateOnBoarding, isLoading: onBoardingLoading} =
    useOnboardingStripe();
  const {data, isLoading: isLoadingCheckHasStripe} = useGetHasPaymentStripe();
  const {
    mutate: mutateCheckHasStripe,
    isLoading: isLoadingMutateCheckHasStripe,
  } = useGetHasPaymentStripeMutation();

  const userTazWorkRate =
    dataGetUserTazWorkRate?.tazworkOrders_getUserTazWorkRate?.result;

  const {hasTazWorkRate} = useMemo(() => {
    return getTazWorkRate(userTazWorkRate);
  }, [userTazWorkRate]);

  const hasStripeAccount = data?.payment_hasStripeAccount?.result;

  const projectData = getProject?.project_getProject?.result ?? {};
  const questions = projectData?.projectQuestions ?? [];
  const projectStatus = projectData?.project?.projectStatus;
  const projectDeadLine = dayjs(projectData?.project?.projectDeadLine);
  const backgroundCheckTypeForDoer =
    projectData?.project?.backgroundCheckTypeForDoer;

  const now = dayjs();
  const timeDiff = projectDeadLine.diff(now);
  const durationDiff = dayjs.duration(timeDiff);
  const hoursDiff = durationDiff.asHours();

  const {data: getBids, isLoading: isLoadingGetBids} = useGetBids({
    location: [12, 12],
    projectFilter: ProjectFilter.LowToHighBids,
    where: {
      and: [
        {huduId: {eq: userData?.id}},
        {projectId: {eq: projectId}},
        {bidStatus: {eq: BidStatus.Waiting}},
      ],
    },
  });

  const {mutate: mutateGetBids, isLoading: isLoadingMutateGetBids} =
    useGetBidsMutation({
      location: [12, 12],
      projectFilter: ProjectFilter.LowToHighBids,
      where: {
        and: [
          {huduId: {eq: userData?.id}},
          {projectId: {eq: projectId}},
          {bidStatus: {eq: BidStatus.Waiting}},
        ],
      },
    });

  const bids = getBids?.pages ?? [];

  const onPressHandler = () => {
    if (backgroundCheckTypeForDoer !== 'OPTIONAL') {
      if (hasTazWorkRate) {
        placeBidHandler();
      } else {
        showErrorMessage(
          t('messages.errors.jdpError1'),
          t('messages.chooseBackgroundCheck'),
          goToBackgroundCheck,
        );
      }
    } else {
      placeBidHandler();
    }
  };

  const placeBidHandler = () => {
    if (hasStripeAccount) {
      handlePlaceBid();
    } else {
      mutateCheckHasStripe(
        {},
        {
          onSuccess: successData => {
            if (successData?.payment_hasStripeAccount?.result) {
              handlePlaceBid();
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

  const handlePlaceBid = () => {
    mutateGetBids(
      {},
      {
        onSuccess: successData => {
          if (successData?.bid_getBids?.result?.totalCount >= 3) {
            showErrorMessage(
              t('messages.errors.maxBidsError'),
              t('messages.errors.manageMyBids'),
              goToManageBids,
              'bottom',
            );
          } else {
            if (questions && questions?.length > 0) {
              setBidTempData({
                flow: 'placeBid',
              });
              navigate('PlaceBid', {projectId});
            } else {
              setBidTempData({
                ...bidTempData,
                questions: [],
                bids,
                projectData,
                flow: 'placeBid',
              });
              navigate('PlaceBidStepTwo');
            }
          }
        },
      },
    );
  };

  const goToManageBids = () => {
    navigate('ManageBids', {projectId});
  };

  const goToStripe = () => {
    mutateOnBoarding({});
  };

  const goToBackgroundCheck = () => {
    navigate('BackgroundCheckDetails');
  };

  const loading =
    isLoadingGetProject ||
    isLoadingGetBids ||
    isLoadingCheckHasStripe ||
    isLoadingGetUserTazWorkRate;

  if (loading || projectStatus !== ProjectStatus.Bidding || hoursDiff <= 0) {
    return null;
  }

  if (acceptBid) {
    return (
      <HStack
        position={'absolute'}
        zIndex={100}
        right="24px"
        bottom="24px"
        justifyContent={'flex-end'}>
        <CustomTouchable onPress={onPress || onPressHandler}>
          <HStack
            borderRadius={'full'}
            py="4px"
            justifyContent={'space-between'}
            alignItems={'center'}
            space="4"
            px="1"
            bg={Colors.PRIMARY}>
            <Center px="4" py="2" borderRadius={'full'} bg={Colors?.WHITE}>
              <CustomText
                fontSize={fontSize.xNormal}
                fontFamily={fontFamily.medium}
                color={Colors?.PRIMARY}>
                ${price}
              </CustomText>
            </Center>
            <CustomText
              fontFamily={fontFamily.medium}
              fontSize={fontSize.xNormal}
              marginRight={12}
              color={Colors.WHITE_F}>
              {title}
            </CustomText>
          </HStack>
        </CustomTouchable>
      </HStack>
    );
  }

  return (
    <CustomFloatActionButton
      size="auto"
      bottom={bottom}
      customIcon={icon}
      onPress={onPressHandler}
      title={title}
      loading={
        onBoardingLoading ||
        isLoadingMutateCheckHasStripe ||
        isLoadingMutateGetBids
      }
    />
  );
}
