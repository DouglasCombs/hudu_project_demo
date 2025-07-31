import {yupResolver} from '@hookform/resolvers/yup';
import {Stop, TickSquare} from 'iconsax-react-native';
import {Box, HStack, VStack} from 'native-base';
import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {
  CustomButton,
  CustomContainer,
  CustomDivider,
  CustomFlatList,
  CustomText,
  CustomTouchable,
  ScreensHeader,
} from '~/components';
import {BidStatus, ProjectFilter} from '~/generated/graphql';
import {useGetBids} from '~/hooks/bid';
import {useGetProjectQuestions} from '~/hooks/project';
import {useSchemas} from '~/schemas';
import {bidStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {useGetProjectRemainedTime} from '~/utils/utils';

const defaultValues = {
  answers: [],
};

export default function PlaceBidScreen({navigation, route}: NavigationProp) {
  const projectId = route!.params!.projectId;

  const {t} = useTranslation();
  const {getProjectRemainedTime} = useGetProjectRemainedTime();
  const {userData} = userDataStore(state => state);
  const {bidTempData, setBidTempData} = bidStore(state => state);

  const isEditBidFlow = bidTempData?.flow === 'editBid';

  const {questionsSchema} = useSchemas();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(questionsSchema),
    defaultValues,
  });

  const {data: getProject, isLoading: isLoadingGetProject} =
    useGetProjectQuestions({
      projectId,
    });

  const projectData = getProject?.project_getProject?.result ?? {};
  const questions = projectData?.projectQuestions ?? [];

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

  const bids = getBids?.pages ?? [];

  const remainedTime =
    getProjectRemainedTime(projectData?.project?.projectDeadLine) ?? '';

  const onSubmit = (formData: typeof defaultValues) => {
    const answers = questions
      ?.map((question: any, index: number) => ({
        question,
        answer: formData.answers?.[index]?.toString(),
      }))
      ?.filter((itm: any) => itm?.answer !== null && itm?.answer !== undefined);
    setBidTempData({
      ...bidTempData,
      questions: answers,
      bids,
      projectData,
    });
    navigation.push('PlaceBidStepTwo');
  };

  const getDefaultValue = (item: string) => {
    const res = bidTempData?.questions?.find(
      (el: any) => el?.question === item,
    );
    return res;
  };

  const loading = isLoadingGetProject || isLoadingGetBids;

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <QuestionItem
      question={item}
      index={index}
      control={control}
      errors={errors}
      defaultValue={isEditBidFlow ? getDefaultValue(item) : null}
    />
  );

  const itemSeparatorComponent = useCallback(() => <Box h="48px" />, []);

  const keyExtractor = useCallback(
    (_, index: number) => `question${index}`,
    [],
  );

  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader
        title={
          isEditBidFlow
            ? t('projects.bids.editBid')
            : t('projects.bids.PlaceABid')
        }
        subTitle={remainedTime}
        backAction
      />
      <CustomFlatList
        data={questions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        itemSeparatorComponent={itemSeparatorComponent}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <VStack px="24px" py="24px" pt="8px">
        <CustomButton
          color={Colors.Ronchi}
          title={t('common.continue')}
          onPress={handleSubmit(onSubmit)}
        />
      </VStack>
    </CustomContainer>
  );
}

const QuestionItem = ({
  question,
  index,
  control,
  errors,
  defaultValue,
}: any) => {
  const {t} = useTranslation();

  return (
    <>
      <VStack space="16px">
        <CustomText>{question}</CustomText>
        <Controller
          control={control}
          name={`answers[${index}]`}
          defaultValue={defaultValue ? defaultValue?.answer : null}
          render={({field: {onChange, value}}) => {
            return (
              <VStack>
                <CustomTouchable
                  onPress={() => onChange(value === 'yes' ? null : 'yes')}>
                  <HStack
                    alignItems="center"
                    w="100%"
                    justifyContent="space-between">
                    <CustomText>{t('common.yes')}</CustomText>
                    {value === 'yes' ? (
                      <TickSquare
                        size="24"
                        color={Colors.PRIMARY}
                        variant="Bold"
                      />
                    ) : (
                      <Stop size="24" color={Colors.Ghost} variant="Outline" />
                    )}
                  </HStack>
                </CustomTouchable>
                <CustomDivider my="12px" />
                <CustomTouchable
                  onPress={() => onChange(value === 'no' ? null : 'no')}>
                  <HStack
                    alignItems="center"
                    w="100%"
                    justifyContent="space-between">
                    <CustomText>{t('common.no')}</CustomText>
                    {value === 'no' ? (
                      <TickSquare
                        size="24"
                        color={Colors.PRIMARY}
                        variant="Bold"
                      />
                    ) : (
                      <Stop size="24" color={Colors.Ghost} variant="Outline" />
                    )}
                  </HStack>
                </CustomTouchable>
              </VStack>
            );
          }}
        />
      </VStack>
      {errors.answers && errors.answers[index] && (
        <CustomText color={Colors.FrenchRose} fontSize={fontSize.small}>
          {errors.answers[index].message}
        </CustomText>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
