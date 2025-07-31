import {yupResolver} from '@hookform/resolvers/yup';
import {HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  AnimationProvider,
  CustomButton,
  CustomContainer,
  CustomDivider,
  CustomKeyboardAvoidingView,
  CustomText,
  CustomTouchable,
  FormInput,
  InfoModal,
  ScreensHeader,
} from '~/components';
import {useGetProject} from '~/hooks/project';
import {useKeyboardVisible} from '~/hooks/useKeyboardVisible';
import {useSchemas} from '~/schemas';
import {bidStore} from '~/stores';
import {Colors} from '~/styles';
import {isIllegal} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';
import {useGetProjectRemainedTime} from '~/utils/utils';

const defaultValues = {
  description: '',
};

export default function PlaceBidStepTwoScreen({navigation}: NavigationProp) {
  const {t} = useTranslation();
  const keyboardVisible = useKeyboardVisible();
  const {getProjectRemainedTime} = useGetProjectRemainedTime();

  const {bidTempData, setBidTempData} = bidStore(state => state);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

  const isEditBidFlow = bidTempData?.flow === 'editBid';

  const {data: getProject, isLoading: isLoadingGetProject} = useGetProject({
    enabled: isEditBidFlow,
    projectId: bidTempData?.projectId,
  });

  const projectData = isEditBidFlow
    ? getProject?.project_getProject?.result
    : bidTempData?.projectData;

  const {placeBidAddDescriptionSchema} = useSchemas();

  const {...methods} = useForm({
    resolver: yupResolver(placeBidAddDescriptionSchema),
    mode: 'onChange',
    defaultValues,
  });

  const {handleSubmit, register, formState, setValue} = methods;

  useEffect(() => {
    if (isEditBidFlow) {
      setValue('description', bidTempData?.currentBid?.description);
    }
  }, [isEditBidFlow]);

  const remainedTime =
    getProjectRemainedTime(projectData?.project?.projectDeadLine) ?? '';

  const onSubmit = (formData: typeof defaultValues) => {
    if (isIllegal(formData?.description)) {
      setInfoModalVisible(true);
    } else {
      goToNext(formData);
    }
  };

  const onCloseInfoModal = () => {
    setInfoModalVisible(false);
  };

  const goToNext = (formData: any) => {
    setBidTempData({
      ...bidTempData,
      description: formData?.description,
    });
    navigation.push('PlaceBidStepThree');
  };

  return (
    <CustomContainer isLoading={isLoadingGetProject}>
      <ScreensHeader
        title={
          isEditBidFlow
            ? t('projects.bids.editBid')
            : t('projects.bids.PlaceABid')
        }
        subTitle={remainedTime}
        backAction
      />
      <FormProvider {...methods}>
        <CustomKeyboardAvoidingView>
          <VStack flex={1}>
            <VStack flex={1} px="24px" py="24px" pt="8px">
              <CustomText>{t('projects.bids.bidDescriptionPrompt')}</CustomText>
              <CustomDivider my="24px" />
              <FormInput
                multiline
                backgroundColor={Colors.WHITE_F}
                {...register('description')}
                {...{formState}}
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
                  <CustomTouchable onPress={handleSubmit(onSubmit)}>
                    <CustomText
                      marginBottom={8}
                      color={Colors.PRIMARY}
                      fontFamily={fontFamily.medium}
                      fontSize={fontSize.xNormal}>
                      {t('common.continue')}
                    </CustomText>
                  </CustomTouchable>
                </HStack>
              }
              inVisibleChildren={
                <VStack px="24px" pb="24px" pt="8px">
                  <CustomButton
                    color={Colors.Ronchi}
                    title={t('common.continue')}
                    onPress={handleSubmit(onSubmit)}
                  />
                </VStack>
              }
            />
          </VStack>
        </CustomKeyboardAvoidingView>
      </FormProvider>
      <InfoModal
        isVisible={infoModalVisible}
        onClose={onCloseInfoModal}
        title={t('messages.errors.warning')}
        description={t('messages.errors.restrictError')}
        submitTitle={t('messages.errors.iUnderstand')}
      />
    </CustomContainer>
  );
}
