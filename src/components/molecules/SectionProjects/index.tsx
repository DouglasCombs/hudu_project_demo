import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet} from 'react-native';
import {HStack, VStack, Box, Center} from 'native-base';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  SectionSort,
  ProjectItem,
  CustomContainer,
  CustomFlatList,
} from '~/components';
import {scale, verticalScale} from '~/utils/style';
import {useGetProjects} from '~/hooks/project';
import {requestLocationPermission} from '~/utils/getPermissions';
import Geolocation from 'react-native-geolocation-service';
import dayjs from 'dayjs';
import {authStore} from '~/stores';
import {ProjectStatus} from '~/generated/graphql';
import {showErrorMessage} from '~/utils/utils';
import {homeAuthSortData, homeSortData} from '~/constants/mockData';

const schema = yup.object().shape({
  sort: yup.string(),
});

const SectionProjects = () => {
  const {isLoadingLogin} = authStore(state => state);
  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {register, watch, setValue} = methods;

  const sort = watch('sort');

  const today = useMemo(() => {
    return dayjs(new Date().toUTCString());
  }, []);

  const [options, setOptions] = useState({
    projectFilter: 'NEWEST_TO_OLDEST',
    location: [12, 12],
    where: {
      and: [
        {project: {projectDeadLine: {gt: today}}},
        {project: {projectStatus: {eq: ProjectStatus.Bidding}}},
        {project: {isDeletedAccount: {neq: true}}},
      ],
    },
    projectOrderVms: [{projectStatus: ProjectStatus.Bidding, order: 1}],
  });

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12,
    longitude: 12,
  });

  useEffect(() => {
    setValue('sort', undefined);
  }, [isLoadingLogin]);

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
            {project: {projectDeadLine: {gt: today}}},
            {project: {projectStatus: {eq: ProjectStatus.Bidding}}},
            {project: {isDeletedAccount: {neq: true}}},
          ],
        },
        projectOrderVms: [{projectStatus: ProjectStatus.Bidding, order: 1}],
      });
    }
  }, [sort]);

  const {
    isLoading: getProjectLoading,
    data: getProjects,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextPageProjects,
    refetch: refetchProjects,
    isFetchingNextPage: isFetchingNextPageProjects,
  } = useGetProjects(options);

  const projects = getProjects?.pages ?? [];

  const onLoadMore = () => {
    if (hasNextPageProjects) {
      fetchNextPageProjects();
    }
  };

  const renderItem = ({item}: {item: any}) => <ProjectItem item={item} />;

  return (
    <CustomContainer isLoading={getProjectLoading}>
      <FormProvider {...methods}>
        <VStack space="1" flex={1}>
          <HStack px="4" justifyContent="flex-end">
            <Box flex={1} />
            <Center w={scale(150)}>
              <SectionSort
                {...register('sort')}
                data={homeSortData}
                authData={homeAuthSortData}
              />
            </Center>
          </HStack>
          <CustomFlatList
            data={projects}
            renderItem={renderItem}
            onRefresh={refetchProjects}
            onEndReached={onLoadMore}
            refreshing={false}
            numColumns={2}
            isLoading={getProjectLoading}
            columnWrapperStyle={styles.columnWrapperStyle}
            itemSeparatorComponent={undefined}
            contentContainerStyle={styles.contentContainerStyle}
            isFetchingNextPage={isFetchingNextPageProjects}
          />
        </VStack>
      </FormProvider>
    </CustomContainer>
  );
};

export default SectionProjects;

const styles = StyleSheet.create({
  columnWrapperStyle: {
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: verticalScale(8),
  },
});
