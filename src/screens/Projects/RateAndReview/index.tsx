import {Center, HStack, VStack} from 'native-base';
import React, {useState} from 'react';
import {Rating, StarFillSquare, StarSquare} from '~/assets/icons';
import {
  AnimationProvider,
  CustomButton,
  CustomContainer,
  CustomDivider,
  CustomKeyboardAvoidingView,
  CustomText,
  CustomTouchable,
  FormInput,
  HourlyRateModal,
  RatingStar,
} from '~/components';
import {useKeyboardVisible} from '~/hooks/useKeyboardVisible';
import {Colors} from '~/styles';
import {yupResolver} from '@hookform/resolvers/yup';
import {FormProvider, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {useTranslation} from 'react-i18next';
import {useSchemas} from '~/schemas';
import {fontFamily, fontSize} from '~/utils/style';
import {goBack} from '~/navigation/Methods';
import {useHuduFinishedProject} from '~/hooks/bid';
import {ResponseStatus} from '~/generated/graphql';
import {useAddFeedBack, useFinishProject} from '~/hooks/project';
import queryKeys from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';

const defaultValues = {
  review: '',
};

export default function RateAndReviewScreen({route}: NavigationProp) {
  const projectId = route!.params!.projectId;
  const asLister = route!.params!.asLister;
  const bidId = route!.params!.bidId;

  const {t} = useTranslation();
  const {rateAndReviewSchema} = useSchemas();
  const keyboardVisible = useKeyboardVisible();

  const [rate, setRate] = useState<number>(5);
  const [hourlyModalVisible, setHourlyModalVisible] = useState<boolean>(false);

  const {...methods} = useForm({
    resolver: yupResolver(rateAndReviewSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState} = methods;

  const {
    mutate: mutateDoerFinishProject,
    isLoading: isLoadingDoerFinishProject,
  } = useHuduFinishedProject();

  const {
    mutate: mutateListerFinishProject,
    isLoading: isLoadingListerFinishProject,
  } = useFinishProject();

  const {mutate: mutateAddFeedBack, isLoading: addFeedBackLoading} =
    useAddFeedBack();

  const onSubmit = (formData: typeof defaultValues) => {
    if (asLister) {
      mutateListerFinishProject(projectId, {
        onSuccess: successData => {
          if (
            successData?.project_finisheProject?.status ===
            ResponseStatus.Success
          ) {
            addFeedBackToDoer(formData);
          }
        },
      });
    } else {
      mutateDoerFinishProject(bidId, {
        onSuccess: successData => {
          if (
            successData?.bid_huduFinsihedProject?.status ===
            ResponseStatus.Success
          ) {
            addFeedBackToLister(formData);
          }
        },
      });
    }
  };

  const addFeedBackToLister = (formData: typeof defaultValues) => {
    const input = {
      bidId,
      hudusRate: rate,
      hudusComment: formData?.review,
      listersRate: 0,
      listersComment: '',
    };
    mutateAddFeedBack(input, {
      onSuccess: successData => {
        if (
          successData?.project_addFeedBack?.status === ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.projects, {exact: false});
          queryClient.invalidateQueries(queryKeys.project, {exact: false});
          setHourlyModalVisible(true);
        }
      },
    });
  };

  const addFeedBackToDoer = (formData: typeof defaultValues) => {
    const input = {
      bidId,
      hudusRate: 0,
      hudusComment: '',
      listersRate: rate,
      listersComment: formData?.review,
    };
    mutateAddFeedBack(input, {
      onSuccess: feedBackSuccessData => {
        if (
          feedBackSuccessData?.project_addFeedBack?.status ===
          ResponseStatus.Success
        ) {
          queryClient.invalidateQueries(queryKeys.projects, {exact: false});
          queryClient.invalidateQueries(queryKeys.project, {exact: false});
          goBack();
        }
      },
    });
  };

  const cancelOnPress = () => {
    goBack();
  };

  const onCloseHourlyRateModal = () => {
    setHourlyModalVisible(false);
    goBack();
  };

  const loading =
    addFeedBackLoading ||
    isLoadingDoerFinishProject ||
    isLoadingListerFinishProject;

  return (
    <CustomContainer
      statusBarBackgroundColor={Colors.WHITE}
      barStyle="dark-content">
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView>
          <VStack flex={1}>
            <VStack flex={1} px="24px" py="24px" pt="24px">
              {!keyboardVisible && (
                <Center mb="12px">
                  <Rating />
                </Center>
              )}
              <CustomText
                textAlign="center"
                fontFamily={fontFamily.medium}
                fontSize={fontSize.tooLarge}>
                {t('projects.rateAndReview')}
              </CustomText>
              <CustomText
                marginTop={13}
                textAlign="center"
                fontSize={fontSize.small}>
                {asLister
                  ? t('projects.shareYourFeedbackOnDoer')
                  : t('projects.shareYourFeedbackOnLister')}
              </CustomText>
              <CustomDivider my="24px" />
              <CustomText
                marginBottom={8}
                fontFamily={fontFamily.medium}
                fontSize={fontSize.small}>
                {asLister
                  ? t('projects.doerRating')
                  : t('projects.listerRating')}
              </CustomText>
              <RatingStar
                half={false}
                spacing={11}
                rate={rate}
                onChange={setRate}
                customFullStar={<StarFillSquare />}
                customEmptyStar={<StarSquare />}
                disabled={loading}
              />
              <FormInput
                disabled={loading}
                mt="24px"
                minH="130px"
                multiline
                label={
                  asLister
                    ? t('projects.doerReview')
                    : t('projects.listerReview')
                }
                backgroundColor={Colors.SEARCH_BACKGROUND}
                {...register('review')}
                {...{formState}}
                counter={200}
              />
            </VStack>
            <AnimationProvider
              visible={keyboardVisible}
              visibleChildren={
                <HStack
                  justifyContent="flex-end"
                  alignItems="center"
                  h="48px"
                  px="24px"
                  bg={Colors.SEARCH_BACKGROUND}>
                  <CustomTouchable
                    disabled={loading}
                    onPress={handleSubmit(onSubmit)}>
                    <CustomText
                      marginBottom={8}
                      color={Colors.PRIMARY}
                      fontFamily={fontFamily.medium}
                      fontSize={fontSize.xNormal}>
                      {t('common.submit')}
                    </CustomText>
                  </CustomTouchable>
                </HStack>
              }
              inVisibleChildren={
                <HStack space="10px" px="24px" pb="24px" pt="8px">
                  <CustomButton
                    flex={1}
                    color={Colors.Solitude}
                    textColor={Colors.Topaz}
                    title={t('common.cancel')}
                    onPress={cancelOnPress}
                    disabled={loading}
                  />
                  <CustomButton
                    flex={1}
                    color={Colors.PRIMARY}
                    title={t('common.submit')}
                    onPress={handleSubmit(onSubmit)}
                    loading={loading}
                  />
                </HStack>
              }
            />
          </VStack>
        </CustomKeyboardAvoidingView>
      </FormProvider>
      <HourlyRateModal
        visible={hourlyModalVisible}
        onClose={onCloseHourlyRateModal}
        bidId={bidId}
      />
    </CustomContainer>
  );
}
