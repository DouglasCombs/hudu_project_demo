import {HStack, VStack} from 'native-base';
import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {fontSize as font_size, fontFamily} from '~/utils/style';
import {CustomText, CustomTouchable} from '~/components';
import {useTranslator} from '~/hooks/translate';
import {Colors} from '~/styles';
import {ResponseStatus} from '~/generated/graphql';
import {ActivityIndicator} from 'react-native';

const ProjectPreviewDescription = ({data}: {data: any}) => {
  const {t, i18n} = useTranslation();
  const {mutate: translatorDescription, isLoading: isLoadingDescription} =
    useTranslator();
  const [descriptionTranslate, setDescriptionTranslate] = useState('');
  const [value, setValue] = useState<'Translate' | 'Original'>('Translate');

  useEffect(() => {
    setDescriptionTranslate(data?.description);
  }, [data]);

  const onTranslate = async () => {
    setValue(prev => (prev === 'Translate' ? 'Original' : 'Translate'));

    if (value === 'Original') {
      setDescriptionTranslate(item?.description);
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
  return (
    <VStack space="2" my="4">
      <CustomText
        fontFamily={fontFamily.bold}
        underline
        fontSize={font_size.medium}>
        {t('projects.createProject.projectDescription')}
      </CustomText>
      <CustomText fontSize={font_size.xNormal} fontFamily={fontFamily.light}>
        {descriptionTranslate}
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
    </VStack>
  );
};

export default memo(ProjectPreviewDescription);
