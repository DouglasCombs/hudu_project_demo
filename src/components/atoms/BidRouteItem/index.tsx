import dayjs from 'dayjs';
import {HStack, VStack} from 'native-base';
import React, {memo, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {Bronze, Gold, Silver} from '~/assets/icons';
import {
  CustomButton,
  CustomCollapsibleV2,
  CustomDivider,
  CustomText,
  CustomTouchable,
  Rate,
  SectionBidLabelV2,
  SectionQuestions,
  SectionRejectBid,
  UserImage,
} from '~/components';
import {
  BackgroundCheckStatus,
  Bid,
  BidStatus,
  ProjectStatus,
  ResponseStatus,
} from '~/generated/graphql';
import {useTranslator} from '~/hooks/translate';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {formatValueWithSymbol} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';
import {showInfoMessage} from '~/utils/utils';

const BidRouteItem = ({item}: {item: Bid}) => {
  const {t, i18n} = useTranslation();
  const {userData} = userDataStore(state => state);
  const {mutate: translatorDescription, isLoading: isLoadingDescription} =
    useTranslator();

  const [descriptionTranslate, setDescriptionTranslate] = useState('');
  const [value, setValue] = useState<'Translate' | 'Original'>('Translate');

  const currentUser = userData?.id === item?.huduId;
  const isLister = userData?.id === item?.listerId;

  const projectDeadLine = dayjs(item?.project?.projectDeadLine);
  const projectStatus = item?.project?.projectStatus;
  const isBidding = projectStatus === ProjectStatus.Bidding;
  const isWaiting = item?.bidStatus === BidStatus.Waiting;
  const isRejected = item?.bidStatus === BidStatus.NotLucky;
  const backgroundStatus: BackgroundCheckStatus | undefined =
    item?.hudu?.backgroundCheckStatus;

  const now = dayjs();
  const timeDiff = projectDeadLine.diff(now);
  const durationDiff = dayjs.duration(timeDiff);
  const hoursDiff = durationDiff.asHours();
  const isClosed = hoursDiff <= 0;

  const backgroundCheckStatus = useMemo(() => {
    switch (backgroundStatus) {
      case BackgroundCheckStatus.Gold:
        return <Gold height={15} width={20} />;
      case BackgroundCheckStatus.Silver:
        return <Silver height={15} width={20} />;
      case BackgroundCheckStatus.Bronze:
        return <Bronze height={15} width={20} />;
      default:
        return null;
    }
  }, [backgroundStatus]);

  useEffect(() => {
    setDescriptionTranslate(item?.description);
  }, [item]);

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

  const onPressHandler = () => {
    if (currentUser) {
      navigate('MainTabs', {screen: 'ProfileTab'});
    } else if (item?.isHuduDeletedAccount === false) {
      navigate('HudurProfile', {
        userId: item?.huduId,
        showMessage: isLister,
        projectId: item?.projectId,
        bid: item,
        price: item?.amount?.toFixed(2),
      });
    } else {
      showInfoMessage(t('messages.errors.doersAccountDeleted'));
    }
  };

  const acceptBidOnPress = () => {
    navigate('Payment', {bid: item, projectId: item?.projectId});
  };

  return (
    <>
      <VStack
        space="12px"
        pb="16px"
        rounded="sm"
        borderWidth="1"
        overflow="hidden"
        borderColor={Colors.SEARCH_BACKGROUND}>
        <VStack space="16px">
          <CustomCollapsibleV2
            visibleComponent={
              <CustomText color={Colors.PRIMARY} underline>
                {t('common.seeLess')}
              </CustomText>
            }
            inVisibleComponent={
              <CustomText color={Colors.PRIMARY} underline>
                {t('common.seeMore')}
              </CustomText>
            }
            header={
              <CustomText
                flex={1}
                fontFamily={fontFamily.medium}
                fontSize={fontSize.xNormal}>
                {`$${item?.amount?.toFixed(2) ?? ''}`}
              </CustomText>
            }
            staticComponent={
              <VStack my="12px" space="12px" px="16px">
                <CustomTouchable onPress={onPressHandler}>
                  <HStack space="12px" alignItems="center">
                    <UserImage
                      errorText={item?.hudu?.userName ?? item?.hudu?.email}
                      sourceImage={item?.hudu?.imageAddress}
                      imageStyle={styles.avatar}
                    />
                    <HStack flex={1} space="16px" alignItems="center">
                      <CustomText fontFamily={fontFamily.medium}>
                        {item?.hudu?.userName ?? t('common.bidder')}{' '}
                        {currentUser && `(${t('common.you')})`}
                      </CustomText>
                      {backgroundCheckStatus}
                    </HStack>
                    <Rate rate={item?.hudu?.asHuduRates} />
                  </HStack>
                </CustomTouchable>
                <HStack>
                  <Item
                    title={t('common.completionRate')}
                    value={formatValueWithSymbol(
                      item?.hudu?.highestProjectCompletionRate?.toFixed(2),
                      '%',
                    )}
                  />
                  {(!isBidding || isRejected) && (
                    <SectionBidLabelV2 {...{item, isClosed}} />
                  )}
                </HStack>
                {isLister && isBidding && isWaiting && hoursDiff >= -48 && (
                  <HStack space="16px">
                    <SectionRejectBid bidId={item?.id} />
                    <CustomButton
                      flex={1}
                      height={38}
                      title={t('common.awardThisBid')}
                      borderRadius={'full'}
                      fontSize={fontSize.small}
                      onPress={acceptBidOnPress}
                      spinnerColor={Colors.PRIMARY}
                    />
                  </HStack>
                )}
              </VStack>
            }>
            <VStack px="16px">
              <HStack>
                <Item title={'Bid Description'} value={descriptionTranslate} />
              </HStack>
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
              {item?.bidAnswerToQuestions &&
                item?.bidAnswerToQuestions?.length > 0 && (
                  <VStack mb="24px">
                    <CustomDivider my="0px" mt="8px" mb="16px" />
                    <CustomText
                      fontFamily={fontFamily.medium}
                      flex={1}
                      fontSize={fontSize.medium}>
                      {t('common.questions')}
                    </CustomText>
                    <SectionQuestions data={item?.bidAnswerToQuestions} />
                  </VStack>
                )}
            </VStack>
          </CustomCollapsibleV2>
        </VStack>
      </VStack>
    </>
  );
};

export default memo(BidRouteItem);

const Item = ({title, value}: {title: string; value: any}) => {
  return (
    <VStack flex={1} space="4px">
      <CustomText
        fontFamily={fontFamily.medium}
        fontSize={fontSize.xTiny}
        color={Colors.Topaz}>
        {title}
      </CustomText>
      <CustomText fontFamily={fontFamily.regular} fontSize={fontSize.small}>
        {value}
      </CustomText>
    </VStack>
  );
};

const styles = StyleSheet.create({
  avatar: {borderRadius: 100},
});
