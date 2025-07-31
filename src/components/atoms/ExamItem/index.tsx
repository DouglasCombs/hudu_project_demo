import {Center, HStack, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Colors} from '~/styles';
import CustomFlatList from '../CustomFlatList';
import CustomText from '../CustomText';
import {fontFamily, fontSize} from '~/utils/style';
import {Circle} from '~/assets/icons';
import {Record, TickCircle} from 'iconsax-react-native';
import CustomTouchable from '../CustomTouchable';
import {useGetCourseTranslates} from '~/hooks/translate';
const ExamItem = ({
  item,
  index,
  value,
  onPressAnswer,
}: {
  item: any;
  index: number;
  value: any;
  onPressAnswer: () => void;
}) => {
  const [options, setOptions] = useState([]);

  const {data: translateQuestions} = useGetCourseTranslates({
    where: {
      courseQuestionId: {eq: item?.id},
    },
  });
  const translateQuestion = translateQuestions?.pages?.[0];

  useEffect(() => {
    if (item?.answers) {
      setOptions(
        item?.answers?.map((el: any) => {
          return {
            ...el,
            isSelected: false,
          };
        }),
      );
    }
  }, [item]);

  const onItemPress = useCallback(
    id => {
      setOptions(
        item?.answers?.map((el: any) => {
          return {
            ...el,
            isSelected: el?.id === id ? true : false,
          };
        }),
      );
      onPressAnswer(item?.id, id);
    },
    [onPressAnswer, item, setOptions],
  );

  const renderItem = ({item: itm, index: inx}: {item: any; inx: number}) => {
    return <Item {...{value, itm, inx, onItemPress}} />;
  };

  return (
    <VStack px="4" space="4">
      <CustomText
        color={Colors.PRIMARY}
        fontSize={fontSize.medium}
        fontFamily={fontFamily.regular}>
        {item?.number}
      </CustomText>
      <CustomText fontSize={fontSize.xNormal} fontFamily={fontFamily.regular}>
        {value?.value === 'es'
          ? translateQuestion?.title
          : item?.questionContent}
      </CustomText>
      <CustomFlatList data={options} flex={1} renderItem={renderItem} />
    </VStack>
  );
};

export default ExamItem;

const Item = ({
  itm,
  inx,
  value,
  onItemPress,
}: {
  item: any;
  inx: number;
  value: any;
  onItemPress: () => void;
}) => {
  const {data: translateQuestions} = useGetCourseTranslates({
    where: {
      courseQuestionAnswerId: {eq: itm?.id},
    },
  });
  const translateQuestion = translateQuestions?.pages?.[0];
  return (
    <CustomTouchable onPress={() => onItemPress(itm?.id)}>
      <HStack
        px="3"
        py="2"
        alignItems={'center'}
        justifyContent={'space-between'}
        space="4"
        bg={Colors.SEARCH_BACKGROUND}>
        <CustomText
          width="90%"
          fontSize={fontSize.small}
          fontFamily={fontFamily.regular}>
          {value?.value === 'es' ? translateQuestion?.title : itm?.value}
        </CustomText>
        {itm?.isSelected ? (
          <TickCircle size="25" color={Colors.PRIMARY} />
        ) : (
          <Center borderRadius={'full'} bg={Colors.WHITE}>
            <Record size="25" color={Colors.Ghost} />
          </Center>
        )}
      </HStack>
    </CustomTouchable>
  );
};
