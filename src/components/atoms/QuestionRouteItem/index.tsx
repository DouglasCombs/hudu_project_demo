import dayjs from 'dayjs';
import {ArrowUp} from 'iconsax-react-native';
import {HStack, VStack, View} from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {ReplyIcon, ReportIcon} from '~/assets/icons';
import {ResponseStatus} from '~/generated/graphql';
import {useAddVoteQuestion} from '~/hooks/project';
import {useTranslator} from '~/hooks/translate';
import {questionAnswerStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {getFullImageUrl, getTodayTimeFromNow} from '~/utils/helper';
import {fontFamily, scale, width} from '~/utils/style';
import ReportModal from '../../modals/ReportModal';
import CustomImage from '../CustomImage';
import CustomText from '../CustomText';
import CustomTouchable from '../CustomTouchable';
import UserImage from '../UserImage';

const QuestionRouteItem = ({element}: {element: any}) => {
  const {t, i18n} = useTranslation();
  const item = element?.question;
  const time = getTodayTimeFromNow(item?.createdDate);

  const {setParentId, parentId} = questionAnswerStore(state => state);
  const [descriptionTranslate, setDescriptionTranslate] = useState('');
  const [value, setValue] = useState<'Translate' | 'Original'>('Translate');

  const {mutate: translatorDescription, isLoading: isLoadingDescription} =
    useTranslator();
  const onTranslate = async () => {
    setValue(prev => (prev === 'Translate' ? 'Original' : 'Translate'));
    if (value === 'Original') {
      setDescriptionTranslate(item?.text);
    } else {
      const input = {
        text: descriptionTranslate,
        fromLanguage: '',
        toLanguage: 'en',
      };

      translatorDescription(input, {
        onSuccess: successData => {
          if (
            successData?.translator_translate?.status === ResponseStatus.Success
          ) {
            setDescriptionTranslate(successData?.translator_translate?.result);
          }
        },
      });
    }
  };

  const {isLoading, mutate} = useAddVoteQuestion();
  const [isVisibleReport, setIsVisibleReport] = useState(false);
  const {userData} = userDataStore(state => state);
  const userId = userData?.id;
  const isCurrentUser = item?.user?.id === userId;
  const upVotePress = () => {
    mutate(item?.id);
  };

  useEffect(() => {
    setDescriptionTranslate(item?.text);
  }, [item]);
  return (
    <VStack pb="4" space="1">
      <HStack space="2" py="3" px="4">
        <VStack space="2">
          <UserImage
            errorText={item?.user?.userName ?? item?.user?.email}
            sourceImage={item?.user?.imageAddress}
            imageStyle={{
              borderRadius: 1000,
            }}
          />

          {item?.childrenQuestions?.length > 0 ? (
            <View
              w="0.5"
              bg={Colors.DEEP_FIR}
              borderRadius={'full'}
              flex={1}
              alignSelf={'center'}
            />
          ) : null}
        </VStack>
        <VStack>
          <HStack
            mt={scale(7.5)}
            space="2"
            justifyContent={'flex-start'}
            alignItems="center">
            <CustomText fontFamily={fontFamily.medium}>
              {item?.user?.userName ?? t('common.doer')}{' '}
              {isCurrentUser && `(${t('common.you')})`}
            </CustomText>

            <CustomText style={{color: Colors.DEEP_FIR}}>{time}</CustomText>
          </HStack>

          <CustomText marginTop={scale(15)} width={width * 0.79}>
            {descriptionTranslate?.replace(/\s{2,}/g, ' ')?.trim()}
          </CustomText>
          <HStack
            mt="4"
            space="4"
            justifyContent={'flex-start'}
            alignItems="center">
            <CustomTouchable onPress={upVotePress}>
              <HStack
                borderWidth={'1'}
                borderColor={Colors.DEEP_FIR}
                justifyContent={'center'}
                alignItems="center"
                space="2"
                px="2"
                py="1"
                borderRadius={'lg'}>
                {isLoading ? (
                  <ActivityIndicator color={Colors.BLACK} />
                ) : (
                  <>
                    {!element?.isUpVoted ? (
                      <ArrowUp size={scale(16)} color={Colors.DEEP_FIR} />
                    ) : (
                      <ArrowUp
                        size={scale(16)}
                        style={{
                          transform: [
                            {
                              rotate: '180deg',
                            },
                          ],
                        }}
                        color={Colors.DEEP_FIR}
                      />
                    )}
                    <CustomText>{item?.upVote}</CustomText>
                  </>
                )}
              </HStack>
            </CustomTouchable>

            <CustomTouchable onPress={() => setParentId(item?.id)}>
              <HStack
                justifyContent={'center'}
                alignItems="center"
                space="2"
                borderRadius={'sm'}>
                <CustomText style={{color: Colors.DEEP_FIR}}>
                  {t('projects.reply')}
                </CustomText>
                <ReplyIcon />
              </HStack>
            </CustomTouchable>
            {isCurrentUser ? null : (
              <CustomTouchable onPress={() => setIsVisibleReport(true)}>
                <HStack
                  justifyContent={'center'}
                  alignItems="center"
                  space="2"
                  borderRadius={'sm'}>
                  <CustomText style={{color: Colors.DEEP_FIR}}>
                    {t('projects.Report')}
                  </CustomText>
                  <ReportIcon />
                </HStack>
              </CustomTouchable>
            )}

            {i18n?.language !== 'en' ? (
              <CustomTouchable onPress={onTranslate}>
                <HStack
                  justifyContent={'center'}
                  alignItems="center"
                  space="2"
                  borderRadius={'sm'}>
                  {isLoadingDescription ? (
                    <ActivityIndicator color={Colors.BLACK} size="small" />
                  ) : (
                    <CustomText
                      underline
                      style={{
                        color: Colors.BLACK,
                      }}>
                      {value}
                    </CustomText>
                  )}
                </HStack>
              </CustomTouchable>
            ) : null}
          </HStack>
        </VStack>
      </HStack>

      {item?.childrenQuestions?.length > 0 ? (
        <VStack>
          {item?.childrenQuestions?.map((el, inx) => (
            <HStack key={`question${inx}`} space="2" px="4">
              <VStack>
                <UserImage
                  errorText={el?.user?.userName ?? el?.user?.email}
                  sourceImage={el?.user?.imageAddress}
                  imageStyle={{
                    borderRadius: 1000,
                  }}
                />

                {inx < item?.childrenQuestions?.length - 1 ? (
                  <View
                    w="0.5"
                    bg={Colors.DEEP_FIR}
                    borderRadius={'full'}
                    flex={1}
                    alignSelf={'center'}
                  />
                ) : null}
              </VStack>
              <VStack>
                <HStack
                  mt={scale(7.5)}
                  space="2"
                  justifyContent={'flex-start'}
                  alignItems="center">
                  <CustomText>{el?.user?.userName}</CustomText>

                  <CustomText style={{color: Colors.DEEP_FIR}}>
                    {getTodayTimeFromNow(el?.createdDate)}
                  </CustomText>
                </HStack>
                <VStack w="90%" marginTop={scale(15)} space="2">
                  <CustomText
                    style={{color: Colors.LimeGreen}}
                    numberOfLines={1}>
                    Re: {item?.user?.userName}
                  </CustomText>
                  <ReplyMessage text={el?.text} />
                </VStack>
              </VStack>
            </HStack>
          ))}
        </VStack>
      ) : null}

      <ReportModal
        onClose={() => setIsVisibleReport(false)}
        isVisible={isVisibleReport}
        questionId={item?.id}
        text={item?.text}
      />
    </VStack>
  );
};

export default memo(QuestionRouteItem);

const ReplyMessage = ({text}: {text: string}) => {
  const {t, i18n} = useTranslation();
  const [value, setValue] = useState<'Translate' | 'Original'>('Translate');

  const {mutate: translatorDescription, isLoading: isLoadingDescription} =
    useTranslator();
  const [descriptionTranslate, setDescriptionTranslate] = useState('');

  const onTranslate = async () => {
    setValue(prev => (prev === 'Translate' ? 'Original' : 'Translate'));
    if (value === 'Original') {
      setDescriptionTranslate(text);
    } else {
      const input = {
        text: descriptionTranslate,
        fromLanguage: '',
        toLanguage: 'en',
      };

      translatorDescription(input, {
        onSuccess: successData => {
          if (
            successData?.translator_translate?.status === ResponseStatus.Success
          ) {
            setDescriptionTranslate(successData?.translator_translate?.result);
          }
        },
      });
    }
  };

  useEffect(() => {
    setDescriptionTranslate(text);
  }, [text]);

  return (
    <VStack space="2">
      <CustomText width={width * 0.75}>{descriptionTranslate}</CustomText>
      {i18n?.language !== 'en' ? (
        <CustomTouchable onPress={onTranslate}>
          <HStack space="2" borderRadius={'sm'}>
            {isLoadingDescription ? (
              <ActivityIndicator color={Colors.BLACK} size="small" />
            ) : (
              <CustomText
                underline
                style={{
                  color: Colors.BLACK,
                }}>
                {value}
              </CustomText>
            )}
          </HStack>
        </CustomTouchable>
      ) : null}
    </VStack>
  );
};
