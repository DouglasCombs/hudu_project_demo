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
  SectionListerProjectRow,
  CustomContainer,
  EmptyData,
  CustomFlatList,
} from '~/components';
import {useGetListerProjects} from '~/hooks/project';
import {authStore, userDataStore} from '~/stores';
import {requestLocationPermission} from '~/utils/getPermissions';
import Geolocation from 'react-native-geolocation-service';
import {useFocusEffect} from '@react-navigation/native';
import {ProjectFilter, ProjectStatus} from '~/generated/graphql';
import {showErrorMessage} from '~/utils/utils';

const schema = yup.object().shape({
  sort: yup.string(),
});

const SectionListerProjects = () => {
  const {isUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);
  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {register, watch, setValue} = methods;

  const sort = watch('sort');

  const [options, setOptions] = useState({
    projectFilter: ProjectFilter.NewestToOldest,
    location: [12, 12],
    where: {
      and: [
        {project: {userId: {eq: userData?.id}}},
        {project: {isDeletedAccount: {neq: true}}},
      ],
    },
    projectOrderVms: [
      {projectStatus: ProjectStatus.Bidding, order: 1},
      {projectStatus: ProjectStatus.InProgress, order: 2},
      {projectStatus: ProjectStatus.Finished, order: 3},
      {projectStatus: ProjectStatus.Failed, order: 4},
    ],
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12,
    longitude: 12,
  });

  useEffect(() => {
    if (!isUserLoggedIn) {
      setValue('sort', undefined);
    }
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

  useEffect(() => {
    if (sort) {
      setOptions({
        projectFilter: sort,
        location: [currentLocation?.longitude, currentLocation?.latitude],
        where: {
          and: [
            {project: {userId: {eq: userData?.id}}},
            {project: {isDeletedAccount: {neq: true}}},
          ],
        },
        projectOrderVms: [
          {projectStatus: ProjectStatus.Bidding, order: 1},
          {projectStatus: ProjectStatus.InProgress, order: 2},
          {projectStatus: ProjectStatus.Finished, order: 3},
          {projectStatus: ProjectStatus.Failed, order: 4},
        ],
      });
    }
  }, [sort]);

  const {
    isLoading: getProjectLoading,
    data: getProjects,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextPageProjects,
    refetch: refetchProjects,
    isRefetching: isRefetchingProjects,
    isFetchingNextPage: isFetchingNextPageProjects,
  } = useGetListerProjects(options);

  const projects = getProjects?.pages ?? [];

  useFocusEffect(
    React.useCallback(() => {
      refetchProjects();
    }, []),
  );

  const onLoadMore = () => {
    if (hasNextPageProjects) {
      fetchNextPageProjects();
    }
  };

  const loading = getProjectLoading;

  const renderItem = ({item}: {item: any}) => (
    <SectionListerProjectRow item={item} />
  );

  const listEmptyComponent = useCallback(
    () => (
      <EmptyData
        text={
          'You currently have no projects!\nPost a project today and go from to-do... to done!'
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
            data={projects}
            isLoading={loading}
            renderItem={renderItem}
            refreshing={false}
            onRefresh={refetchProjects}
            listEmptyComponent={listEmptyComponent}
            contentContainerStyle={styles.contentContainerStyle}
            onEndReached={onLoadMore}
            isFetchingNextPage={isFetchingNextPageProjects}
          />
        </Flex>
      </CustomContainer>
    </Flex>
  );
};

export default React.memo(SectionListerProjects);

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: scale(12),
  },
});
