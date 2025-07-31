import {Box, VStack} from 'native-base';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {PlusCircle} from '~/assets/icons';
import {
  CustomContainer,
  CustomDivider,
  CustomFlatList,
  CustomText,
  ManageBidsPlaceholder,
  PlaceBidButton,
  ScreensHeader,
  MyBidItem,
} from '~/components';
import {BidStatus, ProjectFilter} from '~/generated/graphql';
import {useGetBidsOrderByStatus} from '~/hooks/bid';
import {useGetProject} from '~/hooks/project';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function ManageBids({route}: NavigationProp) {
  const projectId = route!.params!.projectId;

  const {userData} = userDataStore(state => state);

  const getBidsOption = {
    where: {
      and: [
        {projectId: {eq: projectId}},
        {huduId: {eq: userData?.id}},
        {bidStatus: {eq: BidStatus.Waiting}},
      ],
    },
    input: {
      projectFilter: ProjectFilter.LowToHighBids,
      bovms: [
        {bidStatus: BidStatus.Finished, order: 1},
        {bidStatus: BidStatus.InProgress, order: 2},
        {bidStatus: BidStatus.Waiting, order: 3},
        {bidStatus: BidStatus.NotLucky, order: 4},
        {bidStatus: BidStatus.Cancell, order: 5},
        {bidStatus: BidStatus.Failed, order: 6},
      ],
    },
  };

  const {
    isLoading: getBidsLoading,
    data: getBids,
    isRefetching: isRefetchingBids,
    refetch: refetchBids,
    hasNextPage: hasNextPageBids,
    fetchNextPage: fetchNextPageBids,
    isFetchingNextPage: isFetchingNextPageBids,
  } = useGetBidsOrderByStatus(getBidsOption);

  const {data: getProject, isLoading: isLoadingGetProject} = useGetProject({
    projectId,
  });

  const projectData = getProject?.project_getProject?.result ?? {};

  const bids = getBids?.pages ?? [];

  const {t} = useTranslation();

  const onLoadMore = () => {
    if (hasNextPageBids) {
      fetchNextPageBids();
    }
  };

  const listHeaderComponent = useCallback(() => {
    return (
      <VStack pt="20px" mb="42px">
        <CustomText
          marginBottom={12}
          fontSize={fontSize.xLarge}
          fontFamily={fontFamily.medium}>
          {t('projects.manageBidsTitle')}
        </CustomText>
        <CustomText lineHeight={18} fontSize={fontSize.small}>
          {t('projects.manageBidsDescription')}
        </CustomText>
      </VStack>
    );
  }, [t]);

  const renderItem = ({item}: {item: any}) => {
    return <MyBidItem {...{item, projectData, bids}} />;
  };

  const itemSeparatorComponent = useCallback(
    () => <CustomDivider my="26px" />,
    [],
  );

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('projects.manageBids')} />
      <VStack flex={1}>
        <Box bg={Colors.SEARCH_BACKGROUND} w="100%" h="16px" />
        {(getBidsLoading && !isRefetchingBids) || isLoadingGetProject ? (
          <ManageBidsPlaceholder />
        ) : (
          <CustomFlatList
            data={bids}
            onRefresh={refetchBids}
            renderItem={renderItem}
            isLoading={getBidsLoading}
            refreshing={isRefetchingBids}
            onEndReached={onLoadMore}
            isFetchingNextPage={isFetchingNextPageBids}
            listHeaderComponent={listHeaderComponent}
            itemSeparatorComponent={itemSeparatorComponent}
            contentContainerStyle={styles.contentContainerStyle}
          />
        )}
      </VStack>
      <PlaceBidButton
        projectId={projectId}
        title={t('projects.addABid')}
        icon={<PlusCircle />}
        bottom="48px"
      />
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
});
