import {yupResolver} from '@hookform/resolvers/yup';
import Lottie from 'lottie-react-native';
import {Box, HStack, VStack} from 'native-base';
import React, {useEffect, useMemo} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import * as yup from 'yup';
import animations from '~/assets/animations';
import {
  CustomButton,
  CustomContainer,
  CustomDivider,
  CustomKeyboardAvoidingView,
  CustomText,
  NumericUpDownInput,
  ScreensHeader,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useAddBid, useEditBid} from '~/hooks/bid';
import {useOnboardingStripe} from '~/hooks/payment';
import {navigate} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {authStore, bidStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {useGetMessages} from '~/utils/helper';
import {fontFamily, fontSize, width} from '~/utils/style';
import {
  showErrorMessage,
  showInfoMessage,
  showSnackBar,
  useGetProjectRemainedTime,
} from '~/utils/utils';

const defaultValues = {
  bidAmount: null,
};

export default function PlaceBidStepThreeScreen({navigation}: NavigationProp) {
  const {t} = useTranslation();
  const {showResponseMessage} = useGetMessages();
  const {placeBidAmountSchema} = useSchemas();

  const {isUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);
  const {bidTempData, resetBidStore} = bidStore(state => state);

  const isEditBidFlow = bidTempData?.flow === 'editBid';

  const {mutate: mutateAddBid, isLoading: addBidLoading} = useAddBid();
  const {mutate: mutateEditBid, isLoading: editBidLoading} = useEditBid();
  const {mutate: mutateOnBoarding, isLoading: onBoardingLoading} =
    useOnboardingStripe();
  const {getProjectRemainedTime} = useGetProjectRemainedTime();

  const projectData = bidTempData?.projectData;
  const bids = bidTempData?.bids;

  const yourLowestBid = useMemo(() => {
    return bids?.reduce((min: any, bid: any) => {
      return bid.amount < min ? bid.amount : min;
    }, bids?.[0]?.amount);
  }, [bids]);

  const {...methods} = useForm({
    resolver: yupResolver(placeBidAmountSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState, setValue} = methods;

  const remainedTime =
    getProjectRemainedTime(projectData?.project?.projectDeadLine) ?? '';

  useEffect(() => {
    if (isEditBidFlow) {
      setValue('bidAmount', bidTempData?.currentBid?.amount?.toString());
    } else {
      if (projectData?.currentLowBid) {
        setValue('bidAmount', projectData?.currentLowBid?.toString());
      }
    }
  }, [projectData]);

  const goToEditProfile = () => {
    navigate('MainTabs', {screen: 'ProfileTab'});
  };

  const onSubmit = (formData: typeof defaultValues) => {
    if (isUserLoggedIn) {
      if (userData?.userName) {
        if (isEditBidFlow) {
          editBid(formData.bidAmount);
        } else {
          addBid(formData.bidAmount);
        }
      } else {
        showInfoMessage(
          t('messages.completeProfile'),
          t('messages.completeYourProfile'),
          goToEditProfile,
        );
      }
    }
  };

  const goToStripe = () => {
    mutateOnBoarding(
      {},
      {
        onSuccess: successData => {
          if (
            successData?.payment_onboardUserInStripeConnect?.status ===
            ResponseStatus.Success
          ) {
          }
        },
      },
    );
  };

  const addBid = (bidAmount: number) => {
    const input = {
      description: bidTempData?.description,
      projectId: projectData?.project?.id,
      amount: bidAmount,
      bidAnswerToQuestionInputs: bidTempData?.questions ?? [],
    };
    mutateAddBid(input as any, {
      onSuccess: successData => {
        if (successData?.bid_addBid?.status === ResponseStatus.Success) {
          resetBidStore();
          if (bids?.length > 0) {
            navigation.popToTop();
            showSnackBar(
              t('messages.addBidSuccessfully'),
              <Lottie
                style={styles.lottie}
                source={animations.ThumbsUp}
                loop={true}
                autoPlay
              />,
            );
          } else {
            navigation.push('PlaceBidFinalStep');
          }
        } else if (
          successData?.bid_addBid?.status ===
          ResponseStatus.UserDontHaveStripeAccount
        ) {
          showInfoMessage(
            t('messages.completeStripe'),
            t('messages.takeMeThere'),
            goToStripe,
          );
        } else if (
          successData?.bid_addBid?.status === ResponseStatus.NotAllowed
        ) {
          showErrorMessage(t('messages.maxBidError'));
        } else {
          showResponseMessage(successData?.bid_addBid?.status);
        }
      },
      onError: () => {},
    });
  };

  const editBid = (bidAmount: number) => {
    const input = {
      description: bidTempData?.description,
      id: bidTempData?.currentBid?.id,
      amount: bidAmount,
      bidAnswerToQuestionInputs: bidTempData?.questions ?? [],
    };
    mutateEditBid(input as any, {
      onSuccess: successData => {
        if (successData?.bid_editBid?.status === ResponseStatus.Success) {
          resetBidStore();
          navigation.popToTop();
          showSnackBar(
            t('messages.editBidSuccessfully'),
            <Lottie
              style={styles.lottie}
              source={animations.ThumbsUp}
              loop={true}
              autoPlay
            />,
          );
        } else if (
          successData?.bid_editBid?.status ===
          ResponseStatus.UserDontHaveStripeAccount
        ) {
          showInfoMessage(
            t('messages.completeStripe'),
            t('messages.takeMeThere'),
            goToStripe,
          );
        } else if (
          successData?.bid_editBid?.status === ResponseStatus.NotAllowed
        ) {
          showErrorMessage(t('messages.maxBidError'));
        } else {
          showResponseMessage(successData?.bid_editBid?.status);
        }
      },
    });
  };

  return (
    <CustomContainer isLoading={onBoardingLoading}>
      <ScreensHeader
        zIndex={100}
        title={
          isEditBidFlow
            ? t('projects.bids.editBid')
            : t('projects.bids.PlaceABid')
        }
        subTitle={remainedTime}
        backAction
      />
      <CustomKeyboardAvoidingView>
        <VStack flex={1}>
          <Box
            borderBottomRadius="full"
            mt="2"
            h="300px"
            w="150%"
            top="-230px"
            alignSelf="center"
            justifyContent="flex-end"
            bg={Colors.Rhino}>
            <HStack
              bottom="-35px"
              w={width * 0.9}
              alignSelf="center"
              h="95px"
              bg={Colors.WHITE_F}
              shadow="4"
              rounded="sm"
              mx="24px"
              px="24px"
              alignItems="center">
              <VStack space="2" alignItems="center" flex={1}>
                <CustomText fontSize={fontSize.small} color={Colors.Topaz}>
                  {t('projects.bidAmount.currentLowBid')}
                </CustomText>
                <CustomText
                  fontSize={fontSize.xNormal}
                  fontFamily={fontFamily.medium}>
                  $ {projectData?.currentLowBid ?? 0}
                </CustomText>
              </VStack>
              <CustomDivider h="50px" orientation="vertical" />
              <VStack space="2" alignItems="center" flex={1}>
                <CustomText fontSize={fontSize.small} color={Colors.Topaz}>
                  {t('projects.bidAmount.yourLowestBid')}
                </CustomText>
                <CustomText
                  fontSize={fontSize.xNormal}
                  fontFamily={fontFamily.medium}>
                  $ {yourLowestBid ?? 0}
                </CustomText>
              </VStack>
            </HStack>
          </Box>
          <FormProvider {...methods}>
            <VStack flex={1}>
              <VStack flex={1} px="24px" py="24px" top="-150px" pt="8px">
                <NumericUpDownInput
                  {...register('bidAmount')}
                  {...{formState}}
                  label={t('common.tapToWrite')}
                />
              </VStack>
              <VStack px="24px" pb="24px" pt="8px">
                <CustomButton
                  color={Colors.Ronchi}
                  title={
                    isEditBidFlow
                      ? t('projects.bids.editBid')
                      : t('projects.bids.PlaceTheBid')
                  }
                  onPress={handleSubmit(onSubmit)}
                  loading={addBidLoading || editBidLoading}
                />
              </VStack>
            </VStack>
          </FormProvider>
        </VStack>
      </CustomKeyboardAvoidingView>
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  lottie: {
    height: 32,
    width: 32,
  },
});
