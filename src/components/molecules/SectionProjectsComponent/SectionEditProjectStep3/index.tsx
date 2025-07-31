import {yupResolver} from '@hookform/resolvers/yup';
import {Center, Divider, Flex, HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as yup from 'yup';
import {
  CustomButton,
  CustomDateTimePicker,
  CustomKeyboardAwareScrollView,
  CustomText,
} from '~/components';
import {useGetProject} from '~/hooks/project';
import {push} from '~/navigation/Methods';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {handleSpecificDate} from '~/utils/helper';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';
import {showInfoMessage} from '~/utils/utils';

const schema = yup.object().shape({
  startDate: yup.string().nullable(),
  endDate: yup.string().nullable(),
  projectDeadLine: yup.string().nullable(),
});

const SectionEditProjectStep3 = ({projectId}: {projectId: number}) => {
  const {t} = useTranslation();

  const {projectData, setProjectData} = projectStore(state => state);

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });
  const project = getProject?.project_getProject?.result?.project ?? {};

  const [selectedTime, setSelectedTime] = useState('');

  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {handleSubmit, register, setValue, formState, watch} = methods;
  useEffect(() => {
    if (project) {
      setSelectedTime(project?.availability);
      setValue('startDate', project?.startDate);
      setValue('endDate', project?.endDate);
      setValue('projectDeadLine', project?.projectDeadLine);
    }
  }, [project]);

  const nextHandler = (formData: any) => {
    if (selectedTime?.length > 0) {
      let data = {};
      switch (selectedTime) {
        case 'FLEXIBLE_DATE':
          data = {
            ...projectData,
            startDate: new Date(),
            endDate: new Date(),
            availability: selectedTime,
          };
          setProjectData(data);
          push('createProjectStep4');
          break;
        case 'SPECIFIC_DATE':
          if (formData?.projectDeadLine) {
            data = {
              ...projectData,
              projectDeadLine: handleSpecificDate(formData?.projectDeadLine),
              startDate: formData?.projectDeadLine,
              endDate: formData?.projectDeadLine,
              availability: selectedTime,
            };
            setProjectData(data);
            push('createProjectStep4');
          } else {
            showInfoMessage('Please select a Date!');
          }

          break;

        default:
          if (formData?.startDate && formData?.endDate) {
            data = {
              ...projectData,
              startDate: formData?.startDate,
              endDate: formData?.endDate,
              projectDeadLine: handleSpecificDate(formData?.startDate),
              availability: selectedTime,
            };
            setProjectData(data);
            push('createProjectStep4');
          } else {
            showInfoMessage('Please select a Start Date and End Date!');
          }
          break;
      }
    } else {
      showInfoMessage('Please select a Date!');
    }
  };

  useEffect(() => {
    if (watch('endDate') && watch('startDate')) {
      if (new Date(watch('endDate')) < new Date(watch('startDate'))) {
        setValue(
          'endDate',
          new Date(
            new Date().setDate(new Date(watch('startDate')).getDate() + 1),
          ),
        );
      }
    }
  }, [watch('startDate')]);

  return (
    <Flex flex={1} pb="6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <FormProvider {...methods}>
          <CustomKeyboardAwareScrollView>
            <VStack py="4" space="4" flex={1}>
              <CustomText
                fontSize={fontSize.tooLarge}
                fontFamily={fontFamily.medium}
                marginTop={verticalScale(8)}>
                {t('projects.createProject.driveToDetails')}
              </CustomText>
              <CustomText
                marginTop={16}
                marginBottom={30}
                fontSize={fontSize.small}
                fontFamily={fontFamily.regular}>
                {t('projects.createProject.preferredTiming')}
              </CustomText>
              <RadioButton
                isActive={selectedTime === 'FLEXIBLE_DATE'}
                item={{
                  title: t('projects.createProject.flexibleDate'),
                  description: t('projects.createProject.flexDateDesc'),
                }}
                onPressHandler={() => {
                  setSelectedTime('FLEXIBLE_DATE');
                }}
              />
              <RadioButton
                isActive={selectedTime === 'SPECIFIC_DATE'}
                item={{
                  title: t('projects.createProject.specificDate'),
                  description: t('projects.createProject.specificDateDesc'),
                }}
                onPressHandler={() => {
                  setSelectedTime('SPECIFIC_DATE');
                }}
                selectDateComponent={
                  <CustomDateTimePicker
                    {...register('projectDeadLine')}
                    placeholder={t('projects.createProject.selectDate')}
                  />
                }
              />
              <RadioButton
                isActive={selectedTime === 'SELECTABLE_DATERANGE'}
                item={{
                  title: t('projects.createProject.selectableDateRange'),
                  description: t(
                    'projects.createProject.selectableDateRangeDesc',
                  ),
                }}
                onPressHandler={() => {
                  setSelectedTime('SELECTABLE_DATERANGE');
                }}
                selectDateComponent={
                  <HStack
                    flex={1}
                    justifyContent={'space-between'}
                    alignItems={'center'}>
                    <CustomDateTimePicker
                      width={'50%'}
                      minimumDate={
                        new Date(new Date().setDate(new Date().getDate() + 1))
                      }
                      {...register('startDate')}
                      isTime
                      placeholder={t('projects.createProject.selectStartDate')}
                    />
                    <Divider
                      color={Colors.GRAY_6}
                      width={'1px'}
                      h={'15px'}
                      mt="4"
                      mr="2"
                      alignSelf={'center'}
                    />
                    <CustomDateTimePicker
                      width={'50%'}
                      isTime
                      minimumDate={
                        new Date(
                          watch('startDate') ||
                            new Date(
                              new Date().setDate(new Date().getDate() + 1),
                            ),
                        )
                      }
                      {...register('endDate')}
                      placeholder={t('projects.createProject.selectEndDate')}
                    />
                  </HStack>
                }
              />
            </VStack>
          </CustomKeyboardAwareScrollView>
        </FormProvider>
      </ScrollView>
      <VStack alignSelf={'center'} w={'90%'}>
        <CustomButton
          title={t('projects.createProject.continue')}
          onPress={handleSubmit(nextHandler)}
        />
      </VStack>
    </Flex>
  );
};

export default SectionEditProjectStep3;

const RadioButton = ({
  isActive,
  item,
  onPressHandler,
  selectDateComponent,
}: {
  isActive: boolean;
  item: any;
  onPressHandler: () => void;
  selectDateComponent?: any;
}) => {
  return (
    <TouchableOpacity
      key={item?.value}
      onPress={() => onPressHandler(item)}
      activeOpacity={0.7}
      style={styles.item}>
      <HStack alignItems="center" space="1">
        <CustomText
          color={Colors.BLACK_2}
          flex={1}
          fontSize={fontSize.xNormal}
          fontFamily={fontFamily.medium}>
          {item?.title}
        </CustomText>
        <Center
          borderRadius="full"
          size="6"
          p="0.5"
          overflow="hidden"
          borderWidth="0.5"
          borderColor={isActive ? Colors.PRIMARY : Colors.GRAY_6}
          bg={Colors.GRAY_6}>
          <Center
            size="full"
            borderRadius="full"
            bg={isActive ? Colors.PRIMARY : Colors.GRAY_6}
          />
        </Center>
      </HStack>
      <CustomText color={Colors.Topaz} fontSize={fontSize.xNormal}>
        {item?.description}
      </CustomText>
      {isActive && selectDateComponent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: scale(16),
    width: '100%',
    borderRadius: 5,
  },
});
