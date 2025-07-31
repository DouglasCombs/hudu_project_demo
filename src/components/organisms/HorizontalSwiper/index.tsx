import {HStack, ScrollView, VStack} from 'native-base';
import React, {forwardRef, useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import CustomImage from '~/components/atoms/CustomImage';
import CustomText from '~/components/atoms/CustomText';
import CustomVideoPlayer from '~/components/atoms/CustomVideoPlayer';
import SectionTranslate from '~/components/molecules/SectionTranslate';
import {useGetCourseTranslates, useTranslator} from '~/hooks/translate';
import {academyLangStore} from '~/stores';
import {Colors} from '~/styles';
import {getFileExtension} from '~/utils/getFileExtension';
import {fontFamily, fontSize, width} from '~/utils/style';

const HorizontalSwiper = forwardRef(
  (
    props: {
      data: any;
      course: any;
    },
    ref,
  ) => {
    const {data, course, ...rest} = props;

    const renderItem = ({item}) => {
      return <Item course={course} {...{item}} />;
    };

    return (
      <View style={styles.container}>
        <SwiperFlatList
          ref={ref}
          index={0}
          data={data}
          renderItem={renderItem}
          scrollEnabled={false}
          {...rest}
        />
      </View>
    );
  },
);

export default HorizontalSwiper;

const Item = ({item, course}) => {
  const data = item;
  const isExistMedia = item?.mediaUrl?.length > 0;
  const {indexLang, setIndexLang} = academyLangStore(state => state);

  const isImage = getFileExtension(item?.mediaUrl) === 'image';
  const {data: translateSlides} = useGetCourseTranslates({
    where: {
      slideId: {eq: data?.id},
    },
  });
  const translateSlide = translateSlides?.pages?.[0];
  const translateData = useMemo(() => {
    return [
      {
        id: 0,
        title: 'English',
        value: 'en',
        disabled: false,
      },
      {
        id: 1,
        title: 'Spanish',
        value: 'es',
        disabled: course?.spanishTranslateStatus !== 'PUBLISHED',
      },
    ];
  }, [course]);

  const [value, setValue] = useState(translateData?.[0]);

  useEffect(() => {
    setValue(translateData?.[indexLang]);
  }, [translateData, indexLang, setIndexLang]);

  useEffect(() => {
    if (course?.spanishTranslateStatus !== 'PUBLISHED') {
      setValue(translateData?.[0]);
    }
  }, [course]);

  const [descriptionTranslate, setDescriptionTranslate] = useState('');
  const [title, setTitle] = useState('');
  const {mutate: translatorTitle, isLoading: isLoadingTitle} = useTranslator();
  const {mutate: translatorDescription, isLoading: isLoadingDescription} =
    useTranslator();

  const onTranslate = async (element: any) => {
    setValue(element);
    setIndexLang(element?.id);
  };

  useEffect(() => {
    setDescriptionTranslate(data?.description);
    setTitle(data?.title);
  }, [data]);

  const translateLoading = isLoadingTitle || isLoadingTitle;

  return (
    <VStack style={styles.child}>
      <HStack justifyContent={'flex-end'} px="4" py="3">
        <SectionTranslate
          value={value}
          onChange={onTranslate}
          data={translateData}
          showChevronIcon
          titleColor={Colors.PRIMARY}
          flex={0}
          showSelectedValue
        />
      </HStack>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <VStack space="4">
          {isExistMedia ? (
            isImage ? (
              <CustomImage
                style={{
                  width: width,
                  height: width * 0.8,
                }}
                resizeMode="cover"
                imageSource={item?.mediaUrl}
              />
            ) : (
              <CustomVideoPlayer url={item?.mediaUrl} />
            )
          ) : null}

          <VStack px="4" space="4">
            {translateLoading ? (
              <ActivityIndicator size="large" color={Colors.BLACK} />
            ) : (
              <>
                <CustomText
                  color={Colors.BLACK}
                  fontFamily={fontFamily.bold}
                  fontSize={fontSize.xMedium}>
                  {value?.value === 'es' ? translateSlide?.title : data?.title}
                </CustomText>
                <CustomText
                  color={Colors.BLACK}
                  fontFamily={fontFamily.light}
                  fontSize={fontSize.xNormal}>
                  {value?.value === 'es'
                    ? translateSlide?.content
                    : data?.description}
                </CustomText>
              </>
            )}
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  child: {width, justifyContent: 'center'},
  text: {fontSize: width * 0.5, textAlign: 'center'},
});

// if (element?.value === 'es' || element?.value === 'en') {
//   const input = {
//     text: descriptionTranslate,
//     fromLanguage: '',
//     toLanguage: element?.value,
//   };

//   translatorDescription(input, {
//     onSuccess: successData => {
//       if (
//         successData?.translator_translate?.status === ResponseStatus.Success
//       ) {
//         if (
//           element?.value === 'en' &&
//           onlyLettersAndNumbers(descriptionTranslate)
//         ) {
//           setDescriptionTranslate(data?.description);
//         } else {
//           setDescriptionTranslate(
//             successData?.translator_translate?.result,
//           );
//         }
//       }
//     },
//   });

//   const input1 = {
//     text: title,
//     fromLanguage: '',
//     toLanguage: element?.value,
//   };

//   translatorTitle(input1, {
//     onSuccess: successData => {
//       if (
//         successData?.translator_translate?.status === ResponseStatus.Success
//       ) {
//         if (element?.value === 'en' && onlyLettersAndNumbers(title)) {
//           setTitle(data?.title);
//         } else {
//           setTitle(successData?.translator_translate?.result);
//         }
//       }
//     },
//   });
// } else {
//   setTitle(data?.title);
//   setDescriptionTranslate(data?.description);
// }
