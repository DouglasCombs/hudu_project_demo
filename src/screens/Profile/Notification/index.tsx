import dayjs from 'dayjs';
import {Box, HStack} from 'native-base';
import React, {useCallback, useMemo, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {SectionList, StyleSheet} from 'react-native';
import {EmptyNotifications} from '~/assets/icons';
import {
  CustomContainer,
  CustomDivider,
  CustomSectionList,
  CustomText,
  EmptyData,
  NotificationItem,
  NotificationsPlaceholder,
  ScreensHeader,
} from '~/components';
import {useGetNotifications} from '~/hooks/notification';
import {Colors} from '~/styles';
import {fontFamily, fontSize, verticalScale} from '~/utils/style';
import {useDateTimeFormat} from '~/utils/utils';

export default function NotificationScreen() {
  const {t} = useTranslation();
  const {formatDate} = useDateTimeFormat();

  const sectionListRef = useRef<SectionList>(null);

  const options = {
    order: {createdDate: 'DESC'},
  };

  const {
    isLoading: getNotificationsLoading,
    data: getNotifications,
    fetchNextPage: fetchNextPageNotifications,
    hasNextPage: hasNextPageNotifications,
    refetch: refetchNotifications,
    isRefetching: isRefetchingNotifications,
    isFetchingNextPage: isFetchingNextPageNotifications,
  } = useGetNotifications(options, 15);

  const notifications = useMemo(() => {
    return getNotifications?.pages ?? [];
  }, [getNotifications]);

  const sections = useMemo(() => {
    return notifications?.reduce((acc, item: any) => {
      const title = dayjs(item?.createdDate).format('DD/MM/YYYY');
      const date = item?.createdDate;
      const index = acc.findIndex(section => section?.title?.title === title);
      if (index >= 0) {
        acc[index]?.data?.push(item);
      } else {
        acc.push({title: {title, date}, data: [item]});
      }
      return acc;
    }, []);
  }, [notifications]);

  const onLoadMore = () => {
    if (hasNextPageNotifications) {
      fetchNextPageNotifications();
    }
  };

  const renderItem = ({item}: {item: any}) => <NotificationItem {...{item}} />;

  const renderSectionHeader = ({section}: {section: any}) => {
    return (
      <HStack
        bg={Colors.SEARCH_BACKGROUND}
        alignItems="flex-end"
        zIndex={4}
        px="24px"
        h="44px">
        <CustomText
          fontFamily={fontFamily.medium}
          fontSize={fontSize.xNormal}
          marginBottom={8}
          color={Colors.PRIMARY}>
          {formatDate(section?.title?.date)}
        </CustomText>
      </HStack>
    );
  };

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData
        px="24px"
        showButton
        customIcon={<EmptyNotifications />}
        text={t('messages.emptyNotificationsTitle')}
        description={t('messages.emptyNotificationsDescription')}
        buttonTitle={t('common.backToHome')}
      />
    ),
    [t],
  );

  const itemSeparatorComponent = useCallback(
    () => (
      <HStack pl="24px">
        <CustomDivider />
      </HStack>
    ),
    [],
  );

  const sectionSeparatorComponent = useCallback(() => <Box h="16px" />, []);

  return (
    <CustomContainer>
      <ScreensHeader title={t('common.notifications')} backAction />
      {getNotificationsLoading && !isRefetchingNotifications ? (
        <NotificationsPlaceholder />
      ) : (
        <CustomSectionList
          ref={sectionListRef}
          onRefresh={refetchNotifications}
          refreshing={false}
          renderItem={renderItem}
          showScrollToTop
          sections={sections ?? []}
          isFetchingNextPage={isFetchingNextPageNotifications}
          renderSectionHeader={renderSectionHeader}
          listEmptyComponent={listEmptyComponent}
          itemSeparatorComponent={itemSeparatorComponent}
          SectionSeparatorComponent={sectionSeparatorComponent}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={onLoadMore}
        />
      )}
    </CustomContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: verticalScale(24),
  },
});
