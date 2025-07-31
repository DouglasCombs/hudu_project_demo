import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {HStack, Center, Box, Flex} from 'native-base';
import {scale} from '~/utils/style';
import {Colors} from '~/styles';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  SectionSort,
  SectionHudurProjectRow,
  CustomContainer,
  EmptyData,
  CustomFlatList,
} from '~/components';
import {useGetBidsOrderByStatus} from '~/hooks/bid';
import {authStore, userDataStore} from '~/stores';
import {requestLocationPermission} from '~/utils/getPermissions';
import Geolocation from 'react-native-geolocation-service';
import {BidStatus, ProjectFilter} from '~/generated/graphql';
import {showErrorMessage} from '~/utils/utils';

const schema = yup.object().shape({
  sort: yup.string(),
});

const SectionHuduUrProjects = () => {
  const {userData} = userDataStore(state => state);
  const {isUserLoggedIn} = authStore(state => state);

  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {register, watch, setValue} = methods;

  const sort = watch('sort');

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12,
    longitude: 12,
  });

  const options = {
    where: isUserLoggedIn
      ? {
          and: [
            {huduId: {eq: userData?.id}},
            {isHuduDeletedAccount: {neq: true}},
          ],
        }
      : {},
    input: {
      projectFilter: sort ? sort : ProjectFilter.LowToHighBids,
      location: [currentLocation?.longitude, currentLocation?.latitude],
      bovms: [
        {bidStatus: BidStatus.InProgress, order: 1},
        {bidStatus: BidStatus.Waiting, order: 2},
        {bidStatus: BidStatus.Finished, order: 3},
        {bidStatus: BidStatus.NotLucky, order: 4},
        {bidStatus: BidStatus.Cancell, order: 5},
        {bidStatus: BidStatus.Failed, order: 6},
      ],
    },
  };

  useEffect(() => {
    setValue('sort', undefined);
  }, [isUserLoggedIn]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    if (await requestLocationPermission()) {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setCurrentLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.091,
          });
        },
        (error: any) => {
          showErrorMessage(JSON.stringify(error));
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  };

  const {
    isLoading: getBidsLoading,
    data: getBids,
    fetchNextPage: fetchNextPageGetBids,
    hasNextPage: hasNextPageGetBids,
    isRefetching,
    refetch,
    isFetchingNextPage,
  } = useGetBidsOrderByStatus(options);

  const projects = getBids?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageGetBids) {
      fetchNextPageGetBids();
    }
  };

  const loading = getBidsLoading;

  const renderItem = ({item}: {item: any}) => (
    <SectionHudurProjectRow {...{item}} />
  );

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData
        text={
          "You're currently not bidding on any projects!\nWhat are you waiting for?!\nLets make some money!"
        }
      />
    ),
    [],
  );

  return (
    <Flex pb="4" h="100%" bg={Colors.WHITE}>
      <CustomContainer isLoading={loading}>
        <Flex flex={1} bg={Colors.WHITE}>
          <FormProvider {...methods}>
            <HStack px="4" justifyContent="flex-end" mb="3">
              <Box flex={1} />
              <Center w={scale(150)}>
                <SectionSort {...register('sort')} />
              </Center>
            </HStack>
          </FormProvider>
          <CustomFlatList
            isLoading={loading}
            data={projects}
            renderItem={renderItem}
            onRefresh={refetch}
            refreshing={false}
            isFetchingNextPage={isFetchingNextPage}
            listEmptyComponent={listEmptyComponent}
            onEndReached={onLoadMore}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </Flex>
      </CustomContainer>
    </Flex>
  );
};

export default React.memo(SectionHuduUrProjects);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: scale(12),
  },
});
