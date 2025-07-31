import {CommonActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {PushController, VersionCheckSection} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {
  AddNewAddressScreen,
  BackgroundCheckDetailsScreen,
  BadgeCollectionDetailsScreen,
  BadgeCollectionsScreen,
  BidsByStatusScreen,
  ChatScreen,
  CompleteCoursesScreen,
  CourseDetailsScreen,
  CourseDetailsSlidesScreen,
  CoursesScreen,
  CreateProjectStep1,
  CreateProjectStep2,
  CreateProjectStep3,
  CreateProjectStep4,
  CreateProjectStep5,
  CreateProjectStep6,
  DocumentsScreen,
  EditLanguageScreen,
  EditProfileScreen,
  EmailSentScreen,
  FilterScreen,
  FinalExamScreen,
  GroupsChatScreen,
  HudurProfileScreen,
  LeaderBoardGuidLinesScreen,
  LeaderBoardScreen,
  ListerProfileScreen,
  ManageBidsScreen,
  NotificationScreen,
  NotificationSettingsScreen,
  OnboardingCreateProjectScreen,
  PaymentScreen,
  PlaceBidFinalStepScreen,
  PlaceBidScreen,
  PlaceBidStepThreeScreen,
  PlaceBidStepTwoScreen,
  ProfileScreen,
  ProjectCancelationScreen,
  ProjectDetailsScreen,
  ProjectPreviewScreen,
  ProjectsByStatusScreen,
  ProjectsOnMapScreen,
  RateAndReviewScreen,
  RateUsScreen,
  ReferralCodeScreen,
  SavedProjectsScreen,
  SelectCategoryScreen,
  SelectCityScreen,
  SelectLocationScreen,
  SelectStateScreen,
  SelectStatusScreen,
  SelectSubCategoryScreen,
  SelectTimeFilterScreen,
  SettingsScreen,
  UserAddressesScreen,
  UserPaymentsScreen,
  UserReviewScreen,
  VerificationCodeScreen,
  VerifyPhoneNumberScreen,
  WithDrawDoerScreen,
  WithDrawScreen,
} from '~/screens';
import {authStore} from '~/stores';
import {isProduction} from '~/utils/helper';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import MessagesStack from './MessagesStack';
import PostStack from './PostStack';
import ProfileStack from './ProfileStack';

const Stack = createNativeStackNavigator();

export type AuthStackScreensParams =
  | 'Login'
  | 'SignUp'
  | 'ForgotPassword'
  | 'Auth'
  | 'CompleteProfileStepOne'
  | 'CompleteProfileStepTwo'
  | 'CompleteProfileStepThree';

export type ProfileTabScreensParams =
  | 'Profile'
  | 'EditProfile'
  | 'Reviews'
  | 'Support';

export type MainTabScreensParams =
  | 'HomeTab'
  | 'ProfileTab'
  | 'CreateProjectTab'
  | 'AcademyTab'
  | 'ProjectsTab';

export type MainStackParamList = {
  MainTabs: {
    screen?: MainTabScreensParams;
  };
  AuthStack: {
    screen?: AuthStackScreensParams;
    parent: 'appNavigator' | 'mainStack' | 'mainTabs';
  };
  ProfileTab: {screen?: ProfileTabScreensParams};
  Notification: undefined;
  ListerProfile: {userId?: number};
  HudurProfile: {userId?: number; isLister: boolean};
  Payment: {
    bid?: object | undefined;
    projectId?: number | undefined;
    type?: 'bid' | 'project';
  };
  CreateProjectScreen: undefined;
  onBoardCreateProject: undefined;
  AddNewAddress: undefined;
  ProjectPreview: undefined;
  SelectState?: {Value?: any; onChange?: any};
  SelectCity?: {state: object};
  Filter?: undefined;
  SelectCategory?: {category: any};
  SelectSubCategory?: undefined;
  SelectStatus?: undefined;
  SelectTimeFilter?: undefined;
  ProjectsOnMap?: undefined;
  SavedProjects?: undefined;
  ProjectDetails: {projectId: number; isDeepLinking?: boolean};
  LeaderBoard: undefined;
  LeaderBoardGuidLines: undefined;
  MessageStack: undefined;
  PlaceBid: {projectId: number; bidId?: number};
  PlaceBidStepTwo: undefined;
  PlaceBidStepThree: undefined;
  PlaceBidFinalStep: undefined;
  CreateProjectStep1: undefined;
  CreateProjectStep2: undefined;
  CreateProjectStep3: undefined;
  CreateProjectStep4: undefined;
  CreateProjectStep5: undefined;
  CreateProjectStep6: undefined;
  ProjectsByStatus: {projectStatus: ProjectStatus; searchable: boolean};
  CompleteCourses: undefined;
  BidsByStatus: {
    projectStatus: ProjectStatus;
    searchable: boolean;
    isArchive?: boolean;
  };
  Settings: undefined;
  ReferralCode: undefined;
  ManageBids: {projectId: number};
  EditLanguage: undefined;
  UserAddresses: undefined;
  RateAndReview: {projectId: number; asLister: boolean; bidId: number};
  ProjectCancelation: {projectId: number; isLister?: boolean; bidId?: number};
  UserReview: undefined;
  Chat: undefined;
  Courses: {courseStatus: string};
  CourseDetails: {courseId: number};
  CourseDetailsSlides: {courseId: number};
  FinalExamScreen: {courseId: number};
  NotificationSettings: undefined;
  UserPayments: {initialRoute?: number};
  Documents: undefined;
  VerifyPhoneNumber: undefined;
  VerificationCode: {phoneNumber: any};
  BadgeCollections: undefined;
  BadgeCollectionDetails: undefined;
  GroupsChat: undefined;
  RateUs: undefined;
  BackgroundCheckDetails: undefined;
  EmailSent: undefined;
  WithDraw: undefined;
  WithDrawDoer: undefined;
};

const publicScreenOption = {
  headerShown: false,
  ...CommonActions,
};

const screens = [
  {
    name: 'MainTabs',
    component: MainTabs,
  },
  {
    name: 'ProjectPreview',
    component: ProjectPreviewScreen,
  },
  {
    name: 'AuthStack',
    component: AuthStack,
    initialParams: {parent: 'mainStack'},
  },
  {
    name: 'ProfileStack',
    component: ProfileStack,
  },
  {
    name: 'Notification',
    component: NotificationScreen,
  },
  {
    name: 'ListerProfile',
    component: ListerProfileScreen,
  },
  {
    name: 'Payment',
    component: PaymentScreen,
    initialParams: {type: 'bid', bid: undefined, projectId: undefined},
  },
  {
    name: 'UserReview',
    component: UserReviewScreen,
  },
  {
    name: 'onBoardCreateProject',
    component: OnboardingCreateProjectScreen,
  },
  {
    name: 'createProjectStep1',
    component: CreateProjectStep1,
  },
  {
    name: 'createProjectStep2',
    component: CreateProjectStep2,
  },
  {
    name: 'createProjectStep3',
    component: CreateProjectStep3,
  },
  {
    name: 'createProjectStep4',
    component: CreateProjectStep4,
  },
  {
    name: 'createProjectStep5',
    component: CreateProjectStep5,
  },

  {
    name: 'createProjectStep6',
    component: CreateProjectStep6,
  },
  {
    name: 'AddNewAddress',
    component: AddNewAddressScreen,
  },
  {
    name: 'SelectLocation',
    component: SelectLocationScreen,
  },
  {
    name: 'PostStack',
    component: PostStack,
  },
  {
    name: 'SelectState',
    component: SelectStateScreen,
  },
  {
    name: 'SelectCity',
    component: SelectCityScreen,
  },
  {
    name: 'Filter',
    component: FilterScreen,
  },
  {
    name: 'SelectCategory',
    component: SelectCategoryScreen,
  },
  {
    name: 'SelectSubCategory',
    component: SelectSubCategoryScreen,
  },
  {
    name: 'SelectStatus',
    component: SelectStatusScreen,
  },
  {
    name: 'SelectTimeFilter',
    component: SelectTimeFilterScreen,
  },
  {
    name: 'ProjectsOnMap',
    component: ProjectsOnMapScreen,
  },
  {
    name: 'SavedProjects',
    component: SavedProjectsScreen,
  },
  {
    name: 'ProjectDetails',
    component: ProjectDetailsScreen,
    initialParams: {isDeepLinking: true},
  },
  {
    name: 'LeaderBoard',
    component: LeaderBoardScreen,
  },
  {
    name: 'LeaderBoardGuidLines',
    component: LeaderBoardGuidLinesScreen,
  },
  {
    name: 'MessageStack',
    component: MessagesStack,
  },
  {
    name: 'Profile',
    component: ProfileScreen,
  },
  {
    name: 'EditLanguage',
    component: EditLanguageScreen,
  },
  {
    name: 'UserAddresses',
    component: UserAddressesScreen,
  },
  {
    name: 'HudurProfile',
    component: HudurProfileScreen,
  },
  {
    name: 'PlaceBid',
    component: PlaceBidScreen,
    initialParams: {bidId: undefined},
  },
  {
    name: 'PlaceBidStepTwo',
    component: PlaceBidStepTwoScreen,
  },
  {
    name: 'PlaceBidStepThree',
    component: PlaceBidStepThreeScreen,
  },
  {
    name: 'PlaceBidFinalStep',
    component: PlaceBidFinalStepScreen,
  },
  {
    name: 'ProjectsByStatus',
    component: ProjectsByStatusScreen,
    initialParams: {projectStatus: undefined, searchable: false},
  },
  {
    name: 'EditProfile',
    component: EditProfileScreen,
  },
  {
    name: 'ReferralCode',
    component: ReferralCodeScreen,
  },
  {
    name: 'BidsByStatus',
    component: BidsByStatusScreen,
    initialParams: {bidStatus: undefined, searchable: false, isArchive: false},
  },
  {
    name: 'Settings',
    component: SettingsScreen,
  },
  {
    name: 'ManageBids',
    component: ManageBidsScreen,
    initialParams: {projectId: undefined},
  },
  {
    name: 'RateAndReview',
    component: RateAndReviewScreen,
    initialParams: {projectId: undefined, asLister: true},
  },
  {
    name: 'ProjectCancelation',
    component: ProjectCancelationScreen,
    initialParams: {isLister: true, bidId: undefined, projectStatus: undefined},
  },
  {
    name: 'Courses',
    component: CoursesScreen,
  },
  {
    name: 'CourseDetails',
    component: CourseDetailsScreen,
  },
  {
    name: 'CourseDetailsSlides',
    component: CourseDetailsSlidesScreen,
  },
  {
    name: 'FinalExam',
    component: FinalExamScreen,
  },
  {
    name: 'CompleteCourses',
    component: CompleteCoursesScreen,
  },
  {
    name: 'Chat',
    component: ChatScreen,
    initialParams: {
      conversationId: null,
      user: undefined,
      projectId: undefined,
    },
  },
  {
    name: 'NotificationSettings',
    component: NotificationSettingsScreen,
  },
  {
    name: 'UserPayments',
    component: UserPaymentsScreen,
    initialParams: {initialRoute: 0},
  },
  {
    name: 'Documents',
    component: DocumentsScreen,
  },
  {
    name: 'VerifyPhoneNumber',
    component: VerifyPhoneNumberScreen,
  },
  {
    name: 'VerificationCode',
    component: VerificationCodeScreen,
  },
  {
    name: 'BadgeCollections',
    component: BadgeCollectionsScreen,
  },
  {
    name: 'BadgeCollectionDetails',
    component: BadgeCollectionDetailsScreen,
  },
  {
    name: 'GroupsChat',
    component: GroupsChatScreen,
  },
  {
    name: 'RateUs',
    component: RateUsScreen,
  },
  {
    name: 'BackgroundCheckDetails',
    component: BackgroundCheckDetailsScreen,
  },
  {
    name: 'EmailSent',
    component: EmailSentScreen,
  },
  {
    name: 'WithDraw',
    component: WithDrawScreen,
  },
  {
    name: 'WithDrawDoer',
    component: WithDrawDoerScreen,
  },
];

export default function MainStack() {
  const {isUserLoggedIn} = authStore(state => state);
  return (
    <>
      <Stack.Navigator screenOptions={publicScreenOption}>
        {screens.map(screen => (
          //@ts-ignore
          <Stack.Screen key={screen.name} {...screen} />
        ))}
      </Stack.Navigator>
      {isUserLoggedIn && <PushController />}
      {isProduction && <VersionCheckSection />}
    </>
  );
}
