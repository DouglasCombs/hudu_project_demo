import {Center, HStack, VStack, View} from 'native-base';
import React, {memo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {RatingStar} from '~/components';
import {useMockData} from '~/constants/mockData';
import {useGetUserReviews} from '~/hooks/user';
import {Colors} from '~/styles';
import {calculateSum} from '~/utils/helper';
import {fontFamily} from '~/utils/style';
import Accordion from '../Accordion';
import CustomText from '../CustomText';

function getCount(array, score) {
  if (array?.length > 0) {
    const temp = array?.find?.(el => (el?.score === score ? el?.count : 0));
    return temp?.count || 0;
  } else {
    return 0;
  }
}

export function average(array) {
  let totalCount = 0;
  let totalScore = 0;
  if (array?.length > 0) {
    array.forEach(el => {
      totalCount += el?.count;
      totalScore += el?.score * el?.count;
    });
  }

  if (totalCount > 0) {
    return totalScore / totalCount;
  } else {
    return 0;
  }
}

const RatingsCard = ({data, asLister}: {data: any; asLister: boolean}) => {
  const {t} = useTranslation();
  const {UserType} = useMockData();
  const [userTypeState, setUserTypeState] = useState(UserType?.[0]);

  const {isLoading, data: reviewsData} = useGetUserReviews({
    userId: data?.id,
    getReviewType: 'TOTAL',
  });
  const reviews = reviewsData?.pages || [];

  const list = [
    {
      title: t('profile.excellent'),
      percent: getCount(reviews, 5) === 0 ? '0%' : '100%',
      score: 5,
      count: getCount(reviews, 5) || 0,
    },
    {
      title: t('profile.vryGood'),
      percent: getCount(reviews, 4) === 0 ? '0%' : '80%',
      score: 4,
      count: getCount(reviews, 4) || 0,
    },
    {
      title: t('profile.average'),
      percent: getCount(reviews, 3) === 0 ? '0%' : '60%',
      score: 3,
      count: getCount(reviews, 3) || 0,
    },
    {
      title: t('profile.belowAverage'),
      percent: getCount(reviews, 2) === 0 ? '0%' : '40%',
      score: 2,
      count: getCount(reviews, 2) || 0,
    },
    {
      title: t('profile.poor'),
      percent: getCount(reviews, 1) === 0 ? '0%' : '20%',
      score: 1,
      count: getCount(reviews, 1) || 0,
    },
  ];

  const rate = average(reviews);

  return (
    <Accordion
      title={t('common.rating')}
      // icon={
      //   asLister === true || asLister === false ? (
      //     <View />
      //   ) : (
      //     <SectionUserType
      //       value={userTypeState}
      //       onChange={setUserTypeState}
      //       data={UserType}
      //       showChevronIcon
      //       titleColor={Colors.PRIMARY}
      //       flex={0}
      //       showSelectedValue
      //     />
      //   )
      // }
      open>
      {isLoading ? (
        <Center py="8">
          <ActivityIndicator color={Colors.PRIMARY} size="large" />
        </Center>
      ) : (
        <VStack my="4" space="4">
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <RatingStar disabled rate={rate} />
            <CustomText fontFamily={fontFamily.light} color={Colors.Topaz}>
              {calculateSum(list, 'count')}{' '}
              {calculateSum(list, 'count') > 1
                ? t('profile.drawer.reviews')
                : t('profile.drawer.review')}
            </CustomText>
          </HStack>

          <VStack space="4">
            {list?.map(item => (
              <HStack
                key={item?.title}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <HStack w={'20%'}>
                  <CustomText
                    fontFamily={fontFamily.light}
                    color={Colors.Topaz}>
                    {item?.title}
                  </CustomText>
                </HStack>

                <HStack w="65%">
                  <View
                    bg={Colors.SEARCH_BACKGROUND}
                    h="2"
                    borderRadius={'sm'}
                    w="100%">
                    <View
                      h="100%"
                      w={item?.percent}
                      bg={Colors.TIME_LEFT_ORANGE}
                      borderRadius={'sm'}
                    />
                  </View>
                </HStack>

                <CustomText fontFamily={fontFamily.light} color={Colors.Topaz}>
                  {item?.count}
                </CustomText>
              </HStack>
            ))}
          </VStack>
        </VStack>
      )}
    </Accordion>
  );
};

export default memo(RatingsCard);
