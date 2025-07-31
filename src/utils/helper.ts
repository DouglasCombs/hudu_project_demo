import {Platform} from 'react-native';
import {
  allowCountryList,
  allowStateList,
  stateList,
  stateList2,
  zipCodeList,
} from '~/constants/mockData';
import {Availability, ResponseStatus} from '~/generated/graphql';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import Config from 'react-native-config';
import {useTranslation} from 'react-i18next';
import {Colors} from '~/styles';
import {showErrorMessage, showSuccessMessage} from './utils';
import {v4 as uuidv4} from 'uuid';
import 'dayjs/locale/en';
import {cities, englishLocale, spanishLocale} from '~/constants/constants';
import cityList from '~/constants/cityList';
import {tempStore} from '~/stores';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

export const isIos = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const isProduction = Config.ENVIRONMENT === 'PRD';

export function handleSpecificDate(dateString: any) {
  const currentDate = dayjs();
  const messageDate = dayjs(dateString);

  const diffInDays = messageDate.diff(currentDate, 'day');
  if (diffInDays > 6) {
    const date = new Date(new Date().setDate(new Date().getDate() + 7));
    return date.toString();
  } else {
    return dateString;
  }
}

export function onlyLettersAndNumbers(str: string) {
  return Boolean(
    str.match(/^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9- ]+$/),
  );
}

export function calculateSum(array, property) {
  const total = array.reduce((accumulator, object) => {
    return accumulator + object[property];
  }, 0);

  return total;
}

export function getLocationFromState(state: string = '') {
  const res = stateList.find(
    (stateElement: any) => stateElement?.value === state,
  );
  return res;
}

export function getStateNameFromShortName(state: string = '') {
  const res = stateList.find(
    (stateElement: any) => stateElement?.value === state,
  );
  return res?.title ?? -1;
}

export function getFullImageUrl(url?: string | undefined | null) {
  if (url) {
    if (url?.startsWith?.('https') || url?.startsWith?.('http')) {
      return url;
    }
    return url && `${Config.CDN_URL}/${url}`;
  } else {
    return;
  }
}

export function isAllowZipCode(zCode: number) {
  return zipCodeList.find(
    (zipCodeItem: number) => zipCodeItem === Number(zCode),
  );
}

export function formatValueWithSymbol(value: any, symbol: string = '%') {
  if (value !== null && value !== undefined && value > 0) {
    return `${value}${symbol}`;
  } else {
    return 'N/A';
  }
}

export const isLocationInDallasRadius = (lat: any, long: any) => {
  // Dallas coordinates
  const dallasLat = 32.7767; // Dallas latitude
  const dallasLong = -96.797; // Dallas longitude

  // Radius in miles
  const radiusMiles = 75;

  // Earth radius in miles
  const earthRadius = 3958.8;

  // Convert degrees to radians
  const toRadians = angle => (angle * Math.PI) / 180;

  // Calculate the Haversine distance
  const haversine = (a, b) => {
    const dLat = toRadians(b.lat - a.lat);
    const dLon = toRadians(b.long - a.long);
    const h =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(a.lat)) *
        Math.cos(toRadians(b.lat)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
    return earthRadius * c;
  };

  // Calculate distance between the given location and Dallas
  const distance = haversine({lat, long}, {lat: dallasLat, long: dallasLong});

  // Check if the distance is within the radius
  return distance <= radiusMiles;
};

export const isAllowCityInState = (city: string, state: string = 'Texas') => {
  const res = cityList?.[state]?.find(
    (item: string) => item?.toLowerCase() === city?.toLowerCase(),
  );
  return res;
};

export function isAllowState(
  inState: string,
  valueKey: 'value' | 'title' = 'value',
) {
  const state = inState.startsWith('US-')
    ? inState.replace('US-', '')
    : inState;
  return stateList2.find((stateItem: any) => {
    if (state === stateItem?.[valueKey]) {
      return stateItem;
    } else {
      null;
    }
  });
}

export function isAllowCountry(
  country: string,
  valueKey: 'value' | 'title' = 'value',
) {
  return allowCountryList.find((countryItem: any) => {
    if (country === countryItem?.[valueKey]) {
      return countryItem;
    } else {
      null;
    }
  });
}

export const useGetMessages = () => {
  const {t} = useTranslation();

  const getFireBaseErrorMessage = (error: any) => {
    switch (error?.code) {
      case 'auth/email-already-in-use':
        return t('messages.firebase.emailExist');
      case 'auth/user-not-found':
        return t('messages.firebase.userNotFound');
      case 'auth/network-request-failed':
        return t('messages.firebase.requestFailed');
      case 'Cancelled by user':
        return t('messages.firebase.cancelByUser');
      case 'auth/account-exists-with-different-credential':
        return t('messages.firebase.existAccountWithDifferentCredential');
      default:
        let temp = error?.message ?? '';
        let msg = temp.split(']').pop();
        return msg;
    }
  };

  const getResponseMessage = (response: string = '') => {
    switch (response) {
      case ResponseStatus.Success:
        return {
          type: 'success',
          message: t('messages.auth.success'),
          icon: 'success',
        };
      case ResponseStatus.AccessDenied:
        return {
          type: 'danger',
          message: t('messages.errors.accessDenied'),
          icon: 'danger',
        };
      case ResponseStatus.ActiveBidsExist:
        return {
          type: 'danger',
          message: t('messages.errors.activeBidsExist'),
          icon: 'danger',
        };
      case ResponseStatus.ActiveBidsExist:
        return {
          type: 'danger',
          message: t('messages.errors.activeBidsExist'),
          icon: 'danger',
        };
      case ResponseStatus.AlreadyExist:
        return {
          type: 'danger',
          message: t('messages.errors.userAlreadyExist'),
          icon: 'danger',
        };
      case ResponseStatus.AlreadyFollowed:
        return {
          type: 'danger',
          message: t('messages.errors.userAlreadyFollowed'),
          icon: 'danger',
        };
      case ResponseStatus.AlreadyRemoved:
        return {
          type: 'danger',
          message: t('messages.errors.userAlreadyRemoved'),
          icon: 'danger',
        };
      case ResponseStatus.AuthenticationFailed:
        return {
          type: 'danger',
          message: t('messages.errors.authenticationFailed'),
          icon: 'danger',
        };
      case ResponseStatus.CommentNotFound:
        return {
          type: 'danger',
          message: t('messages.errors.commentNotFound'),
          icon: 'danger',
        };
      case ResponseStatus.DiffrenetIds:
        return {
          type: 'danger',
          message: t('messages.errors.differentIds'),
          icon: 'danger',
        };
      case ResponseStatus.DurationIsRequired:
        return {
          type: 'danger',
          message: t('messages.errors.durationIsRequired'),
          icon: 'danger',
        };
      case ResponseStatus.Failed:
        return {
          type: 'danger',
          message: t('messages.errors.failed'),
          icon: 'danger',
        };
      case ResponseStatus.HostNotFound:
        return {
          type: 'danger',
          message: t('messages.errors.hostNotFound'),
          icon: 'danger',
        };
      case ResponseStatus.InvalidTimeRange:
        return {
          type: 'danger',
          message: t('messages.errors.invalidTimeRange'),
          icon: 'danger',
        };
      case ResponseStatus.InvalidTimeSyntax:
        return {
          type: 'danger',
          message: t('messages.errors.invalidTimeSyntax'),
          icon: 'danger',
        };
      case ResponseStatus.InProgressBidExist:
        return {
          type: 'danger',
          message: t('messages.errors.inProgressBidExist'),
          icon: 'danger',
        };
      case ResponseStatus.NotAllowed:
        return {
          type: 'danger',
          message: t('messages.errors.notAllowed'),
          icon: 'danger',
        };
      case ResponseStatus.NotEnoughData:
        return {
          type: 'danger',
          message: t('messages.errors.notEnoughData'),
          icon: 'danger',
        };
      case ResponseStatus.NotFound:
        return {
          type: 'danger',
          message: t('messages.errors.notFound'),
          icon: 'danger',
        };
      case ResponseStatus.PostNotFound:
        return {
          type: 'danger',
          message: t('messages.errors.postNotFound'),
          icon: 'danger',
        };
      case ResponseStatus.SameId:
        return {
          type: 'danger',
          message: t('messages.errors.sameId'),
          icon: 'danger',
        };
      case ResponseStatus.SelfBidNotAllowed:
        return {
          type: 'danger',
          message: t('messages.errors.selfBidNotAllowed'),
          icon: 'danger',
        };
      case ResponseStatus.SelfMessageNotAllowed:
        return {
          type: 'danger',
          message: t('messages.errors.selfMessageNotAllowed'),
          icon: 'danger',
        };
      case ResponseStatus.TimeConflict:
        return {
          type: 'danger',
          message: t('messages.errors.timeConflict'),
          icon: 'danger',
        };
      case ResponseStatus.UnknownError:
        return {
          type: 'danger',
          message: t('messages.errors.unknownError'),
          icon: 'danger',
        };
      case ResponseStatus.UsernameAlreadyExist:
        return {
          type: 'danger',
          message: t('messages.errors.usernameAlreadyExist'),
          icon: 'danger',
        };
      default:
        return {
          type: 'danger',
          message: t('messages.errors.unknownError'),
          icon: 'danger',
        };
    }
  };

  const showResponseMessage = (response: string = '') => {
    switch (response) {
      case ResponseStatus.Success:
        return showSuccessMessage(t('messages.auth.success'));
      case ResponseStatus.AccessDenied:
        return showErrorMessage(t('messages.errors.accessDenied'));
      case ResponseStatus.ActiveBidsExist:
        return showErrorMessage(t('messages.errors.activeBidsExist'));
      case ResponseStatus.ActiveBidsExist:
        return showErrorMessage(t('messages.errors.activeBidsExist'));
      case ResponseStatus.AlreadyExist:
        return showErrorMessage(t('messages.errors.userAlreadyExist'));
      case ResponseStatus.AlreadyFollowed:
        return showErrorMessage(t('messages.errors.userAlreadyFollowed'));
      case ResponseStatus.AlreadyRemoved:
        return showErrorMessage(t('messages.errors.userAlreadyRemoved'));
      case ResponseStatus.AuthenticationFailed:
        return showErrorMessage(t('messages.errors.authenticationFailed'));
      case ResponseStatus.CommentNotFound:
        return showErrorMessage(t('messages.errors.commentNotFound'));
      case ResponseStatus.DiffrenetIds:
        return showErrorMessage(t('messages.errors.differentIds'));
      case ResponseStatus.DurationIsRequired:
        return showErrorMessage(t('messages.errors.durationIsRequired'));
      case ResponseStatus.Failed:
        return showErrorMessage(t('messages.errors.failed'));
      case ResponseStatus.HostNotFound:
        return showErrorMessage(t('messages.errors.hostNotFound'));
      case ResponseStatus.InvalidTimeRange:
        return showErrorMessage(t('messages.errors.invalidTimeRange'));
      case ResponseStatus.InvalidTimeSyntax:
        return showErrorMessage(t('messages.errors.invalidTimeSyntax'));
      case ResponseStatus.InProgressBidExist:
        return showErrorMessage(t('messages.errors.inProgressBidExist'));
      case ResponseStatus.NotAllowed:
        return showErrorMessage(t('messages.errors.notAllowed'));
      case ResponseStatus.NotEnoughData:
        return showErrorMessage(t('messages.errors.notEnoughData'));
      case ResponseStatus.NotFound:
        return showErrorMessage(t('messages.errors.notFound'));
      case ResponseStatus.PostNotFound:
        return showErrorMessage(t('messages.errors.postNotFound'));
      case ResponseStatus.SameId:
        return showErrorMessage(t('messages.errors.sameId'));
      case ResponseStatus.SelfBidNotAllowed:
        return showErrorMessage(t('messages.errors.selfBidNotAllowed'));
      case ResponseStatus.SelfMessageNotAllowed:
        return showErrorMessage(t('messages.errors.selfMessageNotAllowed'));
      case ResponseStatus.TimeConflict:
        return showErrorMessage(t('messages.errors.timeConflict'));
      case ResponseStatus.UnknownError:
        return showErrorMessage(t('messages.errors.unknownError'));
      case ResponseStatus.UsernameAlreadyExist:
        return showErrorMessage(t('messages.errors.usernameAlreadyExist'));
      case ResponseStatus.InValidAmountForStripePayment:
        return showErrorMessage(
          t('messages.errors.InValidAmountForStripePayment'),
        );
      default:
        return showErrorMessage(t('messages.errors.unknownError'));
    }
  };

  return {getFireBaseErrorMessage, getResponseMessage, showResponseMessage};
};

export function convertTextToTitleCase(text: string) {
  let camelCaseText = '';
  if (text && text?.length > 0) {
    camelCaseText = text
      .split(' ')
      .map(function (word) {
        // First character upper case else lower case
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
    return camelCaseText;
  } else {
    return camelCaseText;
  }
}

export function getAvailabilityTitle(value: Availability) {
  if (value) {
    switch (value) {
      case Availability.Flexible:
        return 'Flexible';
      case Availability.SpecificTime:
        return 'Specific time';
      case Availability.SomeFlexibility:
        return 'Some flexibility';
      default:
        return undefined;
    }
  } else {
    return undefined;
  }
}

export function getMiles(meters: any) {
  const tempMeters = meters * 0.000621371192;
  return tempMeters?.toFixed(2);
}

export function getTodayTimeFromNow(date: any) {
  const now = dayjs();
  const createdAtDate = dayjs(date);

  if (createdAtDate.isSame(now, 'day')) {
    return createdAtDate.fromNow();
  } else {
    return createdAtDate.format('HH:mm');
  }
}

export function getDateFromNow(dateString: any) {
  const currentDate = dayjs();
  const messageDate = dayjs(dateString);

  const diffInDays = messageDate.diff(currentDate, 'day');

  if (diffInDays < 1) {
    return messageDate.format('M/D/YYYY');
  } else {
    return messageDate.format('hh:mm A');
  }
}

export function isEmail(input: string) {
  // Regular expression pattern for matching email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the input matches the email pattern
  return emailPattern.test(input);
}

export const returnKeyType =
  Platform.OS === 'android' &&
  Platform.Version === 33 &&
  Platform.constants.Manufacturer === 'samsung'
    ? 'none'
    : 'default';

export const autoCorrect =
  Platform.OS === 'android' &&
  Platform.Version === 33 &&
  Platform.constants.Manufacturer === 'samsung'
    ? undefined
    : true;

export const spellCheck =
  Platform.OS === 'android' &&
  Platform.Version === 33 &&
  Platform.constants.Manufacturer === 'samsung'
    ? undefined
    : true;

export const keyboardType =
  Platform.OS === 'android' &&
  Platform.Version === 33 &&
  Platform.constants.Manufacturer === 'samsung'
    ? 'visible-password'
    : 'default';

export const getProjectColor = (time: string | undefined) => {
  const date1 = dayjs(time);
  const current = dayjs();

  // const days = dayjs.duration(projectDeadLine).days();
  const days = date1.diff(current, 'day');

  const color =
    days >= 1
      ? {
          backgroundColor: Colors.BLACK,
          color: Colors.GREY,
        }
      : {
          backgroundColor: Colors.TIME_LEFT_RED_BACKGROUND,
          color: Colors.TIME_LEFT_RED,
        };

  return color;
};

export function pluralize(num: number, unit: string) {
  return `${num} ${unit}${num !== 1 ? 's' : ''}`;
}

export function appFormatDate(date: any) {
  return dayjs(date).format('M/D/YYYY');
}

export function hexToRGB(hex: string, alpha = 0.7) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function generateColor() {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
}

export const isValidEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export function isIllegal(text: string) {
  const phoneNumberRegex =
    /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?.*$/;
  // const blackList = [
  // 'Facebook',
  // 'Mail',
  // 'Email',
  // 'Call',
  // 'Twitter',
  // 'Telegram',
  // 'Twitter',
  // 'Whatsapp',
  // 'Contact',
  // 'phone number',
  // 'Phone number',
  // 'Phone Number',
  // 'Numbers',
  // 'messenger',
  // 'message',
  // 'sms',
  // 'contact',
  // 'phone',
  // 'telephone',
  // 'T.me',
  // '://',
  // 'Text',
  // '@',
  // ];
  const blackList = tempStore.getState().flagTexts?.map(itm => itm?.text);

  // Check if the text includes any blacklisted terms.
  const isInBlackList = blackList.some(item =>
    text.toLowerCase().includes(item.toLowerCase()),
  );

  // Check if the text is a valid email address.
  const isMail = isValidEmail(text);

  // Check if the text is a valid phone number.
  const isPhoneNumber = phoneNumberRegex.test(text);

  // Return true if the text is in the blacklist, is an email address, or is a phone number.
  return isInBlackList || isMail || isPhoneNumber;
}

export const pathParser = (file: any) => {
  return isIos ? file?.path?.replace('file://', '/') : file?.path;
};

export const generateUuid = () => {
  return uuidv4().replace(/-/g, '');
};

export function urlToBlob(url: string) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob'; // convert type
    xhr.send();
  });
}

export function setDayjsLocale(language: languageType) {
  switch (language) {
    case 'en':
      dayjs.locale(englishLocale);
      break;
    case 'sp':
      dayjs.locale(spanishLocale);
      break;
    // Add more cases for other languages if needed
    default:
      dayjs.locale(englishLocale); // Default to English
  }
}

export function getCityCoordinates(cityName: string) {
  // Iterate through all states in the cities object
  for (const state in cities) {
    const city = cities[state][cityName];
    if (city) {
      const {latitude, longitude} = city;
      return {latitude, longitude};
    }
  }
  return null; // Return null if city not found
}

export const getTazWorkRate = (data: any) => {
  let productType = 'NONE';

  if (data?.hasBackgroundCheck) {
    if (data?.gold === 'APPROVED') {
      productType = 'GOLD';
    } else if (data?.bronze === 'APPROVED') {
      productType = 'BRONZE';
    } else if (data?.silver === 'APPROVED') {
      productType = 'SILVER';
    }
  }

  return {productType, hasTazWorkRate: productType !== 'NONE'};
};
