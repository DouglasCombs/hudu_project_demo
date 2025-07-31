import dayjs from 'dayjs';
import {HStack, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {
  CustomImage,
  CustomText,
  CustomTouchable,
  RatingStar,
} from '~/components';
import {ResponseStatus} from '~/generated/graphql';
import {useTranslator} from '~/hooks/translate';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontSize, scale} from '~/utils/style';

export default function HudurReviewItem({
  item,
  index,
  arrayLength,
}: {
  item: any;
  index: number;
  arrayLength: number;
}) {
  const [descriptionTranslate, setDescriptionTranslate] = useState('');
  const [value, setValue] = useState<'Translate' | 'Original'>('Translate');
  const {t, i18n} = useTranslation();

  const {mutate: translatorDescription, isLoading: isLoadingDescription} =
    useTranslator();

  const onTranslate = async () => {
    setValue(prev => (prev === 'Translate' ? 'Original' : 'Translate'));
    if (value === 'Original') {
      setDescriptionTranslate(item?.listersComment);
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
    setDescriptionTranslate(item?.listersComment);
  }, [item]);

  const onPressHandler = () => {
    navigate('ListerProfile', {
      userId: item?.huduId,
      showMessage: false,
    });
  };
  return (
    <CustomTouchable onPress={onPressHandler}>
      <VStack space="3" my="3">
        <HStack alignItems={'center'} justifyContent={'space-between'}>
          <HStack space="3" alignItems={'center'}>
            <CustomImage
              resizeMode="cover"
              imageSource={item?.lister?.imageAddress}
              style={{
                width: scale(50),
                height: scale(50),
                borderRadius: 1000,
              }}
              errorText={item?.lister?.userName ?? item?.lister?.email}
            />
            <CustomText fontSize={fontSize.small}>
              {item?.lister?.userName
                ? item?.lister?.isDeletedAccount === false
                  ? item?.lister?.userName
                  : 'Accounts deleted'
                : 'Doer'}{' '}
            </CustomText>
          </HStack>
          <RatingStar disabled rate={item?.listersRate} size={10} />
        </HStack>
        <CustomText>
          {descriptionTranslate ? (
            <CustomText fontSize={fontSize.small} color={Colors.BLACK}>
              {descriptionTranslate}
            </CustomText>
          ) : (
            <CustomText fontSize={fontSize.small} color={Colors.BLACK}>
              No Comment
            </CustomText>
          )}
        </CustomText>
        {i18n?.language !== 'en' ? (
          <CustomTouchable onPress={onTranslate}>
            <HStack
              justifyContent={'flex-start'}
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
        <CustomText fontSize={fontSize.small} color={Colors.PLACEHOLDER}>
          {dayjs(item?.createdDate).format('MMM DD, YYYY')}
        </CustomText>
      </VStack>
    </CustomTouchable>
  );
}
