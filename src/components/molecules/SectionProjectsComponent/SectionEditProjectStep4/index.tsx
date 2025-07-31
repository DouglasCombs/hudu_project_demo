import {yupResolver} from '@hookform/resolvers/yup';
import {Flex, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import * as yup from 'yup';
import {
  AddQuestions,
  CustomButton,
  CustomKeyboardAwareScrollView,
  CustomText,
} from '~/components';
import {useGetProject, useGetProjectEdit} from '~/hooks/project';
import {push} from '~/navigation/Methods';
import projectStore from '~/stores/projectStore';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';

function removeItemOnce(arr, value) {
  var index = value;
  if (index > -1) {
    arr.splice(index, 1);
  }

  return arr;
}

const schema = yup.object().shape({
  questions: yup.array(
    yup.object({
      question: yup.string().required(),
      checked: yup.boolean().required(),
    }),
  ),
});

const SectionEditProjectStep4 = ({
  data,
  projectId,
}: {
  data: any;
  projectId: number;
}) => {
  const {t} = useTranslation();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });

  const {isLoading: getProjectQuestionsLoading, data: getProjectQuestions} =
    useGetProjectEdit({
      projectId: projectId,
    });

  const projectQuestions =
    getProjectQuestions?.project_getProject?.result?.projectQuestions ?? [];

  const {projectData, setProjectData} = projectStore(state => state);
  const [questionsState, setQuestionsState] = useState([]);
  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      questions: [],
    },
  });
  const {handleSubmit, register, formState, setValue} = methods;

  const questions =
    data?.chatGpt_createChatUsingAzure?.result?.questionDto || [];

  useEffect(() => {
    if (questions?.length > 0 && projectQuestions?.length > 0) {
      const tempQuestion = questions.concat(
        projectQuestions?.map?.(el => {
          return {
            question: el,
            checked: true,
          };
        }),
      );
      const temp = tempQuestion?.map(item => {
        return {
          question: item?.question,
          checked: item?.checked ? true : false,
        };
      });
      setValue('questions', temp);
      setQuestionsState(temp);
    } else if (questions?.length > 0) {
      const temp = questions?.map(item => {
        return {
          question: item?.question,
          checked: false,
        };
      });
      setValue('questions', temp);
      setQuestionsState(temp);
    }
  }, [questions, projectQuestions]);

  const nextHandler = (formData: any) => {
    let data = {
      ...projectData,
    };
    let questionsTemp = [];
    questionsState?.forEach(element => {
      if (element?.checked) {
        questionsTemp?.push({
          question: element?.question,
        });
      }
    });

    data = {...data, projectQuestions: questionsTemp};

    setProjectData(data);
    push('createProjectStep5');
  };

  const onChangeText = (text: string, index: number) => {
    setQuestionsState(prevState => {
      const newState = prevState.map((obj, ind) => {
        if (ind === index) {
          return {...obj, question: text};
        }

        return obj;
      });

      return newState;
    });
  };
  const onChangeCheckBox = (index: number) => {
    setQuestionsState(prevState => {
      const newState = prevState.map((obj, ind) => {
        if (ind === index) {
          return {...obj, checked: !obj?.checked};
        }

        return obj;
      });

      return newState;
    });
  };

  const addNewQuestion = () => {
    const temp = {
      question: '',
      checked: false,
    };
    const value = questionsState;
    setQuestionsState([...value, temp]);
  };

  const onDeletePress = (index: number) => {
    const value = removeItemOnce(questionsState, index);

    setQuestionsState(value);
    forceUpdate();
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
              {t('projects.createProject.anySpecialRequest')}
            </CustomText>
            <CustomText
              marginTop={16}
              marginBottom={24}
              fontSize={fontSize.small}
              fontFamily={fontFamily.regular}>
              {t('projects.createProject.specificRequirements')}
            </CustomText>

            <AddQuestions
              {...register('questions')}
              {...{
                projectData,
                addNewQuestion,
                onChangeText,
                onChangeCheckBox,
                questionsState,
                onDeletePress,
              }}
            />
          </VStack>
        </CustomKeyboardAwareScrollView>
        <VStack alignSelf={'center'} w={'90%'}>
          <CustomButton
            title={t('projects.createProject.continue')}
            onPress={handleSubmit(nextHandler)}
          />
        </VStack>
      </FormProvider>
    </Flex>
  );
};

export default SectionEditProjectStep4;
