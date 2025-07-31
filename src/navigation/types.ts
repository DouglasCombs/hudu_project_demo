import {AppNavigatorParamList} from './AppNavigator';
import {DrawerStackParamList} from './DrawerStack';
import {HomeStackParamList} from './HomeStack';
import {FavoriteStackParamList} from './FavoriteStack';
import {PostStackParamList} from './PostStack';
import {ProjectStackParamList} from './ProjectsStack';
import {MainStackParamList} from './MainStack';
import {ProfileStackParamList} from './ProfileStack';
import {MainTabParamList} from './MainTabs';
import {AcademyStackParamList} from './AcademyStack';
import {SearchStackParamList} from './SearchStack';
import {AuthStackParamList} from './AuthStack';
import {MessagesStackParamList} from './MessagesStack';

export type RootStackParamList = AppNavigatorParamList &
  DrawerStackParamList &
  MainStackParamList &
  MainTabParamList &
  AuthStackParamList &
  HomeStackParamList &
  FavoriteStackParamList &
  PostStackParamList &
  ProjectStackParamList &
  AcademyStackParamList &
  SearchStackParamList &
  ProfileStackParamList &
  MessagesStackParamList;

declare global {
  // Specifying this type is important if you heavily use useNavigation, Link etc. in your app since it'll ensure type-safety.
  // READ MORE: https://reactnavigation.org/docs/typescript/#specifying-default-types-for-usenavigation-link-ref-etc

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface RootParamList extends RootStackParamList {}
  }
}
