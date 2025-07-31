import {Center, Divider, HStack, Input, VStack} from 'native-base';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {EmptyQuestions} from '~/assets/icons';
import PinIcon from '~/assets/icons/PinIcon';
import {
  CustomFlatList,
  CustomText,
  EmptyData,
  InfoModal,
  ProjectQAPlaceholder,
  QuestionRouteItem,
  SectionSort,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import queryKeys from '~/constants/queryKeys';
import {Project, ResponseStatus, SortEnumType} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {
  useAddQuestion,
  useGetProject,
  useGetQuestions,
  useGetQuestionsIsPin,
} from '~/hooks/project';
import {useKeyboardVisible} from '~/hooks/useKeyboardVisible';
import {navigate} from '~/navigation/Methods';
import {questionAnswerStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isIllegal, isIos} from '~/utils/helper';
import {fontFamily, fontSize, height, scale} from '~/utils/style';
import {showInfoMessage} from '~/utils/utils';

const SectionQuestionRoute = ({projectId}: {projectId: number}) => {
  const {QASortData} = useMockData();
  const {t} = useTranslation();
  const [projectFilter, setProjectFilter] = useState(QASortData?.[1]);

  const getQuestionsOptions = useMemo(() => {
    queryClient.invalidateQueries(queryKeys.questions);
    return {
      where: {
        question: {
          and: [
            {projectId: {eq: projectId}},
            {parentId: {eq: null}},
            {isDeletedAccount: {neq: true}},
            {isPin: {eq: false}},
          ],
        },
      },
      order: {
        question: {
          createdDate: projectFilter?.value,
          upVote: SortEnumType.Desc,
        },
      },
    };
  }, [projectFilter, projectId, setProjectFilter]);

  const getQuestionsOptionsPin = useMemo(() => {
    queryClient.invalidateQueries(queryKeys.questions);
    return {
      where: {
        question: {
          and: [
            {projectId: {eq: projectId}},
            {parentId: {eq: null}},
            {isDeletedAccount: {neq: true}},
            {isPin: {eq: true}},
          ],
        },
      },
      order: {
        question: {
          createdDate: projectFilter?.value,
          upVote: SortEnumType.Desc,
        },
      },
    };
  }, [projectFilter, projectId, setProjectFilter]);

  const {
    isLoading: getQuestionLoading,
    data: getQuestions,
    refetch: refetchQuestions,
    isRefetching: isRefetchingQuestions,
    hasNextPage: hasNextPageQuestions,
    fetchNextPage: fetchNextPageQuestions,
    isFetchingNextPage: isFetchingNextPageQuestions,
  } = useGetQuestions(getQuestionsOptions, projectId);

  const {data: getQuestionsPin} = useGetQuestionsIsPin(
    getQuestionsOptionsPin,
    projectId,
  );

  useEffect(() => {
    setTimeout(() => {
      refetchQuestions();
      queryClient.invalidateQueries(queryKeys.questions);
    }, 1000);
  }, [getQuestionsOptions, getQuestionsOptionsPin]);

  const questions = getQuestions?.pages ?? [];
  const questionsPin = getQuestionsPin?.pages ?? [];

  const onLoadMoreHandler = () => {
    if (hasNextPageQuestions) {
      fetchNextPageQuestions();
    }
  };

  const renderItem = ({item}: {item: any}) => {
    return <QuestionRouteItem element={item} />;
  };

  const itemSeparatorComponent = () => <Divider h="0.8" bg={Colors.DEEP_FIR} />;

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData
        customIcon={<EmptyQuestions />}
        text={t('messages.emptyQuestionsTitle')}
        description={t('messages.emptyQuestionsDescription')}
        buttonTitle={t('common.backToHome')}
      />
    ),
    [t],
  );

  if (getQuestionLoading) {
    return <ProjectQAPlaceholder />;
  }

  const listHeaderComponent = () => {
    return (
      <VStack
        bg={Colors.SEARCH_BACKGROUND}
        borderColor={Colors.Ghost}
        mb="24px"
        mx="4"
        mt="4"
        pt="4"
        rounded="sm"
        borderWidth="1px">
        <HStack alignItems="center" justifyContent="flex-end"></HStack>
        <Center pb="16px" px="16px">
          <CustomText lineHeight={17} fontSize={fontSize.small}>
            {questionsPin?.[0]?.question?.text}
          </CustomText>
        </Center>
      </VStack>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={isIos ? 'padding' : 'height'}
      enabled={isIos}
      keyboardVerticalOffset={20}
      style={styles.container}>
      <VStack flex={1}>
        <HStack
          alignItems="center"
          justifyContent="flex-end"
          px="24px"
          py="12px"
          bg={Colors.SEARCH_BACKGROUND}>
          <SectionSort
            value={projectFilter}
            onChange={setProjectFilter}
            data={QASortData}
            showChevronIcon
            titleColor={Colors.PRIMARY}
            flex={0}
            showSelectedValue
          />
        </HStack>
        <CustomFlatList
          data={questions}
          renderItem={renderItem}
          listEmptyComponent={listEmptyComponent}
          itemSeparatorComponent={itemSeparatorComponent}
          listHeaderComponent={questionsPin?.length > 0 && listHeaderComponent}
          contentContainerStyle={styles.contentContainerStyle}
          keyboardShouldPersistTaps={'handled'}
          onEndReached={onLoadMoreHandler}
          refreshing={isRefetchingQuestions}
          onRefresh={refetchQuestions}
          isFetchingNextPage={isFetchingNextPageQuestions}
        />
        <ListFooterComponent {...{projectId}} />
      </VStack>
    </KeyboardAvoidingView>
  );
};

const ListFooterComponent = ({projectId}: {projectId: number}) => {
  const {t} = useTranslation();
  const [message, setMessage] = useState('');
  const {isLoading, mutate} = useAddQuestion();
  const keyboardStatus = useKeyboardVisible();
  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);

  const {parentId, resetParentId} = questionAnswerStore(state => state);
  const {userData} = userDataStore();
  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });
  const projectData = getProject?.project_getProject?.result ?? {};
  const project: Project = projectData?.project;
  const isLister = userData?.id === project?.userId;

  const ref = useRef();
  useEffect(() => {
    if (parentId) {
      ref?.current?.focus();
    }
  }, [parentId]);

  const goToEditProfile = () => {
    navigate('MainTabs', {screen: 'ProfileTab'});
  };

  function onSendPress() {
    Keyboard.dismiss();
    if (userData?.userName) {
      const questionInput = {
        text: message,
        projectId: projectId,
        parentId: parentId,
      };
      mutate(questionInput, {
        onSuccess: successData => {
          if (
            successData?.project_addQuestion?.status === ResponseStatus.Success
          ) {
            setMessage('');
            resetParentId();
          }
          queryClient.invalidateQueries(queryKeys.questions);
          queryClient.invalidateQueries(queryKeys.questionsIsPin);
        },
      });
    } else {
      showInfoMessage(
        t('messages.completeProfile'),
        t('messages.completeYourProfile'),
        goToEditProfile,
      );
    }
  }

  const onPressHandler = () => {
    if (isIllegal(message)) {
      setInfoModalVisible(true);
    } else {
      onSendPress();
    }
  };

  const onCloseInfoModal = () => {
    setInfoModalVisible(false);
  };

  const disabled = isLoading || message?.length === 0;
  const loading = isLoading;
  return (
    <>
      <HStack
        px="4"
        mx="4"
        borderWidth={'1'}
        borderRadius={'sm'}
        borderColor={Colors.DEEP_FIR}
        alignItems={'center'}
        bg={Colors.WHITE}
        space="2"
        mb={
          isIos
            ? keyboardStatus
              ? '-5'
              : '8'
            : keyboardStatus
            ? height * 0.08
            : height * 0.02
        }
        bottom={
          isIos
            ? keyboardStatus
              ? height * 0.21
              : 0.3
            : keyboardStatus
            ? height * 0.08
            : height * 0.02
        }
        py="4">
        <Input
          style={styles.input}
          onChangeText={
            message?.length < 140
              ? setMessage
              : () =>
                  showInfoMessage('Message must be less than 140 characters')
          }
          value={message}
          bg={Colors.TRANSPARENT}
          placeholder={
            isLister
              ? t('projects.createProject.AddCommentToPin')
              : t('projects.createProject.writeComment')
          }
          ref={ref}
          disabled={disabled}
          borderWidth={0}
          w="90%"
          multiline
          fontSize={fontSize.xNormal}
          fontFamily={fontFamily.regular}
          onSubmitEditing={() => resetParentId()}
          variant="unstyled"
        />

        <TouchableOpacity
          disabled={message?.length === 0 ? true : false}
          onPress={() => onPressHandler()}
          style={styles.send}>
          <Center
            bg={
              message?.length === 0 ? Colors.SEARCH_BACKGROUND : Colors.PRIMARY
            }
            size="8"
            borderRadius={'full'}>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={message?.length === 0 ? Colors.DEEP_FIR : Colors.WHITE}
              />
            ) : (
              <PinIcon
                stroke={message?.length === 0 ? '#b1b1b3' : Colors.WHITE}
              />
            )}
          </Center>
        </TouchableOpacity>
      </HStack>
      <InfoModal
        isVisible={infoModalVisible}
        onClose={onCloseInfoModal}
        title={t('messages.errors.warning')}
        description={t('messages.errors.restrictError')}
        submitTitle={t('messages.errors.iUnderstand')}
      />
    </>
  );
};

export default memo(SectionQuestionRoute);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: scale(10),
    width: '100%',
    borderRadius: 5,
  },
  input: {
    flex: 1,
  },
  send: {
    color: Colors.Topaz,
  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 40,
    flexGrow: 1,
  },
});
