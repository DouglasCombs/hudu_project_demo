import React, {useState, useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {VStack, HStack, Center} from 'native-base';
import {
  CustomContainer,
  ProjectItem,
  SectionSort,
  CustomFlatList,
  CustomText,
} from '~/components';
import {FormProvider, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {fontFamily, scale, verticalScale} from '~/utils/style';
import {useGetUserLikeProjects} from '~/hooks/project';
import {authStore} from '~/stores';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '~/utils/getPermissions';
import dayjs from 'dayjs';
import {showErrorMessage} from '~/utils/utils';
import {homeAuthSortData, homeSortData} from '~/constants/mockData';

const schema = yup.object().shape({
  sort: yup.string(),
});

const FavoriteScreen = () => {
  const {isUserLoggedIn} = authStore(state => state);
  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const today = useMemo(() => {
    return dayjs(new Date().toUTCString());
  }, []);

  const {register, watch, setValue} = methods;

  const sort = watch('sort');

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 12,
    longitude: 12,
  });

  const [options, setOptions] = useState(
    isUserLoggedIn
      ? {
          projectFilter: 'NEWEST_TO_OLDEST',
          location: [12, 12],
          where: {
            project: {
              and: [
                {projectDeadLine: {gt: today}},
                {projectStatus: {eq: 'BIDDING'}},
                {isDeletedAccount: {neq: true}},
              ],
            },
          },
        }
      : {enabled: isUserLoggedIn},
  );

  const {
    isLoading: getUserLikeProjectsLoading,
    data: getUserLikeProjects,
    fetchNextPage: fetchNextPageUserLikeProjects,
    hasNextPage: hasNextPageUserLikeProjects,
    refetch: refetchUserLikeProjects,
    isRefetching: isRefetchingUserLikeProjects,
    isFetchingNextPage: isFetchingNextPageUserLikeProjects,
  } = useGetUserLikeProjects(options);

  const userLikeProjects = getUserLikeProjects?.pages ?? [];

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

  useEffect(() => {
    if (sort && isUserLoggedIn) {
      setOptions({
        projectFilter: sort,
        location: [currentLocation?.longitude, currentLocation?.latitude],
        where: {
          project: {
            and: [
              {projectDeadLine: {gt: today}},
              {projectStatus: {eq: 'BIDDING'}},
              {isDeletedAccount: {neq: true}},
            ],
          },
        },
      });
    }
  }, [sort]);

  const onLoadMore = () => {
    if (hasNextPageUserLikeProjects) {
      fetchNextPageUserLikeProjects();
    }
  };

  const renderItem = ({item}: {item: any}) => <ProjectItem item={item} />;

  const loading = getUserLikeProjectsLoading || isRefetchingUserLikeProjects;

  return (
    <CustomContainer isLoading={loading}>
      <FormProvider {...methods}>
        <VStack space="1" py="4" flex={1}>
          <HStack px="4" justifyContent="flex-end">
            <HStack alignItems="flex-end" flex={1}>
              <CustomText fontSize={scale(18)} fontFamily={fontFamily.medium}>
                Favorites
              </CustomText>
            </HStack>
            <Center w={scale(150)}>
              <SectionSort
                {...register('sort')}
                disabled={!isUserLoggedIn}
                data={homeSortData}
                authData={homeAuthSortData}
              />
            </Center>
          </HStack>
          <CustomFlatList
            isLoading={loading}
            data={userLikeProjects}
            numColumns={2}
            renderItem={renderItem}
            onRefresh={refetchUserLikeProjects}
            refreshing={false}
            onEndReached={onLoadMore}
            isFetchingNextPage={isFetchingNextPageUserLikeProjects}
            columnWrapperStyle={styles.columnWrapperStyle}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </VStack>
      </FormProvider>
    </CustomContainer>
  );
};

export default FavoriteScreen;

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
