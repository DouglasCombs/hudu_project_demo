import {ReactNode, RefObject} from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {FlatList} from 'react-native';
import Animated from 'react-native-reanimated';
import {ProjectFilter} from '~/generated/graphql';

declare global {
  type ReactChildren = {
    children?: ReactNode;
  };

  type NavigationProp = NativeStackHeaderProps;

  type AuthStoreType = {
    token: any;
    isUserLoggedIn: boolean;
    isLoadingLogin: boolean;
    setIsLoadingLogin: (isLoadingLogin: boolean) => void;
    setIsUserLoggedIn: (isUserLoggedIn: boolean) => void;
    setToken: (token: any) => void;
  };

  type userDataStoreType = {
    userData: any;
    isOnboardingViewed: boolean;
    lastConversationId: number | undefined;
    isOnboardingCreateProject: boolean;
    isOnboardingPinnedCategories: boolean;
    outOfRangeViewed: boolean;
    groupConversationId?: number;
    setUserData: (userData: any) => void;
    setIsOnboardingViewed: (isOnboardingViewed: boolean) => void;
    setLastConversationId: (lastConversationId: number | undefined) => void;
    setIsOnboardingCreateProject: (isOnboardingCreateProject: boolean) => void;
    setIsOnboardingPinnedCategories: (
      isOnboardingPinnedCategories: boolean,
    ) => void;
    setOutOfRangeViewed: (outOfRangeViewed: boolean) => void;
    setGroupConversationId: (groupConversationId: number | undefined) => void;
  };

  type listerStoreType = {
    skipList: any;
    setSkipList: (skipList: any) => void;
  };

  type projectStore = {
    projectData: any;
    setProjectData: (projectData: any) => void;
  };

  type StorageKeys =
    | 'isUserLoggedIn'
    | 'id_token'
    | 'userData'
    | 'isOnboardingViewed'
    | 'FCM_TOKEN'
    | 'currentLanguage'
    | 'API_URL';

  type languageType = 'en' | 'sp';

  type languageTitleType = 'english' | 'spanish';

  type languageStoreType = {
    currentLanguage: languageType | undefined;
    isRTL: boolean;
    languageTitle: languageTitleType | undefined;
    setCurrentLanguage: (currentLanguage: languageType) => void;
    setIsRTL: (isRTL: boolean) => void;
    setLanguageTitle: (languageTitle: languageTitleType) => void;
  };

  type FirebaseToken = {
    aud: string;
    exp: number;
    iat: number;
    iss: string;
    sub: string;
    email: string;
    user_id: string;
    auth_time: number;
    email_verified: boolean;
    firebase: {
      identities: {email?: Array<string>};
      sign_in_provider: 'password' | string;
    };
  };

  type ScrollPair = {
    list: RefObject<FlatList>;
    position: Animated.SharedValue<number>;
  };

  type HeaderConfig = {
    heightExpanded: number;
    heightCollapsed: number;
  };

  type stateType = {
    title: string;
    value: string;
    Latitude: number;
    Longitude: number;
    enabled?: boolean;
  };

  type CityList = {
    [state: string]: string[];
  };

  type stateTempDataType = {
    state?: stateType;
    defaultState?: stateType;
    city?: string[];
    location?: {
      lat?: any;
      long?: any;
    };
  };

  type tempStoreType = {
    apiUrl: string;
    referralCode: string;
    flagTexts: any;
  };

  type stateStoreType = {
    stateTempData: stateTempDataType;
  };

  type filterTempDataType = {
    category?: any;
    status?: any;
    time?: any;
    sort?: sortType;
  };

  type filterStoreType = {
    filterTempData: filterTempDataType;
    setFilterTempData: (filterTempData: filterTempDataType) => void;
    resetFilterTempData: () => void;
  };

  type sortType = {
    id: number;
    title: string;
    value: ProjectFilter;
  };

  type messagesStoreType = {
    user?: any;
    setUser: (user?: any) => void;
    resetMessageStore: () => void;
  };

  type academyLangType = {
    indexLang: number;
    setIndexLang: (indexLang?: number) => void;
  };

  type locationModalType = {
    isVisibleLocationModal: boolean;
    setIsVisibleLocationModal: (isVisibleLocationModal?: boolean) => void;
  };

  type projectEditTypeStore = {
    isEdit?: boolean;
    setIsEdit: (isEdit?: boolean) => void;
    projectId?: number;
    setProjectId: (projectId?: number) => void;
  };

  type bidStoreDataType = {
    questions?: any;
    description?: any;
    bidAmount?: any;
    bids?: any;
    projectData?: any;
    flow?: 'placeBid' | 'editBid';
    projectId?: number;
    currentBid?: any;
  };

  type bidStoreType = {
    bidTempData?: bidStoreDataType;
    setBidTempData: (bidTempData?: bidStoreDataType) => void;
    resetBidStore: () => void;
  };

  type PermissionStatus =
    | 'unavailable'
    | 'denied'
    | 'limited'
    | 'granted'
    | 'blocked';

  type IpType = {
    ip: string;
    loc: string;
    org: string;
    city: string;
    postal: string;
    readme: string;
    region: string;
    country: string;
    hostname: string;
    timezone: string;
  };

  type ConfirmationModal = {
    open: () => void;
    close: () => void;
  };

  type ModalRef = RefObject<ConfirmationModal>;

  type NotificationSettingsType = {
    projects?: boolean;
    bids?: boolean;
    messages?: boolean;
    questions?: boolean;
  };
}
