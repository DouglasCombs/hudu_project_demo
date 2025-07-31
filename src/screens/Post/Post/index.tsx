import React, {useState} from 'react';
import {Linking, StyleSheet, Keyboard} from 'react-native';
import {VStack, Center, HStack} from 'native-base';
import {
  CustomContainer,
  CustomKeyboardAwareScrollView,
  CustomInput,
  CustomPicker,
  CustomButton,
  SectionProjectImages,
  CustomRadioGroup,
  QuestionModal,
  PreviewPostModal,
  CustomDateTimePicker,
  CollapsibleProvider,
  CustomText,
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Colors} from '~/styles';
import {fontFamily, verticalScale, fontSize} from '~/utils/style';
import {
  allowStateList,
  availabilityData,
  locationData,
  timeLeftData,
} from '~/constants/mockData';
import {userDataStore} from '~/stores';
import {useAddProject} from '~/hooks/project';
import {Availability, ResponseStatus} from '~/generated/graphql';
import {useGetLocationMutate} from '~/hooks/location';
import {useGetMessages, isAllowZipCode} from '~/utils/helper';
import queryKeys from '~/constants/queryKeys';
import {resetRoot, navigate} from '~/navigation/Methods';
import {queryClient} from '~/graphql/AuthProvider';
import {showErrorMessage} from '~/utils/utils';

const schema = yup.object().shape({
  projectImages: yup.array().required('required'),
  title: yup.string().required('required').nullable().trim(),
  description: yup.string().required('required').nullable().trim(),
  availability: yup.string().required('required').nullable(),
  timeLeft: yup.string().nullable(),
  duration: yup.string().when('availability', {
    is: 'SPECIFIC_TIME',
    then: () =>
      yup
        .string()
        .typeError('you must specify a number')
        .required('required')
        .nullable(),
  }),
  projectDeadLine: yup.string().when('timeLeft', {
    is: 'custom',
    then: () => yup.string().required('required').nullable(),
  }),
  location: yup.string().nullable(),
  streetAddress: yup.string().when('location', {
    is: 'NEW_ADDRESS',
    then: () => yup.string().required('required').nullable().trim(),
  }),
  city: yup.string().when('location', {
    is: 'NEW_ADDRESS',
    then: () => yup.string().required('required').nullable().trim(),
  }),
  state: yup.string().when('location', {
    is: 'NEW_ADDRESS',
    then: () => yup.string().required('required').nullable(),
  }),
  zipCode: yup.string().when('location', {
    is: 'NEW_ADDRESS',
    then: () =>
      yup
        .string()
        .required('required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(5, 'Must be exactly 5 digits')
        .max(5, 'Must be exactly 5 digits')
        .nullable()
        .trim(),
  }),
});

interface Toast {
  message: string;
  type: string;
  icon: string;
}

const PostScreen = ({navigation}: NavigationProp) => {
  const {userData} = userDataStore(state => state);
  const {getResponseMessage} = useGetMessages();

  const maximumDate = new Date();
  maximumDate.setDate(maximumDate.getDate() + 7);

  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      location: 'NEW_ADDRESS',
      timeLeft: 'default',
    },
  });

  const {handleSubmit, register, watch, formState, reset} = methods;

  const availability = watch('availability');
  const location = watch('location');
  const timeLeft = watch('timeLeft');

  const [projectId, setProjectId] = useState(null);
  const [questionModalVisible, setQuestionModalVisible] =
    useState<boolean>(false);
  const [completeProfileModal, setCompleteProfileModal] =
    useState<boolean>(false);
  const [completeUserNameModal, setCompleteUserNameModal] =
    useState<boolean>(false);
  const [previewPostModalVisible, setPreviewPostModalVisible] =
    useState<boolean>(false);
  const [inputData, setInputData] = useState();
  const [availabilityInput, setAvailabilityInput] = useState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<Toast>();

  const {mutate: addProjectMutate, isLoading: addProjectLoading} =
    useAddProject();
  const {mutate: getLocationMutate, isLoading: getLocationLoading} =
    useGetLocationMutate();

  const previewOnPress = async (formData: any) => {
    const projectDeadLine =
      timeLeft === 'custom'
        ? new Date(formData?.projectDeadLine)
        : new Date(maximumDate);
    if (userData?.userName) {
      if (formData?.availability === Availability.SpecificTime) {
        let input = {};
        if (formData?.location === 'NEW_ADDRESS') {
          const zipCodeResponse = isAllowZipCode(formData?.zipCode);
          if (zipCodeResponse) {
            input = {
              duration: formData?.duration,
              projectImages: formData?.projectImages
                ? formData?.projectImages
                : [],
              title: formData?.title,
              description: formData?.description,
              availability: formData?.availability,
              streetAddress: formData?.streetAddress,
              city: formData?.city,
              state: formData?.state,
              zipCode: formData?.zipCode,
              projectDeadLine,
            };
            goToNext(input, 'Specific time');
          } else {
            showErrorMessage(
              'HUDU is not currently available in your market, new markets are coming soon…',
            );
          }
        } else {
          if (
            userData?.streetAddress &&
            userData?.city &&
            userData?.state &&
            userData?.zipCode
          ) {
            const zipCodeResponse = isAllowZipCode(userData?.zipCode);
            if (zipCodeResponse) {
              input = {
                duration: formData?.duration,
                projectImages: formData?.projectImages
                  ? formData?.projectImages
                  : [],
                title: formData?.title,
                description: formData?.description,
                availability: formData?.availability,
                streetAddress: userData?.streetAddress,
                city: userData?.city,
                state: userData?.state,
                zipCode: userData?.zipCode,
                projectDeadLine,
              };
              goToNext(input, 'Specific time');
            } else {
              showErrorMessage(
                'HUDU is not currently available in your market, new markets are coming soon…',
              );
            }
          } else {
            setCompleteProfileModal(true);
          }
        }
      } else {
        let input = {};
        if (formData?.location === 'NEW_ADDRESS') {
          const zipCodeResponse = isAllowZipCode(formData?.zipCode);
          if (zipCodeResponse) {
            input = {
              duration: '',
              projectImages: formData?.projectImages,
              title: formData?.title,
              description: formData?.description,
              availability: formData?.availability,
              streetAddress: formData?.streetAddress,
              city: formData?.city,
              state: formData?.state,
              zipCode: formData?.zipCode,
              projectDeadLine,
            };
            goToNext(
              input,
              formData?.availability === Availability.Flexible
                ? 'Flexible'
                : 'Some flexible',
            );
          } else {
            showErrorMessage(
              'HUDU is not currently available in your market, new markets are coming soon…',
            );
          }
        } else {
          if (
            userData?.streetAddress &&
            userData?.city &&
            userData?.state &&
            userData?.zipCode
          ) {
            const zipCodeResponse = isAllowZipCode(userData?.zipCode);
            if (zipCodeResponse) {
              input = {
                duration: '',
                projectImages: formData?.projectImages,
                title: formData?.title,
                description: formData?.description,
                availability: formData?.availability,
                streetAddress: userData?.streetAddress,
                city: userData?.city,
                state: userData?.state,
                zipCode: userData?.zipCode,
                projectDeadLine,
              };
              goToNext(
                input,
                formData?.availability === Availability.Flexible
                  ? 'Flexible'
                  : 'Some flexible',
              );
            } else {
              showErrorMessage(
                'HUDU is not currently available in your market, new markets are coming soon…',
              );
            }
          } else {
            setCompleteProfileModal(true);
          }
        }
      }
    } else {
      setCompleteUserNameModal(true);
    }
  };

  const goToNext = (input: any, availabilityInputData: any) => {
    setInputData(input);
    setAvailabilityInput(availabilityInputData);
    Keyboard.dismiss();
    setPreviewPostModalVisible(true);
  };

  const listProjectOnPress = () => {
    getLocationMutate(inputData?.zipCode, {
      onSuccess: (success: any) => {
        if (success?.status === 1) {
          const lat = parseFloat(success?.output?.[0]?.latitude);
          const long = parseFloat(success?.output?.[0]?.longitude);
          const input = {...inputData, point: [lat, long]};
          addProjectMutate(input, {
            onSuccess: successData => {
              if (
                successData?.project_addProject?.status ===
                ResponseStatus.Success
              ) {
                queryClient.invalidateQueries([queryKeys.projects]);
                queryClient.invalidateQueries(queryKeys.bids);
                queryClient.invalidateQueries(queryKeys.bidsOrderByStatus);
                setPreviewPostModalVisible(false);
                setInputData(null);
                setProjectId(successData?.project_addProject?.result?.id);
                setQuestionModalVisible(true);
              } else {
                setToastMessage(
                  getResponseMessage(
                    successData?.project_addProject?.status,
                  ) as any,
                );
                setShowToast(true);
              }
            },
          });
        } else {
          setToastMessage({
            message: 'Zip code not valid',
            type: 'danger',
            icon: 'danger',
          });
          setShowToast(true);
        }
      },
      onError: () => {
        setToastMessage({
          message: 'Error in get location from your zip code',
          type: 'danger',
          icon: 'danger',
        });
        setShowToast(true);
      },
    });
  };

  const onCloseQuestionModal = () => {
    setQuestionModalVisible(false);
    reset({location: 'NEW_ADDRESS', projectDeadLine: maximumDate});
  };

  const onCloseCompleteProfileModal = () => {
    setCompleteProfileModal(false);
  };

  const onCloseCompleteUserNameModal = () => {
    setCompleteUserNameModal(false);
  };

  const onClosePreviewPostModal = () => {
    setPreviewPostModalVisible(false);
  };

  const goToEditProfile = () => {
    setCompleteProfileModal(false);
    setCompleteUserNameModal(false);
    navigate('AuthStack', {screen: 'EditProfile'});
  };

  const option1OnPress = () => {
    setQuestionModalVisible(false);
    setPreviewPostModalVisible(false);
    reset({location: 'NEW_ADDRESS', projectDeadLine: maximumDate});
    navigation.navigate('ProjectDetails', {projectId, isDeepLinking: false}); //phase1
  };

  const option2OnPress = () => {
    setQuestionModalVisible(false);
    setPreviewPostModalVisible(false);
    reset({location: 'NEW_ADDRESS', projectDeadLine: maximumDate});
    Linking.openURL('http://heyhudu.com/archive/ListerTutorial');
  };

  const editOnPress = () => {
    setPreviewPostModalVisible(false);
  };

  const cancelOnPress = () => {
    setPreviewPostModalVisible(false);
    resetRoot('HomeTab');
  };

  const loading = addProjectLoading || getLocationLoading;

  return (
    <CustomContainer>
      <FormProvider {...methods}>
        <CustomKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <VStack py="4" space="6">
            <SectionProjectImages {...register('projectImages')} />
            <VStack px="4" space="1" flex={1}>
              <CustomInput
                {...register('title')}
                placeholder="Title"
                backgroundColor={Colors.WHITE}
                inputStyle={styles.input}
                {...{formState}}
              />
              <CustomInput
                {...register('description')}
                label="Description"
                placeholder={
                  'We may be neighbors helping neighbors but we’re not neighbors reading each others minds! Please be as clear and detailed as possible when describing your project.'
                }
                backgroundColor={Colors.WHITE}
                inputStyle={styles.input}
                textArea
                {...{formState}}
              />
              <CustomRadioGroup
                label="Accept Bids For:"
                mt="2"
                {...register('timeLeft')}
                data={timeLeftData}
              />
              {timeLeft === 'custom' && (
                <CustomDateTimePicker
                  {...register('projectDeadLine')}
                  placeholder="Pick a custom date within the next 7 days"
                  maximumDate={maximumDate}
                />
              )}
              <CustomPicker
                {...register('availability')}
                label="Availability"
                data={availabilityData}
                placeholder="Select"
                height={verticalScale(45)}
                textStyle={styles.picker}
              />
              {availability && availability === Availability.SpecificTime && (
                <CustomDateTimePicker
                  {...register('duration')}
                  placeholder="Date/time"
                />
              )}
              <CustomRadioGroup
                mt="2"
                {...register('location')}
                data={locationData}
              />
              {location === 'NEW_ADDRESS' && (
                <CollapsibleProvider visible={location === 'NEW_ADDRESS'}>
                  <Center p="1" rounded="md" bg={Colors.SECONDARY}>
                    <CustomText color={Colors.BLACK_2}>
                      * Note: Your address is kept private. Only your city is
                      visible to users.
                    </CustomText>
                  </Center>
                  <CustomInput
                    {...register('streetAddress')}
                    placeholder="Street Address"
                    backgroundColor={Colors.WHITE}
                    inputStyle={styles.input}
                    {...{formState}}
                    autoComplete="street-address"
                  />
                  <HStack alignItems="center" space="2">
                    <Center flex={1}>
                      <CustomInput
                        isHorizontal
                        {...register('city')}
                        label="City"
                        placeholder="City"
                        {...{formState}}
                        height={verticalScale(45)}
                      />
                    </Center>
                    <Center flex={1}>
                      <CustomPicker
                        isHorizontal
                        {...register('state')}
                        data={allowStateList}
                        placeholder="State"
                        height={verticalScale(45)}
                        textStyle={styles.picker}
                        valueKey="value"
                        titleKey="title"
                      />
                    </Center>
                  </HStack>
                  <CustomInput
                    {...register('zipCode')}
                    placeholder="Zip code"
                    keyboardType="numeric"
                    backgroundColor={Colors.WHITE}
                    inputStyle={styles.input}
                    {...{formState}}
                    validation
                  />
                </CollapsibleProvider>
              )}
              <CustomButton
                mt="3"
                title="Preview"
                onPress={handleSubmit(previewOnPress)}
                height={verticalScale(45)}
              />
            </VStack>
          </VStack>
        </CustomKeyboardAwareScrollView>
      </FormProvider>
      {completeProfileModal && (
        <QuestionModal
          visible={completeProfileModal}
          onClose={onCloseCompleteProfileModal}
          title="You don't any address in your profile. Please complete your address."
          option1="Edit profile"
          option2="Cancel"
          option1OnPress={goToEditProfile}
          option2OnPress={onCloseCompleteProfileModal}
          closeOnTouchOutSide={false}
        />
      )}
      {completeUserNameModal && (
        <QuestionModal
          visible={completeUserNameModal}
          onClose={onCloseCompleteUserNameModal}
          title="Your username is not registered. Please enter your username"
          option1="Complete profile"
          option2="Cancel"
          option1OnPress={goToEditProfile}
          option2OnPress={onCloseCompleteUserNameModal}
          closeOnTouchOutSide={false}
        />
      )}
      {questionModalVisible && (
        <QuestionModal
          borderRadius="3xl"
          pb="8"
          px="8"
          backdropColor={Colors.WHITE}
          backgroundColor={{
            linearGradient: {
              colors: Colors.BLUE_GRADIENT,
              start: [0, 0],
              end: [1, 0],
            },
          }}
          visible={questionModalVisible}
          onClose={onCloseQuestionModal}
          customText={
            <CustomText textAlign="center" color={Colors.WHITE}>
              <CustomText
                color={Colors.WHITE}
                fontSize={fontSize.xxLarge}
                fontFamily={fontFamily.bold}>
                Congratulations!
              </CustomText>
              {'\nYour project has been\nsuccessfully posted!'}
              {
                '\n\nIf you’d like to learn more about the bidding process or tips on how to select a bidder, click'
              }
              <CustomText color={Colors.WHITE} fontFamily={fontFamily.bold}>
                {' Learn More'}
              </CustomText>
              {'.'}
            </CustomText>
          }
          option1="Continue"
          option2="Learn More"
          option1OnPress={option1OnPress}
          option2OnPress={option2OnPress}
          optionsBackgroundColor={Colors.WHITE}
          optionsColor={Colors.PRIMARY}
          closeOnTouchOutSide={false}
        />
      )}
      {previewPostModalVisible && (
        <PreviewPostModal
          visible={previewPostModalVisible}
          onClose={onClosePreviewPostModal}
          availability={availabilityInput}
          data={inputData}
          listProjectOnPress={listProjectOnPress}
          editOnPress={editOnPress}
          cancelOnPress={cancelOnPress}
          loading={loading}
          {...{showToast, setShowToast, toastMessage, setToastMessage}}
        />
      )}
    </CustomContainer>
  );
};

export default PostScreen;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
  input: {
    flex: 1,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
    height: '100%',
  },
  picker: {
    flex: 1,
    fontSize: fontSize.normal,
    fontFamily: fontFamily.regular,
  },
});
