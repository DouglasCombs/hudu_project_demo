import {yupResolver} from '@hookform/resolvers/yup';
import {Flex, VStack} from 'native-base';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  CustomButton,
  CustomKeyboardAwareScrollView,
  CustomText,
  FormInput,
  InfoModal,
  SectionCategory,
} from '~/components';
import {push} from '~/navigation/Methods';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {isIllegal} from '~/utils/helper';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

const schema = yup.object().shape({
  title: yup.string().min(3).max(50).required('required').nullable(),
  categoryId: yup.object().required('required').nullable(),
  description: yup.string().required('required').nullable(),
});

const SectionAddProjectStep1 = () => {
  const {t} = useTranslation();

  const {projectData, setProjectData} = projectStore(state => state);
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, formState} = methods;

  const nextHandler = (formData: any) => {
    if (isIllegal(formData?.title) || isIllegal(formData?.description)) {
      setInfoModalVisible(true);
    } else {
      const data = {
        ...projectData,
        ...formData,
        categoryId: formData?.categoryId?.category?.id,
      };
      setProjectData(data);
      push('createProjectStep2');
    }
  };

  const onCloseInfoModal = () => {
    setInfoModalVisible(false);
  };

  return (
    <Flex flex={1} pb="6">
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView>
          <VStack py="4" space="4" flex={1}>
            <CustomText
              fontSize={fontSize.tooLarge}
              fontFamily={fontFamily.medium}
              marginTop={verticalScale(8)}>
              {t('projects.createProject.letsStart')}
            </CustomText>
            <CustomText
              marginTop={16}
              marginBottom={30}
              fontSize={fontSize.small}
              fontFamily={fontFamily.regular}>
              {t('projects.createProject.tellUs')}
            </CustomText>
            <FormInput
              {...register('title')}
              {...{formState}}
              multiline
              backgroundColor={Colors.WHITE}
              label={t('projects.createProject.title')}
            />
            <SectionCategory {...register('categoryId')} />
            <FormInput
              multiline
              {...register('description')}
              {...{formState}}
              backgroundColor={Colors.WHITE}
              label={t('projects.createProject.description')}
            />
          </VStack>
          <VStack alignSelf={'center'} w={'90%'}>
            <CustomButton
              title={t('projects.createProject.continue')}
              onPress={handleSubmit(nextHandler)}
            />
          </VStack>
        </CustomKeyboardAwareScrollView>
        <InfoModal
          isVisible={infoModalVisible}
          onClose={onCloseInfoModal}
          title={t('messages.errors.warning')}
          description={t('messages.errors.restrictError')}
          submitTitle={t('messages.errors.iUnderstand')}
        />
      </FormProvider>
    </Flex>
  );
};

export default SectionAddProjectStep1;
