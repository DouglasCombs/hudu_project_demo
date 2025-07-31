import dayjs from 'dayjs';
import {HStack, VStack} from 'native-base';
import React, {memo, useCallback, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {EmptyBids} from '~/assets/icons';
import {
  BidRouteItem,
  BidsHeaderTitle,
  CustomCollapsible,
  CustomText,
  EmptyData,
  PlaceBidButton,
  ProjectBidsPlaceholder,
  RemainedTimePrompt,
  SectionSort,
} from '~/components';
import {useMockData} from '~/constants/mockData';
import {BidStatus, ProjectFilter, ProjectStatus} from '~/generated/graphql';
import {
  useGetBidsInProjectDetailsTab,
  useGetBidsOrderByStatus,
} from '~/hooks/bid';
import {useGetProject} from '~/hooks/project';
import {authStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

const SectionActiveBidsRoute = ({projectId}: {projectId: number}) => {
  const {activeBidsSortData} = useMockData();
  const {t} = useTranslation();

  const {userData} = userDataStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);

  const [projectFilter, setProjectFilter] = useState<ProjectFilter>(
    activeBidsSortData?.[0],
  );

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId,
  });

  const projectData = getProject?.project_getProject?.result ?? {};

  const projectDeadLine = dayjs(projectData?.project?.projectDeadLine);
  const projectStatus = projectData?.project?.projectStatus;
  const isBidding = projectStatus === ProjectStatus.Bidding;
  const isLister = userData?.id === projectData?.project?.userId;

  const getBidsOption = {
    where: {
      and: [
        {projectId: {eq: projectId}},
        {bidStatus: {neq: BidStatus.Cancell}},
      ],
    },
    input: {
      projectFilter: projectFilter?.value,
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

  const options = {
    where: {
      and: [
        {projectId: {eq: projectId}},
        {bidStatus: {neq: BidStatus.Cancell}},
        {bidStatus: {neq: BidStatus.NotLucky}},
      ],
    },
    projectId,
  };

  const {
    isLoading: isLoadingGetBidsInProjectDetailsTab,
    data: getBidsInProjectDetailsTab,
  } = useGetBidsInProjectDetailsTab(options);

  const bids = useMemo(() => {
    return getBids?.pages ?? [];
  }, [getBids]);

  const onLoadMoreBids = () => {
    if (hasNextPageBids) {
      fetchNextPageBids();
    }
  };

  const listHeaderComponent = useCallback(() => {
    const result =
      getBidsInProjectDetailsTab?.bid_getBidsInProjectDetailsTab?.result ?? [];

    return (
      <>
        <RemainedTimePrompt
          {...{isLister, isBidding, projectId, projectDeadLine}}
        />
        {bids?.length > 0 && (
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.large}
            marginBottom={16}
            color={Colors.BLACK}>
            {t('projects.bids.bestBidSpotLight')}
          </CustomText>
        )}
        {bids?.length > 1 && (
          <>
            {result?.bestRate?.hudu?.asHuduRates > 0 && (
              <SectionBestRated data={result?.bestRate} />
            )}
            {result?.bestRate?.hudu?.highestProjectCompletionRate > 0 && (
              <SectionHighestProjectCompletionRate
                data={result?.highedtProjectCompletionRate}
              />
            )}
            <SectionLowestBids data={result?.lowestBid} />
          </>
        )}
      </>
    );
  }, [
    isBidding,
    bids,
    projectId,
    projectDeadLine,
    isLister,
    getBidsInProjectDetailsTab,
    t,
  ]);

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  if (
    (getBidsLoading && !isRefetchingBids) ||
    getProjectLoading ||
    isLoadingGetBidsInProjectDetailsTab
  ) {
    return <ProjectBidsPlaceholder />;
  }

  return (
    <VStack flex={1} bg={Colors.WHITE_F}>
      <ScrollView
        onScroll={({nativeEvent}: any) => {
          if (isCloseToBottom(nativeEvent)) {
            onLoadMoreBids();
          }
        }}
        contentContainerStyle={styles.contentContainerStyle}
        scrollEventThrottle={400}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingBids}
            onRefresh={refetchBids}
          />
        }
        showsVerticalScrollIndicator={false}>
        {listHeaderComponent()}
        {bids?.length > 1 ? (
          <CustomCollapsible title={t('projects.bids.allBids')}>
            <HStack h="48px" alignItems="center">
              <SectionSort
                value={projectFilter}
                onChange={setProjectFilter}
                data={activeBidsSortData}
                showChevronIcon
                titleColor={Colors.PRIMARY}
                flex={0}
                showSelectedValue
              />
            </HStack>
            {bids?.map((item: any) => {
              return <BidRouteItem key={item?.id} {...{item}} />;
            })}
          </CustomCollapsible>
        ) : bids?.length > 0 ? (
          bids?.map((item: any) => {
            return <BidRouteItem key={item?.id} {...{item}} />;
          })
        ) : (
          <EmptyData
            showText
            customIcon={<EmptyBids />}
            text={t('messages.emptyBidsTitle')}
            description={t('messages.emptyBidsDescription')}
          />
        )}
      </ScrollView>
      {!isLister && isUserLoggedIn && <PlaceBidButton {...{projectId}} />}
    </VStack>
  );
};

export default memo(SectionActiveBidsRoute);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 86,
    paddingHorizontal: 24,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
});

const SectionLowestBids = ({data}: {data: any}) => {
  const {t} = useTranslation();

  if (data) {
    return (
      <VStack mb="24px">
        <BidsHeaderTitle title={t('projects.bids.budgetFriendBid')} />
        <VStack space="24px">
          <BidRouteItem {...{item: data}} />
        </VStack>
      </VStack>
    );
  }

  return null;
};

const SectionBestRated = ({data}: {data: any}) => {
  const {t} = useTranslation();

  if (data) {
    return (
      <VStack mb="24px">
        <BidsHeaderTitle title={t('projects.bids.bestRate')} />
        <VStack space="24px">
          <BidRouteItem {...{item: data}} />
        </VStack>
      </VStack>
    );
  }

  return null;
};

const SectionHighestProjectCompletionRate = ({data}: {data: any}) => {
  const {t} = useTranslation();

  if (data) {
    return (
      <VStack mb="24px">
        <BidsHeaderTitle title={t('projects.bids.highestCompletionRate')} />
        <VStack space="24px">
          <BidRouteItem {...{item: data}} />
        </VStack>
      </VStack>
    );
  }

  return null;
};
