import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  RESULTS,
  check,
  checkMultiple,
  requestMultiple,
} from 'react-native-permissions';
import {locationStore} from '~/stores';

export async function requestMyLocationPermission(): Promise<boolean> {
  try {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        if (result === RESULTS.GRANTED) {
          locationStore.setState({isVisibleLocationModal: false});

          return true;
        } else {
          const permissionAndroidWhenInUse =
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
          const permissionIOSWhenInUse = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
          const arrayPermission = [
            permissionAndroidWhenInUse,
            permissionIOSWhenInUse,
          ];

          return checkMultiple(arrayPermission).then(statuses => {
            const keys = Object.keys(statuses);

            return requestMultiple(keys).then(statusesReq => {
              if (statusesReq === RESULTS.GRANTED) {
                locationStore.setState({isVisibleLocationModal: false});
              } else {
                locationStore.setState({isVisibleLocationModal: true});
              }
              return true;
            });
          });
        }
      })
      .catch();
  } catch (err) {}
  return false;
}

export async function requestLocationPermission(): Promise<boolean> {
  try {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }
  } catch (err) {}
  return false;
}

export async function requestWritePermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

export async function requestReadPermission() {
  const permissionStorage = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  const permissionImages = PERMISSIONS.ANDROID.READ_MEDIA_VIDEO;
  const permissionVideo = PERMISSIONS.ANDROID.READ_MEDIA_VIDEO;
  const arrayPermission = [
    permissionImages,
    permissionVideo,
    permissionStorage,
  ];

  return checkMultiple(arrayPermission).then(statuses => {
    const keys = Object.keys(statuses);

    return requestMultiple(keys).then(statusesReq => {
      return true;
    });
  });
}
