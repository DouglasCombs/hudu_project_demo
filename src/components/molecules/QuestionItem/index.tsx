import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, Keyboard} from 'react-native';
import {Box, HStack, VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {authStore, userDataStore} from '~/stores';
import {SendIcon} from '~/assets/icons';
import {useAddQuestion} from '~/hooks/project';
import {ResponseStatus} from '~/generated/graphql';
import {QuestionChildItem, CustomText, RatingStar} from '~/components';
import {useQueryClient} from '@tanstack/react-query';
import queryKeys from '~/constants/queryKeys';
import {navigate} from '~/navigation/Methods';
import {
  autoCorrect,
  keyboardType,
  returnKeyType,
  spellCheck,
} from '~/utils/helper';

const QuestionItem = ({item, listerId}: {item: any; listerId: number}) => {
  const {isUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);
  const queryClient = useQueryClient();

  const currentUser = userData?.id === item?.userId;
  const isLister = listerId === item?.userId;
  const currentUserIsLister = listerId === userData?.id;
  const [replyText, setReplyText] = useState('');
  const {mutate: mutateAddQuestion, isLoading: addQuestionLoading} =
    useAddQuestion(async variables => {
      if (variables) {
        //#region ---------------cancel queries
        await queryClient.cancelQueries([
          queryKeys.questions,
          {projectId: item?.projectId},
        ]);
        //#endregion ------------cancel queries

        //#region ---------------get previous data
        const previousQuestionData = queryClient.getQueryData([
          queryKeys.questions,
          {projectId: item?.projectId},
        ]);
        let oldUserQuestionData = previousQuestionData;
        //#endregion ------------get previous data

        //#region ---------------update
        if (oldUserQuestionData?.pages?.length > 0) {
          const questionData = oldUserQuestionData?.pages?.map((itm: any) => {
            let temp = Object.assign({}, itm);
            const items = itm.project_getQuestions?.result?.items?.map(
              (el: any) => {
                if (el.id === variables?.parentId) {
                  return {
                    ...el,
                    childrenQuestions: [
                      {
                        ...variables,
                        userId: userData?.id,
                        id: Math.floor(Math.random() * 10000 + 1),
                        loading: true,
                      },
                    ],
                  };
                } else {
                  return el;
                }
              },
            );
            temp.project_getQuestions.result.items = items;
            return temp;
          });
          oldUserQuestionData.pages = questionData;
        }
        //#endregion ------------update

        //#region ---------------set new data
        queryClient.setQueriesData(
          [queryKeys.questions, {projectId: item?.projectId}],
          oldUserQuestionData,
        );
        setReplyText('');
        //#endregion ------------set new data

        //#region ---------------return
        return {previousQuestionData};
        //#endregion ------------return
      }
    });

  const goToProfile = () => {
    navigate('HudurProfile', {userId: item?.user?.id, isLister: false});
  };

  const sendOnPress = () => {
    if (replyText?.length > 0) {
      Keyboard.dismiss();
      const input = {
        text: replyText,
        projectId: item?.projectId,
        parentId: item?.id,
      };
      mutateAddQuestion(input as any, {
        onSuccess: successData => {
          if (
            successData?.project_addQuestion?.status === ResponseStatus.Success
          ) {
            // setReplyText('');
          }
        },
      });
    }
  };

  return (
    <VStack flex={1} space="2">
      <VStack px="4" space="1">
        <HStack space="1">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goToProfile}
            style={styles.flex1}>
            <CustomText
              numberOfLines={1}
              flex={1}
              fontFamily={fontFamily.medium}>
              {currentUser
                ? 'you'
                : isLister
                ? 'Lister'
                : item?.user?.userName
                ? item?.user?.isDeletedAccount === true
                  ? 'Deleted account'
                  : item?.user?.userName
                : 'user'}
            </CustomText>
          </TouchableOpacity>
          <RatingStar
            disabled
            rate={item?.user?.averageRate}
            showRating="right"
            size={12}
          />
        </HStack>
        {item?.text ? (
          <CustomText color={Colors.PLACEHOLDER}>{item?.text}</CustomText>
        ) : (
          <></>
        )}
      </VStack>
      {isUserLoggedIn &&
        item?.childrenQuestions?.length < 1 &&
        currentUserIsLister &&
        !isLister && (
          <HStack space="4" px="4">
            <Box flex={0.1} />
            <HStack
              h={`${verticalScale(40)}px`}
              space="1"
              flex={1}
              alignItems="center"
              borderBottomColor={Colors.PLACEHOLDER2}
              borderBottomWidth="1px">
              <TextInput
                autoCorrect={autoCorrect}
                spellCheck={spellCheck}
                returnKeyType={returnKeyType}
                keyboardType={keyboardType}
                value={replyText}
                autoCapitalize="sentences"
                placeholder="Reply to Doer"
                onChangeText={setReplyText}
                multiline
                placeholderTextColor={Colors.PLACEHOLDER}
                style={styles.input}
              />
              {replyText?.length > 0 && (
                <TouchableOpacity activeOpacity={0.7} onPress={sendOnPress}>
                  <Box>
                    <SendIcon
                      height={24}
                      width={24}
                      fillColor={Colors.PRIMARY}
                    />
                  </Box>
                </TouchableOpacity>
              )}
            </HStack>
          </HStack>
        )}
      {item?.childrenQuestions?.map((element: any, indx: number) => (
        <QuestionChildItem key={indx} {...{item: element, listerId}} />
      ))}
    </VStack>
  );
};

export default QuestionItem;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: '100%',
    textAlignVertical: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    fontFamily: fontFamily.regular,
    fontSize: fontSize.tiny,
    color: Colors.PLACEHOLDER,
  },
  flex1: {flex: 1},
});
