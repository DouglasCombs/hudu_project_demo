import React from 'react';
import {useTranslation} from 'react-i18next';
import Config from 'react-native-config';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import {BaseToast, ErrorToast, ToastProps} from 'react-native-toast-message';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {Error, Information, Success} from '~/assets/icons';
import {CustomToast, OptionalToast} from '~/components';
import {authStore, languageStore, userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {windowAspectRatio} from '~/utils/style';
import {isIllegal, isIos, pluralize} from './helper';
import {t as translation} from 'i18next';
import dayjs from 'dayjs';

Geocoder.init(Config.GOOGLE_MAPS_API_KEY, {language: 'en'});

const updateLocationOptions = {
  timeout: 5000,
  accuracy: {ios: 'nearestTenMeters', android: 'balanced'},
  distanceFilter: 10, // meters
  showsBackgroundLocationIndicator: false,
  maximumAge: 60000, // ms
  showLocationDialog: true,
};

export const toastConfig = {
  success: (props: ToastProps) => <BaseToast {...props} />,
  error: (props: ToastProps) => <ErrorToast {...props} />,
  baseError: ({text1, text2, props}: any) => {
    return (
      <CustomToast
        {...{
          text1,
          text2,
          icon: props.icon,
          color: props.color,
          onPress: props.onPress,
          backgroundColor: Colors.WHITE_F,
        }}
      />
    );
  },
  baseSuccess: ({text1, text2, props}: any) => (
    <CustomToast
      {...{
        text1,
        text2,
        icon: props.icon,
        color: props.color,
        onPress: props.onPress,
        backgroundColor: Colors.WHITE_F,
      }}
    />
  ),
  baseSnackBar: ({text1, props}: any) => (
    <CustomToast
      {...{
        text1,
        icon: props.icon,
        text1Color: props.color,
        backgroundColor: Colors.Rhino,
        top: 0,
      }}
    />
  ),
  baseInfo: ({text1, text2, props}: any) => (
    <CustomToast
      {...{
        text1,
        text2,
        icon: props.icon,
        color: props.color,
        onPress: props.onPress,
        backgroundColor: Colors.WHITE_F,
      }}
    />
  ),
  baseAlert: ({text1, text2, props}: any) => (
    <CustomToast
      {...{
        text1,
        text2,
        icon: props.icon,
        color: props.color,
        onPress: props.onPress,
        backgroundColor: Colors.WHITE_F,
      }}
    />
  ),
  baseNotification: ({text1, text2, props}: any) => (
    <CustomToast
      {...{
        text1,
        text2,
        icon: props.icon,
        color: props.color,
        onPress: props.onPress,
        backgroundColor: Colors.WHITE_F,
      }}
    />
  ),
  baseOptional: ({text1, text2, props}: any) => (
    <OptionalToast
      {...{
        text1,
        text2,
        onClose: props.onClose,
        onEdit: props.onEdit,
        onDelete: props.onDelete,
      }}
    />
  ),
};

export const getLocalityFromGeoRes = (geoRes: any) => {
  const resultItems = geoRes.results.filter((res: any) => {
    return (
      res?.types?.includes('locality') ||
      res.types.includes('administrative_area_level_2')
    );
  });
  const city =
    resultItems.length > 0 && resultItems[0].address_components
      ? resultItems[0].address_components[0].short_name
      : '';
  return {city};
};

export const getStateFromGeoRes = (geoRes: any) => {
  const resultItems = geoRes.results.filter((res: any) =>
    res.types.includes('administrative_area_level_1'),
  );

  let stateName = '';

  if (
    resultItems.length > 0 &&
    resultItems[0].address_components &&
    resultItems[0].address_components.length > 1
  ) {
    const addressComponentLength = resultItems[0].address_components.length;
    const stateObj =
      resultItems[0].address_components[addressComponentLength - 2];
    stateName = stateObj ? stateObj.short_name : '';
  }

  return {state: stateName};
};

export const getAddressAndLocalityAndStateAndZip = async (
  lat: number,
  lng: number,
) => {
  const geoRes = await Geocoder.from(lat, lng);
  const address = geoRes.results[0].formatted_address;
  const {city} = getLocalityFromGeoRes(geoRes);
  const {state} = getStateFromGeoRes(geoRes);
  const zip =
    geoRes.results[0].address_components.find((component: any) =>
      component.types.includes('postal_code'),
    )?.long_name ?? '';
  return {address, city, state, zip};
};

export const getDistance = (
  lat1: any,
  lon1: any,
  lat2: any,
  lon2: any,
  unit: any = 'K',
) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) {
    return 0;
  }
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  }

  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit === 'K') {
    dist *= 1.609344;
  }
  return dist;
};

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async position => {
        if (position) {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          return resolve(location);
        }

        return reject();
      },
      error => {
        return reject(error);
      },
      updateLocationOptions,
    );
  });
};

export const getDistanceFromLatDelta = (latDelta: any) => {
  const mile = 69; // mile per degrees latitude
  const km = mile * 1.609; // km per degrees latitude
  return latDelta * km;
};

export const getDistanceFromLngDelta = (lngDelta: any) => {
  const mile = 55; // mile per degrees longitude
  const km = mile * 1.609; // km per degrees latitude
  return lngDelta * km;
};

export const getRadialDistanceFromLatLngDelta = (latDelta, lngDelta) => {
  const latDistance = Math.round(getDistanceFromLatDelta(latDelta) / 2); // divided by to for calculating radial distance
  const lngDistance = Math.round(getDistanceFromLngDelta(lngDelta) / 2);

  return Math.max(latDistance, lngDistance);
};

export const showErrorMessage = (
  message: any = 'Something went wrong',
  message2?: any,
  onPress?: any,
  position: 'top' | 'bottom' = 'top',
) => {
  Toast.show({
    type: 'baseError',
    text1: message,
    text2: message2,
    position,
    props: {icon: <Error />, onPress, color: Colors.FrenchRose},
  });
};

export const showSuccessMessage = (
  message: any = 'Success',
  message2?: any,
  onPress?: any,
) => {
  Toast.show({
    type: 'baseSuccess',
    text1: message,
    text2: message2,
    position: 'top',
    props: {icon: <Success />, onPress, color: Colors.LimeGreen},
  });
};

export const showInfoMessage = (
  message: any = '',
  message2?: any,
  onPress?: any,
) => {
  Toast.show({
    type: 'baseInfo',
    text1: message,
    text2: message2,
    position: 'top',
    props: {icon: <Information />, onPress, color: Colors.Ronchi},
  });
};

export const showWarningMessage = (
  message: any = '',
  message2?: any,
  onPress?: any,
) => {
  Toast.show({
    type: 'baseAlert',
    text1: message,
    text2: message2,
    position: 'top',
    props: {icon: <Information />, onPress, color: Colors.Ronchi},
  });
};

export const showSnackBar = (message: any = 'Success', icon?: any) => {
  Toast.show({
    type: 'baseSnackBar',
    text1: message,
    position: 'bottom',
    props: {icon, color: Colors.WHITE_F},
  });
};

export const showOptionalMessage = ({
  text1,
  text2,
  onClose,
  onEdit,
  onDelete,
  autoHide = false,
  position = 'top',
}: any) => {
  Toast.show({
    autoHide: autoHide,
    type: 'baseOptional',
    text1: text1,
    text2: text2,
    position: position,
    topOffset: isIos ? 10 : 0,
    props: {onClose, onEdit, onDelete},
  });
};

export const extractError = (data: unknown): string => {
  if (typeof data === 'string') {
    return data;
  }
  if (Array.isArray(data)) {
    const messages = data.map(item => {
      return `  ${extractError(item)}`;
    });

    return `${messages.join('')}`;
  }

  if (typeof data === 'object' && data !== null) {
    const messages = Object.entries(data).map(item => {
      const [key, value] = item;
      const separator = Array.isArray(value) ? ':\n ' : ': ';

      return `- ${key}${separator}${extractError(value)} \n `;
    });
    return `${messages.join('')} `;
  }
  return 'Something went wrong ';
};

export const defaultLongitudeDelta = 0.008;
export const defaultLatitudeDelta = defaultLongitudeDelta * windowAspectRatio;

export const withLoggedInCheck = (fn: any) => {
  const isUserLoggedIn = authStore.getState().isUserLoggedIn;
  if (isUserLoggedIn) {
    return fn();
  } else {
    return showInfoMessage(translation('messages.errors.youAreNotLoggedIn'));
  }
};

export const useMessages = () => {
  const {t} = useTranslation();

  const placeYourBidTitle = (bidNumber: number) => {
    switch (bidNumber) {
      case undefined:
      case 0:
        return t('projects.bids.placeFirstBid');
      case 1:
        return t('projects.bids.placeSecondBid');
      case 2:
        return t('projects.bids.placeThirdBid');
      default:
        return 'no';
    }
  };

  return {placeYourBidTitle};
};

export const useGetLowestBidTitle = () => {
  const {t} = useTranslation();
  const {userData} = userDataStore(state => state);

  const getLowestBidTitle = ({
    listerId,
    currentLowBid,
    projectDeadLine,
  }: {
    listerId: number;
    currentLowBid?: number;
    projectDeadLine?: any;
  }) => {
    const date1 = dayjs(projectDeadLine);
    const current = dayjs();
    const deadLine = date1.diff(current, 'millisecond', true);

    const isLister = listerId === userData?.id;
    const hasCurrentLowBid = currentLowBid && currentLowBid > 0;
    const isNoBidsYet = !hasCurrentLowBid && isLister;
    const isBeTheFirstOne = !hasCurrentLowBid && !isLister;
    const isClosed = deadLine <= 0;
    const formattedBidAmount =
      currentLowBid && currentLowBid > 0
        ? `$${Number(currentLowBid)?.toFixed(2)}`
        : '';

    return hasCurrentLowBid
      ? formattedBidAmount
      : isClosed
      ? t('projects.bidAmount.noBidsPlaced') //TODO Bidding is no longer accepted
      : isNoBidsYet
      ? t('projects.bidAmount.noBidsYet')
      : isBeTheFirstOne
      ? t('projects.bidAmount.beTheFirstOne')
      : '';
  };

  return {getLowestBidTitle};
};

export const useGetLanguageTitle = () => {
  const {currentLanguage} = languageStore(state => state);

  const getLanguageText = () => {
    switch (currentLanguage) {
      case 'sp':
        return 'spanishText';

      default:
        return 'text';
    }
  };

  return {getLanguageText};
};

export const withLegalCheck = (text: string, fn: () => void) => {
  if (isIllegal(text)) {
    return showErrorMessage();
  } else {
    return fn();
  }
};

export const useGetProjectRemainedTime = () => {
  const {t} = useTranslation();

  function getProjectRemainedTime(time: any) {
    const date1 = dayjs(time);
    const current = dayjs();
    const projectDeadLine = date1.diff(current, 'millisecond', true);

    if (projectDeadLine < 0) {
      return '00:00';
    }

    const days = date1.diff(current, 'day');
    const hours = date1.diff(current, 'hour');
    const minutes = dayjs(projectDeadLine)?.minute() ?? 0;

    if (days > 0) {
      return pluralize(days, t('common.day'));
    }

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
    return formattedTime;
  }

  return {getProjectRemainedTime};
};

export const useDateTimeFormat = () => {
  const {t} = useTranslation();

  function formatDate(date: any) {
    const today = dayjs();

    const otherDate = dayjs(date);

    if (today.isSame(otherDate, 'day')) {
      return t('common.today');
    } else if (today.subtract(1, 'day').isSame(otherDate, 'day')) {
      return t('common.yesterday');
    } else {
      return otherDate.format('MM/DD/YYYY');
    }
  }

  function formatTime(date: any) {
    const today = dayjs();
    const otherDate = dayjs(date);

    if (today.isSame(otherDate, 'day')) {
      return {dateTime: otherDate.format('hh:mm A'), isToday: true}; // return the hour if the date is today
    } else if (today.subtract(1, 'day').isSame(otherDate, 'day')) {
      return {dateTime: t('common.yesterday'), isToday: false};
    } else {
      return {dateTime: otherDate.format('MM/DD/YYYY'), isToday: false};
    }
  }

  return {formatDate, formatTime};
};
