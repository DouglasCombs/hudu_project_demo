import {HStack, Spinner, VStack} from 'native-base';
import React, {Fragment, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {EditCircle, TrashCircle} from '~/assets/icons';
import {ConfirmationModalV2, CustomText, SectionQuestions} from '~/components';
import {Bid, ResponseStatus} from '~/generated/graphql';
import {useDeleteBid} from '~/hooks/bid';
import {navigate} from '~/navigation/Methods';
import {bidStore} from '~/stores';
import {Colors} from '~/styles';
import {appFormatDate} from '~/utils/helper';
import {fontFamily, fontSize} from '~/utils/style';

export default function MyBidItem({
  item,
  projectData,
  bids,
}: {
  item: Bid;
  projectData: any;
  bids: any;
}) {
  const {t} = useTranslation();

  const {bidTempData, setBidTempData} = bidStore(state => state);

  const editModalRef = useRef<ModalRef>(null);
  const cancelModalRef = useRef<ModalRef>(null);

  const {mutate: mutateDeleteBid, isLoading: isLoadingDeleteBid} =
    useDeleteBid();

  const cancelOnPress = () => {
    cancelModalRef?.current?.open();
  };

  const editOnPress = () => {
    editModalRef?.current?.open();
  };

  const onSubmitCancelModal = () => {
    mutateDeleteBid(item?.id, {
      onSuccess: successData => {
        if (successData?.bid_deleteBid?.status === ResponseStatus.Success) {
          cancelModalRef?.current?.close();
        }
      },
    });
  };

  const onSubmitEditModal = () => {
    editModalRef?.current?.close();

    if (item?.bidAnswerToQuestions && item?.bidAnswerToQuestions?.length > 0) {
      setBidTempData({
        flow: 'editBid',
        projectId: item.projectId,
        questions: item?.bidAnswerToQuestions,
        currentBid: item,
      });
      navigate('PlaceBid', {bidId: item?.id, projectId: item.projectId});
    } else {
      setBidTempData({
        ...bidTempData,
        questions: [],
        flow: 'editBid',
        projectId: item.projectId,
        currentBid: item,
        bids,
        projectData,
      });
      navigate('PlaceBidStepTwo');
    }
  };

  return (
    <Fragment>
      <VStack space="20px">
        <HStack>
          <HStack space="20px" flex={1}>
            <VStack space="10px">
              <CustomText
                fontFamily={fontFamily.medium}
                color={Colors.Topaz}
                fontSize={fontSize.small}>
                {t('projects.bids.bidAmount')}
              </CustomText>
              <CustomText
                fontFamily={fontFamily.medium}
                color={Colors.Topaz}
                fontSize={fontSize.small}>
                {t('projects.bids.bidDate')}
              </CustomText>
            </VStack>
            <VStack space="10px">
              <CustomText fontSize={fontSize.small}>
                {`$${item?.amount?.toFixed(2) ?? ''}`}
              </CustomText>
              <CustomText fontSize={fontSize.small}>
                {appFormatDate(item?.createdDate)}
              </CustomText>
            </VStack>
          </HStack>
          <HStack space="12px" alignItems="center">
            <BidIcon onPress={editOnPress} icon={<EditCircle />} />
            <BidIcon onPress={cancelOnPress} icon={<TrashCircle />} />
          </HStack>
        </HStack>
        <VStack space="8px">
          <CustomText color={Colors.Topaz} fontSize={fontSize.small}>
            {t('projects.proposal')}
          </CustomText>
          <CustomText fontSize={fontSize.small}>{item?.description}</CustomText>
        </VStack>
        {item?.bidAnswerToQuestions &&
          item?.bidAnswerToQuestions?.length > 0 && (
            <SectionQuestions data={item?.bidAnswerToQuestions} />
          )}
      </VStack>
      <ConfirmationModalV2
        ref={editModalRef}
        onSubmit={onSubmitEditModal}
        description={t('projects.bids.editBidDescription')}
      />
      <ConfirmationModalV2
        ref={cancelModalRef}
        onSubmit={onSubmitCancelModal}
        isLoading={isLoadingDeleteBid}
        title={t('projects.bids.deleteBid')}
        description={t('projects.bids.cancelBidDescription')}
        submitTitle={t('common.delete')}
        submitColor={Colors.FrenchRose}
      />
    </Fragment>
  );
}

const BidIcon = ({
  onPress,
  isLoading,
  icon,
}: {
  onPress: () => void;
  isLoading?: boolean;
  icon: JSX.Element;
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={onPress}
      activeOpacity={0.7}>
      {isLoading ? <Spinner size="sm" color={Colors.PRIMARY} /> : icon}
    </TouchableOpacity>
  );
};
