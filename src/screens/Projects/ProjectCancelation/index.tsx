import {yupResolver} from '@hookform/resolvers/yup';
import {Box, VStack} from 'native-base';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  AnimationProvider,
  CustomButton,
  CustomContainer,
  CustomDivider,
  CustomKeyboardAvoidingView,
  CustomKeyboardAwareScrollViewV2,
  CustomRadioGroupV2,
  CustomText,
  FormInput,
  ScreensHeader,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {ProjectStatus, ResponseStatus} from '~/generated/graphql';
import {useCancelBid} from '~/hooks/bid';
import {useCancelProject} from '~/hooks/project';
import {resetRoot} from '~/navigation/Methods';
import {useSchemas} from '~/schemas';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const defaultValues = {
  cancelProjectStatus: null,
  cancellationReason: '',
};

const ProjectCancelationScreen = ({route}: NavigationProp) => {
  const projectId = route!.params!.projectId;
  const bidId = route!.params!.bidId;
  const isLister = route!.params!.isLister;
  const projectStatus = route!.params!.projectStatus;
  const isBidding = projectStatus === ProjectStatus.Bidding;

  const {t} = useTranslation();
  const {projectCancelationSchema} = useSchemas();
  const {projectCancelationReason, projectCancelationReasonWithDoer} =
    useMockData();

  const {...methods} = useForm({
    resolver: yupResolver(projectCancelationSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState, watch} = methods;

  const {mutate: mutateCancelProject, isLoading: isLoadingCancelProject} =
    useCancelProject();
  const {mutate: mutateCancelBid, isLoading: isLoadingCancelBid} =
    useCancelBid();

  const cancelProjectStatus = watch('cancelProjectStatus');

  const onSubmit = (formData: typeof defaultValues) => {
    const input = {
      projectId,
      ...(formData?.cancelProjectStatus?.value === 'OTHERS'
        ? {
            cancellationReason: formData?.cancellationReason,
          }
        : {
            cancelProjectStatus: formData?.cancelProjectStatus?.value,
          }),
    };
    mutateCancelProject(input, {
      onSuccess: successData => {
        if (
          successData?.project_cancellProject?.status === ResponseStatus.Success
        ) {
          setTimeout(() => {
            resetRoot('MainTabs');
          }, 100);
        }
      },
    });
  };

  const doerOnSubmit = (formData: any) => {
    mutateCancelBid(
      {
        bidId,
        ...(typeof formData?.cancellationReason === 'string' && {
          cancellationReason: formData?.cancellationReason,
        }),
        ...(formData?.cancelProjectStatus?.value && {
          cancelBidType: formData?.cancelProjectStatus?.value,
        }),
      },
      {
        onSuccess: successData => {
          if (successData?.bid_cancellBid?.status === ResponseStatus.Success) {
            setTimeout(() => {
              resetRoot('MainTabs');
            }, 100);
          }
        },
      },
    );
  };

  return (
    <CustomContainer isLoading={isLoadingCancelProject || isLoadingCancelBid}>
      <ScreensHeader backAction title={t('projects.projectCancelation')} />
      <Box h="16px" bg={Colors.SEARCH_BACKGROUND} />
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView>
          <VStack flex={1}>
            <CustomKeyboardAwareScrollViewV2
              contentContainerStyle={styles.contentContainerStyle}>
              <VStack flex={1}>
                <CustomText
                  marginBottom={28}
                  fontFamily={fontFamily.medium}
                  fontSize={fontSize.tooLarge}>
                  {t('projects.cancelationTitle')}
                </CustomText>
                <CustomRadioGroupV2
                  {...register('cancelProjectStatus')}
                  data={
                    isLister
                      ? projectCancelationReason
                      : projectCancelationReasonWithDoer
                  }
                  titleKey="title"
                  valueKey="value"
                />
                <AnimationProvider
                  animationType="opacity"
                  visible={cancelProjectStatus?.value === 'OTHERS'}
                  visibleChildren={
                    <>
                      <CustomDivider my="24px" />
                      <FormInput
                        minH="130px"
                        multiline
                        label={t('projects.cancelationReason')}
                        backgroundColor={Colors.SEARCH_BACKGROUND}
                        {...register('cancellationReason')}
                        {...{formState}}
                      />
                    </>
                  }
                  inVisibleChildren={null}
                />
              </VStack>
            </CustomKeyboardAwareScrollViewV2>
            <VStack pb="24px" px="24px">
              {isLister ? (
                <CustomButton
                  title={
                    isBidding
                      ? t('projects.deleteThisProject')
                      : t('projects.cancelThisProject')
                  }
                  onPress={handleSubmit(onSubmit)}
                  color={Colors.FrenchRose}
                />
              ) : (
                <CustomButton
                  title={t('projects.sendCancelationRequest')}
                  onPress={handleSubmit(doerOnSubmit)}
                  color={Colors.FrenchRose}
                />
              )}
            </VStack>
          </VStack>
        </CustomKeyboardAvoidingView>
      </FormProvider>
    </CustomContainer>
  );
};

export default ProjectCancelationScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
});
