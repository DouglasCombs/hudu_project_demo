import React from 'react';
import {VStack, Box} from 'native-base';
import {
  ModalContainer,
  ModalHeader,
  BidItem,
  CustomLoading,
  CustomFlatList,
} from '~/components';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';
import {useGetBidsOrderByStatus} from '~/hooks/bid';
import {BidStatus, ProjectFilter} from '~/generated/graphql';
import {StyleSheet} from 'react-native';

const ChooseHudurModal = ({
  visible,
  onClose,
  onAwardBid,
  title,
  projectId,
}: {
  visible: boolean;
  onClose: any;
  onAwardBid: (bid: object) => void;
  title: string;
  projectId?: any;
}) => {
  const options = {
    where: {
      projectId: {eq: projectId},
      bidStatus: {eq: BidStatus.Waiting},
    },
    input: {
      projectFilter: ProjectFilter.LowToHighBids,
      bovms: [
        {bidStatus: BidStatus.Waiting, order: 1},
        {bidStatus: BidStatus.Finished, order: 2},
        {bidStatus: BidStatus.InProgress, order: 3},
        {bidStatus: BidStatus.NotLucky, order: 4},
        {bidStatus: BidStatus.Cancell, order: 5},
        {bidStatus: BidStatus.Failed, order: 6},
      ],
    },
  };

  const {
    isLoading: getBidsLoading,
    data: getBids,
    fetchNextPage: fetchNextPageGetBids,
    hasNextPage: hasNextPageGetBids,
    isFetchingNextPage: isFetchingNextPageGetBids,
  } = useGetBidsOrderByStatus(options);

  const bids = getBids?.pages ?? [];

  const onCloseHandler = () => {
    onClose?.();
  };

  const onLoadMore = () => {
    if (hasNextPageGetBids) {
      fetchNextPageGetBids();
    }
  };

  const loading = getBidsLoading;

  const renderItem = ({item}: {item: any}) => (
    <BidItem {...{item, onClose: onCloseHandler, onAwardBid}} />
  );

  return (
    <ModalContainer
      keyboardAware={false}
      style={styles.modalContainer}
      isVisible={visible}
      onClose={onCloseHandler}>
      <VStack flex={1} bg={Colors.WHITE} pt="4" borderRadius="md">
        <Box px="4">
          <ModalHeader text={title} onPress={onCloseHandler} />
        </Box>
        {loading && <CustomLoading />}
        <VStack bg={Colors.WHITE} w="100%" flex={1}>
          <CustomFlatList
            data={bids}
            renderItem={renderItem}
            onEndReached={onLoadMore}
            isFetchingNextPage={isFetchingNextPageGetBids}
            isLoading={loading}
            contentContainerStyle={{flexGrow: 1, paddingVertical: 16}}
          />
        </VStack>
      </VStack>
    </ModalContainer>
  );
};

export default ChooseHudurModal;

const styles = StyleSheet.create({
  modalContainer: {
    minHeight: '30%',
    maxHeight: '70%',
    flexGrow: 1,
    margin: scale(48),
    borderRadius: 8,
    overflow: 'hidden',
  },
});
