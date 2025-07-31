export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A coordinate is an array of positions. */
  Coordinates: any;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
  /** The built-in `Decimal` scalar type. */
  Decimal: any;
  Geometry: any;
  /** The `Long` scalar type represents non-fractional signed whole 64-bit numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any;
  /** A position is an array of numbers. There MUST be two or more elements. The first two elements are longitude and latitude, or easting and northing, precisely in that order and using decimal numbers. Altitude or elevation MAY be included as an optional third element. */
  Position: any;
};

export type AcceptBid = {
  __typename?: 'AcceptBid';
  clientSecret?: Maybe<Scalars['String']>;
  newBidAmount: Scalars['Float'];
  payType: PayType;
  reduceFromWallet?: Maybe<Scalars['Decimal']>;
  stripeAmount: Scalars['Float'];
  walletAmountIsEqualToBidAmount: Scalars['Boolean'];
};

export type AchievementDto = {
  __typename?: 'AchievementDto';
  coursesCount: Scalars['Int'];
  earnings: Scalars['Float'];
  projectCount: Scalars['Int'];
};

export type ActivationNotificationInput = {
  bidNotification: Scalars['Boolean'];
  chatNotification: Scalars['Boolean'];
  projectNotification: Scalars['Boolean'];
  questionNotification: Scalars['Boolean'];
};

export type ActiveUsers = {
  __typename?: 'ActiveUsers';
  activeUserCount: Scalars['Int'];
  activeUsersId?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
};

export type ActiveUsersCollectionSegment = {
  __typename?: 'ActiveUsersCollectionSegment';
  items?: Maybe<Array<Maybe<ActiveUsers>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ActiveUsersFilterInput = {
  activeUserCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  activeUsersId?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<ActiveUsersFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ActiveUsersFilterInput>>;
};

export type ActiveUsersSortInput = {
  activeUserCount?: InputMaybe<SortEnumType>;
  activeUsersId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
};

export type AddEnthusiasticCistyStateInput = {
  city?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
};

export type AddProjectInput = {
  addressTitle: Scalars['String'];
  availability: Availability;
  backgroundCheckTypeForDoer: BackgroundCheckTypeForDoer;
  categoryId?: InputMaybe<Scalars['Int']>;
  city: Scalars['String'];
  cover: Scalars['String'];
  description: Scalars['String'];
  duration?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  point: Scalars['Position'];
  projectDeadLine?: InputMaybe<Scalars['DateTime']>;
  projectImages?: InputMaybe<Array<InputMaybe<ProjectImagesInput>>>;
  projectQuestions?: InputMaybe<Array<InputMaybe<ProjectQuestionInput>>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  state: Scalars['String'];
  streetAddress: Scalars['String'];
  title: Scalars['String'];
  zipCode: Scalars['String'];
};

export type AdminDashboardDto = {
  __typename?: 'AdminDashboardDto';
  activeBidsCount?: Maybe<Scalars['Int']>;
  activeBidsRatePercent?: Maybe<Scalars['Float']>;
  activeProjectsCount?: Maybe<Scalars['Int']>;
  activeProjectsRatePercent?: Maybe<Scalars['Float']>;
  activeUserRatePercent?: Maybe<Scalars['Float']>;
  activeUsers?: Maybe<Array<Maybe<ActiveUsers>>>;
  activeUsersCount?: Maybe<Scalars['Int']>;
  awarderProjectsCount?: Maybe<Scalars['Int']>;
  awarderProjectsRatePercent?: Maybe<Scalars['Float']>;
  balance?: Maybe<Scalars['Float']>;
};

export type AdminInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type AppRate = {
  __typename?: 'AppRate';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  rate: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type AppRateCollectionSegment = {
  __typename?: 'AppRateCollectionSegment';
  items?: Maybe<Array<Maybe<AppRate>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type AppRateFilterInput = {
  and?: InputMaybe<Array<AppRateFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<AppRateFilterInput>>;
  rate?: InputMaybe<ComparableInt32OperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type AppRateInput = {
  rate: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type AppRateSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  rate?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type AppSettings = {
  __typename?: 'AppSettings';
  emailFrom?: Maybe<Scalars['String']>;
  refreshTokenTTL: Scalars['Int'];
  secret?: Maybe<Scalars['String']>;
  smtpHost?: Maybe<Scalars['String']>;
  smtpPass?: Maybe<Scalars['String']>;
  smtpPort: Scalars['Int'];
  smtpUser?: Maybe<Scalars['String']>;
};

export type AppSettingsDto = {
  __typename?: 'AppSettingsDto';
  hudurApplicationFee?: Maybe<Scalars['String']>;
  isFirstAcceptingProject: Scalars['Boolean'];
  listerApplicationFee?: Maybe<Scalars['String']>;
  publishableKey?: Maybe<Scalars['String']>;
  referalDiscountPercent: Scalars['Float'];
};

export type ApplicantDto = {
  __typename?: 'ApplicantDto';
  applicantGuid?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
}

export enum Availability {
  FlexibleDate = 'FLEXIBLE_DATE',
  SelectableDaterange = 'SELECTABLE_DATERANGE',
  SpecificDate = 'SPECIFIC_DATE',
}

export type AvailabilityOperationFilterInput = {
  eq?: InputMaybe<Availability>;
  in?: InputMaybe<Array<Availability>>;
  neq?: InputMaybe<Availability>;
  nin?: InputMaybe<Array<Availability>>;
};

export enum BackgroundCheckStatus {
  Bronze = 'BRONZE',
  Gold = 'GOLD',
  NotChecked = 'NOT_CHECKED',
  Silver = 'SILVER',
}

export type BackgroundCheckStatusOperationFilterInput = {
  eq?: InputMaybe<BackgroundCheckStatus>;
  in?: InputMaybe<Array<BackgroundCheckStatus>>;
  neq?: InputMaybe<BackgroundCheckStatus>;
  nin?: InputMaybe<Array<BackgroundCheckStatus>>;
};

export enum BackgroundCheckTypeForDoer {
  Mandatory = 'MANDATORY',
  Optional = 'OPTIONAL',
}

export type Badge = {
  __typename?: 'Badge';
  badgeLevel: BadgeLevel;
  badgeType: BadgeType;
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type BadgeCollectionSegment = {
  __typename?: 'BadgeCollectionSegment';
  items?: Maybe<Array<Maybe<Badge>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type BadgeDto = {
  __typename?: 'BadgeDto';
  academicLevel1: Scalars['Int'];
  academicLevel2: Scalars['Int'];
  academicLevel3: Scalars['Int'];
  allStarHuduerLevel1: Scalars['Int'];
  allStarHuduerLevel2: Scalars['Int'];
  allStarHuduerLevel3: Scalars['Int'];
  allStarListerLevel1: Scalars['Int'];
  allStarListerLevel2: Scalars['Int'];
  allStarListerLevel3: Scalars['Int'];
  chaChingLevel1: Scalars['Int'];
  chaChingLevel2: Scalars['Int'];
  chaChingLevel3: Scalars['Int'];
  changingTheWorldLevel1: Scalars['Int'];
  changingTheWorldLevel2: Scalars['Int'];
  changingTheWorldLevel3: Scalars['Int'];
  dailyLoginStreakLevel1: Scalars['Int'];
  dailyLoginStreakLevel2: Scalars['Int'];
  dailyLoginStreakLevel3: Scalars['Int'];
  echoLevel1: Scalars['Int'];
  echoLevel2: Scalars['Int'];
  echoLevel3: Scalars['Int'];
  fromToDoToDoneDoerLevel1: Scalars['Int'];
  fromToDoToDoneDoerLevel2: Scalars['Int'];
  fromToDoToDoneDoerLevel3: Scalars['Int'];
  fromToDoToDoneListerLevel1: Scalars['Int'];
  fromToDoToDoneListerLevel2: Scalars['Int'];
  fromToDoToDoneListerLevel3: Scalars['Int'];
  instantExecutionLevel1: Scalars['Int'];
  instantExecutionLevel2: Scalars['Int'];
  instantExecutionLevel3: Scalars['Int'];
  jackOfAllTradesLevel1: Scalars['Int'];
  jackOfAllTradesLevel2: Scalars['Int'];
  jackOfAllTradesLevel3: Scalars['Int'];
  legionLevel1: Scalars['Int'];
  legionLevel2: Scalars['Int'];
  legionLevel3: Scalars['Int'];
  theHatTrickLevel1: Scalars['Int'];
  theHatTrickLevel2: Scalars['Int'];
  theHatTrickLevel3: Scalars['Int'];
  theSocialiteLevel1: Scalars['Int'];
  theSocialiteLevel2: Scalars['Int'];
  theSocialiteLevel3: Scalars['Int'];
};

export type BadgeFilterInput = {
  and?: InputMaybe<Array<BadgeFilterInput>>;
  badgeLevel?: InputMaybe<BadgeLevelOperationFilterInput>;
  badgeType?: InputMaybe<BadgeTypeOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<BadgeFilterInput>>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export enum BadgeLevel {
  Level1 = 'LEVEL1',
  Level2 = 'LEVEL2',
  Level3 = 'LEVEL3',
}

export type BadgeLevelOperationFilterInput = {
  eq?: InputMaybe<BadgeLevel>;
  in?: InputMaybe<Array<BadgeLevel>>;
  neq?: InputMaybe<BadgeLevel>;
  nin?: InputMaybe<Array<BadgeLevel>>;
};

export type BadgeSortInput = {
  badgeLevel?: InputMaybe<SortEnumType>;
  badgeType?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum BadgeType {
  Academic = 'ACADEMIC',
  AllStarHuduer = 'ALL_STAR_HUDUER',
  AllStarLister = 'ALL_STAR_LISTER',
  ChangingTheWorld = 'CHANGING_THE_WORLD',
  ChaChing = 'CHA_CHING',
  DailyLoginStreak = 'DAILY_LOGIN_STREAK',
  Echo = 'ECHO',
  FromToDoToDoneDoer = 'FROM_TO_DO_TO_DONE_DOER',
  FromToDoToDoneLister = 'FROM_TO_DO_TO_DONE_LISTER',
  InstantExecution = 'INSTANT_EXECUTION',
  JackOfAllTrades = 'JACK_OF_ALL_TRADES',
  Legion = 'LEGION',
  NeedsAName = 'NEEDS_A_NAME',
  NeighborlyDoer = 'NEIGHBORLY_DOER',
  NeighborlyLister = 'NEIGHBORLY_LISTER',
  SalaryMatch = 'SALARY_MATCH',
  ShootForTheStars = 'SHOOT_FOR_THE_STARS',
  TheCityTour = 'THE_CITY_TOUR',
  TheHatTrick = 'THE_HAT_TRICK',
  TheSocialite = 'THE_SOCIALITE',
}

export type BadgeTypeOperationFilterInput = {
  eq?: InputMaybe<BadgeType>;
  in?: InputMaybe<Array<BadgeType>>;
  neq?: InputMaybe<BadgeType>;
  nin?: InputMaybe<Array<BadgeType>>;
};

export type Bid = {
  __typename?: 'Bid';
  affectedToHighestProjectCompletionRate?: Maybe<Scalars['Boolean']>;
  amount: Scalars['Float'];
  awardDate?: Maybe<Scalars['DateTime']>;
  bidAnswerToQuestions?: Maybe<Array<Maybe<BidAnswerToQuestion>>>;
  bidStatus: BidStatus;
  cancelBidType?: Maybe<CancelBidType>;
  cancellRequestStatus?: Maybe<CancellRequestStatus>;
  cancellationReason?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  hasPayment: Scalars['Boolean'];
  hudu?: Maybe<Users>;
  huduDeleteAccountDate: Scalars['DateTime'];
  huduFinishedProjectDate?: Maybe<Scalars['DateTime']>;
  huduId: Scalars['Int'];
  huduerWorkedHours?: Maybe<Scalars['Float']>;
  hudusComment?: Maybe<Scalars['String']>;
  hudusRate?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isHuduCommented: Scalars['Boolean'];
  isHuduDeletedAccount: Scalars['Boolean'];
  isListerCommented: Scalars['Boolean'];
  isListerDeletedAccount: Scalars['Boolean'];
  latestCancellRequestConfirmationDate?: Maybe<Scalars['DateTime']>;
  latestCancellRequestDate?: Maybe<Scalars['DateTime']>;
  lister?: Maybe<Users>;
  listerDeleteAccountDate: Scalars['DateTime'];
  listerId: Scalars['Int'];
  listersComment?: Maybe<Scalars['String']>;
  listersRate?: Maybe<Scalars['String']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
};

export type BidAnswerToQuestion = {
  __typename?: 'BidAnswerToQuestion';
  answer?: Maybe<Scalars['String']>;
  bid?: Maybe<Bid>;
  bidId: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  question?: Maybe<Scalars['String']>;
};

export type BidAnswerToQuestionFilterInput = {
  and?: InputMaybe<Array<BidAnswerToQuestionFilterInput>>;
  answer?: InputMaybe<StringOperationFilterInput>;
  bid?: InputMaybe<BidFilterInput>;
  bidId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<BidAnswerToQuestionFilterInput>>;
  question?: InputMaybe<StringOperationFilterInput>;
};

export type BidAnswerToQuestionInput = {
  answer?: InputMaybe<Scalars['String']>;
  question?: InputMaybe<Scalars['String']>;
};

export type BidCollectionSegment = {
  __typename?: 'BidCollectionSegment';
  items?: Maybe<Array<Maybe<Bid>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type BidFilterInput = {
  affectedToHighestProjectCompletionRate?: InputMaybe<BooleanOperationFilterInput>;
  amount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  and?: InputMaybe<Array<BidFilterInput>>;
  awardDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  bidAnswerToQuestions?: InputMaybe<ListFilterInputTypeOfBidAnswerToQuestionFilterInput>;
  bidStatus?: InputMaybe<BidStatusOperationFilterInput>;
  cancelBidType?: InputMaybe<NullableOfCancelBidTypeOperationFilterInput>;
  cancellRequestStatus?: InputMaybe<NullableOfCancellRequestStatusOperationFilterInput>;
  cancellationReason?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  hasPayment?: InputMaybe<BooleanOperationFilterInput>;
  hudu?: InputMaybe<UsersFilterInput>;
  huduDeleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  huduFinishedProjectDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  huduId?: InputMaybe<ComparableInt32OperationFilterInput>;
  huduerWorkedHours?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  hudusComment?: InputMaybe<StringOperationFilterInput>;
  hudusRate?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isHuduCommented?: InputMaybe<BooleanOperationFilterInput>;
  isHuduDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  isListerCommented?: InputMaybe<BooleanOperationFilterInput>;
  isListerDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  latestCancellRequestConfirmationDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  latestCancellRequestDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  lister?: InputMaybe<UsersFilterInput>;
  listerDeleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  listerId?: InputMaybe<ComparableInt32OperationFilterInput>;
  listersComment?: InputMaybe<StringOperationFilterInput>;
  listersRate?: InputMaybe<StringOperationFilterInput>;
  notifications?: InputMaybe<ListFilterInputTypeOfNotificationFilterInput>;
  or?: InputMaybe<Array<BidFilterInput>>;
  payments?: InputMaybe<ListFilterInputTypeOfPaymentFilterInput>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type BidInput = {
  amount: Scalars['Float'];
  bidAnswerToQuestionInputs?: InputMaybe<
    Array<InputMaybe<BidAnswerToQuestionInput>>
  >;
  description: Scalars['String'];
  projectId: Scalars['Int'];
};

export type BidOrderVmInput = {
  bidStatus: BidStatus;
  order: Scalars['Int'];
};

export type BidSortInput = {
  affectedToHighestProjectCompletionRate?: InputMaybe<SortEnumType>;
  amount?: InputMaybe<SortEnumType>;
  awardDate?: InputMaybe<SortEnumType>;
  bidStatus?: InputMaybe<SortEnumType>;
  cancelBidType?: InputMaybe<SortEnumType>;
  cancellRequestStatus?: InputMaybe<SortEnumType>;
  cancellationReason?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  hasPayment?: InputMaybe<SortEnumType>;
  hudu?: InputMaybe<UsersSortInput>;
  huduDeleteAccountDate?: InputMaybe<SortEnumType>;
  huduFinishedProjectDate?: InputMaybe<SortEnumType>;
  huduId?: InputMaybe<SortEnumType>;
  huduerWorkedHours?: InputMaybe<SortEnumType>;
  hudusComment?: InputMaybe<SortEnumType>;
  hudusRate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isHuduCommented?: InputMaybe<SortEnumType>;
  isHuduDeletedAccount?: InputMaybe<SortEnumType>;
  isListerCommented?: InputMaybe<SortEnumType>;
  isListerDeletedAccount?: InputMaybe<SortEnumType>;
  latestCancellRequestConfirmationDate?: InputMaybe<SortEnumType>;
  latestCancellRequestDate?: InputMaybe<SortEnumType>;
  lister?: InputMaybe<UsersSortInput>;
  listerDeleteAccountDate?: InputMaybe<SortEnumType>;
  listerId?: InputMaybe<SortEnumType>;
  listersComment?: InputMaybe<SortEnumType>;
  listersRate?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
};

export enum BidStatus {
  Cancell = 'CANCELL',
  Failed = 'FAILED',
  Finished = 'FINISHED',
  HuduFinishedProject = 'HUDU_FINISHED_PROJECT',
  InProgress = 'IN_PROGRESS',
  NotLucky = 'NOT_LUCKY',
  PenndingHuduWithdraw = 'PENNDING_HUDU_WITHDRAW',
  Waiting = 'WAITING',
}

export type BidStatusOperationFilterInput = {
  eq?: InputMaybe<BidStatus>;
  in?: InputMaybe<Array<BidStatus>>;
  neq?: InputMaybe<BidStatus>;
  nin?: InputMaybe<Array<BidStatus>>;
};

export type BidsInProjectDetailsTabDto = {
  __typename?: 'BidsInProjectDetailsTabDto';
  bestRate?: Maybe<Bid>;
  highedtProjectCompletionRate?: Maybe<Bid>;
  lowestBid?: Maybe<Bid>;
};

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

export enum CancelBidType {
  ChangeInPlan = 'CHANGE_IN_PLAN',
  NotSatisfiedWithLister = 'NOT_SATISFIED_WITH_LISTER',
  QualityConcerns = 'QUALITY_CONCERNS',
  TimingIssues = 'TIMING_ISSUES',
}

export enum CancelProjectStatus {
  ChangeInPlan = 'CHANGE_IN_PLAN',
  NotSatisfiedWithDoer = 'NOT_SATISFIED_WITH_DOER',
  QualityConcerns = 'QUALITY_CONCERNS',
  TimingIssues = 'TIMING_ISSUES',
}

export enum CancellRequestStatus {
  Cancelled = 'CANCELLED',
  Pendding = 'PENDDING',
  Rejected = 'REJECTED',
}

export type Category = {
  __typename?: 'Category';
  courses?: Maybe<Array<Maybe<Course>>>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  parent?: Maybe<Category>;
  parentId?: Maybe<Scalars['Int']>;
  spanishText?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type CategoryCollectionSegment = {
  __typename?: 'CategoryCollectionSegment';
  items?: Maybe<Array<Maybe<Category>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CategoryDto = {
  __typename?: 'CategoryDto';
  category?: Maybe<Category>;
  courseCount: Scalars['Int'];
  hasChild: Scalars['Boolean'];
  hasProjects: Scalars['Boolean'];
  isPined: Scalars['Boolean'];
  projectCount: Scalars['Int'];
};

export type CategoryDtoCollectionSegment = {
  __typename?: 'CategoryDtoCollectionSegment';
  items?: Maybe<Array<Maybe<CategoryDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CategoryDtoFilterInput = {
  and?: InputMaybe<Array<CategoryDtoFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  courseCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  hasChild?: InputMaybe<BooleanOperationFilterInput>;
  hasProjects?: InputMaybe<BooleanOperationFilterInput>;
  isPined?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CategoryDtoFilterInput>>;
  projectCount?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CategoryDtoSortInput = {
  category?: InputMaybe<CategorySortInput>;
  courseCount?: InputMaybe<SortEnumType>;
  hasChild?: InputMaybe<SortEnumType>;
  hasProjects?: InputMaybe<SortEnumType>;
  isPined?: InputMaybe<SortEnumType>;
  projectCount?: InputMaybe<SortEnumType>;
};

export type CategoryFilterInput = {
  and?: InputMaybe<Array<CategoryFilterInput>>;
  courses?: InputMaybe<ListFilterInputTypeOfCourseFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CategoryFilterInput>>;
  parent?: InputMaybe<CategoryFilterInput>;
  parentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  spanishText?: InputMaybe<StringOperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CategoryInput = {
  id?: InputMaybe<Scalars['Int']>;
  spanishText: Scalars['String'];
  subCategories?: InputMaybe<Array<InputMaybe<SubCategoryInput>>>;
  text: Scalars['String'];
};

export type CategorySortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  parent?: InputMaybe<CategorySortInput>;
  parentId?: InputMaybe<SortEnumType>;
  spanishText?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type ChatGptResponseDto = {
  __typename?: 'ChatGptResponseDto';
  questionDto?: Maybe<Array<Maybe<QuestionDto>>>;
};

export type ClientSecretDto = {
  __typename?: 'ClientSecretDto';
  bid?: Maybe<Bid>;
  clientSecret?: Maybe<Scalars['String']>;
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
};

export type ComparableDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<Scalars['DateTime']>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableDoubleOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
  ngt?: InputMaybe<Scalars['Float']>;
  ngte?: InputMaybe<Scalars['Float']>;
  nin?: InputMaybe<Array<Scalars['Float']>>;
  nlt?: InputMaybe<Scalars['Float']>;
  nlte?: InputMaybe<Scalars['Float']>;
};

export type ComparableInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<Scalars['Int']>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ComparableInt64OperationFilterInput = {
  eq?: InputMaybe<Scalars['Long']>;
  gt?: InputMaybe<Scalars['Long']>;
  gte?: InputMaybe<Scalars['Long']>;
  in?: InputMaybe<Array<Scalars['Long']>>;
  lt?: InputMaybe<Scalars['Long']>;
  lte?: InputMaybe<Scalars['Long']>;
  neq?: InputMaybe<Scalars['Long']>;
  ngt?: InputMaybe<Scalars['Long']>;
  ngte?: InputMaybe<Scalars['Long']>;
  nin?: InputMaybe<Array<Scalars['Long']>>;
  nlt?: InputMaybe<Scalars['Long']>;
  nlte?: InputMaybe<Scalars['Long']>;
};

export type ComparableNullableOfDateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  neq?: InputMaybe<Scalars['DateTime']>;
  ngt?: InputMaybe<Scalars['DateTime']>;
  ngte?: InputMaybe<Scalars['DateTime']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  nlt?: InputMaybe<Scalars['DateTime']>;
  nlte?: InputMaybe<Scalars['DateTime']>;
};

export type ComparableNullableOfDecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  neq?: InputMaybe<Scalars['Decimal']>;
  ngt?: InputMaybe<Scalars['Decimal']>;
  ngte?: InputMaybe<Scalars['Decimal']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']>>>;
  nlt?: InputMaybe<Scalars['Decimal']>;
  nlte?: InputMaybe<Scalars['Decimal']>;
};

export type ComparableNullableOfDoubleOperationFilterInput = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
  ngt?: InputMaybe<Scalars['Float']>;
  ngte?: InputMaybe<Scalars['Float']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  nlt?: InputMaybe<Scalars['Float']>;
  nlte?: InputMaybe<Scalars['Float']>;
};

export type ComparableNullableOfInt32OperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
  ngt?: InputMaybe<Scalars['Int']>;
  ngte?: InputMaybe<Scalars['Int']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  nlt?: InputMaybe<Scalars['Int']>;
  nlte?: InputMaybe<Scalars['Int']>;
};

export type ConversationDto = {
  __typename?: 'ConversationDto';
  conversationId: Scalars['Int'];
  groupDescription?: Maybe<Scalars['String']>;
  groupImage?: Maybe<Scalars['String']>;
  groupName?: Maybe<Scalars['String']>;
  imageAddress?: Maybe<Scalars['String']>;
  isGroup: Scalars['Boolean'];
  isMemberOfGroup: Scalars['Boolean'];
  latestMessageDate: Scalars['DateTime'];
  projectId?: Maybe<Scalars['Int']>;
  projectNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  subject?: Maybe<Scalars['String']>;
  unreadCount: Scalars['Int'];
  user?: Maybe<Users>;
  userEmail?: Maybe<Scalars['String']>;
  userFirstName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  userLastName?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
};

export type ConversationDtoCollectionSegment = {
  __typename?: 'ConversationDtoCollectionSegment';
  items?: Maybe<Array<Maybe<ConversationDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ConversationDtoFilterInput = {
  and?: InputMaybe<Array<ConversationDtoFilterInput>>;
  conversationId?: InputMaybe<ComparableInt32OperationFilterInput>;
  groupDescription?: InputMaybe<StringOperationFilterInput>;
  groupImage?: InputMaybe<StringOperationFilterInput>;
  groupName?: InputMaybe<StringOperationFilterInput>;
  imageAddress?: InputMaybe<StringOperationFilterInput>;
  isGroup?: InputMaybe<BooleanOperationFilterInput>;
  isMemberOfGroup?: InputMaybe<BooleanOperationFilterInput>;
  latestMessageDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ConversationDtoFilterInput>>;
  projectId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  projectNames?: InputMaybe<ListStringOperationFilterInput>;
  subject?: InputMaybe<StringOperationFilterInput>;
  unreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userEmail?: InputMaybe<StringOperationFilterInput>;
  userFirstName?: InputMaybe<StringOperationFilterInput>;
  userId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  userLastName?: InputMaybe<StringOperationFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
};

export type ConversationDtoSortInput = {
  conversationId?: InputMaybe<SortEnumType>;
  groupDescription?: InputMaybe<SortEnumType>;
  groupImage?: InputMaybe<SortEnumType>;
  groupName?: InputMaybe<SortEnumType>;
  imageAddress?: InputMaybe<SortEnumType>;
  isGroup?: InputMaybe<SortEnumType>;
  isMemberOfGroup?: InputMaybe<SortEnumType>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  projectId?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SortEnumType>;
  unreadCount?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userEmail?: InputMaybe<SortEnumType>;
  userFirstName?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
  userLastName?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
};

export type Conversations = {
  __typename?: 'Conversations';
  createdDate: Scalars['DateTime'];
  firstUnreadCount: Scalars['Int'];
  firstUser?: Maybe<Users>;
  firstUserDeleteAccountDate: Scalars['DateTime'];
  firstUserId?: Maybe<Scalars['Int']>;
  groupDescription?: Maybe<Scalars['String']>;
  groupImage?: Maybe<Scalars['String']>;
  groupName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isFirstUserDeletedAccount: Scalars['Boolean'];
  isGroup: Scalars['Boolean'];
  isSecondUserDeletedAccount: Scalars['Boolean'];
  latestMessageDate: Scalars['DateTime'];
  messages?: Maybe<Array<Maybe<Messages>>>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  secondUnreadCount: Scalars['Int'];
  secondUser?: Maybe<Users>;
  secondUserDeleteAccountDate: Scalars['DateTime'];
  secondUserId?: Maybe<Scalars['Int']>;
  subject?: Maybe<Scalars['String']>;
  userGroups?: Maybe<Array<Maybe<UserMessageGroup>>>;
};

export type ConversationsFilterInput = {
  and?: InputMaybe<Array<ConversationsFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  firstUnreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  firstUser?: InputMaybe<UsersFilterInput>;
  firstUserDeleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  firstUserId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  groupDescription?: InputMaybe<StringOperationFilterInput>;
  groupImage?: InputMaybe<StringOperationFilterInput>;
  groupName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isFirstUserDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  isGroup?: InputMaybe<BooleanOperationFilterInput>;
  isSecondUserDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  latestMessageDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  messages?: InputMaybe<ListFilterInputTypeOfMessagesFilterInput>;
  or?: InputMaybe<Array<ConversationsFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  secondUnreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  secondUser?: InputMaybe<UsersFilterInput>;
  secondUserDeleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  secondUserId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  subject?: InputMaybe<StringOperationFilterInput>;
  userGroups?: InputMaybe<ListFilterInputTypeOfUserMessageGroupFilterInput>;
};

export type ConversationsProjectDto = {
  __typename?: 'ConversationsProjectDto';
  conversation?: Maybe<Conversations>;
  latestMessage?: Maybe<Scalars['String']>;
  latestMessageDate: Scalars['DateTime'];
  project?: Maybe<Project>;
};

export type ConversationsProjectDtoCollectionSegment = {
  __typename?: 'ConversationsProjectDtoCollectionSegment';
  items?: Maybe<Array<Maybe<ConversationsProjectDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ConversationsProjectDtoFilterInput = {
  and?: InputMaybe<Array<ConversationsProjectDtoFilterInput>>;
  conversation?: InputMaybe<ConversationsFilterInput>;
  latestMessage?: InputMaybe<StringOperationFilterInput>;
  latestMessageDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ConversationsProjectDtoFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
};

export type ConversationsProjectDtoSortInput = {
  conversation?: InputMaybe<ConversationsSortInput>;
  latestMessage?: InputMaybe<SortEnumType>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
};

export type ConversationsSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  firstUnreadCount?: InputMaybe<SortEnumType>;
  firstUser?: InputMaybe<UsersSortInput>;
  firstUserDeleteAccountDate?: InputMaybe<SortEnumType>;
  firstUserId?: InputMaybe<SortEnumType>;
  groupDescription?: InputMaybe<SortEnumType>;
  groupImage?: InputMaybe<SortEnumType>;
  groupName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isFirstUserDeletedAccount?: InputMaybe<SortEnumType>;
  isGroup?: InputMaybe<SortEnumType>;
  isSecondUserDeletedAccount?: InputMaybe<SortEnumType>;
  latestMessageDate?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  secondUnreadCount?: InputMaybe<SortEnumType>;
  secondUser?: InputMaybe<UsersSortInput>;
  secondUserDeleteAccountDate?: InputMaybe<SortEnumType>;
  secondUserId?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SortEnumType>;
};

export type Coupon = {
  __typename?: 'Coupon';
  admin?: Maybe<Users>;
  adminId: Scalars['Int'];
  code?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  expirationDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  maximumDiscountAmount?: Maybe<Scalars['Float']>;
  percent: Scalars['Float'];
  title?: Maybe<Scalars['String']>;
  userUsedCoupons?: Maybe<Array<Maybe<UserUsedCoupon>>>;
  userlimits: Scalars['Int'];
};

export type CouponActivityDto = {
  __typename?: 'CouponActivityDto';
  discountedAmount: Scalars['Float'];
  userUsedCoupon?: Maybe<UserUsedCoupon>;
};

export type CouponActivityDtoCollectionSegment = {
  __typename?: 'CouponActivityDtoCollectionSegment';
  items?: Maybe<Array<Maybe<CouponActivityDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CouponActivityDtoFilterInput = {
  and?: InputMaybe<Array<CouponActivityDtoFilterInput>>;
  discountedAmount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<CouponActivityDtoFilterInput>>;
  userUsedCoupon?: InputMaybe<UserUsedCouponFilterInput>;
};

export type CouponActivityDtoSortInput = {
  discountedAmount?: InputMaybe<SortEnumType>;
  userUsedCoupon?: InputMaybe<UserUsedCouponSortInput>;
};

export type CouponDto = {
  __typename?: 'CouponDto';
  coupon?: Maybe<Coupon>;
  usedCount: Scalars['Int'];
};

export type CouponDtoCollectionSegment = {
  __typename?: 'CouponDtoCollectionSegment';
  items?: Maybe<Array<Maybe<CouponDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CouponDtoFilterInput = {
  and?: InputMaybe<Array<CouponDtoFilterInput>>;
  coupon?: InputMaybe<CouponFilterInput>;
  or?: InputMaybe<Array<CouponDtoFilterInput>>;
  usedCount?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CouponDtoSortInput = {
  coupon?: InputMaybe<CouponSortInput>;
  usedCount?: InputMaybe<SortEnumType>;
};

export type CouponFilterInput = {
  admin?: InputMaybe<UsersFilterInput>;
  adminId?: InputMaybe<ComparableInt32OperationFilterInput>;
  and?: InputMaybe<Array<CouponFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  expirationDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  maximumDiscountAmount?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  or?: InputMaybe<Array<CouponFilterInput>>;
  percent?: InputMaybe<ComparableDoubleOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  userUsedCoupons?: InputMaybe<ListFilterInputTypeOfUserUsedCouponFilterInput>;
  userlimits?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CouponInput = {
  code: Scalars['String'];
  expirationDate: Scalars['DateTime'];
  id?: InputMaybe<Scalars['Int']>;
  isActive: Scalars['Boolean'];
  maximumDiscountAmount?: InputMaybe<Scalars['Float']>;
  percent: Scalars['Float'];
  title: Scalars['String'];
  userlimits: Scalars['Int'];
};

export type CouponSortInput = {
  admin?: InputMaybe<UsersSortInput>;
  adminId?: InputMaybe<SortEnumType>;
  code?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  expirationDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  maximumDiscountAmount?: InputMaybe<SortEnumType>;
  percent?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  userlimits?: InputMaybe<SortEnumType>;
};

export type CouponValidResultDto = {
  __typename?: 'CouponValidResultDto';
  coupon?: Maybe<Coupon>;
  isValid: Scalars['Boolean'];
};

export type Course = {
  __typename?: 'Course';
  category?: Maybe<Category>;
  categoryId: Scalars['Int'];
  courseStatus: CourseStatus;
  courseTranslates?: Maybe<Array<Maybe<CourseTranslate>>>;
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  exam?: Maybe<Exam>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isFree: Scalars['Boolean'];
  mediaType: MediaType;
  mediaUrl?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  slides?: Maybe<Array<Maybe<Slide>>>;
  spanishTranslateStatus: SpanishTranslateStatus;
  title?: Maybe<Scalars['String']>;
  userCourses?: Maybe<Array<Maybe<UserCourse>>>;
};

export type CourseCollectionSegment = {
  __typename?: 'CourseCollectionSegment';
  items?: Maybe<Array<Maybe<Course>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CourseDto = {
  __typename?: 'CourseDto';
  course?: Maybe<Course>;
  enrolledUsers: Scalars['Int'];
  slides: Scalars['Int'];
  successfullUsers: Scalars['Int'];
};

export type CourseDtoCollectionSegment = {
  __typename?: 'CourseDtoCollectionSegment';
  items?: Maybe<Array<Maybe<CourseDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CourseDtoFilterInput = {
  and?: InputMaybe<Array<CourseDtoFilterInput>>;
  course?: InputMaybe<CourseFilterInput>;
  enrolledUsers?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CourseDtoFilterInput>>;
  slides?: InputMaybe<ComparableInt32OperationFilterInput>;
  successfullUsers?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type CourseDtoSortInput = {
  course?: InputMaybe<CourseSortInput>;
  enrolledUsers?: InputMaybe<SortEnumType>;
  slides?: InputMaybe<SortEnumType>;
  successfullUsers?: InputMaybe<SortEnumType>;
};

export type CourseFilterInput = {
  and?: InputMaybe<Array<CourseFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<ComparableInt32OperationFilterInput>;
  courseStatus?: InputMaybe<CourseStatusOperationFilterInput>;
  courseTranslates?: InputMaybe<ListFilterInputTypeOfCourseTranslateFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  exam?: InputMaybe<ExamFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isFree?: InputMaybe<BooleanOperationFilterInput>;
  mediaType?: InputMaybe<MediaTypeOperationFilterInput>;
  mediaUrl?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CourseFilterInput>>;
  price?: InputMaybe<ComparableDoubleOperationFilterInput>;
  slides?: InputMaybe<ListFilterInputTypeOfSlideFilterInput>;
  spanishTranslateStatus?: InputMaybe<SpanishTranslateStatusOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  userCourses?: InputMaybe<ListFilterInputTypeOfUserCourseFilterInput>;
};

export type CourseInput = {
  categoryId: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  mediaType: MediaType;
  mediaUrl?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  title?: InputMaybe<Scalars['String']>;
};

export type CourseQuestion = {
  __typename?: 'CourseQuestion';
  answers?: Maybe<Array<Maybe<CourseQuestionAnswer>>>;
  courseTranslates?: Maybe<Array<Maybe<CourseTranslate>>>;
  createdDate: Scalars['DateTime'];
  exam?: Maybe<Exam>;
  examId: Scalars['Int'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  number: Scalars['Int'];
  questionContent?: Maybe<Scalars['String']>;
};

export type CourseQuestionAnswer = {
  __typename?: 'CourseQuestionAnswer';
  courseQuestion?: Maybe<CourseQuestion>;
  courseQuestionId: Scalars['Int'];
  courseTranslates?: Maybe<Array<Maybe<CourseTranslate>>>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isCorrect: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  value?: Maybe<Scalars['String']>;
};

export type CourseQuestionAnswerCollectionSegment = {
  __typename?: 'CourseQuestionAnswerCollectionSegment';
  items?: Maybe<Array<Maybe<CourseQuestionAnswer>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CourseQuestionAnswerFilterInput = {
  and?: InputMaybe<Array<CourseQuestionAnswerFilterInput>>;
  courseQuestion?: InputMaybe<CourseQuestionFilterInput>;
  courseQuestionId?: InputMaybe<ComparableInt32OperationFilterInput>;
  courseTranslates?: InputMaybe<ListFilterInputTypeOfCourseTranslateFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isCorrect?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<CourseQuestionAnswerFilterInput>>;
  value?: InputMaybe<StringOperationFilterInput>;
};

export type CourseQuestionAnswerInput = {
  courseQuestionId: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  isCorrect: Scalars['Boolean'];
  value?: InputMaybe<Scalars['String']>;
};

export type CourseQuestionAnswerSortInput = {
  courseQuestion?: InputMaybe<CourseQuestionSortInput>;
  courseQuestionId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isCorrect?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  value?: InputMaybe<SortEnumType>;
};

export type CourseQuestionCollectionSegment = {
  __typename?: 'CourseQuestionCollectionSegment';
  items?: Maybe<Array<Maybe<CourseQuestion>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CourseQuestionFilterInput = {
  and?: InputMaybe<Array<CourseQuestionFilterInput>>;
  answers?: InputMaybe<ListFilterInputTypeOfCourseQuestionAnswerFilterInput>;
  courseTranslates?: InputMaybe<ListFilterInputTypeOfCourseTranslateFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  exam?: InputMaybe<ExamFilterInput>;
  examId?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  number?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CourseQuestionFilterInput>>;
  questionContent?: InputMaybe<StringOperationFilterInput>;
};

export type CourseQuestionInput = {
  examId: Scalars['Int'];
  id?: InputMaybe<Scalars['Int']>;
  number: Scalars['Int'];
  questionContent?: InputMaybe<Scalars['String']>;
};

export type CourseQuestionSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  exam?: InputMaybe<ExamSortInput>;
  examId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  number?: InputMaybe<SortEnumType>;
  questionContent?: InputMaybe<SortEnumType>;
};

export type CourseSortInput = {
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  courseStatus?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  exam?: InputMaybe<ExamSortInput>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isFree?: InputMaybe<SortEnumType>;
  mediaType?: InputMaybe<SortEnumType>;
  mediaUrl?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  spanishTranslateStatus?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export enum CourseStatus {
  Draft = 'DRAFT',
  Published = 'PUBLISHED',
}

export type CourseStatusOperationFilterInput = {
  eq?: InputMaybe<CourseStatus>;
  in?: InputMaybe<Array<CourseStatus>>;
  neq?: InputMaybe<CourseStatus>;
  nin?: InputMaybe<Array<CourseStatus>>;
};

export type CourseTopCategoryDto = {
  __typename?: 'CourseTopCategoryDto';
  category?: Maybe<Category>;
  courseCount: Scalars['Int'];
  id: Scalars['Int'];
};

export type CourseTopCategoryDtoCollectionSegment = {
  __typename?: 'CourseTopCategoryDtoCollectionSegment';
  items?: Maybe<Array<Maybe<CourseTopCategoryDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CourseTopCategoryDtoFilterInput = {
  and?: InputMaybe<Array<CourseTopCategoryDtoFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  courseCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<CourseTopCategoryDtoFilterInput>>;
};

export type CourseTopCategoryDtoSortInput = {
  category?: InputMaybe<CategorySortInput>;
  courseCount?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
};

export type CourseTranslate = {
  __typename?: 'CourseTranslate';
  content?: Maybe<Scalars['String']>;
  course?: Maybe<Course>;
  courseId?: Maybe<Scalars['Int']>;
  courseQuestion?: Maybe<CourseQuestion>;
  courseQuestionAnswer?: Maybe<CourseQuestionAnswer>;
  courseQuestionAnswerId?: Maybe<Scalars['Int']>;
  courseQuestionId?: Maybe<Scalars['Int']>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  languageType: LanguageType;
  mediaUrl?: Maybe<Scalars['String']>;
  slide?: Maybe<Slide>;
  slideId?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type CourseTranslateCollectionSegment = {
  __typename?: 'CourseTranslateCollectionSegment';
  items?: Maybe<Array<Maybe<CourseTranslate>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type CourseTranslateFilterInput = {
  and?: InputMaybe<Array<CourseTranslateFilterInput>>;
  content?: InputMaybe<StringOperationFilterInput>;
  course?: InputMaybe<CourseFilterInput>;
  courseId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  courseQuestion?: InputMaybe<CourseQuestionFilterInput>;
  courseQuestionAnswer?: InputMaybe<CourseQuestionAnswerFilterInput>;
  courseQuestionAnswerId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  courseQuestionId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  languageType?: InputMaybe<LanguageTypeOperationFilterInput>;
  mediaUrl?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CourseTranslateFilterInput>>;
  slide?: InputMaybe<SlideFilterInput>;
  slideId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
};

export type CourseTranslateInput = {
  content?: InputMaybe<Scalars['String']>;
  courseId?: InputMaybe<Scalars['Int']>;
  courseQuestionAnswerId?: InputMaybe<Scalars['Int']>;
  courseQuestionId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  languageType: LanguageType;
  mediaUrl?: InputMaybe<Scalars['String']>;
  slideId?: InputMaybe<Scalars['Int']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CourseTranslateSortInput = {
  content?: InputMaybe<SortEnumType>;
  course?: InputMaybe<CourseSortInput>;
  courseId?: InputMaybe<SortEnumType>;
  courseQuestion?: InputMaybe<CourseQuestionSortInput>;
  courseQuestionAnswer?: InputMaybe<CourseQuestionAnswerSortInput>;
  courseQuestionAnswerId?: InputMaybe<SortEnumType>;
  courseQuestionId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  languageType?: InputMaybe<SortEnumType>;
  mediaUrl?: InputMaybe<SortEnumType>;
  slide?: InputMaybe<SlideSortInput>;
  slideId?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export type CreateConversationInput = {
  isByAmin: Scalars['Boolean'];
  isGroup: Scalars['Boolean'];
  projectId?: InputMaybe<Scalars['Int']>;
  receiverId?: InputMaybe<Scalars['Int']>;
  senderId?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
};

export type CustomStripePayDto = {
  __typename?: 'CustomStripePayDto';
  payType: PayType;
  reduceFromWallet: Scalars['Decimal'];
  stripeAmount: Scalars['Decimal'];
  walletAmountIsEqualToBidAmount: Scalars['Boolean'];
};

export type DictionaryOfStringAndStringFilterInput = {
  and?: InputMaybe<Array<DictionaryOfStringAndStringFilterInput>>;
  comparer?: InputMaybe<IEqualityComparerOfStringFilterInput>;
  count?: InputMaybe<ComparableInt32OperationFilterInput>;
  keys?: InputMaybe<ListStringOperationFilterInput>;
  or?: InputMaybe<Array<DictionaryOfStringAndStringFilterInput>>;
  values?: InputMaybe<ListStringOperationFilterInput>;
};

export type EditBidByAdminInput = {
  amount: Scalars['Float'];
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type EditBidInput = {
  amount?: InputMaybe<Scalars['Float']>;
  bidAnswerToQuestionInputs?: InputMaybe<
    Array<InputMaybe<BidAnswerToQuestionInput>>
  >;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

export type EditFeedbackByAdminInput = {
  bidId: Scalars['Int'];
  hudusComment?: InputMaybe<Scalars['String']>;
  hudusRate?: InputMaybe<Scalars['String']>;
  listersComment?: InputMaybe<Scalars['String']>;
  listersRate?: InputMaybe<Scalars['String']>;
};

export type EditProjectImagesInput = {
  alt?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  imageAddress?: InputMaybe<Scalars['String']>;
};

export type EditProjectInput = {
  addressTitle?: InputMaybe<Scalars['String']>;
  availability?: InputMaybe<Availability>;
  backgroundCheckTypeForDoer: BackgroundCheckTypeForDoer;
  categoryId?: InputMaybe<Scalars['Int']>;
  city?: InputMaybe<Scalars['String']>;
  cover?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['DateTime']>;
  id: Scalars['Int'];
  point?: InputMaybe<Scalars['Position']>;
  projectDeadLine?: InputMaybe<Scalars['DateTime']>;
  projectImages?: InputMaybe<Array<InputMaybe<ProjectImagesInput>>>;
  projectQuestions?: InputMaybe<Array<InputMaybe<ProjectQuestionInput>>>;
  startDate?: InputMaybe<Scalars['DateTime']>;
  state?: InputMaybe<Scalars['String']>;
  streetAddress?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  zipCode?: InputMaybe<Scalars['String']>;
};

export type EditQuestionInput = {
  id: Scalars['Int'];
  text: Scalars['String'];
};

export type EmailInput = {
  htmlContent?: InputMaybe<Scalars['String']>;
  plainTextContent?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
  to?: InputMaybe<Scalars['String']>;
};

export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  createdDate: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  emailTemplateType: EmailTemplateType;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  spanishText?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type EmailTemplateCollectionSegment = {
  __typename?: 'EmailTemplateCollectionSegment';
  items?: Maybe<Array<Maybe<EmailTemplate>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type EmailTemplateFilterInput = {
  and?: InputMaybe<Array<EmailTemplateFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  emailTemplateType?: InputMaybe<EmailTemplateTypeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<EmailTemplateFilterInput>>;
  spanishText?: InputMaybe<StringOperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type EmailTemplateInput = {
  email?: InputMaybe<Scalars['String']>;
  emailTemplateType: EmailTemplateType;
  spanishText: Scalars['String'];
  text: Scalars['String'];
};

export type EmailTemplateSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  emailTemplateType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  spanishText?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
};

export enum EmailTemplateType {
  AcceptBid = 'ACCEPT_BID',
  AdminInvitationConfirmationLink = 'ADMIN_INVITATION_CONFIRMATION_LINK',
  RejectBid = 'REJECT_BID',
  WelcomeEmail = 'WELCOME_EMAIL',
}

export type EmailTemplateTypeOperationFilterInput = {
  eq?: InputMaybe<EmailTemplateType>;
  in?: InputMaybe<Array<EmailTemplateType>>;
  neq?: InputMaybe<EmailTemplateType>;
  nin?: InputMaybe<Array<EmailTemplateType>>;
};

export type EnthusiasticCistyState = {
  __typename?: 'EnthusiasticCistyState';
  city?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  state?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type EnthusiasticCistyStateCollectionSegment = {
  __typename?: 'EnthusiasticCistyStateCollectionSegment';
  items?: Maybe<Array<Maybe<EnthusiasticCistyState>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type EnthusiasticCistyStateFilterInput = {
  and?: InputMaybe<Array<EnthusiasticCistyStateFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<EnthusiasticCistyStateFilterInput>>;
  state?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type EnthusiasticCistyStateSortInput = {
  city?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type EnthusiasticCistyStatesGrouptedByStateDto = {
  __typename?: 'EnthusiasticCistyStatesGrouptedByStateDto';
  state?: Maybe<Scalars['String']>;
  stateCount: Scalars['Int'];
};

export type EnthusiasticCistyStatesGrouptedByStateDtoCollectionSegment = {
  __typename?: 'EnthusiasticCistyStatesGrouptedByStateDtoCollectionSegment';
  items?: Maybe<Array<Maybe<EnthusiasticCistyStatesGrouptedByStateDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type EnthusiasticCistyStatesGrouptedByStateDtoFilterInput = {
  and?: InputMaybe<Array<EnthusiasticCistyStatesGrouptedByStateDtoFilterInput>>;
  or?: InputMaybe<Array<EnthusiasticCistyStatesGrouptedByStateDtoFilterInput>>;
  state?: InputMaybe<StringOperationFilterInput>;
  stateCount?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type EnthusiasticCistyStatesGrouptedByStateDtoSortInput = {
  state?: InputMaybe<SortEnumType>;
  stateCount?: InputMaybe<SortEnumType>;
};

export type EphemeralKeyDto = {
  __typename?: 'EphemeralKeyDto';
  created: Scalars['DateTime'];
  deleted?: Maybe<Scalars['Boolean']>;
  expires: Scalars['DateTime'];
  id?: Maybe<Scalars['String']>;
  livemode: Scalars['Boolean'];
  object?: Maybe<Scalars['String']>;
  rawJson?: Maybe<Scalars['String']>;
  secret?: Maybe<Scalars['String']>;
};

export type Exam = {
  __typename?: 'Exam';
  course?: Maybe<Course>;
  courseId: Scalars['Int'];
  courseQuestions?: Maybe<Array<Maybe<CourseQuestion>>>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
};

export type ExamCollectionSegment = {
  __typename?: 'ExamCollectionSegment';
  items?: Maybe<Array<Maybe<Exam>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ExamFilterInput = {
  and?: InputMaybe<Array<ExamFilterInput>>;
  course?: InputMaybe<CourseFilterInput>;
  courseId?: InputMaybe<ComparableInt32OperationFilterInput>;
  courseQuestions?: InputMaybe<ListFilterInputTypeOfCourseQuestionFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ExamFilterInput>>;
};

export type ExamSortInput = {
  course?: InputMaybe<CourseSortInput>;
  courseId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
};

export type FeedbackInput = {
  bidId: Scalars['Int'];
  hudusComment?: InputMaybe<Scalars['String']>;
  hudusRate: Scalars['Int'];
  listersComment?: InputMaybe<Scalars['String']>;
  listersRate: Scalars['Int'];
};

export type FlagText = {
  __typename?: 'FlagText';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  text?: Maybe<Scalars['String']>;
};

export type FlagTextCollectionSegment = {
  __typename?: 'FlagTextCollectionSegment';
  items?: Maybe<Array<Maybe<FlagText>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type FlagTextFilterInput = {
  and?: InputMaybe<Array<FlagTextFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FlagTextFilterInput>>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type FlagTextInput = {
  id?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};

export type FlagTextSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
};

export type FlaggedContent = {
  __typename?: 'FlaggedContent';
  bid?: Maybe<Bid>;
  bidId?: Maybe<Scalars['Int']>;
  createdDate: Scalars['DateTime'];
  flaggedContentType: FlaggedContentType;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  projectImage?: Maybe<ProjectImages>;
  projectImageId?: Maybe<Scalars['Int']>;
  question?: Maybe<Question>;
  questionId?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
  userProfile?: Maybe<Users>;
  userProfileId?: Maybe<Scalars['Int']>;
};

export type FlaggedContentCollectionSegment = {
  __typename?: 'FlaggedContentCollectionSegment';
  items?: Maybe<Array<Maybe<FlaggedContent>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type FlaggedContentFilterInput = {
  and?: InputMaybe<Array<FlaggedContentFilterInput>>;
  bid?: InputMaybe<BidFilterInput>;
  bidId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  flaggedContentType?: InputMaybe<FlaggedContentTypeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<FlaggedContentFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  projectImage?: InputMaybe<ProjectImagesFilterInput>;
  projectImageId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  question?: InputMaybe<QuestionFilterInput>;
  questionId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
  userProfile?: InputMaybe<UsersFilterInput>;
  userProfileId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
};

export type FlaggedContentInput = {
  bidId?: InputMaybe<Scalars['Int']>;
  flaggedContentType: FlaggedContentType;
  id?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
  projectImageId?: InputMaybe<Scalars['Int']>;
  questionId?: InputMaybe<Scalars['Int']>;
  text?: InputMaybe<Scalars['String']>;
  userProfileId?: InputMaybe<Scalars['Int']>;
};

export type FlaggedContentSortInput = {
  bid?: InputMaybe<BidSortInput>;
  bidId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  flaggedContentType?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  projectImage?: InputMaybe<ProjectImagesSortInput>;
  projectImageId?: InputMaybe<SortEnumType>;
  question?: InputMaybe<QuestionSortInput>;
  questionId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
  userProfile?: InputMaybe<UsersSortInput>;
  userProfileId?: InputMaybe<SortEnumType>;
};

export enum FlaggedContentType {
  BidDescription = 'BID_DESCRIPTION',
  ProjectsAddressTitle = 'PROJECTS_ADDRESS_TITLE',
  ProjectsCity = 'PROJECTS_CITY',
  ProjectsDescription = 'PROJECTS_DESCRIPTION',
  ProjectsState = 'PROJECTS_STATE',
  ProjectsStreetAddress = 'PROJECTS_STREET_ADDRESS',
  ProjectsTitle = 'PROJECTS_TITLE',
  ProjectImagesAlt = 'PROJECT_IMAGES_ALT',
  QuestionsText = 'QUESTIONS_TEXT',
  UsersBio = 'USERS_BIO',
  UsersFirstName = 'USERS_FIRST_NAME',
  UsersLastName = 'USERS_LAST_NAME',
  UsersUserName = 'USERS_USER_NAME',
}

export type FlaggedContentTypeOperationFilterInput = {
  eq?: InputMaybe<FlaggedContentType>;
  in?: InputMaybe<Array<FlaggedContentType>>;
  neq?: InputMaybe<FlaggedContentType>;
  nin?: InputMaybe<Array<FlaggedContentType>>;
};

export enum GeoJsonGeometryType {
  GeometryCollection = 'GeometryCollection',
  LineString = 'LineString',
  MultiLineString = 'MultiLineString',
  MultiPoint = 'MultiPoint',
  MultiPolygon = 'MultiPolygon',
  Point = 'Point',
  Polygon = 'Polygon',
}

export type GeoJsonInterface = {
  /** The minimum bounding box around the geometry object */
  bbox?: Maybe<Array<Maybe<Scalars['Float']>>>;
  /** The coordinate reference system integer identifier */
  crs?: Maybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonLineStringInput = {
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is an array of two or more positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiLineStringInput = {
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: InputMaybe<
    Array<InputMaybe<Array<InputMaybe<Scalars['Position']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiLineStringType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiLineStringType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is an array of LineString coordinate arrays. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPointInput = {
  /** The "coordinates" field is an array of positions. */
  coordinates?: InputMaybe<Array<InputMaybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is an array of positions. */
  coordinates?: Maybe<Array<Maybe<Scalars['Position']>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonMultiPolygonInput = {
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: InputMaybe<Scalars['Coordinates']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonMultiPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONMultiPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is an array of Polygon coordinate arrays. */
  coordinates?: Maybe<Scalars['Coordinates']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPointInput = {
  /** The "coordinates" field is a single position. */
  coordinates?: InputMaybe<Scalars['Position']>;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPointType = GeoJsonInterface & {
  __typename?: 'GeoJSONPointType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field is a single position. */
  coordinates?: Maybe<Scalars['Position']>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GeoJsonPolygonInput = {
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: InputMaybe<
    Array<InputMaybe<Array<InputMaybe<Scalars['Position']>>>>
  >;
  /** The coordinate reference system integer identifier */
  crs?: InputMaybe<Scalars['Int']>;
  /** The geometry type of the GeoJson object */
  type?: InputMaybe<GeoJsonGeometryType>;
};

export type GeoJsonPolygonType = GeoJsonInterface & {
  __typename?: 'GeoJSONPolygonType';
  /** The minimum bounding box around the geometry object */
  bbox: Array<Scalars['Float']>;
  /** The "coordinates" field MUST be an array of linear ring coordinate arrays. For Polygons with more than one of these rings, the first MUST be the exterior ring, and any others MUST be interior rings. The exterior ring bounds the surface, and the interior rings (if present) bound holes within the surface. */
  coordinates?: Maybe<Array<Maybe<Array<Maybe<Scalars['Position']>>>>>;
  /** The coordinate reference system integer identifier */
  crs: Scalars['Int'];
  /** The geometry type of the GeoJson object */
  type: GeoJsonGeometryType;
};

export type GetBidsOrdedByBidSatatusInput = {
  bovms?: InputMaybe<Array<InputMaybe<BidOrderVmInput>>>;
  location?: InputMaybe<Scalars['Position']>;
  projectFilter?: InputMaybe<ProjectFilter>;
};

export type GetProjectIBidOn = {
  __typename?: 'GetProjectIBidOn';
  bidCount: Scalars['Float'];
  projectCount: Scalars['Float'];
  projectStatus: ProjectStatus;
};

export type GetProjectIBidOnCollectionSegment = {
  __typename?: 'GetProjectIBidOnCollectionSegment';
  items?: Maybe<Array<Maybe<GetProjectIBidOn>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type GetProjectIBidOnFilterInput = {
  and?: InputMaybe<Array<GetProjectIBidOnFilterInput>>;
  bidCount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<GetProjectIBidOnFilterInput>>;
  projectCount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  projectStatus?: InputMaybe<ProjectStatusOperationFilterInput>;
};

export type GetProjectIBidOnSortInput = {
  bidCount?: InputMaybe<SortEnumType>;
  projectCount?: InputMaybe<SortEnumType>;
  projectStatus?: InputMaybe<SortEnumType>;
};

export enum GetReviewType {
  Doer = 'DOER',
  Lister = 'LISTER',
  Total = 'TOTAL',
}

export type GroupedBidByUser = {
  __typename?: 'GroupedBidByUser';
  lowestBid: Scalars['Float'];
  lowestBidCreateDate: Scalars['DateTime'];
  user?: Maybe<Users>;
};

export type HuduRateInfo = {
  __typename?: 'HuduRateInfo';
  avgHuduerRate: Scalars['Float'];
  sumHuduerRate: Scalars['Float'];
  sumListerRate: Scalars['Float'];
};

export type IEqualityComparerOfStringFilterInput = {
  and?: InputMaybe<Array<IEqualityComparerOfStringFilterInput>>;
  or?: InputMaybe<Array<IEqualityComparerOfStringFilterInput>>;
};

export type KeyValue = {
  __typename?: 'KeyValue';
  text?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type KeyValuePairOfBidStatusAndInt32 = {
  __typename?: 'KeyValuePairOfBidStatusAndInt32';
  key: BidStatus;
  value: Scalars['Int'];
};

export type KeyValuePairOfStringAndString = {
  __typename?: 'KeyValuePairOfStringAndString';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type KeyValuePairOfStringAndStringInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export enum LanguageType {
  English = 'ENGLISH',
  Spain = 'SPAIN',
}

export type LanguageTypeOperationFilterInput = {
  eq?: InputMaybe<LanguageType>;
  in?: InputMaybe<Array<LanguageType>>;
  neq?: InputMaybe<LanguageType>;
  nin?: InputMaybe<Array<LanguageType>>;
};

export type LeaderBoard = {
  __typename?: 'LeaderBoard';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  leaderBoardType: LeaderBoardType;
  point: Scalars['Int'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type LeaderBoardCollectionSegment = {
  __typename?: 'LeaderBoardCollectionSegment';
  items?: Maybe<Array<Maybe<LeaderBoard>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type LeaderBoardFilterInput = {
  and?: InputMaybe<Array<LeaderBoardFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  leaderBoardType?: InputMaybe<LeaderBoardTypeOperationFilterInput>;
  or?: InputMaybe<Array<LeaderBoardFilterInput>>;
  point?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type LeaderBoardSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  leaderBoardType?: InputMaybe<SortEnumType>;
  point?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum LeaderBoardType {
  AchieveANewBadge = 'ACHIEVE_A_NEW_BADGE',
  AskAQuestionOnAProject = 'ASK_A_QUESTION_ON_A_PROJECT',
  AwardAProject = 'AWARD_A_PROJECT',
  BidOnAProject = 'BID_ON_A_PROJECT',
  CompleteAmmegaProjectOver1000Dolar = 'COMPLETE_AMMEGA_PROJECT_OVER1000_DOLAR',
  CompleteACourseFromHuduAcademy = 'COMPLETE_A_COURSE_FROM_HUDU_ACADEMY',
  CompleteALargeProjectOver500Dolar = 'COMPLETE_A_LARGE_PROJECT_OVER500_DOLAR',
  CompleteFullProfile = 'COMPLETE_FULL_PROFILE',
  DoaProject = 'DOA_PROJECT',
  LeaveAReviewForAProject = 'LEAVE_A_REVIEW_FOR_A_PROJECT',
  LogInToHuduFor7ConsecutiveDays = 'LOG_IN_TO_HUDU_FOR7_CONSECUTIVE_DAYS',
  LogInToHuduFor30ConsecutiveDays = 'LOG_IN_TO_HUDU_FOR30_CONSECUTIVE_DAYS',
  MaintainA5StarRatingForAMonth = 'MAINTAIN_A5_STAR_RATING_FOR_A_MONTH',
  PostAProject = 'POST_A_PROJECT',
  ReceiveA5StarReview = 'RECEIVE_A5_STAR_REVIEW',
  ReferAFriendWhoSignsUp = 'REFER_A_FRIEND_WHO_SIGNS_UP',
  RespondToABidWithin24Hours = 'RESPOND_TO_A_BID_WITHIN24_HOURS',
  ShareAProjectOrHuduAppOnSocialMedia = 'SHARE_A_PROJECT_OR_HUDU_APP_ON_SOCIAL_MEDIA',
  ShareAReferallCodeWithAFriend = 'SHARE_A_REFERALL_CODE_WITH_A_FRIEND',
  UploadProfilePicture = 'UPLOAD_PROFILE_PICTURE',
}

export type LeaderBoardTypeOperationFilterInput = {
  eq?: InputMaybe<LeaderBoardType>;
  in?: InputMaybe<Array<LeaderBoardType>>;
  neq?: InputMaybe<LeaderBoardType>;
  nin?: InputMaybe<Array<LeaderBoardType>>;
};

export type ListFilterInputTypeOfBidAnswerToQuestionFilterInput = {
  all?: InputMaybe<BidAnswerToQuestionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<BidAnswerToQuestionFilterInput>;
  some?: InputMaybe<BidAnswerToQuestionFilterInput>;
};

export type ListFilterInputTypeOfBidFilterInput = {
  all?: InputMaybe<BidFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<BidFilterInput>;
  some?: InputMaybe<BidFilterInput>;
};

export type ListFilterInputTypeOfConversationsFilterInput = {
  all?: InputMaybe<ConversationsFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ConversationsFilterInput>;
  some?: InputMaybe<ConversationsFilterInput>;
};

export type ListFilterInputTypeOfCourseFilterInput = {
  all?: InputMaybe<CourseFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CourseFilterInput>;
  some?: InputMaybe<CourseFilterInput>;
};

export type ListFilterInputTypeOfCourseQuestionAnswerFilterInput = {
  all?: InputMaybe<CourseQuestionAnswerFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CourseQuestionAnswerFilterInput>;
  some?: InputMaybe<CourseQuestionAnswerFilterInput>;
};

export type ListFilterInputTypeOfCourseQuestionFilterInput = {
  all?: InputMaybe<CourseQuestionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CourseQuestionFilterInput>;
  some?: InputMaybe<CourseQuestionFilterInput>;
};

export type ListFilterInputTypeOfCourseTranslateFilterInput = {
  all?: InputMaybe<CourseTranslateFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<CourseTranslateFilterInput>;
  some?: InputMaybe<CourseTranslateFilterInput>;
};

export type ListFilterInputTypeOfFlaggedContentFilterInput = {
  all?: InputMaybe<FlaggedContentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<FlaggedContentFilterInput>;
  some?: InputMaybe<FlaggedContentFilterInput>;
};

export type ListFilterInputTypeOfMessagesFilterInput = {
  all?: InputMaybe<MessagesFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<MessagesFilterInput>;
  some?: InputMaybe<MessagesFilterInput>;
};

export type ListFilterInputTypeOfNotificationFilterInput = {
  all?: InputMaybe<NotificationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<NotificationFilterInput>;
  some?: InputMaybe<NotificationFilterInput>;
};

export type ListFilterInputTypeOfPaymentFilterInput = {
  all?: InputMaybe<PaymentFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<PaymentFilterInput>;
  some?: InputMaybe<PaymentFilterInput>;
};

export type ListFilterInputTypeOfProjectImagesFilterInput = {
  all?: InputMaybe<ProjectImagesFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ProjectImagesFilterInput>;
  some?: InputMaybe<ProjectImagesFilterInput>;
};

export type ListFilterInputTypeOfProjectQuestionFilterInput = {
  all?: InputMaybe<ProjectQuestionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<ProjectQuestionFilterInput>;
  some?: InputMaybe<ProjectQuestionFilterInput>;
};

export type ListFilterInputTypeOfQuestionFilterInput = {
  all?: InputMaybe<QuestionFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<QuestionFilterInput>;
  some?: InputMaybe<QuestionFilterInput>;
};

export type ListFilterInputTypeOfRegisteredUserByReferallFilterInput = {
  all?: InputMaybe<RegisteredUserByReferallFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<RegisteredUserByReferallFilterInput>;
  some?: InputMaybe<RegisteredUserByReferallFilterInput>;
};

export type ListFilterInputTypeOfSlideFilterInput = {
  all?: InputMaybe<SlideFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<SlideFilterInput>;
  some?: InputMaybe<SlideFilterInput>;
};

export type ListFilterInputTypeOfTazworkOrderFilterInput = {
  all?: InputMaybe<TazworkOrderFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<TazworkOrderFilterInput>;
  some?: InputMaybe<TazworkOrderFilterInput>;
};

export type ListFilterInputTypeOfUserCourseFilterInput = {
  all?: InputMaybe<UserCourseFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<UserCourseFilterInput>;
  some?: InputMaybe<UserCourseFilterInput>;
};

export type ListFilterInputTypeOfUserImageFilterInput = {
  all?: InputMaybe<UserImageFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<UserImageFilterInput>;
  some?: InputMaybe<UserImageFilterInput>;
};

export type ListFilterInputTypeOfUserLikeProjectFilterInput = {
  all?: InputMaybe<UserLikeProjectFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<UserLikeProjectFilterInput>;
  some?: InputMaybe<UserLikeProjectFilterInput>;
};

export type ListFilterInputTypeOfUserMessageGroupFilterInput = {
  all?: InputMaybe<UserMessageGroupFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<UserMessageGroupFilterInput>;
  some?: InputMaybe<UserMessageGroupFilterInput>;
};

export type ListFilterInputTypeOfUserUsedCouponFilterInput = {
  all?: InputMaybe<UserUsedCouponFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<UserUsedCouponFilterInput>;
  some?: InputMaybe<UserUsedCouponFilterInput>;
};

export type ListResponseBaseOfActiveUsers = {
  __typename?: 'ListResponseBaseOfActiveUsers';
  result?: Maybe<ActiveUsersCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfActiveUsersResultArgs = {
  order?: InputMaybe<Array<ActiveUsersSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ActiveUsersFilterInput>;
};

export type ListResponseBaseOfAppRate = {
  __typename?: 'ListResponseBaseOfAppRate';
  result?: Maybe<AppRateCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfAppRateResultArgs = {
  order?: InputMaybe<Array<AppRateSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AppRateFilterInput>;
};

export type ListResponseBaseOfBadge = {
  __typename?: 'ListResponseBaseOfBadge';
  result?: Maybe<BadgeCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfBadgeResultArgs = {
  order?: InputMaybe<Array<BadgeSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BadgeFilterInput>;
};

export type ListResponseBaseOfBid = {
  __typename?: 'ListResponseBaseOfBid';
  result?: Maybe<BidCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfBidResultArgs = {
  order?: InputMaybe<Array<BidSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BidFilterInput>;
};

export type ListResponseBaseOfCategory = {
  __typename?: 'ListResponseBaseOfCategory';
  result?: Maybe<CategoryCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCategoryResultArgs = {
  order?: InputMaybe<Array<CategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryFilterInput>;
};

export type ListResponseBaseOfCategoryDto = {
  __typename?: 'ListResponseBaseOfCategoryDto';
  result?: Maybe<CategoryDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCategoryDtoResultArgs = {
  order?: InputMaybe<Array<CategoryDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryDtoFilterInput>;
};

export type ListResponseBaseOfConversationDto = {
  __typename?: 'ListResponseBaseOfConversationDto';
  result?: Maybe<ConversationDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfConversationDtoResultArgs = {
  order?: InputMaybe<Array<ConversationDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ConversationDtoFilterInput>;
};

export type ListResponseBaseOfConversationsProjectDto = {
  __typename?: 'ListResponseBaseOfConversationsProjectDto';
  result?: Maybe<ConversationsProjectDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfConversationsProjectDtoResultArgs = {
  order?: InputMaybe<Array<ConversationsProjectDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ConversationsProjectDtoFilterInput>;
};

export type ListResponseBaseOfCouponActivityDto = {
  __typename?: 'ListResponseBaseOfCouponActivityDto';
  result?: Maybe<CouponActivityDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCouponActivityDtoResultArgs = {
  order?: InputMaybe<Array<CouponActivityDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CouponActivityDtoFilterInput>;
};

export type ListResponseBaseOfCouponDto = {
  __typename?: 'ListResponseBaseOfCouponDto';
  result?: Maybe<CouponDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCouponDtoResultArgs = {
  order?: InputMaybe<Array<CouponDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CouponDtoFilterInput>;
};

export type ListResponseBaseOfCourse = {
  __typename?: 'ListResponseBaseOfCourse';
  result?: Maybe<CourseCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCourseResultArgs = {
  order?: InputMaybe<Array<CourseSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseFilterInput>;
};

export type ListResponseBaseOfCourseDto = {
  __typename?: 'ListResponseBaseOfCourseDto';
  result?: Maybe<CourseDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCourseDtoResultArgs = {
  order?: InputMaybe<Array<CourseDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseDtoFilterInput>;
};

export type ListResponseBaseOfCourseQuestion = {
  __typename?: 'ListResponseBaseOfCourseQuestion';
  result?: Maybe<CourseQuestionCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCourseQuestionResultArgs = {
  order?: InputMaybe<Array<CourseQuestionSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseQuestionFilterInput>;
};

export type ListResponseBaseOfCourseQuestionAnswer = {
  __typename?: 'ListResponseBaseOfCourseQuestionAnswer';
  result?: Maybe<CourseQuestionAnswerCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCourseQuestionAnswerResultArgs = {
  order?: InputMaybe<Array<CourseQuestionAnswerSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseQuestionAnswerFilterInput>;
};

export type ListResponseBaseOfCourseTopCategoryDto = {
  __typename?: 'ListResponseBaseOfCourseTopCategoryDto';
  result?: Maybe<CourseTopCategoryDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCourseTopCategoryDtoResultArgs = {
  order?: InputMaybe<Array<CourseTopCategoryDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseTopCategoryDtoFilterInput>;
};

export type ListResponseBaseOfCourseTranslate = {
  __typename?: 'ListResponseBaseOfCourseTranslate';
  result?: Maybe<CourseTranslateCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfCourseTranslateResultArgs = {
  order?: InputMaybe<Array<CourseTranslateSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseTranslateFilterInput>;
};

export type ListResponseBaseOfEmailTemplate = {
  __typename?: 'ListResponseBaseOfEmailTemplate';
  result?: Maybe<EmailTemplateCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfEmailTemplateResultArgs = {
  order?: InputMaybe<Array<EmailTemplateSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EmailTemplateFilterInput>;
};

export type ListResponseBaseOfEnthusiasticCistyState = {
  __typename?: 'ListResponseBaseOfEnthusiasticCistyState';
  result?: Maybe<EnthusiasticCistyStateCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfEnthusiasticCistyStateResultArgs = {
  order?: InputMaybe<Array<EnthusiasticCistyStateSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EnthusiasticCistyStateFilterInput>;
};

export type ListResponseBaseOfEnthusiasticCistyStatesGrouptedByStateDto = {
  __typename?: 'ListResponseBaseOfEnthusiasticCistyStatesGrouptedByStateDto';
  result?: Maybe<EnthusiasticCistyStatesGrouptedByStateDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfEnthusiasticCistyStatesGrouptedByStateDtoResultArgs =
  {
    order?: InputMaybe<
      Array<EnthusiasticCistyStatesGrouptedByStateDtoSortInput>
    >;
    skip?: InputMaybe<Scalars['Int']>;
    take?: InputMaybe<Scalars['Int']>;
    where?: InputMaybe<EnthusiasticCistyStatesGrouptedByStateDtoFilterInput>;
  };

export type ListResponseBaseOfExam = {
  __typename?: 'ListResponseBaseOfExam';
  result?: Maybe<ExamCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfExamResultArgs = {
  order?: InputMaybe<Array<ExamSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ExamFilterInput>;
};

export type ListResponseBaseOfFlagText = {
  __typename?: 'ListResponseBaseOfFlagText';
  result?: Maybe<FlagTextCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfFlagTextResultArgs = {
  order?: InputMaybe<Array<FlagTextSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FlagTextFilterInput>;
};

export type ListResponseBaseOfFlaggedContent = {
  __typename?: 'ListResponseBaseOfFlaggedContent';
  result?: Maybe<FlaggedContentCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfFlaggedContentResultArgs = {
  order?: InputMaybe<Array<FlaggedContentSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FlaggedContentFilterInput>;
};

export type ListResponseBaseOfGetProjectIBidOn = {
  __typename?: 'ListResponseBaseOfGetProjectIBidOn';
  result?: Maybe<GetProjectIBidOnCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfGetProjectIBidOnResultArgs = {
  order?: InputMaybe<Array<GetProjectIBidOnSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GetProjectIBidOnFilterInput>;
};

export type ListResponseBaseOfLeaderBoard = {
  __typename?: 'ListResponseBaseOfLeaderBoard';
  result?: Maybe<LeaderBoardCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfLeaderBoardResultArgs = {
  order?: InputMaybe<Array<LeaderBoardSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LeaderBoardFilterInput>;
};

export type ListResponseBaseOfMessages = {
  __typename?: 'ListResponseBaseOfMessages';
  result?: Maybe<MessagesCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfMessagesResultArgs = {
  order?: InputMaybe<Array<MessagesSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessagesFilterInput>;
};

export type ListResponseBaseOfNotification = {
  __typename?: 'ListResponseBaseOfNotification';
  result?: Maybe<NotificationCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfNotificationResultArgs = {
  order?: InputMaybe<Array<NotificationSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationFilterInput>;
};

export type ListResponseBaseOfPayment = {
  __typename?: 'ListResponseBaseOfPayment';
  result?: Maybe<PaymentCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfPaymentResultArgs = {
  order?: InputMaybe<Array<PaymentSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PaymentFilterInput>;
};

export type ListResponseBaseOfPinCategory = {
  __typename?: 'ListResponseBaseOfPinCategory';
  result?: Maybe<PinCategoryCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfPinCategoryResultArgs = {
  order?: InputMaybe<Array<PinCategorySortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PinCategoryFilterInput>;
};

export type ListResponseBaseOfProjectAndUsersGrouptedByStateDto = {
  __typename?: 'ListResponseBaseOfProjectAndUsersGrouptedByStateDto';
  result?: Maybe<ProjectAndUsersGrouptedByStateDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfProjectAndUsersGrouptedByStateDtoResultArgs = {
  order?: InputMaybe<Array<ProjectAndUsersGrouptedByStateDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectAndUsersGrouptedByStateDtoFilterInput>;
};

export type ListResponseBaseOfProjectDto = {
  __typename?: 'ListResponseBaseOfProjectDto';
  result?: Maybe<ProjectDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfProjectDtoResultArgs = {
  order?: InputMaybe<Array<ProjectDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
};

export type ListResponseBaseOfProjectImages = {
  __typename?: 'ListResponseBaseOfProjectImages';
  result?: Maybe<ProjectImagesCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfProjectImagesResultArgs = {
  order?: InputMaybe<Array<ProjectImagesSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectImagesFilterInput>;
};

export type ListResponseBaseOfProjectsGrouptedByCityDto = {
  __typename?: 'ListResponseBaseOfProjectsGrouptedByCityDto';
  result?: Maybe<ProjectsGrouptedByCityDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfProjectsGrouptedByCityDtoResultArgs = {
  order?: InputMaybe<Array<ProjectsGrouptedByCityDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectsGrouptedByCityDtoFilterInput>;
};

export type ListResponseBaseOfQuestionsDto = {
  __typename?: 'ListResponseBaseOfQuestionsDto';
  result?: Maybe<QuestionsDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfQuestionsDtoResultArgs = {
  order?: InputMaybe<Array<QuestionsDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QuestionsDtoFilterInput>;
};

export type ListResponseBaseOfReferall = {
  __typename?: 'ListResponseBaseOfReferall';
  result?: Maybe<ReferallCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfReferallResultArgs = {
  order?: InputMaybe<Array<ReferallSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReferallFilterInput>;
};

export type ListResponseBaseOfRegisteredUserByReferall = {
  __typename?: 'ListResponseBaseOfRegisteredUserByReferall';
  result?: Maybe<RegisteredUserByReferallCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfRegisteredUserByReferallResultArgs = {
  order?: InputMaybe<Array<RegisteredUserByReferallSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RegisteredUserByReferallFilterInput>;
};

export type ListResponseBaseOfReviewsDto = {
  __typename?: 'ListResponseBaseOfReviewsDto';
  result?: Maybe<ReviewsDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfReviewsDtoResultArgs = {
  order?: InputMaybe<Array<ReviewsDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReviewsDtoFilterInput>;
};

export type ListResponseBaseOfSlide = {
  __typename?: 'ListResponseBaseOfSlide';
  result?: Maybe<SlideCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfSlideResultArgs = {
  order?: InputMaybe<Array<SlideSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SlideFilterInput>;
};

export type ListResponseBaseOfStripeAccountRequirementsError = {
  __typename?: 'ListResponseBaseOfStripeAccountRequirementsError';
  result?: Maybe<StripeAccountRequirementsErrorCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfStripeAccountRequirementsErrorResultArgs = {
  order?: InputMaybe<Array<StripeAccountRequirementsErrorSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StripeAccountRequirementsErrorFilterInput>;
};

export type ListResponseBaseOfStripeCardDto = {
  __typename?: 'ListResponseBaseOfStripeCardDto';
  result?: Maybe<StripeCardDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfStripeCardDtoResultArgs = {
  order?: InputMaybe<Array<StripeCardDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StripeCardDtoFilterInput>;
};

export type ListResponseBaseOfTazWorkProducts = {
  __typename?: 'ListResponseBaseOfTazWorkProducts';
  result?: Maybe<TazWorkProductsCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfTazWorkProductsResultArgs = {
  order?: InputMaybe<Array<TazWorkProductsSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TazWorkProductsFilterInput>;
};

export type ListResponseBaseOfTazworkOrder = {
  __typename?: 'ListResponseBaseOfTazworkOrder';
  result?: Maybe<TazworkOrderCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfTazworkOrderResultArgs = {
  order?: InputMaybe<Array<TazworkOrderSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TazworkOrderFilterInput>;
};

export type ListResponseBaseOfTotalBalanceFromStripe = {
  __typename?: 'ListResponseBaseOfTotalBalanceFromStripe';
  result?: Maybe<TotalBalanceFromStripeCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfTotalBalanceFromStripeResultArgs = {
  order?: InputMaybe<Array<TotalBalanceFromStripeSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TotalBalanceFromStripeFilterInput>;
};

export type ListResponseBaseOfUserAddress = {
  __typename?: 'ListResponseBaseOfUserAddress';
  result?: Maybe<UserAddressCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUserAddressResultArgs = {
  order?: InputMaybe<Array<UserAddressSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserAddressFilterInput>;
};

export type ListResponseBaseOfUserCourse = {
  __typename?: 'ListResponseBaseOfUserCourse';
  result?: Maybe<UserCourseCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUserCourseResultArgs = {
  order?: InputMaybe<Array<UserCourseSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserCourseFilterInput>;
};

export type ListResponseBaseOfUserDto = {
  __typename?: 'ListResponseBaseOfUserDto';
  result?: Maybe<UserDtoCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUserDtoResultArgs = {
  order?: InputMaybe<Array<UserDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserDtoFilterInput>;
};

export type ListResponseBaseOfUserDtoSafe = {
  __typename?: 'ListResponseBaseOfUserDtoSafe';
  result?: Maybe<UserDtoSafeCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUserDtoSafeResultArgs = {
  order?: InputMaybe<Array<UserDtoSafeSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserDtoSafeFilterInput>;
};

export type ListResponseBaseOfUserImage = {
  __typename?: 'ListResponseBaseOfUserImage';
  result?: Maybe<UserImageCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUserImageResultArgs = {
  order?: InputMaybe<Array<UserImageSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserImageFilterInput>;
};

export type ListResponseBaseOfUserLikeProject = {
  __typename?: 'ListResponseBaseOfUserLikeProject';
  result?: Maybe<UserLikeProjectCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUserLikeProjectResultArgs = {
  order?: InputMaybe<Array<UserLikeProjectSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserLikeProjectFilterInput>;
};

export type ListResponseBaseOfUserMessageGroup = {
  __typename?: 'ListResponseBaseOfUserMessageGroup';
  result?: Maybe<UserMessageGroupCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUserMessageGroupResultArgs = {
  order?: InputMaybe<Array<UserMessageGroupSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserMessageGroupFilterInput>;
};

export type ListResponseBaseOfUsers = {
  __typename?: 'ListResponseBaseOfUsers';
  result?: Maybe<UsersCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUsersResultArgs = {
  order?: InputMaybe<Array<UsersSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UsersFilterInput>;
};

export type ListResponseBaseOfUsersDocument = {
  __typename?: 'ListResponseBaseOfUsersDocument';
  result?: Maybe<UsersDocumentCollectionSegment>;
  status: ResponseStatus;
};

export type ListResponseBaseOfUsersDocumentResultArgs = {
  order?: InputMaybe<Array<UsersDocumentSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UsersDocumentFilterInput>;
};

export type ListStringOperationFilterInput = {
  all?: InputMaybe<StringOperationFilterInput>;
  any?: InputMaybe<Scalars['Boolean']>;
  none?: InputMaybe<StringOperationFilterInput>;
  some?: InputMaybe<StringOperationFilterInput>;
};

export type ListerRateInfo = {
  __typename?: 'ListerRateInfo';
  avgListerRate: Scalars['Float'];
  sumHuduerRate: Scalars['Float'];
  sumListerRate: Scalars['Float'];
};

export type LowestBidDto = {
  __typename?: 'LowestBidDto';
  bidAmount: Scalars['Float'];
  bidDescription?: Maybe<Scalars['String']>;
  bidId: Scalars['Int'];
  bidStatus: BidStatus;
  huduerEmail?: Maybe<Scalars['String']>;
  huduerId: Scalars['Int'];
  huduerUsername?: Maybe<Scalars['String']>;
};

export type LowestBidDtoFilterInput = {
  and?: InputMaybe<Array<LowestBidDtoFilterInput>>;
  bidAmount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  bidDescription?: InputMaybe<StringOperationFilterInput>;
  bidId?: InputMaybe<ComparableInt32OperationFilterInput>;
  bidStatus?: InputMaybe<BidStatusOperationFilterInput>;
  huduerEmail?: InputMaybe<StringOperationFilterInput>;
  huduerId?: InputMaybe<ComparableInt32OperationFilterInput>;
  huduerUsername?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<LowestBidDtoFilterInput>>;
};

export type LowestBidDtoSortInput = {
  bidAmount?: InputMaybe<SortEnumType>;
  bidDescription?: InputMaybe<SortEnumType>;
  bidId?: InputMaybe<SortEnumType>;
  bidStatus?: InputMaybe<SortEnumType>;
  huduerEmail?: InputMaybe<SortEnumType>;
  huduerId?: InputMaybe<SortEnumType>;
  huduerUsername?: InputMaybe<SortEnumType>;
};

export type MapData = {
  __typename?: 'MapData';
  city?: Maybe<Scalars['String']>;
  cityAscii?: Maybe<Scalars['String']>;
  countyFips: Scalars['Float'];
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  stateId?: Maybe<Scalars['String']>;
  stateName?: Maybe<Scalars['String']>;
  zips?: Maybe<Scalars['String']>;
};

export type MappDto = {
  __typename?: 'MappDto';
  destinationAddresses?: Maybe<Scalars['String']>;
  distance?: Maybe<KeyValue>;
  duration?: Maybe<KeyValue>;
  durationInTraffic?: Maybe<KeyValue>;
  originAddress?: Maybe<Scalars['String']>;
};

export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO',
}

export type MediaTypeOperationFilterInput = {
  eq?: InputMaybe<MediaType>;
  in?: InputMaybe<Array<MediaType>>;
  neq?: InputMaybe<MediaType>;
  nin?: InputMaybe<Array<MediaType>>;
};

export type MessageInput = {
  conversationId?: InputMaybe<Scalars['Int']>;
  isByAmin: Scalars['Boolean'];
  isGroup: Scalars['Boolean'];
  messageType: MessageTypes;
  photoUrl?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['Int']>;
  receiverId?: InputMaybe<Scalars['Int']>;
  subject?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export enum MessageTypes {
  File = 'FILE',
  Photo = 'PHOTO',
  Text = 'TEXT',
  Video = 'VIDEO',
  Voice = 'VOICE',
}

export type MessageTypesOperationFilterInput = {
  eq?: InputMaybe<MessageTypes>;
  in?: InputMaybe<Array<MessageTypes>>;
  neq?: InputMaybe<MessageTypes>;
  nin?: InputMaybe<Array<MessageTypes>>;
};

export type Messages = {
  __typename?: 'Messages';
  conversation?: Maybe<Conversations>;
  conversationId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isEdited: Scalars['Boolean'];
  messageType: MessageTypes;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  photoUrl?: Maybe<Scalars['String']>;
  sender?: Maybe<Users>;
  senderId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
};

export type MessagesCollectionSegment = {
  __typename?: 'MessagesCollectionSegment';
  items?: Maybe<Array<Maybe<Messages>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type MessagesFilterInput = {
  and?: InputMaybe<Array<MessagesFilterInput>>;
  conversation?: InputMaybe<ConversationsFilterInput>;
  conversationId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isEdited?: InputMaybe<BooleanOperationFilterInput>;
  messageType?: InputMaybe<MessageTypesOperationFilterInput>;
  notifications?: InputMaybe<ListFilterInputTypeOfNotificationFilterInput>;
  or?: InputMaybe<Array<MessagesFilterInput>>;
  photoUrl?: InputMaybe<StringOperationFilterInput>;
  sender?: InputMaybe<UsersFilterInput>;
  senderId?: InputMaybe<ComparableInt32OperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
};

export type MessagesSortInput = {
  conversation?: InputMaybe<ConversationsSortInput>;
  conversationId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isEdited?: InputMaybe<SortEnumType>;
  messageType?: InputMaybe<SortEnumType>;
  photoUrl?: InputMaybe<SortEnumType>;
  sender?: InputMaybe<UsersSortInput>;
  senderId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CourseQuestion_CreateCourseQuestion?: Maybe<ResponseBaseOfCourseQuestion>;
  CourseQuestion_DeleteCourseQuestion?: Maybe<ResponseBaseOfCourseQuestion>;
  CourseQuestion_updateCourseQuestion?: Maybe<ResponseBaseOfCourseQuestion>;
  appRate_addAppRate?: Maybe<ResponseBaseOfAppRate>;
  bid_acceptBid?: Maybe<ResponseBaseOfAcceptBid>;
  bid_activateBid?: Maybe<ResponseBaseOfBid>;
  bid_addBid?: Maybe<ResponseBaseOfBid>;
  bid_addWorkingHours?: Maybe<ResponseBaseOfBid>;
  bid_cancellBid?: Maybe<ResponseBaseOfBid>;
  bid_cancellBidRequestConfirmationByAdmin?: Maybe<ResponseBaseOfBid>;
  bid_deleteBid?: Maybe<ResponseBaseOfBid>;
  bid_editBid?: Maybe<ResponseBaseOfBid>;
  bid_editBidByAdmin?: Maybe<ResponseBaseOfBid>;
  bid_editFeedBackByAdmin?: Maybe<ResponseBaseOfBid>;
  bid_huduFinsihedProject?: Maybe<ResponseBaseOfBid>;
  bid_rejectBid?: Maybe<ResponseBaseOfBid>;
  bid_withdrawBidForHudu?: Maybe<ResponseBaseOfBid>;
  category_addCategory?: Maybe<ListResponseBaseOfCategory>;
  category_deleteCategory?: Maybe<ResponseBaseOfCategory>;
  category_editCategory?: Maybe<ResponseBaseOfCategory>;
  category_pinCategories?: Maybe<ListResponseBaseOfPinCategory>;
  category_pinCategory?: Maybe<ResponseBaseOfPinCategory>;
  category_unPinCategory?: Maybe<ResponseBaseOfPinCategory>;
  coupon_addCoupon?: Maybe<ResponseBaseOfCoupon>;
  coupon_deleteCoupon?: Maybe<ResponseBaseOfCoupon>;
  coupon_editCoupon?: Maybe<ResponseBaseOfCoupon>;
  courseQuestionAnswer_changeCorrectAnswer?: Maybe<ResponseBaseOfCourseQuestionAnswer>;
  courseQuestionAnswer_updateCourseQuestionAnswer?: Maybe<ResponseBaseOfCourseQuestionAnswer>;
  course_createCourse?: Maybe<ResponseBaseOfCourse>;
  course_createCourseTranslate?: Maybe<ResponseBaseOfCourseTranslate>;
  course_createCourseTranslateAll?: Maybe<ListResponseBaseOfCourseTranslate>;
  course_deleteCourse?: Maybe<ResponseBaseOfCourse>;
  course_publishCourse?: Maybe<ResponseBaseOfCourse>;
  course_publishCourseSpanishTranslateStatus?: Maybe<ResponseBaseOfCourse>;
  course_updateCourse?: Maybe<ResponseBaseOfCourse>;
  course_updateCourseTranslate?: Maybe<ResponseBaseOfCourseTranslate>;
  exam_createExam?: Maybe<ResponseBaseOfExam>;
  flagText_addFlagText?: Maybe<ResponseBaseOfFlagText>;
  flagText_deleteFlagText?: Maybe<ResponseBase>;
  flagText_editFlagText?: Maybe<ResponseBaseOfFlagText>;
  flaggedContent_deleteFlaggedContent?: Maybe<ResponseBaseOfFlaggedContent>;
  flaggedContent_editFlaggedContent?: Maybe<ResponseBaseOfFlaggedContent>;
  message_createConversation?: Maybe<ResponseBaseOfConversations>;
  message_createGroupMessage?: Maybe<ResponseBaseOfMessages>;
  message_createMessage?: Maybe<ResponseBaseOfMessages>;
  message_deleteMessage?: Maybe<ResponseBaseOfMessages>;
  message_removeConversation?: Maybe<ResponseBase>;
  message_updateMessage?: Maybe<ResponseBaseOfMessages>;
  notification_addNotification?: Maybe<ListResponseBaseOfNotification>;
  notification_deleteNotification?: Maybe<ResponseBaseOfNotification>;
  notification_readNotification?: Maybe<ResponseBaseOfNotification>;
  payment_createCard?: Maybe<ResponseBaseOfBoolean>;
  payment_createEphemeralKey?: Maybe<ResponseBaseOfEphemeralKeyDto>;
  payment_isTransferEnabled?: Maybe<ResponseBaseOfBoolean>;
  payment_onboardUserInStripeConnect?: Maybe<ResponseBaseOfString>;
  payment_paymentIntent?: Maybe<ResponseBaseOfString>;
  payment_payoutForConnects?: Maybe<ResponseBaseOfString>;
  payment_widthrawUsersWallet?: Maybe<ResponseBaseOfBoolean>;
  payment_widthrawlReferallIncome?: Maybe<ResponseBaseOfBoolean>;
  project_CancellProjectRequestConfirmationByAdmin?: Maybe<ResponseBaseOfProject>;
  project_addEnthusiasticCistyState?: Maybe<ResponseBaseOfEnthusiasticCistyState>;
  project_addFeedBack?: Maybe<ResponseBaseOfBid>;
  project_addImageToProject?: Maybe<ResponseBaseOfProjectImages>;
  project_addProject?: Maybe<ResponseBaseOfProject>;
  project_addQuestion?: Maybe<ResponseBaseOfQuestion>;
  project_cancellProject?: Maybe<ResponseBaseOfProject>;
  project_deleteProject?: Maybe<ResponseBaseOfProject>;
  project_deleteQuestion?: Maybe<ResponseBaseOfQuestion>;
  project_editProject?: Maybe<ResponseBaseOfProject>;
  project_editProjectByAdmin?: Maybe<ResponseBaseOfProject>;
  project_editProjectImage?: Maybe<ResponseBaseOfProjectImages>;
  project_editQuestion?: Maybe<ResponseBaseOfQuestion>;
  project_faileProject?: Maybe<ResponseBaseOfProject>;
  project_finisheProject?: Maybe<ResponseBaseOfProject>;
  project_like?: Maybe<ResponseBaseOfUserLikeProject>;
  project_removeImageFromProject?: Maybe<ResponseBaseOfBoolean>;
  project_reopenProject?: Maybe<ResponseBaseOfProject>;
  project_reportQuestion?: Maybe<ResponseBaseOfReportQuestion>;
  project_unLikeAll?: Maybe<ListResponseBaseOfUserLikeProject>;
  project_unlike?: Maybe<ResponseBaseOfUserLikeProject>;
  project_voteQuestion?: Maybe<ResponseBaseOfUserVoteQuestion>;
  referall_generateReferallCode?: Maybe<ResponseBaseOfString>;
  slide_createSlide?: Maybe<ResponseBaseOfSlide>;
  slide_deleteSlide?: Maybe<ResponseBaseOfSlide>;
  slide_updateSlide?: Maybe<ResponseBaseOfSlide>;
  tazwork_submitOrder?: Maybe<ResponseBaseOfString>;
  tazwork_submitOrderByAdmin?: Maybe<ResponseBaseOfSubmitOrderDto>;
  translator_translate?: Maybe<ResponseBaseOfString>;
  userCourse_finishExam?: Maybe<ResponseBaseOfUserCourse>;
  userCourse_readSlide?: Maybe<ResponseBaseOfUserCourse>;
  userCourse_restartCourse?: Maybe<ResponseBaseOfUserCourse>;
  userCourse_startFreeCourse?: Maybe<ResponseBaseOfUserCourse>;
  userCourse_startPaidCourse?: Maybe<ResponseBaseOfString>;
  user_DeleteUser?: Maybe<ResponseBaseOfUsers>;
  user_UpdateLastSeen?: Maybe<ResponseBaseOfUsers>;
  user_activationNotifications?: Maybe<ResponseBaseOfUsers>;
  user_activationUser?: Maybe<ResponseBaseOfUsers>;
  user_addAddressesToUser?: Maybe<ListResponseBaseOfUserAddress>;
  user_addEmailTemplate?: Maybe<ResponseBaseOfEmailTemplate>;
  user_addImage?: Maybe<ListResponseBaseOfUserImage>;
  user_addPhoneNumber?: Maybe<ResponseBaseOfBoolean>;
  user_addUserTags?: Maybe<ResponseBaseOfUsers>;
  user_addUsersActivity?: Maybe<ResponseBaseOfBoolean>;
  user_confirmPhoneNumber?: Maybe<ResponseBaseOfBoolean>;
  user_createadmin?: Maybe<ResponseBaseOfUsers>;
  user_editAddressesOfUser?: Maybe<ResponseBaseOfUserAddress>;
  user_editImage?: Maybe<ResponseBaseOfUserImage>;
  user_removeAddressFromUser?: Maybe<ResponseBaseOfBoolean>;
  user_removeImage?: Maybe<ResponseBaseOfBoolean>;
  user_revokeAdmin?: Maybe<ResponseBaseOfUsers>;
  user_revokeAdmins?: Maybe<ListResponseBaseOfUsers>;
  user_sendEmail: ResponseStatus;
  user_shareToSocial?: Maybe<ResponseBaseOfBoolean>;
  user_signUp?: Maybe<ResponseBaseOfUsers>;
  user_signUpByInviteCode?: Maybe<ResponseBaseOfUsers>;
  user_signUpReferallCode?: Maybe<ResponseBaseOfRegisteredUserByReferall>;
  user_updateProfile?: Maybe<ResponseBaseOfUsers>;
  user_verificationUser?: Maybe<ResponseBaseOfUsers>;
  usersDocument_addUsersDocument?: Maybe<ResponseBaseOfUsersDocument>;
  usersDocument_deleteUsersDocument?: Maybe<ResponseBaseOfUsersDocument>;
  usersDocument_editUsersDocument?: Maybe<ResponseBaseOfUsersDocument>;
};

export type MutationCourseQuestion_CreateCourseQuestionArgs = {
  answerInputs?: InputMaybe<Array<InputMaybe<CourseQuestionAnswerInput>>>;
  input?: InputMaybe<CourseQuestionInput>;
};

export type MutationCourseQuestion_DeleteCourseQuestionArgs = {
  entityId: Scalars['Int'];
};

export type MutationCourseQuestion_UpdateCourseQuestionArgs = {
  answerInputs?: InputMaybe<Array<InputMaybe<CourseQuestionAnswerInput>>>;
  input?: InputMaybe<CourseQuestionInput>;
};

export type MutationAppRate_AddAppRateArgs = {
  input?: InputMaybe<AppRateInput>;
};

export type MutationBid_AcceptBidArgs = {
  bidId: Scalars['Int'];
  couponCode?: InputMaybe<Scalars['String']>;
};

export type MutationBid_ActivateBidArgs = {
  bidId: Scalars['Int'];
};

export type MutationBid_AddBidArgs = {
  bidInput?: InputMaybe<BidInput>;
};

export type MutationBid_AddWorkingHoursArgs = {
  bidId: Scalars['Int'];
  workedHours: Scalars['Float'];
};

export type MutationBid_CancellBidArgs = {
  bidId: Scalars['Int'];
  cancelBidType?: InputMaybe<CancelBidType>;
  cancellationReason?: InputMaybe<Scalars['String']>;
};

export type MutationBid_CancellBidRequestConfirmationByAdminArgs = {
  affectedToHighestProjectCompletionRate: Scalars['Boolean'];
  bidId: Scalars['Int'];
  cancellRequestStatus: CancellRequestStatus;
};

export type MutationBid_DeleteBidArgs = {
  bidId: Scalars['Int'];
};

export type MutationBid_EditBidArgs = {
  editBidInput?: InputMaybe<EditBidInput>;
};

export type MutationBid_EditBidByAdminArgs = {
  input?: InputMaybe<EditBidByAdminInput>;
};

export type MutationBid_EditFeedBackByAdminArgs = {
  editFeedbackByAdminInput?: InputMaybe<EditFeedbackByAdminInput>;
};

export type MutationBid_HuduFinsihedProjectArgs = {
  bidId: Scalars['Int'];
};

export type MutationBid_RejectBidArgs = {
  bidId: Scalars['Int'];
};

export type MutationBid_WithdrawBidForHuduArgs = {
  bidId: Scalars['Int'];
};

export type MutationCategory_AddCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};

export type MutationCategory_DeleteCategoryArgs = {
  categoryId: Scalars['Int'];
};

export type MutationCategory_EditCategoryArgs = {
  input?: InputMaybe<CategoryInput>;
};

export type MutationCategory_PinCategoriesArgs = {
  categoryIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type MutationCategory_PinCategoryArgs = {
  categoryId: Scalars['Int'];
};

export type MutationCategory_UnPinCategoryArgs = {
  categoryId: Scalars['Int'];
};

export type MutationCoupon_AddCouponArgs = {
  input?: InputMaybe<CouponInput>;
};

export type MutationCoupon_DeleteCouponArgs = {
  categoryId: Scalars['Int'];
};

export type MutationCoupon_EditCouponArgs = {
  input?: InputMaybe<CouponInput>;
};

export type MutationCourseQuestionAnswer_ChangeCorrectAnswerArgs = {
  correctAnswerId: Scalars['Int'];
};

export type MutationCourseQuestionAnswer_UpdateCourseQuestionAnswerArgs = {
  answerId: Scalars['Int'];
  value?: InputMaybe<Scalars['String']>;
};

export type MutationCourse_CreateCourseArgs = {
  courseInput?: InputMaybe<CourseInput>;
};

export type MutationCourse_CreateCourseTranslateArgs = {
  input?: InputMaybe<CourseTranslateInput>;
};

export type MutationCourse_CreateCourseTranslateAllArgs = {
  courseId: Scalars['Int'];
  languageType: LanguageType;
};

export type MutationCourse_DeleteCourseArgs = {
  entityId: Scalars['Int'];
};

export type MutationCourse_PublishCourseArgs = {
  entityId: Scalars['Int'];
};

export type MutationCourse_PublishCourseSpanishTranslateStatusArgs = {
  entityId: Scalars['Int'];
};

export type MutationCourse_UpdateCourseArgs = {
  courseInput?: InputMaybe<CourseInput>;
  entityId: Scalars['Int'];
};

export type MutationCourse_UpdateCourseTranslateArgs = {
  content?: InputMaybe<Scalars['String']>;
  entityId: Scalars['Int'];
  mediaUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type MutationExam_CreateExamArgs = {
  courseId: Scalars['Int'];
};

export type MutationFlagText_AddFlagTextArgs = {
  input?: InputMaybe<FlagTextInput>;
};

export type MutationFlagText_DeleteFlagTextArgs = {
  entityId: Scalars['Int'];
};

export type MutationFlagText_EditFlagTextArgs = {
  input?: InputMaybe<FlagTextInput>;
};

export type MutationFlaggedContent_DeleteFlaggedContentArgs = {
  categoryId: Scalars['Int'];
};

export type MutationFlaggedContent_EditFlaggedContentArgs = {
  input?: InputMaybe<FlaggedContentInput>;
};

export type MutationMessage_CreateConversationArgs = {
  input?: InputMaybe<CreateConversationInput>;
};

export type MutationMessage_CreateGroupMessageArgs = {
  messageInput?: InputMaybe<MessageInput>;
};

export type MutationMessage_CreateMessageArgs = {
  messageInput?: InputMaybe<MessageInput>;
};

export type MutationMessage_DeleteMessageArgs = {
  messageId: Scalars['Int'];
};

export type MutationMessage_RemoveConversationArgs = {
  conversationId: Scalars['Int'];
};

export type MutationMessage_UpdateMessageArgs = {
  messageId: Scalars['Int'];
  text?: InputMaybe<Scalars['String']>;
};

export type MutationNotification_AddNotificationArgs = {
  notifications?: InputMaybe<Array<InputMaybe<NotificationInputsInput>>>;
};

export type MutationNotification_DeleteNotificationArgs = {
  notificationId: Scalars['Int'];
};

export type MutationNotification_ReadNotificationArgs = {
  notificationId: Scalars['Int'];
};

export type MutationPayment_CreateCardArgs = {
  input?: InputMaybe<StripeCardInput>;
};

export type MutationPayment_OnboardUserInStripeConnectArgs = {
  isByApp: Scalars['Boolean'];
};

export type MutationPayment_PaymentIntentArgs = {
  input?: InputMaybe<PaymentIntentInput>;
};

export type MutationPayment_PayoutForConnectsArgs = {
  amount: Scalars['Decimal'];
};

export type MutationPayment_WidthrawUsersWalletArgs = {
  amount: Scalars['Decimal'];
  widthrawWalletType: WidthrawWalletType;
};

export type MutationProject_CancellProjectRequestConfirmationByAdminArgs = {
  cancellRequestStatus: CancellRequestStatus;
  projectId: Scalars['Int'];
};

export type MutationProject_AddEnthusiasticCistyStateArgs = {
  input?: InputMaybe<AddEnthusiasticCistyStateInput>;
};

export type MutationProject_AddFeedBackArgs = {
  feedbackInput?: InputMaybe<FeedbackInput>;
};

export type MutationProject_AddImageToProjectArgs = {
  alt?: InputMaybe<Scalars['String']>;
  imageAddress?: InputMaybe<Scalars['String']>;
  projectId: Scalars['Int'];
};

export type MutationProject_AddProjectArgs = {
  addProjectInput?: InputMaybe<AddProjectInput>;
};

export type MutationProject_AddQuestionArgs = {
  questionInput?: InputMaybe<QuestionInput>;
};

export type MutationProject_CancellProjectArgs = {
  cancelProjectStatus?: InputMaybe<CancelProjectStatus>;
  cancellationReason?: InputMaybe<Scalars['String']>;
  projectId: Scalars['Int'];
};

export type MutationProject_DeleteProjectArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_DeleteQuestionArgs = {
  questionId: Scalars['Int'];
};

export type MutationProject_EditProjectArgs = {
  editProjectInput?: InputMaybe<EditProjectInput>;
};

export type MutationProject_EditProjectByAdminArgs = {
  description?: InputMaybe<Scalars['String']>;
  projectId: Scalars['Int'];
};

export type MutationProject_EditProjectImageArgs = {
  input?: InputMaybe<EditProjectImagesInput>;
};

export type MutationProject_EditQuestionArgs = {
  input?: InputMaybe<EditQuestionInput>;
};

export type MutationProject_FaileProjectArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_FinisheProjectArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_LikeArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_RemoveImageFromProjectArgs = {
  imageId: Scalars['Int'];
};

export type MutationProject_ReopenProjectArgs = {
  projectId: Scalars['Int'];
};

export type MutationProject_ReportQuestionArgs = {
  input?: InputMaybe<ReportQuestionInput>;
};

export type MutationProject_UnlikeArgs = {
  projectId: Scalars['Int'];
  userId?: InputMaybe<Scalars['Int']>;
};

export type MutationProject_VoteQuestionArgs = {
  questionId: Scalars['Int'];
};

export type MutationSlide_CreateSlideArgs = {
  slideInput?: InputMaybe<SlideInput>;
};

export type MutationSlide_DeleteSlideArgs = {
  entityId: Scalars['Int'];
};

export type MutationSlide_UpdateSlideArgs = {
  entityId: Scalars['Int'];
  slideInput?: InputMaybe<SlideInput>;
};

export type MutationTazwork_SubmitOrderArgs = {
  productId: Scalars['Int'];
};

export type MutationTazwork_SubmitOrderByAdminArgs = {
  productId: Scalars['Int'];
  userId: Scalars['Int'];
};

export type MutationTranslator_TranslateArgs = {
  input?: InputMaybe<TranslateInput>;
};

export type MutationUserCourse_FinishExamArgs = {
  courseQuestionAnswersIds?: InputMaybe<Array<Scalars['Int']>>;
  userCourseId: Scalars['Int'];
};

export type MutationUserCourse_ReadSlideArgs = {
  slideId: Scalars['Int'];
  userCourseId: Scalars['Int'];
};

export type MutationUserCourse_RestartCourseArgs = {
  courseId: Scalars['Int'];
};

export type MutationUserCourse_StartFreeCourseArgs = {
  courseId: Scalars['Int'];
};

export type MutationUserCourse_StartPaidCourseArgs = {
  courseId: Scalars['Int'];
};

export type MutationUser_DeleteUserArgs = {
  userId?: InputMaybe<Scalars['Int']>;
};

export type MutationUser_ActivationNotificationsArgs = {
  input?: InputMaybe<ActivationNotificationInput>;
};

export type MutationUser_ActivationUserArgs = {
  isActive: Scalars['Boolean'];
  userId: Scalars['Int'];
};

export type MutationUser_AddAddressesToUserArgs = {
  input?: InputMaybe<Array<InputMaybe<UserAddressIputInput>>>;
};

export type MutationUser_AddEmailTemplateArgs = {
  emailTemplateInput?: InputMaybe<EmailTemplateInput>;
};

export type MutationUser_AddImageArgs = {
  input?: InputMaybe<Array<InputMaybe<UserImageInput>>>;
};

export type MutationUser_AddPhoneNumberArgs = {
  countryCode?: InputMaybe<Scalars['String']>;
  phoneNumber?: InputMaybe<Scalars['String']>;
};

export type MutationUser_AddUserTagsArgs = {
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type MutationUser_ConfirmPhoneNumberArgs = {
  verificationCode?: InputMaybe<Scalars['String']>;
};

export type MutationUser_CreateadminArgs = {
  input?: InputMaybe<AdminInput>;
};

export type MutationUser_EditAddressesOfUserArgs = {
  input?: InputMaybe<UserAddressIputInput>;
};

export type MutationUser_EditImageArgs = {
  input?: InputMaybe<UserImageInput>;
};

export type MutationUser_RemoveAddressFromUserArgs = {
  userAddressIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type MutationUser_RemoveImageArgs = {
  userImageids?: InputMaybe<Array<Scalars['Int']>>;
};

export type MutationUser_RevokeAdminArgs = {
  userId: Scalars['Int'];
};

export type MutationUser_RevokeAdminsArgs = {
  userIds?: InputMaybe<Array<Scalars['Int']>>;
};

export type MutationUser_SendEmailArgs = {
  email?: InputMaybe<EmailInput>;
};

export type MutationUser_SignUpArgs = {
  email?: InputMaybe<Scalars['String']>;
};

export type MutationUser_SignUpByInviteCodeArgs = {
  inviteCode: Scalars['Int'];
};

export type MutationUser_SignUpReferallCodeArgs = {
  referallCode?: InputMaybe<Scalars['String']>;
};

export type MutationUser_UpdateProfileArgs = {
  userInput?: InputMaybe<UserInput>;
};

export type MutationUser_VerificationUserArgs = {
  isVerified: Scalars['Boolean'];
  userId: Scalars['Int'];
};

export type MutationUsersDocument_AddUsersDocumentArgs = {
  input?: InputMaybe<UsersDocumentInput>;
};

export type MutationUsersDocument_DeleteUsersDocumentArgs = {
  documentId: Scalars['Int'];
};

export type MutationUsersDocument_EditUsersDocumentArgs = {
  input?: InputMaybe<UsersDocumentInput>;
};

export type Notification = {
  __typename?: 'Notification';
  bid?: Maybe<Bid>;
  bidId?: Maybe<Scalars['Int']>;
  createdDate: Scalars['DateTime'];
  deleteAccountDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isDeletedAccount: Scalars['Boolean'];
  isReaded: Scalars['Boolean'];
  messages?: Maybe<Messages>;
  messagesId?: Maybe<Scalars['Int']>;
  notificationType: NotificationType;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  question?: Maybe<Question>;
  questionId?: Maybe<Scalars['Int']>;
  sender?: Maybe<Users>;
  senderId?: Maybe<Scalars['Int']>;
  spanishDescription?: Maybe<Scalars['String']>;
  spanishTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type NotificationCollectionSegment = {
  __typename?: 'NotificationCollectionSegment';
  items?: Maybe<Array<Maybe<Notification>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type NotificationFilterInput = {
  and?: InputMaybe<Array<NotificationFilterInput>>;
  bid?: InputMaybe<BidFilterInput>;
  bidId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  deleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  isReaded?: InputMaybe<BooleanOperationFilterInput>;
  messages?: InputMaybe<MessagesFilterInput>;
  messagesId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  notificationType?: InputMaybe<NotificationTypeOperationFilterInput>;
  or?: InputMaybe<Array<NotificationFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  question?: InputMaybe<QuestionFilterInput>;
  questionId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  sender?: InputMaybe<UsersFilterInput>;
  senderId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  spanishDescription?: InputMaybe<StringOperationFilterInput>;
  spanishTitle?: InputMaybe<StringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type NotificationInputsInput = {
  description: Scalars['String'];
  senderId: Scalars['Int'];
  title: Scalars['String'];
  userId: Scalars['Int'];
};

export type NotificationSortInput = {
  bid?: InputMaybe<BidSortInput>;
  bidId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  deleteAccountDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDeletedAccount?: InputMaybe<SortEnumType>;
  isReaded?: InputMaybe<SortEnumType>;
  messages?: InputMaybe<MessagesSortInput>;
  messagesId?: InputMaybe<SortEnumType>;
  notificationType?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  question?: InputMaybe<QuestionSortInput>;
  questionId?: InputMaybe<SortEnumType>;
  sender?: InputMaybe<UsersSortInput>;
  senderId?: InputMaybe<SortEnumType>;
  spanishDescription?: InputMaybe<SortEnumType>;
  spanishTitle?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum NotificationType {
  BidActivatedByHudu = 'BID_ACTIVATED_BY_HUDU',
  BidApprovedByLister = 'BID_APPROVED_BY_LISTER',
  BidCancelledByHudu = 'BID_CANCELLED_BY_HUDU',
  BidRejectedByLister = 'BID_REJECTED_BY_LISTER',
  BidWasDeleted = 'BID_WAS_DELETED',
  BidWasEdited = 'BID_WAS_EDITED',
  CancellBidAfterEditProject = 'CANCELL_BID_AFTER_EDIT_PROJECT',
  CancellBidRequest = 'CANCELL_BID_REQUEST',
  CancellBidRequestAcceptedByAdmin = 'CANCELL_BID_REQUEST_ACCEPTED_BY_ADMIN',
  CancellBidRequestRejectedByAdmin = 'CANCELL_BID_REQUEST_REJECTED_BY_ADMIN',
  CancellProjectRequest = 'CANCELL_PROJECT_REQUEST',
  CancellProjectRequestAcceptedByAdmin = 'CANCELL_PROJECT_REQUEST_ACCEPTED_BY_ADMIN',
  CancellProjectRequestRejectedByAdmin = 'CANCELL_PROJECT_REQUEST_REJECTED_BY_ADMIN',
  CreateChat = 'CREATE_CHAT',
  DeleteProject = 'DELETE_PROJECT',
  FeedbackReceived = 'FEEDBACK_RECEIVED',
  HuduShouldCompleteStripeAccountToWithdraw = 'HUDU_SHOULD_COMPLETE_STRIPE_ACCOUNT_TO_WITHDRAW',
  NewBidGiven = 'NEW_BID_GIVEN',
  NewQuestionAskedOnProject = 'NEW_QUESTION_ASKED_ON_PROJECT',
  Other = 'OTHER',
  ProjectFailedByLister = 'PROJECT_FAILED_BY_LISTER',
  ProjectFavorited = 'PROJECT_FAVORITED',
  ProjectFinishedByLister = 'PROJECT_FINISHED_BY_LISTER',
  ProjectFinsihedByHudu = 'PROJECT_FINSIHED_BY_HUDU',
  ProjectWasEdited = 'PROJECT_WAS_EDITED',
  ResponseToQuestion = 'RESPONSE_TO_QUESTION',
}

export type NotificationTypeOperationFilterInput = {
  eq?: InputMaybe<NotificationType>;
  in?: InputMaybe<Array<NotificationType>>;
  neq?: InputMaybe<NotificationType>;
  nin?: InputMaybe<Array<NotificationType>>;
};

export type NullableOfBackgroundCheckTypeForDoerOperationFilterInput = {
  eq?: InputMaybe<BackgroundCheckTypeForDoer>;
  in?: InputMaybe<Array<InputMaybe<BackgroundCheckTypeForDoer>>>;
  neq?: InputMaybe<BackgroundCheckTypeForDoer>;
  nin?: InputMaybe<Array<InputMaybe<BackgroundCheckTypeForDoer>>>;
};

export type NullableOfCancelBidTypeOperationFilterInput = {
  eq?: InputMaybe<CancelBidType>;
  in?: InputMaybe<Array<InputMaybe<CancelBidType>>>;
  neq?: InputMaybe<CancelBidType>;
  nin?: InputMaybe<Array<InputMaybe<CancelBidType>>>;
};

export type NullableOfCancelProjectStatusOperationFilterInput = {
  eq?: InputMaybe<CancelProjectStatus>;
  in?: InputMaybe<Array<InputMaybe<CancelProjectStatus>>>;
  neq?: InputMaybe<CancelProjectStatus>;
  nin?: InputMaybe<Array<InputMaybe<CancelProjectStatus>>>;
};

export type NullableOfCancellRequestStatusOperationFilterInput = {
  eq?: InputMaybe<CancellRequestStatus>;
  in?: InputMaybe<Array<InputMaybe<CancellRequestStatus>>>;
  neq?: InputMaybe<CancellRequestStatus>;
  nin?: InputMaybe<Array<InputMaybe<CancellRequestStatus>>>;
};

export enum OrderStatus {
  Approved = 'APPROVED',
  NotChecked = 'NOT_CHECKED',
  Pendding = 'PENDDING',
  Rejected = 'REJECTED',
}

export type OrderStatusOperationFilterInput = {
  eq?: InputMaybe<OrderStatus>;
  in?: InputMaybe<Array<OrderStatus>>;
  neq?: InputMaybe<OrderStatus>;
  nin?: InputMaybe<Array<OrderStatus>>;
};

export enum PayType {
  ByStripe = 'BY_STRIPE',
  ByWallet = 'BY_WALLET',
  WalletAndStripe = 'WALLET_AND_STRIPE',
}

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float'];
  bid?: Maybe<Bid>;
  bidId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  createdDate: Scalars['DateTime'];
  deleteAccountDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isCancellBid: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  isDeletedAccount: Scalars['Boolean'];
  paymentConfirmationStatus: PaymentConfirmationStatus;
  paymentStatus: PaymentStatus;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  stripeChargeOrTransferOrPaymentIntentId?: Maybe<Scalars['String']>;
  tazworkOrder?: Maybe<TazworkOrder>;
  tazworkOrderId?: Maybe<Scalars['Int']>;
  user?: Maybe<Users>;
  userCourse?: Maybe<UserCourse>;
  userCourseId?: Maybe<Scalars['Int']>;
  userId: Scalars['Int'];
};

export type PaymentCollectionSegment = {
  __typename?: 'PaymentCollectionSegment';
  items?: Maybe<Array<Maybe<Payment>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export enum PaymentConfirmationStatus {
  Failed = 'FAILED',
  PenddingConfirmation = 'PENDDING_CONFIRMATION',
  Successful = 'SUCCESSFUL',
}

export type PaymentConfirmationStatusOperationFilterInput = {
  eq?: InputMaybe<PaymentConfirmationStatus>;
  in?: InputMaybe<Array<PaymentConfirmationStatus>>;
  neq?: InputMaybe<PaymentConfirmationStatus>;
  nin?: InputMaybe<Array<PaymentConfirmationStatus>>;
};

export type PaymentFilterInput = {
  amount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  and?: InputMaybe<Array<PaymentFilterInput>>;
  bid?: InputMaybe<BidFilterInput>;
  bidId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  createdAt?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  deleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isCancellBid?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<PaymentFilterInput>>;
  paymentConfirmationStatus?: InputMaybe<PaymentConfirmationStatusOperationFilterInput>;
  paymentStatus?: InputMaybe<PaymentStatusOperationFilterInput>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  stripeChargeOrTransferOrPaymentIntentId?: InputMaybe<StringOperationFilterInput>;
  tazworkOrder?: InputMaybe<TazworkOrderFilterInput>;
  tazworkOrderId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userCourse?: InputMaybe<UserCourseFilterInput>;
  userCourseId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type PaymentIntentInput = {
  amount: Scalars['Float'];
  customer?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Array<KeyValuePairOfStringAndStringInput>>;
  receiptEmail?: InputMaybe<Scalars['String']>;
};

export type PaymentSortInput = {
  amount?: InputMaybe<SortEnumType>;
  bid?: InputMaybe<BidSortInput>;
  bidId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  deleteAccountDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isCancellBid?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDeletedAccount?: InputMaybe<SortEnumType>;
  paymentConfirmationStatus?: InputMaybe<SortEnumType>;
  paymentStatus?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  stripeChargeOrTransferOrPaymentIntentId?: InputMaybe<SortEnumType>;
  tazworkOrder?: InputMaybe<TazworkOrderSortInput>;
  tazworkOrderId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userCourse?: InputMaybe<UserCourseSortInput>;
  userCourseId?: InputMaybe<SortEnumType>;
  userId?: InputMaybe<SortEnumType>;
};

export enum PaymentStatus {
  CouponUsed = 'COUPON_USED',
  CoursePayment = 'COURSE_PAYMENT',
  HuduerReceiveForCompletingTheJob = 'HUDUER_RECEIVE_FOR_COMPLETING_THE_JOB',
  HuduerReceiveForCompletingTheJobFee = 'HUDUER_RECEIVE_FOR_COMPLETING_THE_JOB_FEE',
  ListerPayForAcceptingBid = 'LISTER_PAY_FOR_ACCEPTING_BID',
  ListerPayForAcceptingBidFee = 'LISTER_PAY_FOR_ACCEPTING_BID_FEE',
  ReferalUsed = 'REFERAL_USED',
  TazWorkProductsPayment = 'TAZ_WORK_PRODUCTS_PAYMENT',
  TransferToListerAfterConfirmationOfCancelProject = 'TRANSFER_TO_LISTER_AFTER_CONFIRMATION_OF_CANCEL_PROJECT',
  UserWidthrawlForReferallRegisteration = 'USER_WIDTHRAWL_FOR_REFERALL_REGISTERATION',
  UserWidthrawlInHeldAmountOfProject = 'USER_WIDTHRAWL_IN_HELD_AMOUNT_OF_PROJECT',
}

export type PaymentStatusOperationFilterInput = {
  eq?: InputMaybe<PaymentStatus>;
  in?: InputMaybe<Array<PaymentStatus>>;
  neq?: InputMaybe<PaymentStatus>;
  nin?: InputMaybe<Array<PaymentStatus>>;
};

export type PinCategory = {
  __typename?: 'PinCategory';
  category?: Maybe<Category>;
  categoryId: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type PinCategoryCollectionSegment = {
  __typename?: 'PinCategoryCollectionSegment';
  items?: Maybe<Array<Maybe<PinCategory>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type PinCategoryFilterInput = {
  and?: InputMaybe<Array<PinCategoryFilterInput>>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<PinCategoryFilterInput>>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type PinCategorySortInput = {
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum ProductType {
  Bronze = 'BRONZE',
  Gold = 'GOLD',
  Silver = 'SILVER',
}

export type ProductTypeOperationFilterInput = {
  eq?: InputMaybe<ProductType>;
  in?: InputMaybe<Array<ProductType>>;
  neq?: InputMaybe<ProductType>;
  nin?: InputMaybe<Array<ProductType>>;
};

export type Project = {
  __typename?: 'Project';
  addressTitle?: Maybe<Scalars['String']>;
  availability: Availability;
  backgroundCheckTypeForDoer?: Maybe<BackgroundCheckTypeForDoer>;
  bids?: Maybe<Array<Maybe<Bid>>>;
  cancelProjectStatus?: Maybe<CancelProjectStatus>;
  cancellRequestStatus?: Maybe<CancellRequestStatus>;
  cancellationReason?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['Int']>;
  city?: Maybe<Scalars['String']>;
  conversations?: Maybe<Array<Maybe<Conversations>>>;
  cover?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  deleteAccountDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['String']>;
  endDate: Scalars['DateTime'];
  flaggedContents?: Maybe<Array<Maybe<FlaggedContent>>>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isDeletedAccount: Scalars['Boolean'];
  isExpiredProjectDeadLineForDuerToAddBid: Scalars['Boolean'];
  isExpiredProjectDeadLineForListerToAcceptABid: Scalars['Boolean'];
  latestCancellRequestConfirmationDate?: Maybe<Scalars['DateTime']>;
  latestCancellRequestDate?: Maybe<Scalars['DateTime']>;
  latestPaymentDateTime?: Maybe<Scalars['DateTime']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  notifications?: Maybe<Array<Maybe<Notification>>>;
  projectDeadLine: Scalars['DateTime'];
  projectImages?: Maybe<Array<Maybe<ProjectImages>>>;
  projectQuestions?: Maybe<Array<Maybe<ProjectQuestion>>>;
  projectStatus: ProjectStatus;
  questions?: Maybe<Array<Maybe<Question>>>;
  registeredUserByReferalls?: Maybe<Array<Maybe<RegisteredUserByReferall>>>;
  startDate: Scalars['DateTime'];
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
  userLikeProjects?: Maybe<Array<Maybe<UserLikeProject>>>;
  zipCode?: Maybe<Scalars['String']>;
};

export type ProjectAndUsersGrouptedByStateDto = {
  __typename?: 'ProjectAndUsersGrouptedByStateDto';
  bidCount: Scalars['Float'];
  projectCount: Scalars['Float'];
  state?: Maybe<Scalars['String']>;
  userCount: Scalars['Float'];
};

export type ProjectAndUsersGrouptedByStateDtoCollectionSegment = {
  __typename?: 'ProjectAndUsersGrouptedByStateDtoCollectionSegment';
  items?: Maybe<Array<Maybe<ProjectAndUsersGrouptedByStateDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ProjectAndUsersGrouptedByStateDtoFilterInput = {
  and?: InputMaybe<Array<ProjectAndUsersGrouptedByStateDtoFilterInput>>;
  bidCount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<ProjectAndUsersGrouptedByStateDtoFilterInput>>;
  projectCount?: InputMaybe<ComparableDoubleOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  userCount?: InputMaybe<ComparableDoubleOperationFilterInput>;
};

export type ProjectAndUsersGrouptedByStateDtoSortInput = {
  bidCount?: InputMaybe<SortEnumType>;
  projectCount?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  userCount?: InputMaybe<SortEnumType>;
};

export type ProjectCountByStatus = {
  __typename?: 'ProjectCountByStatus';
  bidding: Scalars['Int'];
  cancelled: Scalars['Int'];
  failed: Scalars['Int'];
  finished: Scalars['Int'];
  inProgress: Scalars['Int'];
};

export type ProjectDoerPaymentDetails = {
  __typename?: 'ProjectDoerPaymentDetails';
  huduerReceiveForCompletingTheJob: Scalars['Float'];
  huduerReceiveForCompletingTheJobFee: Scalars['Float'];
};

export type ProjectDto = {
  __typename?: 'ProjectDto';
  awardedBid?: Maybe<Bid>;
  bids?: Maybe<Array<Maybe<Bid>>>;
  currentDoer?: Maybe<Users>;
  currentLowBid: Scalars['Float'];
  isBidder: Scalars['Boolean'];
  isHuduFinished: Scalars['Boolean'];
  isLiked: Scalars['Boolean'];
  lowestBid?: Maybe<LowestBidDto>;
  project?: Maybe<Project>;
  projectQuestions?: Maybe<Array<Maybe<Scalars['String']>>>;
  yourLowesBid?: Maybe<Scalars['Float']>;
};

export type ProjectDtoCollectionSegment = {
  __typename?: 'ProjectDtoCollectionSegment';
  items?: Maybe<Array<Maybe<ProjectDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ProjectDtoFilterInput = {
  and?: InputMaybe<Array<ProjectDtoFilterInput>>;
  awardedBid?: InputMaybe<BidFilterInput>;
  bids?: InputMaybe<ListFilterInputTypeOfBidFilterInput>;
  currentDoer?: InputMaybe<UsersFilterInput>;
  currentLowBid?: InputMaybe<ComparableDoubleOperationFilterInput>;
  isBidder?: InputMaybe<BooleanOperationFilterInput>;
  isHuduFinished?: InputMaybe<BooleanOperationFilterInput>;
  isLiked?: InputMaybe<BooleanOperationFilterInput>;
  lowestBid?: InputMaybe<LowestBidDtoFilterInput>;
  or?: InputMaybe<Array<ProjectDtoFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectQuestions?: InputMaybe<ListStringOperationFilterInput>;
  yourLowesBid?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
};

export type ProjectDtoSortInput = {
  awardedBid?: InputMaybe<BidSortInput>;
  currentDoer?: InputMaybe<UsersSortInput>;
  currentLowBid?: InputMaybe<SortEnumType>;
  isBidder?: InputMaybe<SortEnumType>;
  isHuduFinished?: InputMaybe<SortEnumType>;
  isLiked?: InputMaybe<SortEnumType>;
  lowestBid?: InputMaybe<LowestBidDtoSortInput>;
  project?: InputMaybe<ProjectSortInput>;
  yourLowesBid?: InputMaybe<SortEnumType>;
};

export enum ProjectFilter {
  ClosetToCurrentLocation = 'CLOSET_TO_CURRENT_LOCATION',
  HighToLowBids = 'HIGH_TO_LOW_BIDS',
  LowToHighBids = 'LOW_TO_HIGH_BIDS',
  MyZipCode = 'MY_ZIP_CODE',
  NewestToOldest = 'NEWEST_TO_OLDEST',
  OldestToNewest = 'OLDEST_TO_NEWEST',
  OldestToNewestByProjectDeadLine = 'OLDEST_TO_NEWEST_BY_PROJECT_DEAD_LINE',
}

export type ProjectFilterInput = {
  addressTitle?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<ProjectFilterInput>>;
  availability?: InputMaybe<AvailabilityOperationFilterInput>;
  backgroundCheckTypeForDoer?: InputMaybe<NullableOfBackgroundCheckTypeForDoerOperationFilterInput>;
  bids?: InputMaybe<ListFilterInputTypeOfBidFilterInput>;
  cancelProjectStatus?: InputMaybe<NullableOfCancelProjectStatusOperationFilterInput>;
  cancellRequestStatus?: InputMaybe<NullableOfCancellRequestStatusOperationFilterInput>;
  cancellationReason?: InputMaybe<StringOperationFilterInput>;
  category?: InputMaybe<CategoryFilterInput>;
  categoryId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  city?: InputMaybe<StringOperationFilterInput>;
  conversations?: InputMaybe<ListFilterInputTypeOfConversationsFilterInput>;
  cover?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  deleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  duration?: InputMaybe<StringOperationFilterInput>;
  endDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  flaggedContents?: InputMaybe<ListFilterInputTypeOfFlaggedContentFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  latestCancellRequestConfirmationDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  latestCancellRequestDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  latestPaymentDateTime?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  latitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  longitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  notifications?: InputMaybe<ListFilterInputTypeOfNotificationFilterInput>;
  or?: InputMaybe<Array<ProjectFilterInput>>;
  projectDeadLine?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  projectImages?: InputMaybe<ListFilterInputTypeOfProjectImagesFilterInput>;
  projectQuestions?: InputMaybe<ListFilterInputTypeOfProjectQuestionFilterInput>;
  projectStatus?: InputMaybe<ProjectStatusOperationFilterInput>;
  questions?: InputMaybe<ListFilterInputTypeOfQuestionFilterInput>;
  registeredUserByReferalls?: InputMaybe<ListFilterInputTypeOfRegisteredUserByReferallFilterInput>;
  startDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  streetAddress?: InputMaybe<StringOperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
  userLikeProjects?: InputMaybe<ListFilterInputTypeOfUserLikeProjectFilterInput>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

export type ProjectImages = {
  __typename?: 'ProjectImages';
  alt?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  imageAddress?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
};

export type ProjectImagesCollectionSegment = {
  __typename?: 'ProjectImagesCollectionSegment';
  items?: Maybe<Array<Maybe<ProjectImages>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ProjectImagesFilterInput = {
  alt?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<ProjectImagesFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  imageAddress?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ProjectImagesFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type ProjectImagesInput = {
  alt?: InputMaybe<Scalars['String']>;
  imageAddress?: InputMaybe<Scalars['String']>;
};

export type ProjectImagesSortInput = {
  alt?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  imageAddress?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
};

export type ProjectOrderVmInput = {
  order: Scalars['Int'];
  projectStatus: ProjectStatus;
};

export type ProjectPaymentDetailsDto = {
  __typename?: 'ProjectPaymentDetailsDto';
  couponUsed: Scalars['Float'];
  doerFee: Scalars['Float'];
  doerReceipt: Scalars['Float'];
  listerPayForAcceptingBid: Scalars['Float'];
  listerPayForAcceptingBidFee: Scalars['Float'];
};

export type ProjectQuestion = {
  __typename?: 'ProjectQuestion';
  projectId?: Maybe<Scalars['Int']>;
  question?: Maybe<Scalars['String']>;
};

export type ProjectQuestionFilterInput = {
  and?: InputMaybe<Array<ProjectQuestionFilterInput>>;
  or?: InputMaybe<Array<ProjectQuestionFilterInput>>;
  projectId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  question?: InputMaybe<StringOperationFilterInput>;
};

export type ProjectQuestionInput = {
  projectId?: InputMaybe<Scalars['Int']>;
  question?: InputMaybe<Scalars['String']>;
};

export type ProjectSortInput = {
  addressTitle?: InputMaybe<SortEnumType>;
  availability?: InputMaybe<SortEnumType>;
  backgroundCheckTypeForDoer?: InputMaybe<SortEnumType>;
  cancelProjectStatus?: InputMaybe<SortEnumType>;
  cancellRequestStatus?: InputMaybe<SortEnumType>;
  cancellationReason?: InputMaybe<SortEnumType>;
  category?: InputMaybe<CategorySortInput>;
  categoryId?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  cover?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  deleteAccountDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  duration?: InputMaybe<SortEnumType>;
  endDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDeletedAccount?: InputMaybe<SortEnumType>;
  latestCancellRequestConfirmationDate?: InputMaybe<SortEnumType>;
  latestCancellRequestDate?: InputMaybe<SortEnumType>;
  latestPaymentDateTime?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  projectDeadLine?: InputMaybe<SortEnumType>;
  projectStatus?: InputMaybe<SortEnumType>;
  startDate?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  streetAddress?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export enum ProjectStatus {
  Bidding = 'BIDDING',
  Cancelled = 'CANCELLED',
  Failed = 'FAILED',
  Finished = 'FINISHED',
  InProgress = 'IN_PROGRESS',
}

export type ProjectStatusOperationFilterInput = {
  eq?: InputMaybe<ProjectStatus>;
  in?: InputMaybe<Array<ProjectStatus>>;
  neq?: InputMaybe<ProjectStatus>;
  nin?: InputMaybe<Array<ProjectStatus>>;
};

export type ProjectsGrouptedByCityDto = {
  __typename?: 'ProjectsGrouptedByCityDto';
  city?: Maybe<Scalars['String']>;
  count: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  zipCode?: Maybe<Scalars['String']>;
};

export type ProjectsGrouptedByCityDtoCollectionSegment = {
  __typename?: 'ProjectsGrouptedByCityDtoCollectionSegment';
  items?: Maybe<Array<Maybe<ProjectsGrouptedByCityDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ProjectsGrouptedByCityDtoFilterInput = {
  and?: InputMaybe<Array<ProjectsGrouptedByCityDtoFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  count?: InputMaybe<ComparableInt32OperationFilterInput>;
  latitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  longitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<ProjectsGrouptedByCityDtoFilterInput>>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

export type ProjectsGrouptedByCityDtoSortInput = {
  city?: InputMaybe<SortEnumType>;
  count?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename?: 'Query';
  Slide_getSlide?: Maybe<SingleResponseBaseOfSlide>;
  Slide_getSlides?: Maybe<ListResponseBaseOfSlide>;
  achievement_getAchievement?: Maybe<ResponseBaseOfAchievementDto>;
  appRate_getAppRate?: Maybe<ResponseBaseOfAppRate>;
  appRate_getAppRates?: Maybe<ListResponseBaseOfAppRate>;
  badge_getBadge?: Maybe<ResponseBaseOfBadge>;
  badge_getBadges?: Maybe<ListResponseBaseOfBadge>;
  bid_getAcceptBidDetails?: Maybe<ResponseBaseOfAcceptBid>;
  bid_getBid?: Maybe<ResponseBaseOfBid>;
  bid_getBids?: Maybe<ListResponseBaseOfBid>;
  bid_getBidsInProjectDetailsTab?: Maybe<ResponseBaseOfBidsInProjectDetailsTabDto>;
  bid_getBidsOrdedByBidSatatus?: Maybe<ListResponseBaseOfBid>;
  category_getCategories?: Maybe<ListResponseBaseOfCategoryDto>;
  category_getCategory?: Maybe<ResponseBaseOfCategory>;
  category_getCourseTopCategories?: Maybe<ListResponseBaseOfCourseTopCategoryDto>;
  category_getPinedCategories?: Maybe<ListResponseBaseOfPinCategory>;
  chatGpt_createChatUsingAzure?: Maybe<ResponseBaseOfChatGptResponseDto>;
  coupon_getActivities?: Maybe<ListResponseBaseOfCouponActivityDto>;
  coupon_getCoupon?: Maybe<ResponseBaseOfCoupon>;
  coupon_getCoupons?: Maybe<ListResponseBaseOfCouponDto>;
  coupon_isCouponValid?: Maybe<ResponseBaseOfCouponValidResultDto>;
  courseQuestionAnswer_getCourseQuestionAnswer?: Maybe<SingleResponseBaseOfCourseQuestionAnswer>;
  courseQuestionAnswer_getCourseQuestionAnswers?: Maybe<ListResponseBaseOfCourseQuestionAnswer>;
  courseQuestion_getCourseQuestion?: Maybe<SingleResponseBaseOfCourseQuestion>;
  courseQuestion_getCourseQuestions?: Maybe<ListResponseBaseOfCourseQuestion>;
  course_getCourse?: Maybe<SingleResponseBaseOfCourse>;
  course_getCourseTranslate?: Maybe<SingleResponseBaseOfCourseTranslate>;
  course_getCourseTranslates?: Maybe<ListResponseBaseOfCourseTranslate>;
  course_getCourses?: Maybe<ListResponseBaseOfCourse>;
  course_getCoursesByAdmin?: Maybe<ListResponseBaseOfCourseDto>;
  dashboard_getAdminDashboard?: Maybe<ResponseBaseOfAdminDashboardDto>;
  dashboard_getProjectAndUsersGrouptedByState?: Maybe<ListResponseBaseOfProjectAndUsersGrouptedByStateDto>;
  dashboard_getTotalBalancehistory?: Maybe<ListResponseBaseOfTotalBalanceFromStripe>;
  exam_getExam?: Maybe<SingleResponseBaseOfExam>;
  exam_getExams?: Maybe<ListResponseBaseOfExam>;
  flagText_getFlagText?: Maybe<ResponseBaseOfFlagText>;
  flagText_getFlagTexts?: Maybe<ListResponseBaseOfFlagText>;
  flaggedContent_getFlaggedContent?: Maybe<ResponseBaseOfFlaggedContent>;
  flaggedContent_getFlaggedContents?: Maybe<ListResponseBaseOfFlaggedContent>;
  ip_getIps?: Maybe<Scalars['String']>;
  leaderBoard_getLeaderBoard?: Maybe<ResponseBaseOfLeaderBoard>;
  leaderBoard_getLeaderBoards?: Maybe<ListResponseBaseOfLeaderBoard>;
  leaderBoard_getUsersLeaderBoardRank?: Maybe<ResponseBaseOfInt32>;
  map_getDistance?: Maybe<MappDto>;
  message_getConversation?: Maybe<ListResponseBaseOfMessages>;
  message_getConversationForUser?: Maybe<ResponseBaseOfConversations>;
  message_getConversationsProject?: Maybe<ListResponseBaseOfConversationsProjectDto>;
  message_getGroupMembers?: Maybe<ListResponseBaseOfUserMessageGroup>;
  message_getGroups?: Maybe<ListResponseBaseOfConversationDto>;
  message_getUserMessages?: Maybe<ListResponseBaseOfConversationDto>;
  message_getUserMessagesGroupedByUser?: Maybe<ListResponseBaseOfConversationDto>;
  message_hasUnreadChat?: Maybe<ResponseBaseOfBoolean>;
  notification_getNotifications?: Maybe<ListResponseBaseOfNotification>;
  payment_getAllPayments?: Maybe<ListResponseBaseOfPayment>;
  payment_getClientSecretOfProject?: Maybe<ResponseBaseOfClientSecretDto>;
  payment_getConnectUserBlance?: Maybe<ResponseBaseOfInt64>;
  payment_getCustomersCards?: Maybe<ListResponseBaseOfStripeCardDto>;
  payment_getProjectDoerPaymentDetails?: Maybe<ResponseBaseOfProjectDoerPaymentDetails>;
  payment_getProjectPaymentDetails?: Maybe<ResponseBaseOfProjectPaymentDetailsDto>;
  payment_getPublishableKey?: Maybe<ResponseBaseOfAppSettingsDto>;
  payment_getStripeAccountRequirements?: Maybe<ListResponseBaseOfStripeAccountRequirementsError>;
  payment_getStripeConnectUserBlance?: Maybe<ResponseBaseOfInt64>;
  payment_hasStripeAccount?: Maybe<ResponseBaseOfBoolean>;
  project_getBidCountByStatus?: Maybe<ResponseBaseOfDictionaryOfBidStatusAndInt32>;
  project_getEnthusiasticCistyState?: Maybe<ListResponseBaseOfEnthusiasticCistyState>;
  project_getEnthusiasticCistyStatesGrouptedByState?: Maybe<ListResponseBaseOfEnthusiasticCistyStatesGrouptedByStateDto>;
  project_getProject?: Maybe<SingleResponseBaseOfProjectDto>;
  project_getProjectCountByStatus?: Maybe<ResponseBaseOfProjectCountByStatus>;
  project_getProjectIBidOnGroupedByStatus?: Maybe<ListResponseBaseOfGetProjectIBidOn>;
  project_getProjectImages?: Maybe<ListResponseBaseOfProjectImages>;
  project_getProjects?: Maybe<ListResponseBaseOfProjectDto>;
  project_getProjectsGrouptedByCity?: Maybe<ListResponseBaseOfProjectsGrouptedByCityDto>;
  project_getProjectsGrouptedByCityFromMapData?: Maybe<ListResponseBaseOfProjectsGrouptedByCityDto>;
  project_getQuestions?: Maybe<ListResponseBaseOfQuestionsDto>;
  project_getUserLikeProject?: Maybe<ResponseBaseOfProjectDto>;
  project_getUserLikeProjects?: Maybe<ListResponseBaseOfProjectDto>;
  referall_getReferallCodes?: Maybe<ListResponseBaseOfReferall>;
  referall_getReferallInfo?: Maybe<ResponseBaseOfReferallInfo>;
  referall_getUsersWhomRegeisterdByReferallCode?: Maybe<ListResponseBaseOfRegisteredUserByReferall>;
  tazworkOrders_getOrders?: Maybe<ListResponseBaseOfTazworkOrder>;
  tazworkOrders_getUserTazWorkRate?: Maybe<ResponseBaseOfUserTazWorkRateDto>;
  tazworkProducts_getProducts?: Maybe<ListResponseBaseOfTazWorkProducts>;
  userCourse_getUserCompleteCourses?: Maybe<ResponseBaseOfInt32>;
  userCourse_getUserCourse?: Maybe<SingleResponseBaseOfUserCourse>;
  userCourse_getUserCourses?: Maybe<ListResponseBaseOfUserCourse>;
  user_getActiveUsers?: Maybe<ListResponseBaseOfActiveUsers>;
  user_getEmailTemplate?: Maybe<ResponseBaseOfEmailTemplate>;
  user_getEmailTemplates?: Maybe<ListResponseBaseOfEmailTemplate>;
  user_getProfile?: Maybe<ResponseBaseOfUsers>;
  user_getReviews?: Maybe<ListResponseBaseOfReviewsDto>;
  user_getUserAddresses?: Maybe<ListResponseBaseOfUserAddress>;
  user_getUserImages?: Maybe<ListResponseBaseOfUserImage>;
  user_getUsers?: Maybe<ListResponseBaseOfUsers>;
  user_getUsersForAdmin?: Maybe<ListResponseBaseOfUserDto>;
  user_getUsersSafe?: Maybe<ListResponseBaseOfUserDtoSafe>;
  user_isAddressExist?: Maybe<ResponseBaseOfBoolean>;
  user_login?: Maybe<ResponseBaseOfUsers>;
  user_usernameExist?: Maybe<ResponseBaseOfBoolean>;
  usersDocument_getUsersDocument?: Maybe<ResponseBaseOfUsersDocument>;
  usersDocument_getUsersDocuments?: Maybe<ListResponseBaseOfUsersDocument>;
};

export type QuerySlide_GetSlideArgs = {
  entityId: Scalars['Int'];
};

export type QueryAppRate_GetAppRateArgs = {
  entityId: Scalars['Int'];
};

export type QueryBadge_GetBadgeArgs = {
  entityId: Scalars['Int'];
};

export type QueryBid_GetAcceptBidDetailsArgs = {
  bidId: Scalars['Int'];
  couponCode?: InputMaybe<Scalars['String']>;
};

export type QueryBid_GetBidArgs = {
  entityId: Scalars['Int'];
};

export type QueryBid_GetBidsArgs = {
  location?: InputMaybe<Scalars['Position']>;
  projectFilter?: InputMaybe<ProjectFilter>;
};

export type QueryBid_GetBidsInProjectDetailsTabArgs = {
  projectId: Scalars['Int'];
};

export type QueryBid_GetBidsOrdedByBidSatatusArgs = {
  input?: InputMaybe<GetBidsOrdedByBidSatatusInput>;
};

export type QueryCategory_GetCategoryArgs = {
  entityId: Scalars['Int'];
};

export type QueryChatGpt_CreateChatUsingAzureArgs = {
  projectDescription?: InputMaybe<Scalars['String']>;
  projectTitle?: InputMaybe<Scalars['String']>;
};

export type QueryCoupon_GetActivitiesArgs = {
  couponId: Scalars['Int'];
};

export type QueryCoupon_GetCouponArgs = {
  couponId: Scalars['Int'];
};

export type QueryCoupon_IsCouponValidArgs = {
  couponCode?: InputMaybe<Scalars['String']>;
};

export type QueryCourseQuestionAnswer_GetCourseQuestionAnswerArgs = {
  entityId: Scalars['Int'];
};

export type QueryCourseQuestion_GetCourseQuestionArgs = {
  entityId: Scalars['Int'];
};

export type QueryCourse_GetCourseArgs = {
  entityId: Scalars['Int'];
};

export type QueryCourse_GetCourseTranslateArgs = {
  entityId: Scalars['Int'];
};

export type QueryDashboard_GetAdminDashboardArgs = {
  endDate?: InputMaybe<Scalars['DateTime']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type QueryDashboard_GetProjectAndUsersGrouptedByStateArgs = {
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
};

export type QueryExam_GetExamArgs = {
  entityId: Scalars['Int'];
};

export type QueryFlagText_GetFlagTextArgs = {
  entityId: Scalars['Int'];
};

export type QueryFlaggedContent_GetFlaggedContentArgs = {
  id: Scalars['Int'];
};

export type QueryLeaderBoard_GetLeaderBoardArgs = {
  id: Scalars['Int'];
};

export type QueryLeaderBoard_GetUsersLeaderBoardRankArgs = {
  userId: Scalars['Int'];
};

export type QueryMap_GetDistanceArgs = {
  destination?: InputMaybe<Scalars['String']>;
  origin?: InputMaybe<Scalars['String']>;
};

export type QueryMessage_GetConversationArgs = {
  conversationId: Scalars['Int'];
  currentUserId?: InputMaybe<Scalars['Int']>;
};

export type QueryMessage_GetConversationForUserArgs = {
  currentUserId?: InputMaybe<Scalars['Int']>;
  otherUserId: Scalars['Int'];
  projectId?: InputMaybe<Scalars['Int']>;
};

export type QueryMessage_GetConversationsProjectArgs = {
  userId: Scalars['Int'];
};

export type QueryMessage_GetGroupMembersArgs = {
  conversationId: Scalars['Int'];
};

export type QueryMessage_GetGroupsArgs = {
  userId: Scalars['Int'];
};

export type QueryMessage_GetUserMessagesArgs = {
  currentUserId?: InputMaybe<Scalars['Int']>;
};

export type QueryMessage_GetUserMessagesGroupedByUserArgs = {
  currentUserId?: InputMaybe<Scalars['Int']>;
};

export type QueryMessage_HasUnreadChatArgs = {
  currentUserId?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
};

export type QueryPayment_GetClientSecretOfProjectArgs = {
  projectId: Scalars['Int'];
};

export type QueryPayment_GetCustomersCardsArgs = {
  limit: Scalars['Long'];
};

export type QueryPayment_GetProjectDoerPaymentDetailsArgs = {
  userId: Scalars['Int'];
};

export type QueryPayment_GetProjectPaymentDetailsArgs = {
  projectId: Scalars['Int'];
};

export type QueryProject_GetBidCountByStatusArgs = {
  huduerId: Scalars['Int'];
};

export type QueryProject_GetProjectArgs = {
  projectId: Scalars['Int'];
};

export type QueryProject_GetProjectCountByStatusArgs = {
  listerId: Scalars['Int'];
};

export type QueryProject_GetProjectIBidOnGroupedByStatusArgs = {
  userId: Scalars['Int'];
};

export type QueryProject_GetProjectImagesArgs = {
  projectId: Scalars['Int'];
};

export type QueryProject_GetProjectsArgs = {
  isMyBid: Scalars['Boolean'];
  location?: InputMaybe<Scalars['Position']>;
  projectFilter?: InputMaybe<ProjectFilter>;
  projectOrderVms?: InputMaybe<Array<InputMaybe<ProjectOrderVmInput>>>;
};

export type QueryProject_GetQuestionsArgs = {
  isIllegal?: InputMaybe<Scalars['Boolean']>;
};

export type QueryProject_GetUserLikeProjectArgs = {
  projectId: Scalars['Int'];
};

export type QueryProject_GetUserLikeProjectsArgs = {
  location?: InputMaybe<Scalars['Position']>;
  projectFilter?: InputMaybe<ProjectFilter>;
};

export type QueryReferall_GetReferallInfoArgs = {
  userId: Scalars['Int'];
};

export type QueryReferall_GetUsersWhomRegeisterdByReferallCodeArgs = {
  userId: Scalars['Int'];
};

export type QueryTazworkOrders_GetUserTazWorkRateArgs = {
  userId: Scalars['Int'];
};

export type QueryUserCourse_GetUserCompleteCoursesArgs = {
  userId: Scalars['Int'];
};

export type QueryUserCourse_GetUserCourseArgs = {
  entityId: Scalars['Int'];
};

export type QueryUser_GetEmailTemplateArgs = {
  entityId: Scalars['Int'];
};

export type QueryUser_GetProfileArgs = {
  userId: Scalars['Int'];
};

export type QueryUser_GetReviewsArgs = {
  getReviewType: GetReviewType;
  userId: Scalars['Int'];
};

export type QueryUser_GetUserAddressesArgs = {
  userId: Scalars['Int'];
};

export type QueryUser_GetUserImagesArgs = {
  userId: Scalars['Int'];
};

export type QueryUser_IsAddressExistArgs = {
  input?: InputMaybe<UserAddressIputInput>;
};

export type QueryUser_UsernameExistArgs = {
  userId?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type QueryUsersDocument_GetUsersDocumentArgs = {
  entityId: Scalars['Int'];
};

export type Question = {
  __typename?: 'Question';
  childrenQuestions?: Maybe<Array<Maybe<Question>>>;
  createdDate: Scalars['DateTime'];
  deleteAccountDate: Scalars['DateTime'];
  editedDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isDeletedAccount: Scalars['Boolean'];
  isEdited: Scalars['Boolean'];
  isIllegal: Scalars['Boolean'];
  isPin: Scalars['Boolean'];
  parentId?: Maybe<Scalars['Int']>;
  parentQuestion?: Maybe<Question>;
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
  upVote: Scalars['Int'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type QuestionDto = {
  __typename?: 'QuestionDto';
  question?: Maybe<Scalars['String']>;
};

export type QuestionFilterInput = {
  and?: InputMaybe<Array<QuestionFilterInput>>;
  childrenQuestions?: InputMaybe<ListFilterInputTypeOfQuestionFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  deleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  editedDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  isEdited?: InputMaybe<BooleanOperationFilterInput>;
  isIllegal?: InputMaybe<BooleanOperationFilterInput>;
  isPin?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<QuestionFilterInput>>;
  parentId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  parentQuestion?: InputMaybe<QuestionFilterInput>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  text?: InputMaybe<StringOperationFilterInput>;
  upVote?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type QuestionInput = {
  parentId?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  text: Scalars['String'];
};

export type QuestionSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  deleteAccountDate?: InputMaybe<SortEnumType>;
  editedDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDeletedAccount?: InputMaybe<SortEnumType>;
  isEdited?: InputMaybe<SortEnumType>;
  isIllegal?: InputMaybe<SortEnumType>;
  isPin?: InputMaybe<SortEnumType>;
  parentId?: InputMaybe<SortEnumType>;
  parentQuestion?: InputMaybe<QuestionSortInput>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  text?: InputMaybe<SortEnumType>;
  upVote?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type QuestionsDto = {
  __typename?: 'QuestionsDto';
  isUpVoted: Scalars['Boolean'];
  question?: Maybe<Question>;
};

export type QuestionsDtoCollectionSegment = {
  __typename?: 'QuestionsDtoCollectionSegment';
  items?: Maybe<Array<Maybe<QuestionsDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type QuestionsDtoFilterInput = {
  and?: InputMaybe<Array<QuestionsDtoFilterInput>>;
  isUpVoted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<QuestionsDtoFilterInput>>;
  question?: InputMaybe<QuestionFilterInput>;
};

export type QuestionsDtoSortInput = {
  isUpVoted?: InputMaybe<SortEnumType>;
  question?: InputMaybe<QuestionSortInput>;
};

export type Referall = {
  __typename?: 'Referall';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  referallCode?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type ReferallCollectionSegment = {
  __typename?: 'ReferallCollectionSegment';
  items?: Maybe<Array<Maybe<Referall>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ReferallFilterInput = {
  and?: InputMaybe<Array<ReferallFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<ReferallFilterInput>>;
  referallCode?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type ReferallInfo = {
  __typename?: 'ReferallInfo';
  earnedPts: Scalars['Float'];
  sucessfullReferall: Scalars['Int'];
  totalRewarded: Scalars['Float'];
  totalSignedUpUserWithMyReferall: Scalars['Int'];
};

export type ReferallSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  referallCode?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type RegisteredUserByReferall = {
  __typename?: 'RegisteredUserByReferall';
  amount?: Maybe<Scalars['Float']>;
  createdDate: Scalars['DateTime'];
  hasFinishedProject: Scalars['Boolean'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isPaidToUser: Scalars['Boolean'];
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  referalOwner?: Maybe<Users>;
  referalOwnerId: Scalars['Int'];
  referalUser?: Maybe<Users>;
  referalUserId: Scalars['Int'];
  referallCode?: Maybe<Scalars['String']>;
};

export type RegisteredUserByReferallCollectionSegment = {
  __typename?: 'RegisteredUserByReferallCollectionSegment';
  items?: Maybe<Array<Maybe<RegisteredUserByReferall>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type RegisteredUserByReferallFilterInput = {
  amount?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  and?: InputMaybe<Array<RegisteredUserByReferallFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  hasFinishedProject?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isPaidToUser?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<RegisteredUserByReferallFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  referalOwner?: InputMaybe<UsersFilterInput>;
  referalOwnerId?: InputMaybe<ComparableInt32OperationFilterInput>;
  referalUser?: InputMaybe<UsersFilterInput>;
  referalUserId?: InputMaybe<ComparableInt32OperationFilterInput>;
  referallCode?: InputMaybe<StringOperationFilterInput>;
};

export type RegisteredUserByReferallSortInput = {
  amount?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  hasFinishedProject?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isPaidToUser?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  referalOwner?: InputMaybe<UsersSortInput>;
  referalOwnerId?: InputMaybe<SortEnumType>;
  referalUser?: InputMaybe<UsersSortInput>;
  referalUserId?: InputMaybe<SortEnumType>;
  referallCode?: InputMaybe<SortEnumType>;
};

export type ReportQuestion = {
  __typename?: 'ReportQuestion';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  question?: Maybe<Question>;
  questionId: Scalars['Int'];
  reason?: Maybe<Scalars['String']>;
  reporter?: Maybe<Users>;
  reporterId: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
};

export type ReportQuestionInput = {
  questionId: Scalars['Int'];
  reason?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};

export type ResponseBase = {
  __typename?: 'ResponseBase';
  status: ResponseStatus;
};

export type ResponseBaseOfAcceptBid = {
  __typename?: 'ResponseBaseOfAcceptBid';
  result?: Maybe<AcceptBid>;
  status: ResponseStatus;
};

export type ResponseBaseOfAchievementDto = {
  __typename?: 'ResponseBaseOfAchievementDto';
  result?: Maybe<AchievementDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfAdminDashboardDto = {
  __typename?: 'ResponseBaseOfAdminDashboardDto';
  result?: Maybe<AdminDashboardDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfAppRate = {
  __typename?: 'ResponseBaseOfAppRate';
  result?: Maybe<AppRate>;
  status: ResponseStatus;
};

export type ResponseBaseOfAppSettingsDto = {
  __typename?: 'ResponseBaseOfAppSettingsDto';
  result?: Maybe<AppSettingsDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfBadge = {
  __typename?: 'ResponseBaseOfBadge';
  result?: Maybe<Badge>;
  status: ResponseStatus;
};

export type ResponseBaseOfBid = {
  __typename?: 'ResponseBaseOfBid';
  result?: Maybe<Bid>;
  status: ResponseStatus;
};

export type ResponseBaseOfBidsInProjectDetailsTabDto = {
  __typename?: 'ResponseBaseOfBidsInProjectDetailsTabDto';
  result?: Maybe<BidsInProjectDetailsTabDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfBoolean = {
  __typename?: 'ResponseBaseOfBoolean';
  result: Scalars['Boolean'];
  status: ResponseStatus;
};

export type ResponseBaseOfCategory = {
  __typename?: 'ResponseBaseOfCategory';
  result?: Maybe<Category>;
  status: ResponseStatus;
};

export type ResponseBaseOfChatGptResponseDto = {
  __typename?: 'ResponseBaseOfChatGptResponseDto';
  result?: Maybe<ChatGptResponseDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfClientSecretDto = {
  __typename?: 'ResponseBaseOfClientSecretDto';
  result?: Maybe<ClientSecretDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfConversations = {
  __typename?: 'ResponseBaseOfConversations';
  result?: Maybe<Conversations>;
  status: ResponseStatus;
};

export type ResponseBaseOfCoupon = {
  __typename?: 'ResponseBaseOfCoupon';
  result?: Maybe<Coupon>;
  status: ResponseStatus;
};

export type ResponseBaseOfCouponValidResultDto = {
  __typename?: 'ResponseBaseOfCouponValidResultDto';
  result?: Maybe<CouponValidResultDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfCourse = {
  __typename?: 'ResponseBaseOfCourse';
  result?: Maybe<Course>;
  status: ResponseStatus;
};

export type ResponseBaseOfCourseQuestion = {
  __typename?: 'ResponseBaseOfCourseQuestion';
  result?: Maybe<CourseQuestion>;
  status: ResponseStatus;
};

export type ResponseBaseOfCourseQuestionAnswer = {
  __typename?: 'ResponseBaseOfCourseQuestionAnswer';
  result?: Maybe<CourseQuestionAnswer>;
  status: ResponseStatus;
};

export type ResponseBaseOfCourseTranslate = {
  __typename?: 'ResponseBaseOfCourseTranslate';
  result?: Maybe<CourseTranslate>;
  status: ResponseStatus;
};

export type ResponseBaseOfDictionaryOfBidStatusAndInt32 = {
  __typename?: 'ResponseBaseOfDictionaryOfBidStatusAndInt32';
  result?: Maybe<Array<KeyValuePairOfBidStatusAndInt32>>;
  status: ResponseStatus;
};

export type ResponseBaseOfEmailTemplate = {
  __typename?: 'ResponseBaseOfEmailTemplate';
  result?: Maybe<EmailTemplate>;
  status: ResponseStatus;
};

export type ResponseBaseOfEnthusiasticCistyState = {
  __typename?: 'ResponseBaseOfEnthusiasticCistyState';
  result?: Maybe<EnthusiasticCistyState>;
  status: ResponseStatus;
};

export type ResponseBaseOfEphemeralKeyDto = {
  __typename?: 'ResponseBaseOfEphemeralKeyDto';
  result?: Maybe<EphemeralKeyDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfExam = {
  __typename?: 'ResponseBaseOfExam';
  result?: Maybe<Exam>;
  status: ResponseStatus;
};

export type ResponseBaseOfFlagText = {
  __typename?: 'ResponseBaseOfFlagText';
  result?: Maybe<FlagText>;
  status: ResponseStatus;
};

export type ResponseBaseOfFlaggedContent = {
  __typename?: 'ResponseBaseOfFlaggedContent';
  result?: Maybe<FlaggedContent>;
  status: ResponseStatus;
};

export type ResponseBaseOfInt32 = {
  __typename?: 'ResponseBaseOfInt32';
  result: Scalars['Int'];
  status: ResponseStatus;
};

export type ResponseBaseOfInt64 = {
  __typename?: 'ResponseBaseOfInt64';
  result: Scalars['Long'];
  status: ResponseStatus;
};

export type ResponseBaseOfLeaderBoard = {
  __typename?: 'ResponseBaseOfLeaderBoard';
  result?: Maybe<LeaderBoard>;
  status: ResponseStatus;
};

export type ResponseBaseOfMessages = {
  __typename?: 'ResponseBaseOfMessages';
  result?: Maybe<Messages>;
  status: ResponseStatus;
};

export type ResponseBaseOfNotification = {
  __typename?: 'ResponseBaseOfNotification';
  result?: Maybe<Notification>;
  status: ResponseStatus;
};

export type ResponseBaseOfPinCategory = {
  __typename?: 'ResponseBaseOfPinCategory';
  result?: Maybe<PinCategory>;
  status: ResponseStatus;
};

export type ResponseBaseOfProject = {
  __typename?: 'ResponseBaseOfProject';
  result?: Maybe<Project>;
  status: ResponseStatus;
};

export type ResponseBaseOfProjectCountByStatus = {
  __typename?: 'ResponseBaseOfProjectCountByStatus';
  result?: Maybe<ProjectCountByStatus>;
  status: ResponseStatus;
};

export type ResponseBaseOfProjectDoerPaymentDetails = {
  __typename?: 'ResponseBaseOfProjectDoerPaymentDetails';
  result?: Maybe<ProjectDoerPaymentDetails>;
  status: ResponseStatus;
};

export type ResponseBaseOfProjectDto = {
  __typename?: 'ResponseBaseOfProjectDto';
  result?: Maybe<ProjectDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfProjectImages = {
  __typename?: 'ResponseBaseOfProjectImages';
  result?: Maybe<ProjectImages>;
  status: ResponseStatus;
};

export type ResponseBaseOfProjectPaymentDetailsDto = {
  __typename?: 'ResponseBaseOfProjectPaymentDetailsDto';
  result?: Maybe<ProjectPaymentDetailsDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfQuestion = {
  __typename?: 'ResponseBaseOfQuestion';
  result?: Maybe<Question>;
  status: ResponseStatus;
};

export type ResponseBaseOfReferallInfo = {
  __typename?: 'ResponseBaseOfReferallInfo';
  result?: Maybe<ReferallInfo>;
  status: ResponseStatus;
};

export type ResponseBaseOfRegisteredUserByReferall = {
  __typename?: 'ResponseBaseOfRegisteredUserByReferall';
  result?: Maybe<RegisteredUserByReferall>;
  status: ResponseStatus;
};

export type ResponseBaseOfReportQuestion = {
  __typename?: 'ResponseBaseOfReportQuestion';
  result?: Maybe<ReportQuestion>;
  status: ResponseStatus;
};

export type ResponseBaseOfSlide = {
  __typename?: 'ResponseBaseOfSlide';
  result?: Maybe<Slide>;
  status: ResponseStatus;
};

export type ResponseBaseOfString = {
  __typename?: 'ResponseBaseOfString';
  result?: Maybe<Scalars['String']>;
  status: ResponseStatus;
};

export type ResponseBaseOfSubmitOrderDto = {
  __typename?: 'ResponseBaseOfSubmitOrderDto';
  result?: Maybe<SubmitOrderDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfUserAddress = {
  __typename?: 'ResponseBaseOfUserAddress';
  result?: Maybe<UserAddress>;
  status: ResponseStatus;
};

export type ResponseBaseOfUserCourse = {
  __typename?: 'ResponseBaseOfUserCourse';
  result?: Maybe<UserCourse>;
  status: ResponseStatus;
};

export type ResponseBaseOfUserImage = {
  __typename?: 'ResponseBaseOfUserImage';
  result?: Maybe<UserImage>;
  status: ResponseStatus;
};

export type ResponseBaseOfUserLikeProject = {
  __typename?: 'ResponseBaseOfUserLikeProject';
  result?: Maybe<UserLikeProject>;
  status: ResponseStatus;
};

export type ResponseBaseOfUserTazWorkRateDto = {
  __typename?: 'ResponseBaseOfUserTazWorkRateDto';
  result?: Maybe<UserTazWorkRateDto>;
  status: ResponseStatus;
};

export type ResponseBaseOfUserVoteQuestion = {
  __typename?: 'ResponseBaseOfUserVoteQuestion';
  result?: Maybe<UserVoteQuestion>;
  status: ResponseStatus;
};

export type ResponseBaseOfUsers = {
  __typename?: 'ResponseBaseOfUsers';
  result?: Maybe<Users>;
  status: ResponseStatus;
};

export type ResponseBaseOfUsersDocument = {
  __typename?: 'ResponseBaseOfUsersDocument';
  result?: Maybe<UsersDocument>;
  status: ResponseStatus;
};

export enum ResponseStatus {
  AccessDenied = 'ACCESS_DENIED',
  ActiveBidsExist = 'ACTIVE_BIDS_EXIST',
  AlreadyExist = 'ALREADY_EXIST',
  AlreadyFollowed = 'ALREADY_FOLLOWED',
  AlreadyRemoved = 'ALREADY_REMOVED',
  AuthenticationFailed = 'AUTHENTICATION_FAILED',
  CommentNotFound = 'COMMENT_NOT_FOUND',
  DiffrenetIds = 'DIFFRENET_IDS',
  DurationIsRequired = 'DURATION_IS_REQUIRED',
  Failed = 'FAILED',
  FailedPayment = 'FAILED_PAYMENT',
  FailedToWidthraw = 'FAILED_TO_WIDTHRAW',
  HostNotFound = 'HOST_NOT_FOUND',
  HudurAccountNeedsToHaveTransferEnabled = 'HUDUR_ACCOUNT_NEEDS_TO_HAVE_TRANSFER_ENABLED',
  InvalidTimeRange = 'INVALID_TIME_RANGE',
  InvalidTimeSyntax = 'INVALID_TIME_SYNTAX',
  InProgressBidExist = 'IN_PROGRESS_BID_EXIST',
  InValidAmountForStripePayment = 'IN_VALID_AMOUNT_FOR_STRIPE_PAYMENT',
  NotAllowed = 'NOT_ALLOWED',
  NotEnoughData = 'NOT_ENOUGH_DATA',
  NotFound = 'NOT_FOUND',
  PlatFormDontHaveEnoughBalanceInStripAccount = 'PLAT_FORM_DONT_HAVE_ENOUGH_BALANCE_IN_STRIP_ACCOUNT',
  PostNotFound = 'POST_NOT_FOUND',
  SameId = 'SAME_ID',
  SelfBidNotAllowed = 'SELF_BID_NOT_ALLOWED',
  SelfMessageNotAllowed = 'SELF_MESSAGE_NOT_ALLOWED',
  SessionNotFound = 'SESSION_NOT_FOUND',
  StripeAccountNeedsToHaveTransferEnabled = 'STRIPE_ACCOUNT_NEEDS_TO_HAVE_TRANSFER_ENABLED',
  StripeAccountNotExist = 'STRIPE_ACCOUNT_NOT_EXIST',
  Success = 'SUCCESS',
  TimeConflict = 'TIME_CONFLICT',
  UnknownError = 'UNKNOWN_ERROR',
  UsernameAlreadyExist = 'USERNAME_ALREADY_EXIST',
  UserDontHaveEnoughBalanceInStripAccount = 'USER_DONT_HAVE_ENOUGH_BALANCE_IN_STRIP_ACCOUNT',
  UserDontHaveStripeAccount = 'USER_DONT_HAVE_STRIPE_ACCOUNT',
  UserIsNotActive = 'USER_IS_NOT_ACTIVE',
  UserNotFound = 'USER_NOT_FOUND',
}

export type ReviewsDto = {
  __typename?: 'ReviewsDto';
  count: Scalars['Float'];
  score: Scalars['Float'];
};

export type ReviewsDtoCollectionSegment = {
  __typename?: 'ReviewsDtoCollectionSegment';
  items?: Maybe<Array<Maybe<ReviewsDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type ReviewsDtoFilterInput = {
  and?: InputMaybe<Array<ReviewsDtoFilterInput>>;
  count?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<ReviewsDtoFilterInput>>;
  score?: InputMaybe<ComparableDoubleOperationFilterInput>;
};

export type ReviewsDtoSortInput = {
  count?: InputMaybe<SortEnumType>;
  score?: InputMaybe<SortEnumType>;
};

export type SingleOrderDto = {
  __typename?: 'SingleOrderDto';
  code?: Maybe<Scalars['String']>;
  externalIdentifier?: Maybe<Scalars['String']>;
  orderStatus?: Maybe<Scalars['String']>;
  reportDecision?: Maybe<Scalars['String']>;
};

export type SingleResponseBaseOfCourse = {
  __typename?: 'SingleResponseBaseOfCourse';
  result?: Maybe<Course>;
  status: ResponseStatus;
};

export type SingleResponseBaseOfCourseQuestion = {
  __typename?: 'SingleResponseBaseOfCourseQuestion';
  result?: Maybe<CourseQuestion>;
  status: ResponseStatus;
};

export type SingleResponseBaseOfCourseQuestionAnswer = {
  __typename?: 'SingleResponseBaseOfCourseQuestionAnswer';
  result?: Maybe<CourseQuestionAnswer>;
  status: ResponseStatus;
};

export type SingleResponseBaseOfCourseTranslate = {
  __typename?: 'SingleResponseBaseOfCourseTranslate';
  result?: Maybe<CourseTranslate>;
  status: ResponseStatus;
};

export type SingleResponseBaseOfExam = {
  __typename?: 'SingleResponseBaseOfExam';
  result?: Maybe<Exam>;
  status: ResponseStatus;
};

export type SingleResponseBaseOfProjectDto = {
  __typename?: 'SingleResponseBaseOfProjectDto';
  result?: Maybe<ProjectDto>;
  status: ResponseStatus;
};

export type SingleResponseBaseOfSlide = {
  __typename?: 'SingleResponseBaseOfSlide';
  result?: Maybe<Slide>;
  status: ResponseStatus;
};

export type SingleResponseBaseOfUserCourse = {
  __typename?: 'SingleResponseBaseOfUserCourse';
  result?: Maybe<UserCourse>;
  status: ResponseStatus;
};

export type Slide = {
  __typename?: 'Slide';
  course?: Maybe<Course>;
  courseId: Scalars['Int'];
  courseTranslates?: Maybe<Array<Maybe<CourseTranslate>>>;
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  mediaType: MediaType;
  mediaUrl?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  userCourses?: Maybe<Array<Maybe<UserCourse>>>;
};

export type SlideCollectionSegment = {
  __typename?: 'SlideCollectionSegment';
  items?: Maybe<Array<Maybe<Slide>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type SlideFilterInput = {
  and?: InputMaybe<Array<SlideFilterInput>>;
  course?: InputMaybe<CourseFilterInput>;
  courseId?: InputMaybe<ComparableInt32OperationFilterInput>;
  courseTranslates?: InputMaybe<ListFilterInputTypeOfCourseTranslateFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  mediaType?: InputMaybe<MediaTypeOperationFilterInput>;
  mediaUrl?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SlideFilterInput>>;
  order?: InputMaybe<ComparableInt32OperationFilterInput>;
  title?: InputMaybe<StringOperationFilterInput>;
  userCourses?: InputMaybe<ListFilterInputTypeOfUserCourseFilterInput>;
};

export type SlideInput = {
  courseId: Scalars['Int'];
  description?: InputMaybe<Scalars['String']>;
  mediaType: MediaType;
  mediaUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SlideSortInput = {
  course?: InputMaybe<CourseSortInput>;
  courseId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  mediaType?: InputMaybe<SortEnumType>;
  mediaUrl?: InputMaybe<SortEnumType>;
  order?: InputMaybe<SortEnumType>;
  title?: InputMaybe<SortEnumType>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum SpanishTranslateStatus {
  Draft = 'DRAFT',
  None = 'NONE',
  Published = 'PUBLISHED',
}

export type SpanishTranslateStatusOperationFilterInput = {
  eq?: InputMaybe<SpanishTranslateStatus>;
  in?: InputMaybe<Array<SpanishTranslateStatus>>;
  neq?: InputMaybe<SpanishTranslateStatus>;
  nin?: InputMaybe<Array<SpanishTranslateStatus>>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  ncontains?: InputMaybe<Scalars['String']>;
  nendsWith?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  nstartsWith?: InputMaybe<Scalars['String']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StripeAccountRequirementsError = {
  __typename?: 'StripeAccountRequirementsError';
  code?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  requirement?: Maybe<Scalars['String']>;
};

export type StripeAccountRequirementsErrorCollectionSegment = {
  __typename?: 'StripeAccountRequirementsErrorCollectionSegment';
  items?: Maybe<Array<Maybe<StripeAccountRequirementsError>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type StripeAccountRequirementsErrorFilterInput = {
  and?: InputMaybe<Array<StripeAccountRequirementsErrorFilterInput>>;
  code?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StripeAccountRequirementsErrorFilterInput>>;
  reason?: InputMaybe<StringOperationFilterInput>;
  requirement?: InputMaybe<StringOperationFilterInput>;
};

export type StripeAccountRequirementsErrorSortInput = {
  code?: InputMaybe<SortEnumType>;
  reason?: InputMaybe<SortEnumType>;
  requirement?: InputMaybe<SortEnumType>;
};

export type StripeCardDto = {
  __typename?: 'StripeCardDto';
  accountId?: Maybe<Scalars['String']>;
  addressCity?: Maybe<Scalars['String']>;
  addressCountry?: Maybe<Scalars['String']>;
  addressLine1?: Maybe<Scalars['String']>;
  addressLine1Check?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  addressState?: Maybe<Scalars['String']>;
  addressZip?: Maybe<Scalars['String']>;
  addressZipCheck?: Maybe<Scalars['String']>;
  availablePayoutMethods?: Maybe<Array<Maybe<Scalars['String']>>>;
  brand?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  customerId?: Maybe<Scalars['String']>;
  cvcCheck?: Maybe<Scalars['String']>;
  defaultForCurrency?: Maybe<Scalars['Boolean']>;
  deleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  dynamicLast4?: Maybe<Scalars['String']>;
  expMonth: Scalars['Long'];
  expYear: Scalars['Long'];
  fingerprint?: Maybe<Scalars['String']>;
  funding?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  iin?: Maybe<Scalars['String']>;
  issuer?: Maybe<Scalars['String']>;
  last4?: Maybe<Scalars['String']>;
  metadata?: Maybe<Array<KeyValuePairOfStringAndString>>;
  name?: Maybe<Scalars['String']>;
  object?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  tokenizationMethod?: Maybe<Scalars['String']>;
};

export type StripeCardDtoCollectionSegment = {
  __typename?: 'StripeCardDtoCollectionSegment';
  items?: Maybe<Array<Maybe<StripeCardDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type StripeCardDtoFilterInput = {
  accountId?: InputMaybe<StringOperationFilterInput>;
  addressCity?: InputMaybe<StringOperationFilterInput>;
  addressCountry?: InputMaybe<StringOperationFilterInput>;
  addressLine1?: InputMaybe<StringOperationFilterInput>;
  addressLine1Check?: InputMaybe<StringOperationFilterInput>;
  addressLine2?: InputMaybe<StringOperationFilterInput>;
  addressState?: InputMaybe<StringOperationFilterInput>;
  addressZip?: InputMaybe<StringOperationFilterInput>;
  addressZipCheck?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<StripeCardDtoFilterInput>>;
  availablePayoutMethods?: InputMaybe<ListStringOperationFilterInput>;
  brand?: InputMaybe<StringOperationFilterInput>;
  country?: InputMaybe<StringOperationFilterInput>;
  currency?: InputMaybe<StringOperationFilterInput>;
  customerId?: InputMaybe<StringOperationFilterInput>;
  cvcCheck?: InputMaybe<StringOperationFilterInput>;
  defaultForCurrency?: InputMaybe<BooleanOperationFilterInput>;
  deleted?: InputMaybe<BooleanOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  dynamicLast4?: InputMaybe<StringOperationFilterInput>;
  expMonth?: InputMaybe<ComparableInt64OperationFilterInput>;
  expYear?: InputMaybe<ComparableInt64OperationFilterInput>;
  fingerprint?: InputMaybe<StringOperationFilterInput>;
  funding?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<StringOperationFilterInput>;
  iin?: InputMaybe<StringOperationFilterInput>;
  issuer?: InputMaybe<StringOperationFilterInput>;
  last4?: InputMaybe<StringOperationFilterInput>;
  metadata?: InputMaybe<DictionaryOfStringAndStringFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  object?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<StripeCardDtoFilterInput>>;
  status?: InputMaybe<StringOperationFilterInput>;
  tokenizationMethod?: InputMaybe<StringOperationFilterInput>;
};

export type StripeCardDtoSortInput = {
  accountId?: InputMaybe<SortEnumType>;
  addressCity?: InputMaybe<SortEnumType>;
  addressCountry?: InputMaybe<SortEnumType>;
  addressLine1?: InputMaybe<SortEnumType>;
  addressLine1Check?: InputMaybe<SortEnumType>;
  addressLine2?: InputMaybe<SortEnumType>;
  addressState?: InputMaybe<SortEnumType>;
  addressZip?: InputMaybe<SortEnumType>;
  addressZipCheck?: InputMaybe<SortEnumType>;
  brand?: InputMaybe<SortEnumType>;
  country?: InputMaybe<SortEnumType>;
  currency?: InputMaybe<SortEnumType>;
  customerId?: InputMaybe<SortEnumType>;
  cvcCheck?: InputMaybe<SortEnumType>;
  defaultForCurrency?: InputMaybe<SortEnumType>;
  deleted?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  dynamicLast4?: InputMaybe<SortEnumType>;
  expMonth?: InputMaybe<SortEnumType>;
  expYear?: InputMaybe<SortEnumType>;
  fingerprint?: InputMaybe<SortEnumType>;
  funding?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  iin?: InputMaybe<SortEnumType>;
  issuer?: InputMaybe<SortEnumType>;
  last4?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  object?: InputMaybe<SortEnumType>;
  status?: InputMaybe<SortEnumType>;
  tokenizationMethod?: InputMaybe<SortEnumType>;
};

export type StripeCardInput = {
  cVC: Scalars['String'];
  cardNumder: Scalars['String'];
  currency?: InputMaybe<Scalars['String']>;
  expMonth: Scalars['Long'];
  expYear: Scalars['Long'];
  isDefaultSource: Scalars['Boolean'];
  name?: InputMaybe<Scalars['String']>;
};

export type SubCategoryInput = {
  spanishText: Scalars['String'];
  text: Scalars['String'];
};

export type SubmitOrderDto = {
  __typename?: 'SubmitOrderDto';
  code?: Maybe<Scalars['String']>;
  orderGuid?: Maybe<Scalars['String']>;
  quickappApplicantLink?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  messageAdded?: Maybe<Messages>;
  notificationAdded?: Maybe<Notification>;
  subscribeToGroupMessageAdded?: Maybe<Messages>;
};

export type SubscriptionMessageAddedArgs = {
  userId: Scalars['Int'];
};

export type SubscriptionNotificationAddedArgs = {
  userId: Scalars['Int'];
};

export type SubscriptionSubscribeToGroupMessageAddedArgs = {
  userId: Scalars['Int'];
};

export type TazWorkProducts = {
  __typename?: 'TazWorkProducts';
  alternateName?: Maybe<Scalars['String']>;
  clientProductGuid?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  price: Scalars['Float'];
  productGuid?: Maybe<Scalars['String']>;
  productName?: Maybe<Scalars['String']>;
  productType: ProductType;
  tazworkOrders?: Maybe<Array<Maybe<TazworkOrder>>>;
};

export type TazWorkProductsCollectionSegment = {
  __typename?: 'TazWorkProductsCollectionSegment';
  items?: Maybe<Array<Maybe<TazWorkProducts>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type TazWorkProductsFilterInput = {
  alternateName?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<TazWorkProductsFilterInput>>;
  clientProductGuid?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<TazWorkProductsFilterInput>>;
  price?: InputMaybe<ComparableDoubleOperationFilterInput>;
  productGuid?: InputMaybe<StringOperationFilterInput>;
  productName?: InputMaybe<StringOperationFilterInput>;
  productType?: InputMaybe<ProductTypeOperationFilterInput>;
  tazworkOrders?: InputMaybe<ListFilterInputTypeOfTazworkOrderFilterInput>;
};

export type TazWorkProductsSortInput = {
  alternateName?: InputMaybe<SortEnumType>;
  clientProductGuid?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  price?: InputMaybe<SortEnumType>;
  productGuid?: InputMaybe<SortEnumType>;
  productName?: InputMaybe<SortEnumType>;
  productType?: InputMaybe<SortEnumType>;
};

export type TazworkOrder = {
  __typename?: 'TazworkOrder';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  orderGuid?: Maybe<Scalars['String']>;
  orderStatus: OrderStatus;
  payment?: Maybe<Payment>;
  product?: Maybe<TazWorkProducts>;
  productId: Scalars['Int'];
  quickappApplicantLink?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type TazworkOrderCollectionSegment = {
  __typename?: 'TazworkOrderCollectionSegment';
  items?: Maybe<Array<Maybe<TazworkOrder>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type TazworkOrderFilterInput = {
  and?: InputMaybe<Array<TazworkOrderFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<TazworkOrderFilterInput>>;
  orderGuid?: InputMaybe<StringOperationFilterInput>;
  orderStatus?: InputMaybe<OrderStatusOperationFilterInput>;
  payment?: InputMaybe<PaymentFilterInput>;
  product?: InputMaybe<TazWorkProductsFilterInput>;
  productId?: InputMaybe<ComparableInt32OperationFilterInput>;
  quickappApplicantLink?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type TazworkOrderSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  orderGuid?: InputMaybe<SortEnumType>;
  orderStatus?: InputMaybe<SortEnumType>;
  payment?: InputMaybe<PaymentSortInput>;
  product?: InputMaybe<TazWorkProductsSortInput>;
  productId?: InputMaybe<SortEnumType>;
  quickappApplicantLink?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type TotalBalanceFromStripe = {
  __typename?: 'TotalBalanceFromStripe';
  amount?: Maybe<Scalars['Float']>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
};

export type TotalBalanceFromStripeCollectionSegment = {
  __typename?: 'TotalBalanceFromStripeCollectionSegment';
  items?: Maybe<Array<Maybe<TotalBalanceFromStripe>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type TotalBalanceFromStripeFilterInput = {
  amount?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  and?: InputMaybe<Array<TotalBalanceFromStripeFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<TotalBalanceFromStripeFilterInput>>;
};

export type TotalBalanceFromStripeSortInput = {
  amount?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
};

export type TranslateInput = {
  fromLanguage?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  toLanguage?: InputMaybe<Scalars['String']>;
};

export type UserAddress = {
  __typename?: 'UserAddress';
  addressTitle?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
  zipCode?: Maybe<Scalars['String']>;
};

export type UserAddressCollectionSegment = {
  __typename?: 'UserAddressCollectionSegment';
  items?: Maybe<Array<Maybe<UserAddress>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UserAddressFilterInput = {
  addressTitle?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<UserAddressFilterInput>>;
  city?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  latitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  longitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<UserAddressFilterInput>>;
  state?: InputMaybe<StringOperationFilterInput>;
  streetAddress?: InputMaybe<StringOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

export type UserAddressIputInput = {
  addressTitle: Scalars['String'];
  city: Scalars['String'];
  id?: InputMaybe<Scalars['Int']>;
  point?: InputMaybe<Scalars['Position']>;
  state: Scalars['String'];
  streetAddress: Scalars['String'];
  zipCode: Scalars['String'];
};

export type UserAddressSortInput = {
  addressTitle?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  streetAddress?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export type UserCourse = {
  __typename?: 'UserCourse';
  completedPercent: Scalars['Float'];
  course?: Maybe<Course>;
  courseId: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  currentSlide?: Maybe<Slide>;
  currentSlideId: Scalars['Int'];
  hasCertificate: Scalars['Boolean'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isSlidesEnded: Scalars['Boolean'];
  payment?: Maybe<Payment>;
  status: UserCourseStatus;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type UserCourseCollectionSegment = {
  __typename?: 'UserCourseCollectionSegment';
  items?: Maybe<Array<Maybe<UserCourse>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UserCourseFilterInput = {
  and?: InputMaybe<Array<UserCourseFilterInput>>;
  completedPercent?: InputMaybe<ComparableDoubleOperationFilterInput>;
  course?: InputMaybe<CourseFilterInput>;
  courseId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  currentSlide?: InputMaybe<SlideFilterInput>;
  currentSlideId?: InputMaybe<ComparableInt32OperationFilterInput>;
  hasCertificate?: InputMaybe<BooleanOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isSlidesEnded?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UserCourseFilterInput>>;
  payment?: InputMaybe<PaymentFilterInput>;
  status?: InputMaybe<UserCourseStatusOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type UserCourseSortInput = {
  completedPercent?: InputMaybe<SortEnumType>;
  course?: InputMaybe<CourseSortInput>;
  courseId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  currentSlide?: InputMaybe<SlideSortInput>;
  currentSlideId?: InputMaybe<SortEnumType>;
  hasCertificate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isSlidesEnded?: InputMaybe<SortEnumType>;
  payment?: InputMaybe<PaymentSortInput>;
  status?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export enum UserCourseStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
}

export type UserCourseStatusOperationFilterInput = {
  eq?: InputMaybe<UserCourseStatus>;
  in?: InputMaybe<Array<UserCourseStatus>>;
  neq?: InputMaybe<UserCourseStatus>;
  nin?: InputMaybe<Array<UserCourseStatus>>;
};

export type UserDto = {
  __typename?: 'UserDto';
  hasInProgressBidAsHuduer: Scalars['Boolean'];
  hasInProgressBidAsLister: Scalars['Boolean'];
  hasInProgressProject: Scalars['Boolean'];
  numberOfAwardedProjects: Scalars['Int'];
  numberOfDoneProjects: Scalars['Int'];
  numberOfProject: Scalars['Int'];
  user?: Maybe<Users>;
};

export type UserDtoCollectionSegment = {
  __typename?: 'UserDtoCollectionSegment';
  items?: Maybe<Array<Maybe<UserDto>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UserDtoFilterInput = {
  and?: InputMaybe<Array<UserDtoFilterInput>>;
  hasInProgressBidAsHuduer?: InputMaybe<BooleanOperationFilterInput>;
  hasInProgressBidAsLister?: InputMaybe<BooleanOperationFilterInput>;
  hasInProgressProject?: InputMaybe<BooleanOperationFilterInput>;
  numberOfAwardedProjects?: InputMaybe<ComparableInt32OperationFilterInput>;
  numberOfDoneProjects?: InputMaybe<ComparableInt32OperationFilterInput>;
  numberOfProject?: InputMaybe<ComparableInt32OperationFilterInput>;
  or?: InputMaybe<Array<UserDtoFilterInput>>;
  user?: InputMaybe<UsersFilterInput>;
};

export type UserDtoSafe = {
  __typename?: 'UserDtoSafe';
  email?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imageAddress?: Maybe<Scalars['String']>;
  userName?: Maybe<Scalars['String']>;
  userTypes: UserTypes;
};

export type UserDtoSafeCollectionSegment = {
  __typename?: 'UserDtoSafeCollectionSegment';
  items?: Maybe<Array<Maybe<UserDtoSafe>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UserDtoSafeFilterInput = {
  and?: InputMaybe<Array<UserDtoSafeFilterInput>>;
  email?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  imageAddress?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<UserDtoSafeFilterInput>>;
  userName?: InputMaybe<StringOperationFilterInput>;
  userTypes?: InputMaybe<UserTypesOperationFilterInput>;
};

export type UserDtoSafeSortInput = {
  email?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  imageAddress?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
  userTypes?: InputMaybe<SortEnumType>;
};

export type UserDtoSortInput = {
  hasInProgressBidAsHuduer?: InputMaybe<SortEnumType>;
  hasInProgressBidAsLister?: InputMaybe<SortEnumType>;
  hasInProgressProject?: InputMaybe<SortEnumType>;
  numberOfAwardedProjects?: InputMaybe<SortEnumType>;
  numberOfDoneProjects?: InputMaybe<SortEnumType>;
  numberOfProject?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
};

export type UserImage = {
  __typename?: 'UserImage';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  imageAddress?: Maybe<Scalars['String']>;
  isDeleted: Scalars['Boolean'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type UserImageCollectionSegment = {
  __typename?: 'UserImageCollectionSegment';
  items?: Maybe<Array<Maybe<UserImage>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UserImageFilterInput = {
  and?: InputMaybe<Array<UserImageFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  imageAddress?: InputMaybe<StringOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UserImageFilterInput>>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type UserImageInput = {
  id?: InputMaybe<Scalars['Int']>;
  imageAddress?: InputMaybe<Scalars['String']>;
};

export type UserImageSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  imageAddress?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type UserInput = {
  bio?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  imageAddress?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  userName: Scalars['String'];
};

export type UserLikeProject = {
  __typename?: 'UserLikeProject';
  createdDate: Scalars['DateTime'];
  deleteAccountDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  isDeletedAccount: Scalars['Boolean'];
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type UserLikeProjectCollectionSegment = {
  __typename?: 'UserLikeProjectCollectionSegment';
  items?: Maybe<Array<Maybe<UserLikeProject>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UserLikeProjectFilterInput = {
  and?: InputMaybe<Array<UserLikeProjectFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  deleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UserLikeProjectFilterInput>>;
  project?: InputMaybe<ProjectFilterInput>;
  projectId?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type UserLikeProjectSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  deleteAccountDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDeletedAccount?: InputMaybe<SortEnumType>;
  project?: InputMaybe<ProjectSortInput>;
  projectId?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type UserMessageGroup = {
  __typename?: 'UserMessageGroup';
  conversation?: Maybe<Conversations>;
  conversationId: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isAdmin: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  unreadCount: Scalars['Int'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type UserMessageGroupCollectionSegment = {
  __typename?: 'UserMessageGroupCollectionSegment';
  items?: Maybe<Array<Maybe<UserMessageGroup>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UserMessageGroupFilterInput = {
  and?: InputMaybe<Array<UserMessageGroupFilterInput>>;
  conversation?: InputMaybe<ConversationsFilterInput>;
  conversationId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isAdmin?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UserMessageGroupFilterInput>>;
  unreadCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type UserMessageGroupSortInput = {
  conversation?: InputMaybe<ConversationsSortInput>;
  conversationId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isAdmin?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  unreadCount?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type UserTazWorkRateDto = {
  __typename?: 'UserTazWorkRateDto';
  bronze: OrderStatus;
  gold: OrderStatus;
  hasBackgroundCheck: Scalars['Boolean'];
  silver: OrderStatus;
};

export enum UserTypes {
  Admin = 'ADMIN',
  SuperAdmin = 'SUPER_ADMIN',
  User = 'USER',
}

export type UserTypesOperationFilterInput = {
  eq?: InputMaybe<UserTypes>;
  in?: InputMaybe<Array<UserTypes>>;
  neq?: InputMaybe<UserTypes>;
  nin?: InputMaybe<Array<UserTypes>>;
};

export type UserUsedCoupon = {
  __typename?: 'UserUsedCoupon';
  bid?: Maybe<Bid>;
  bidId?: Maybe<Scalars['Int']>;
  coupon?: Maybe<Coupon>;
  couponId: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  discountedAmount?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  percent?: Maybe<Scalars['Float']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type UserUsedCouponFilterInput = {
  and?: InputMaybe<Array<UserUsedCouponFilterInput>>;
  bid?: InputMaybe<BidFilterInput>;
  bidId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  coupon?: InputMaybe<CouponFilterInput>;
  couponId?: InputMaybe<ComparableInt32OperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  discountedAmount?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UserUsedCouponFilterInput>>;
  percent?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type UserUsedCouponSortInput = {
  bid?: InputMaybe<BidSortInput>;
  bidId?: InputMaybe<SortEnumType>;
  coupon?: InputMaybe<CouponSortInput>;
  couponId?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  discountedAmount?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  percent?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type UserVoteQuestion = {
  __typename?: 'UserVoteQuestion';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  question?: Maybe<Question>;
  questionId: Scalars['Int'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type Users = {
  __typename?: 'Users';
  applicantGuid?: Maybe<Scalars['String']>;
  asHuduRates?: Maybe<Scalars['Float']>;
  asListerRates?: Maybe<Scalars['Float']>;
  averHuduerWorkedHours?: Maybe<Scalars['Float']>;
  averageRate?: Maybe<Scalars['Float']>;
  backgroundCheckStatus: BackgroundCheckStatus;
  bidNotification?: Maybe<Scalars['Boolean']>;
  bio?: Maybe<Scalars['String']>;
  chatNotification?: Maybe<Scalars['Boolean']>;
  city?: Maybe<Scalars['String']>;
  createdDate: Scalars['DateTime'];
  deleteAccountDate: Scalars['DateTime'];
  earnPtsFromReferall: Scalars['Float'];
  email?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  highestProjectCompletionRate?: Maybe<Scalars['Float']>;
  huduersWhoRatedToMeCount: Scalars['Int'];
  id: Scalars['Int'];
  imageAddress?: Maybe<Scalars['String']>;
  inviteCode: Scalars['Int'];
  inviteCodeExpireDate: Scalars['DateTime'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  isDeletedAccount: Scalars['Boolean'];
  isPhoneNumberVerified: Scalars['Boolean'];
  isSignUpDone: Scalars['Boolean'];
  isUsedReferallDiscount: Scalars['Boolean'];
  isUserUsedReferallDiscount: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  languageType: LanguageType;
  lastActivityDate?: Maybe<Scalars['DateTime']>;
  lastBidDate?: Maybe<Scalars['DateTime']>;
  lastCommentDate?: Maybe<Scalars['DateTime']>;
  lastListingDate?: Maybe<Scalars['DateTime']>;
  lastLoginDate?: Maybe<Scalars['DateTime']>;
  lastName?: Maybe<Scalars['String']>;
  lastSeen: Scalars['DateTime'];
  latitude: Scalars['Float'];
  leaderBoardPoint: Scalars['Int'];
  listersWhoRatedToMeCount: Scalars['Int'];
  longitude: Scalars['Float'];
  phoneNumber?: Maybe<Scalars['String']>;
  phoneNumberConfirmed: Scalars['Boolean'];
  projectNotification?: Maybe<Scalars['Boolean']>;
  questionNotification?: Maybe<Scalars['Boolean']>;
  referallDiscountProjectId?: Maybe<Scalars['Int']>;
  state?: Maybe<Scalars['String']>;
  streetAddress?: Maybe<Scalars['String']>;
  stripeAccountId?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  tazworkOrders?: Maybe<Array<Maybe<TazworkOrder>>>;
  totalRewardedFromReferall: Scalars['Float'];
  userCourses?: Maybe<Array<Maybe<UserCourse>>>;
  userImages?: Maybe<Array<Maybe<UserImage>>>;
  userName?: Maybe<Scalars['String']>;
  userTypes: UserTypes;
  userUsedCoupons?: Maybe<Array<Maybe<UserUsedCoupon>>>;
  wallet?: Maybe<Scalars['Decimal']>;
  zipCode?: Maybe<Scalars['String']>;
};

export type UsersActivityDay = {
  __typename?: 'UsersActivityDay';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type UsersCollectionSegment = {
  __typename?: 'UsersCollectionSegment';
  items?: Maybe<Array<Maybe<Users>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UsersDocument = {
  __typename?: 'UsersDocument';
  createdDate: Scalars['DateTime'];
  file?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export type UsersDocumentCollectionSegment = {
  __typename?: 'UsersDocumentCollectionSegment';
  items?: Maybe<Array<Maybe<UsersDocument>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

export type UsersDocumentFilterInput = {
  and?: InputMaybe<Array<UsersDocumentFilterInput>>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  file?: InputMaybe<StringOperationFilterInput>;
  fileName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  or?: InputMaybe<Array<UsersDocumentFilterInput>>;
  user?: InputMaybe<UsersFilterInput>;
  userId?: InputMaybe<ComparableInt32OperationFilterInput>;
};

export type UsersDocumentInput = {
  file?: InputMaybe<Scalars['String']>;
  fileName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type UsersDocumentSortInput = {
  createdDate?: InputMaybe<SortEnumType>;
  file?: InputMaybe<SortEnumType>;
  fileName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  user?: InputMaybe<UsersSortInput>;
  userId?: InputMaybe<SortEnumType>;
};

export type UsersFilterInput = {
  and?: InputMaybe<Array<UsersFilterInput>>;
  applicantGuid?: InputMaybe<StringOperationFilterInput>;
  asHuduRates?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  asListerRates?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  averHuduerWorkedHours?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  averageRate?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  backgroundCheckStatus?: InputMaybe<BackgroundCheckStatusOperationFilterInput>;
  bidNotification?: InputMaybe<BooleanOperationFilterInput>;
  bio?: InputMaybe<StringOperationFilterInput>;
  chatNotification?: InputMaybe<BooleanOperationFilterInput>;
  city?: InputMaybe<StringOperationFilterInput>;
  createdDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  deleteAccountDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  earnPtsFromReferall?: InputMaybe<ComparableDoubleOperationFilterInput>;
  email?: InputMaybe<StringOperationFilterInput>;
  externalId?: InputMaybe<StringOperationFilterInput>;
  firstName?: InputMaybe<StringOperationFilterInput>;
  highestProjectCompletionRate?: InputMaybe<ComparableNullableOfDoubleOperationFilterInput>;
  huduersWhoRatedToMeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  id?: InputMaybe<ComparableInt32OperationFilterInput>;
  imageAddress?: InputMaybe<StringOperationFilterInput>;
  inviteCode?: InputMaybe<ComparableInt32OperationFilterInput>;
  inviteCodeExpireDate?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  isActive?: InputMaybe<BooleanOperationFilterInput>;
  isDeleted?: InputMaybe<BooleanOperationFilterInput>;
  isDeletedAccount?: InputMaybe<BooleanOperationFilterInput>;
  isSignUpDone?: InputMaybe<BooleanOperationFilterInput>;
  isUsedReferallDiscount?: InputMaybe<BooleanOperationFilterInput>;
  isVerified?: InputMaybe<BooleanOperationFilterInput>;
  languageType?: InputMaybe<LanguageTypeOperationFilterInput>;
  lastActivityDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  lastBidDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  lastCommentDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  lastListingDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  lastLoginDate?: InputMaybe<ComparableNullableOfDateTimeOperationFilterInput>;
  lastName?: InputMaybe<StringOperationFilterInput>;
  lastSeen?: InputMaybe<ComparableDateTimeOperationFilterInput>;
  latitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  leaderBoardPoint?: InputMaybe<ComparableInt32OperationFilterInput>;
  listersWhoRatedToMeCount?: InputMaybe<ComparableInt32OperationFilterInput>;
  longitude?: InputMaybe<ComparableDoubleOperationFilterInput>;
  or?: InputMaybe<Array<UsersFilterInput>>;
  phoneNumber?: InputMaybe<StringOperationFilterInput>;
  phoneNumberConfirmed?: InputMaybe<BooleanOperationFilterInput>;
  projectNotification?: InputMaybe<BooleanOperationFilterInput>;
  questionNotification?: InputMaybe<BooleanOperationFilterInput>;
  referallDiscountProjectId?: InputMaybe<ComparableNullableOfInt32OperationFilterInput>;
  state?: InputMaybe<StringOperationFilterInput>;
  streetAddress?: InputMaybe<StringOperationFilterInput>;
  stripeAccountId?: InputMaybe<StringOperationFilterInput>;
  stripeCustomerId?: InputMaybe<StringOperationFilterInput>;
  tazworkOrders?: InputMaybe<ListFilterInputTypeOfTazworkOrderFilterInput>;
  totalRewardedFromReferall?: InputMaybe<ComparableDoubleOperationFilterInput>;
  userCourses?: InputMaybe<ListFilterInputTypeOfUserCourseFilterInput>;
  userImages?: InputMaybe<ListFilterInputTypeOfUserImageFilterInput>;
  userName?: InputMaybe<StringOperationFilterInput>;
  userTypes?: InputMaybe<UserTypesOperationFilterInput>;
  userUsedCoupons?: InputMaybe<ListFilterInputTypeOfUserUsedCouponFilterInput>;
  wallet?: InputMaybe<ComparableNullableOfDecimalOperationFilterInput>;
  zipCode?: InputMaybe<StringOperationFilterInput>;
};

export type UsersSortInput = {
  applicantGuid?: InputMaybe<SortEnumType>;
  asHuduRates?: InputMaybe<SortEnumType>;
  asListerRates?: InputMaybe<SortEnumType>;
  averHuduerWorkedHours?: InputMaybe<SortEnumType>;
  averageRate?: InputMaybe<SortEnumType>;
  backgroundCheckStatus?: InputMaybe<SortEnumType>;
  bidNotification?: InputMaybe<SortEnumType>;
  bio?: InputMaybe<SortEnumType>;
  chatNotification?: InputMaybe<SortEnumType>;
  city?: InputMaybe<SortEnumType>;
  createdDate?: InputMaybe<SortEnumType>;
  deleteAccountDate?: InputMaybe<SortEnumType>;
  earnPtsFromReferall?: InputMaybe<SortEnumType>;
  email?: InputMaybe<SortEnumType>;
  externalId?: InputMaybe<SortEnumType>;
  firstName?: InputMaybe<SortEnumType>;
  highestProjectCompletionRate?: InputMaybe<SortEnumType>;
  huduersWhoRatedToMeCount?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  imageAddress?: InputMaybe<SortEnumType>;
  inviteCode?: InputMaybe<SortEnumType>;
  inviteCodeExpireDate?: InputMaybe<SortEnumType>;
  isActive?: InputMaybe<SortEnumType>;
  isDeleted?: InputMaybe<SortEnumType>;
  isDeletedAccount?: InputMaybe<SortEnumType>;
  isSignUpDone?: InputMaybe<SortEnumType>;
  isUsedReferallDiscount?: InputMaybe<SortEnumType>;
  isVerified?: InputMaybe<SortEnumType>;
  languageType?: InputMaybe<SortEnumType>;
  lastActivityDate?: InputMaybe<SortEnumType>;
  lastBidDate?: InputMaybe<SortEnumType>;
  lastCommentDate?: InputMaybe<SortEnumType>;
  lastListingDate?: InputMaybe<SortEnumType>;
  lastLoginDate?: InputMaybe<SortEnumType>;
  lastName?: InputMaybe<SortEnumType>;
  lastSeen?: InputMaybe<SortEnumType>;
  latitude?: InputMaybe<SortEnumType>;
  leaderBoardPoint?: InputMaybe<SortEnumType>;
  listersWhoRatedToMeCount?: InputMaybe<SortEnumType>;
  longitude?: InputMaybe<SortEnumType>;
  phoneNumber?: InputMaybe<SortEnumType>;
  phoneNumberConfirmed?: InputMaybe<SortEnumType>;
  projectNotification?: InputMaybe<SortEnumType>;
  questionNotification?: InputMaybe<SortEnumType>;
  referallDiscountProjectId?: InputMaybe<SortEnumType>;
  state?: InputMaybe<SortEnumType>;
  streetAddress?: InputMaybe<SortEnumType>;
  stripeAccountId?: InputMaybe<SortEnumType>;
  stripeCustomerId?: InputMaybe<SortEnumType>;
  totalRewardedFromReferall?: InputMaybe<SortEnumType>;
  userName?: InputMaybe<SortEnumType>;
  userTypes?: InputMaybe<SortEnumType>;
  wallet?: InputMaybe<SortEnumType>;
  zipCode?: InputMaybe<SortEnumType>;
};

export type UsersTag = {
  __typename?: 'UsersTag';
  createdDate: Scalars['DateTime'];
  id: Scalars['Int'];
  isDeleted: Scalars['Boolean'];
  text?: Maybe<Scalars['String']>;
  user?: Maybe<Users>;
  userId: Scalars['Int'];
};

export enum WidthrawWalletType {
  PayOut = 'PAY_OUT',
  TransferToStripe = 'TRANSFER_TO_STRIPE',
}

export type Tazwork_SubmitOrderMutationVariables = Exact<{
  productId: Scalars['Int'];
}>;

export type Tazwork_SubmitOrderMutation = {
  __typename?: 'Mutation';
  tazwork_submitOrder?: {
    __typename?: 'ResponseBaseOfString';
    result?: string | null;
    status: ResponseStatus;
  } | null;
};

export type TazworkOrders_GetOrdersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TazworkOrderFilterInput>;
  order?: InputMaybe<Array<TazworkOrderSortInput> | TazworkOrderSortInput>;
}>;

export type TazworkOrders_GetOrdersQuery = {
  __typename?: 'Query';
  tazworkOrders_getOrders?: {
    __typename?: 'ListResponseBaseOfTazworkOrder';
    status: ResponseStatus;
    result?: {
      __typename?: 'TazworkOrderCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TazworkOrder';
        userId: number;
        productId: number;
        orderGuid?: string | null;
        quickappApplicantLink?: string | null;
        orderStatus: OrderStatus;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type TazworkOrders_GetUserTazWorkRateQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type TazworkOrders_GetUserTazWorkRateQuery = {
  __typename?: 'Query';
  tazworkOrders_getUserTazWorkRate?: {
    __typename?: 'ResponseBaseOfUserTazWorkRateDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserTazWorkRateDto';
      gold: OrderStatus;
      silver: OrderStatus;
      bronze: OrderStatus;
      hasBackgroundCheck: boolean;
    } | null;
  } | null;
};

export type TazworkProducts_GetProductsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TazWorkProductsFilterInput>;
  order?: InputMaybe<
    Array<TazWorkProductsSortInput> | TazWorkProductsSortInput
  >;
}>;

export type TazworkProducts_GetProductsQuery = {
  __typename?: 'Query';
  tazworkProducts_getProducts?: {
    __typename?: 'ListResponseBaseOfTazWorkProducts';
    status: ResponseStatus;
    result?: {
      __typename?: 'TazWorkProductsCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'TazWorkProducts';
        clientProductGuid?: string | null;
        productGuid?: string | null;
        productName?: string | null;
        alternateName?: string | null;
        productType: ProductType;
        price: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type AppRate_AddAppRateMutationVariables = Exact<{
  input?: InputMaybe<AppRateInput>;
}>;

export type AppRate_AddAppRateMutation = {
  __typename?: 'Mutation';
  appRate_addAppRate?: {
    __typename?: 'ResponseBaseOfAppRate';
    status: ResponseStatus;
    result?: {__typename?: 'AppRate'; id: number} | null;
  } | null;
};

export type Badge_GetBadgesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BadgeFilterInput>;
  order?: InputMaybe<Array<BadgeSortInput> | BadgeSortInput>;
}>;

export type Badge_GetBadgesQuery = {
  __typename?: 'Query';
  badge_getBadges?: {
    __typename?: 'ListResponseBaseOfBadge';
    status: ResponseStatus;
    result?: {
      __typename?: 'BadgeCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Badge';
        badgeType: BadgeType;
        badgeLevel: BadgeLevel;
        description?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Badge_GetBadgeQueryVariables = Exact<{
  entityId: Scalars['Int'];
}>;

export type Badge_GetBadgeQuery = {
  __typename?: 'Query';
  badge_getBadge?: {
    __typename?: 'ResponseBaseOfBadge';
    status: ResponseStatus;
    result?: {
      __typename?: 'Badge';
      badgeType: BadgeType;
      badgeLevel: BadgeLevel;
      description?: string | null;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
    } | null;
  } | null;
};

export type Bid_AcceptBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
  couponCode?: InputMaybe<Scalars['String']>;
}>;

export type Bid_AcceptBidMutation = {
  __typename?: 'Mutation';
  bid_acceptBid?: {
    __typename?: 'ResponseBaseOfAcceptBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'AcceptBid';
      clientSecret?: string | null;
      reduceFromWallet?: any | null;
      newBidAmount: number;
      stripeAmount: number;
      payType: PayType;
      walletAmountIsEqualToBidAmount: boolean;
    } | null;
  } | null;
};

export type Bid_AddBidMutationVariables = Exact<{
  bidInput?: InputMaybe<BidInput>;
}>;

export type Bid_AddBidMutation = {
  __typename?: 'Mutation';
  bid_addBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_CancellBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
  cancelBidType?: InputMaybe<CancelBidType>;
  cancellationReason?: InputMaybe<Scalars['String']>;
}>;

export type Bid_CancellBidMutation = {
  __typename?: 'Mutation';
  bid_cancellBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_ActivateBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_ActivateBidMutation = {
  __typename?: 'Mutation';
  bid_activateBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_DeleteBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_DeleteBidMutation = {
  __typename?: 'Mutation';
  bid_deleteBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_EditBidMutationVariables = Exact<{
  editBidInput?: InputMaybe<EditBidInput>;
}>;

export type Bid_EditBidMutation = {
  __typename?: 'Mutation';
  bid_editBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_RejectBidMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_RejectBidMutation = {
  __typename?: 'Mutation';
  bid_rejectBid?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_HuduFinsihedProjectMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_HuduFinsihedProjectMutation = {
  __typename?: 'Mutation';
  bid_huduFinsihedProject?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_WithdrawBidForHuduMutationVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_WithdrawBidForHuduMutation = {
  __typename?: 'Mutation';
  bid_withdrawBidForHudu?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_AddWorkingHoursMutationVariables = Exact<{
  bidId: Scalars['Int'];
  workedHours: Scalars['Float'];
}>;

export type Bid_AddWorkingHoursMutation = {
  __typename?: 'Mutation';
  bid_addWorkingHours?: {
    __typename?: 'ResponseBaseOfBid';
    status: ResponseStatus;
    result?: {__typename?: 'Bid'; id: number} | null;
  } | null;
};

export type Bid_GetBidsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BidFilterInput>;
  order?: InputMaybe<Array<BidSortInput> | BidSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  location?: InputMaybe<Scalars['Position']>;
}>;

export type Bid_GetBidsQuery = {
  __typename?: 'Query';
  bid_getBids?: {
    __typename?: 'ListResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'BidCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        createdDate: any;
        lister?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          userName?: string | null;
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          imageAddress?: string | null;
        } | null;
        hudu?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          userName?: string | null;
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          imageAddress?: string | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Bid_GetBidsInProjectDetailsTabQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Bid_GetBidsInProjectDetailsTabQuery = {
  __typename?: 'Query';
  bid_getBidsInProjectDetailsTab?: {
    __typename?: 'ResponseBaseOfBidsInProjectDetailsTabDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'BidsInProjectDetailsTabDto';
      lowestBid?: {
        __typename?: 'Bid';
        isListerDeletedAccount: boolean;
        listerDeleteAccountDate: any;
        isHuduDeletedAccount: boolean;
        huduDeleteAccountDate: any;
        hasPayment: boolean;
        bidStatus: BidStatus;
        cancelBidType?: CancelBidType | null;
        cancellationReason?: string | null;
        awardDate?: any | null;
        huduFinishedProjectDate?: any | null;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduerWorkedHours?: number | null;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        bidAnswerToQuestions?: Array<{
          __typename?: 'BidAnswerToQuestion';
          question?: string | null;
          answer?: string | null;
          id: number;
        } | null> | null;
        lister?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          deleteAccountDate: any;
          userName?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          id: number;
          asListerRates?: number | null;
          isVerified: boolean;
          imageAddress?: string | null;
        } | null;
        hudu?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          deleteAccountDate: any;
          userName?: string | null;
          imageAddress?: string | null;
          averageRate?: number | null;
          id: number;
          asHuduRates?: number | null;
          isVerified: boolean;
          highestProjectCompletionRate?: number | null;
          backgroundCheckStatus: BackgroundCheckStatus;
          userImages?: Array<{
            __typename?: 'UserImage';
            imageAddress?: string | null;
          } | null> | null;
        } | null;
        project?: {
          __typename?: 'Project';
          isDeletedAccount: boolean;
          projectDeadLine: any;
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          bids?: Array<{
            __typename?: 'Bid';
            amount: number;
            id: number;
            huduId: number;
          } | null> | null;
        } | null;
      } | null;
      bestRate?: {
        __typename?: 'Bid';
        isListerDeletedAccount: boolean;
        listerDeleteAccountDate: any;
        isHuduDeletedAccount: boolean;
        huduDeleteAccountDate: any;
        hasPayment: boolean;
        bidStatus: BidStatus;
        cancelBidType?: CancelBidType | null;
        cancellationReason?: string | null;
        awardDate?: any | null;
        huduFinishedProjectDate?: any | null;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduerWorkedHours?: number | null;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        bidAnswerToQuestions?: Array<{
          __typename?: 'BidAnswerToQuestion';
          question?: string | null;
          answer?: string | null;
          id: number;
        } | null> | null;
        lister?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          deleteAccountDate: any;
          userName?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          id: number;
          asListerRates?: number | null;
          isVerified: boolean;
          imageAddress?: string | null;
        } | null;
        hudu?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          deleteAccountDate: any;
          userName?: string | null;
          imageAddress?: string | null;
          averageRate?: number | null;
          id: number;
          asHuduRates?: number | null;
          isVerified: boolean;
          highestProjectCompletionRate?: number | null;
          backgroundCheckStatus: BackgroundCheckStatus;
          userImages?: Array<{
            __typename?: 'UserImage';
            imageAddress?: string | null;
          } | null> | null;
        } | null;
        project?: {
          __typename?: 'Project';
          isDeletedAccount: boolean;
          projectDeadLine: any;
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          bids?: Array<{
            __typename?: 'Bid';
            amount: number;
            id: number;
            huduId: number;
          } | null> | null;
        } | null;
      } | null;
      highedtProjectCompletionRate?: {
        __typename?: 'Bid';
        isListerDeletedAccount: boolean;
        listerDeleteAccountDate: any;
        isHuduDeletedAccount: boolean;
        huduDeleteAccountDate: any;
        hasPayment: boolean;
        bidStatus: BidStatus;
        cancelBidType?: CancelBidType | null;
        cancellationReason?: string | null;
        awardDate?: any | null;
        huduFinishedProjectDate?: any | null;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduerWorkedHours?: number | null;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        bidAnswerToQuestions?: Array<{
          __typename?: 'BidAnswerToQuestion';
          question?: string | null;
          answer?: string | null;
          id: number;
        } | null> | null;
        lister?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          deleteAccountDate: any;
          userName?: string | null;
          firstName?: string | null;
          lastName?: string | null;
          id: number;
          asListerRates?: number | null;
          isVerified: boolean;
          imageAddress?: string | null;
        } | null;
        hudu?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          deleteAccountDate: any;
          userName?: string | null;
          imageAddress?: string | null;
          averageRate?: number | null;
          id: number;
          asHuduRates?: number | null;
          isVerified: boolean;
          highestProjectCompletionRate?: number | null;
          backgroundCheckStatus: BackgroundCheckStatus;
          userImages?: Array<{
            __typename?: 'UserImage';
            imageAddress?: string | null;
          } | null> | null;
        } | null;
        project?: {
          __typename?: 'Project';
          isDeletedAccount: boolean;
          projectDeadLine: any;
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          bids?: Array<{
            __typename?: 'Bid';
            amount: number;
            id: number;
            huduId: number;
          } | null> | null;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type Bid_Get_User_BidsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BidFilterInput>;
  order?: InputMaybe<Array<BidSortInput> | BidSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  location?: InputMaybe<Scalars['Position']>;
}>;

export type Bid_Get_User_BidsQuery = {
  __typename?: 'Query';
  bid_getBids?: {
    __typename?: 'ListResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'BidCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Bid';
        bidStatus: BidStatus;
        amount: number;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        awardDate?: any | null;
        huduFinishedProjectDate?: any | null;
        createdDate: any;
        lister?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          userName?: string | null;
          id: number;
          firstName?: string | null;
          lastName?: string | null;
          imageAddress?: string | null;
        } | null;
        project?: {
          __typename?: 'Project';
          title?: string | null;
          description?: string | null;
          availability: Availability;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Bid_GetBidsOrdedByBidSatatusQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BidFilterInput>;
  order?: InputMaybe<Array<BidSortInput> | BidSortInput>;
  input?: InputMaybe<GetBidsOrdedByBidSatatusInput>;
}>;

export type Bid_GetBidsOrdedByBidSatatusQuery = {
  __typename?: 'Query';
  bid_getBidsOrdedByBidSatatus?: {
    __typename?: 'ListResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'BidCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Bid';
        isListerDeletedAccount: boolean;
        listerDeleteAccountDate: any;
        isHuduDeletedAccount: boolean;
        huduDeleteAccountDate: any;
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusRate?: string | null;
        awardDate?: any | null;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        bidAnswerToQuestions?: Array<{
          __typename?: 'BidAnswerToQuestion';
          question?: string | null;
          answer?: string | null;
          id: number;
        } | null> | null;
        hudu?: {
          __typename?: 'Users';
          id: number;
          userName?: string | null;
          asHuduRates?: number | null;
          highestProjectCompletionRate?: number | null;
          imageAddress?: string | null;
          email?: string | null;
          backgroundCheckStatus: BackgroundCheckStatus;
        } | null;
        project?: {
          __typename?: 'Project';
          isDeletedAccount: boolean;
          projectDeadLine: any;
          projectStatus: ProjectStatus;
          title?: string | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Bid_GetBids_MutationQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BidFilterInput>;
  order?: InputMaybe<Array<BidSortInput> | BidSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  location?: InputMaybe<Scalars['Position']>;
}>;

export type Bid_GetBids_MutationQuery = {
  __typename?: 'Query';
  bid_getBids?: {
    __typename?: 'ListResponseBaseOfBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'BidCollectionSegment';
      totalCount: number;
      items?: Array<{__typename?: 'Bid'; id: number} | null> | null;
    } | null;
  } | null;
};

export type Bid_GetAcceptBidDetailsQueryVariables = Exact<{
  bidId: Scalars['Int'];
}>;

export type Bid_GetAcceptBidDetailsQuery = {
  __typename?: 'Query';
  bid_getAcceptBidDetails?: {
    __typename?: 'ResponseBaseOfAcceptBid';
    status: ResponseStatus;
    result?: {
      __typename?: 'AcceptBid';
      clientSecret?: string | null;
      reduceFromWallet?: any | null;
      newBidAmount: number;
      stripeAmount: number;
      payType: PayType;
      walletAmountIsEqualToBidAmount: boolean;
    } | null;
  } | null;
};

export type Category_PinCategoriesMutationVariables = Exact<{
  categoryIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;

export type Category_PinCategoriesMutation = {
  __typename?: 'Mutation';
  category_pinCategories?: {
    __typename?: 'ListResponseBaseOfPinCategory';
    status: ResponseStatus;
  } | null;
};

export type Category_PinCategoryMutationVariables = Exact<{
  categoryId: Scalars['Int'];
}>;

export type Category_PinCategoryMutation = {
  __typename?: 'Mutation';
  category_pinCategory?: {
    __typename?: 'ResponseBaseOfPinCategory';
    status: ResponseStatus;
  } | null;
};

export type Category_UnPinCategoryMutationVariables = Exact<{
  categoryId: Scalars['Int'];
}>;

export type Category_UnPinCategoryMutation = {
  __typename?: 'Mutation';
  category_unPinCategory?: {
    __typename?: 'ResponseBaseOfPinCategory';
    status: ResponseStatus;
  } | null;
};

export type Category_GetPinedCategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PinCategoryFilterInput>;
  order?: InputMaybe<Array<PinCategorySortInput> | PinCategorySortInput>;
}>;

export type Category_GetPinedCategoriesQuery = {
  __typename?: 'Query';
  category_getPinedCategories?: {
    __typename?: 'ListResponseBaseOfPinCategory';
    status: ResponseStatus;
    result?: {
      __typename?: 'PinCategoryCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'PinCategory';
        categoryId: number;
        id: number;
        isDeleted: boolean;
        category?: {
          __typename?: 'Category';
          text?: string | null;
          spanishText?: string | null;
          id: number;
          parentId?: number | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type UserCourse_RestartCourseMutationVariables = Exact<{
  courseId: Scalars['Int'];
}>;

export type UserCourse_RestartCourseMutation = {
  __typename?: 'Mutation';
  userCourse_restartCourse?: {
    __typename?: 'ResponseBaseOfUserCourse';
    status: ResponseStatus;
  } | null;
};

export type UserCourse_StartFreeCourseMutationVariables = Exact<{
  courseId: Scalars['Int'];
}>;

export type UserCourse_StartFreeCourseMutation = {
  __typename?: 'Mutation';
  userCourse_startFreeCourse?: {
    __typename?: 'ResponseBaseOfUserCourse';
    status: ResponseStatus;
  } | null;
};

export type UserCourse_StartPaidCourseMutationVariables = Exact<{
  courseId: Scalars['Int'];
}>;

export type UserCourse_StartPaidCourseMutation = {
  __typename?: 'Mutation';
  userCourse_startPaidCourse?: {
    __typename?: 'ResponseBaseOfString';
    result?: string | null;
    status: ResponseStatus;
  } | null;
};

export type UserCourse_ReadSlideMutationVariables = Exact<{
  userCourseId: Scalars['Int'];
  slideId: Scalars['Int'];
}>;

export type UserCourse_ReadSlideMutation = {
  __typename?: 'Mutation';
  userCourse_readSlide?: {
    __typename?: 'ResponseBaseOfUserCourse';
    status: ResponseStatus;
  } | null;
};

export type Category_GetCourseTopCategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseTopCategoryDtoFilterInput>;
  order?: InputMaybe<
    Array<CourseTopCategoryDtoSortInput> | CourseTopCategoryDtoSortInput
  >;
}>;

export type Category_GetCourseTopCategoriesQuery = {
  __typename?: 'Query';
  category_getCourseTopCategories?: {
    __typename?: 'ListResponseBaseOfCourseTopCategoryDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'CourseTopCategoryDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'CourseTopCategoryDto';
        id: number;
        courseCount: number;
        category?: {
          __typename?: 'Category';
          text?: string | null;
          spanishText?: string | null;
          userId: number;
          parentId?: number | null;
          id: number;
          isDeleted: boolean;
          createdDate: any;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type UserCourse_GetUserCourseQueryVariables = Exact<{
  entityId: Scalars['Int'];
}>;

export type UserCourse_GetUserCourseQuery = {
  __typename?: 'Query';
  userCourse_getUserCourse?: {
    __typename?: 'SingleResponseBaseOfUserCourse';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserCourse';
      userId: number;
      courseId: number;
      currentSlideId: number;
      isSlidesEnded: boolean;
      hasCertificate: boolean;
      completedPercent: number;
      status: UserCourseStatus;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      course?: {
        __typename?: 'Course';
        slides?: Array<{
          __typename?: 'Slide';
          title?: string | null;
          description?: string | null;
          mediaUrl?: string | null;
          id: number;
        } | null> | null;
      } | null;
      currentSlide?: {__typename?: 'Slide'; id: number} | null;
    } | null;
  } | null;
};

export type Slide_GetSlidesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SlideFilterInput>;
  order?: InputMaybe<Array<SlideSortInput> | SlideSortInput>;
}>;

export type Slide_GetSlidesQuery = {
  __typename?: 'Query';
  Slide_getSlides?: {
    __typename?: 'ListResponseBaseOfSlide';
    status: ResponseStatus;
    result?: {
      __typename?: 'SlideCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Slide';
        title?: string | null;
        description?: string | null;
        mediaUrl?: string | null;
        mediaType: MediaType;
        order: number;
        courseId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type UserCourse_GetUserCompleteCoursesQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type UserCourse_GetUserCompleteCoursesQuery = {
  __typename?: 'Query';
  userCourse_getUserCompleteCourses?: {
    __typename?: 'ResponseBaseOfInt32';
    result: number;
    status: ResponseStatus;
  } | null;
};

export type Course_GetCourseQueryVariables = Exact<{
  entityId: Scalars['Int'];
}>;

export type Course_GetCourseQuery = {
  __typename?: 'Query';
  course_getCourse?: {
    __typename?: 'SingleResponseBaseOfCourse';
    status: ResponseStatus;
    result?: {
      __typename?: 'Course';
      title?: string | null;
      description?: string | null;
      mediaUrl?: string | null;
      courseStatus: CourseStatus;
      isFree: boolean;
      price: number;
      spanishTranslateStatus: SpanishTranslateStatus;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      slides?: Array<{
        __typename?: 'Slide';
        title?: string | null;
        description?: string | null;
        mediaUrl?: string | null;
        id: number;
      } | null> | null;
      courseTranslates?: Array<{
        __typename?: 'CourseTranslate';
        languageType: LanguageType;
        title?: string | null;
        content?: string | null;
        slide?: {
          __typename?: 'Slide';
          title?: string | null;
          description?: string | null;
        } | null;
      } | null> | null;
      exam?: {
        __typename?: 'Exam';
        courseQuestions?: Array<{
          __typename?: 'CourseQuestion';
          number: number;
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type UserCourse_GetUserCoursesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserCourseFilterInput>;
  order?: InputMaybe<Array<UserCourseSortInput> | UserCourseSortInput>;
}>;

export type UserCourse_GetUserCoursesQuery = {
  __typename?: 'Query';
  userCourse_getUserCourses?: {
    __typename?: 'ListResponseBaseOfUserCourse';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserCourseCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'UserCourse';
        userId: number;
        courseId: number;
        currentSlideId: number;
        isSlidesEnded: boolean;
        hasCertificate: boolean;
        completedPercent: number;
        status: UserCourseStatus;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        course?: {
          __typename?: 'Course';
          title?: string | null;
          mediaUrl?: string | null;
          id: number;
          category?: {__typename?: 'Category'; text?: string | null} | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Course_GetCoursesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseFilterInput>;
  order?: InputMaybe<Array<CourseSortInput> | CourseSortInput>;
}>;

export type Course_GetCoursesQuery = {
  __typename?: 'Query';
  course_getCourses?: {
    __typename?: 'ListResponseBaseOfCourse';
    status: ResponseStatus;
    result?: {
      __typename?: 'CourseCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Course';
        title?: string | null;
        description?: string | null;
        mediaUrl?: string | null;
        courseStatus: CourseStatus;
        isFree: boolean;
        price: number;
        categoryId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        slides?: Array<{
          __typename?: 'Slide';
          title?: string | null;
        } | null> | null;
        category?: {
          __typename?: 'Category';
          text?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type UsersDocument_AddUsersDocumentMutationVariables = Exact<{
  input?: InputMaybe<UsersDocumentInput>;
}>;

export type UsersDocument_AddUsersDocumentMutation = {
  __typename?: 'Mutation';
  usersDocument_addUsersDocument?: {
    __typename?: 'ResponseBaseOfUsersDocument';
    status: ResponseStatus;
  } | null;
};

export type UsersDocument_DeleteUsersDocumentMutationVariables = Exact<{
  documentId: Scalars['Int'];
}>;

export type UsersDocument_DeleteUsersDocumentMutation = {
  __typename?: 'Mutation';
  usersDocument_deleteUsersDocument?: {
    __typename?: 'ResponseBaseOfUsersDocument';
    status: ResponseStatus;
  } | null;
};

export type UsersDocument_EditUsersDocumentMutationVariables = Exact<{
  input?: InputMaybe<UsersDocumentInput>;
}>;

export type UsersDocument_EditUsersDocumentMutation = {
  __typename?: 'Mutation';
  usersDocument_editUsersDocument?: {
    __typename?: 'ResponseBaseOfUsersDocument';
    status: ResponseStatus;
  } | null;
};

export type UsersDocument_GetUsersDocumentsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UsersDocumentFilterInput>;
  order?: InputMaybe<Array<UsersDocumentSortInput> | UsersDocumentSortInput>;
}>;

export type UsersDocument_GetUsersDocumentsQuery = {
  __typename?: 'Query';
  usersDocument_getUsersDocuments?: {
    __typename?: 'ListResponseBaseOfUsersDocument';
    status: ResponseStatus;
    result?: {
      __typename?: 'UsersDocumentCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'UsersDocument';
        fileName?: string | null;
        file?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type UsersDocument_GetUsersDocumentQueryVariables = Exact<{
  entityId: Scalars['Int'];
}>;

export type UsersDocument_GetUsersDocumentQuery = {
  __typename?: 'Query';
  usersDocument_getUsersDocument?: {
    __typename?: 'ResponseBaseOfUsersDocument';
    status: ResponseStatus;
    result?: {
      __typename?: 'UsersDocument';
      fileName?: string | null;
      file?: string | null;
      userId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
    } | null;
  } | null;
};

export type UserCourse_FinishExamMutationVariables = Exact<{
  userCourseId: Scalars['Int'];
  courseQuestionAnswersIds?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;

export type UserCourse_FinishExamMutation = {
  __typename?: 'Mutation';
  userCourse_finishExam?: {
    __typename?: 'ResponseBaseOfUserCourse';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserCourse';
      userId: number;
      courseId: number;
      currentSlideId: number;
      isSlidesEnded: boolean;
      hasCertificate: boolean;
      completedPercent: number;
      status: UserCourseStatus;
      id: number;
      isDeleted: boolean;
      createdDate: any;
    } | null;
  } | null;
};

export type CourseQuestion_GetCourseQuestionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseQuestionFilterInput>;
  order?: InputMaybe<Array<CourseQuestionSortInput> | CourseQuestionSortInput>;
}>;

export type CourseQuestion_GetCourseQuestionsQuery = {
  __typename?: 'Query';
  courseQuestion_getCourseQuestions?: {
    __typename?: 'ListResponseBaseOfCourseQuestion';
    status: ResponseStatus;
    result?: {
      __typename?: 'CourseQuestionCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'CourseQuestion';
        number: number;
        questionContent?: string | null;
        examId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        exam?: {__typename?: 'Exam'; courseId: number} | null;
        answers?: Array<{
          __typename?: 'CourseQuestionAnswer';
          value?: string | null;
          id: number;
        } | null> | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type CourseQuestion_GetCourseQuestionQueryVariables = Exact<{
  entityId: Scalars['Int'];
}>;

export type CourseQuestion_GetCourseQuestionQuery = {
  __typename?: 'Query';
  courseQuestion_getCourseQuestion?: {
    __typename?: 'SingleResponseBaseOfCourseQuestion';
    status: ResponseStatus;
    result?: {
      __typename?: 'CourseQuestion';
      number: number;
      questionContent?: string | null;
      examId: number;
      id: number;
      isDeleted: boolean;
      createdDate: any;
    } | null;
  } | null;
};

export type FlagText_GetFlagTextsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FlagTextFilterInput>;
  order?: InputMaybe<Array<FlagTextSortInput> | FlagTextSortInput>;
}>;

export type FlagText_GetFlagTextsQuery = {
  __typename?: 'Query';
  flagText_getFlagTexts?: {
    __typename?: 'ListResponseBaseOfFlagText';
    status: ResponseStatus;
    result?: {
      __typename?: 'FlagTextCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'FlagText';
        text?: string | null;
        id: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type LeaderBoard_GetLeaderBoardsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LeaderBoardFilterInput>;
  order?: InputMaybe<Array<LeaderBoardSortInput> | LeaderBoardSortInput>;
}>;

export type LeaderBoard_GetLeaderBoardsQuery = {
  __typename?: 'Query';
  leaderBoard_getLeaderBoards?: {
    __typename?: 'ListResponseBaseOfLeaderBoard';
    status: ResponseStatus;
    result?: {
      __typename?: 'LeaderBoardCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'LeaderBoard';
        leaderBoardType: LeaderBoardType;
        point: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        user?: {
          __typename?: 'Users';
          userName?: string | null;
          email?: string | null;
          id: number;
          imageAddress?: string | null;
          city?: string | null;
          state?: string | null;
          leaderBoardPoint: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type LeaderBoard_GetUsersLeaderBoardRankQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type LeaderBoard_GetUsersLeaderBoardRankQuery = {
  __typename?: 'Query';
  leaderBoard_getUsersLeaderBoardRank?: {
    __typename?: 'ResponseBaseOfInt32';
    result: number;
    status: ResponseStatus;
  } | null;
};

export type Map_GetDistanceQueryVariables = Exact<{
  origin?: InputMaybe<Scalars['String']>;
  destination?: InputMaybe<Scalars['String']>;
}>;

export type Map_GetDistanceQuery = {
  __typename?: 'Query';
  map_getDistance?: {
    __typename?: 'MappDto';
    originAddress?: string | null;
    destinationAddresses?: string | null;
    distance?: {
      __typename?: 'KeyValue';
      text?: string | null;
      value?: string | null;
    } | null;
    duration?: {
      __typename?: 'KeyValue';
      text?: string | null;
      value?: string | null;
    } | null;
    durationInTraffic?: {
      __typename?: 'KeyValue';
      text?: string | null;
      value?: string | null;
    } | null;
  } | null;
};

export type Message_CreateMessageMutationVariables = Exact<{
  messageInput?: InputMaybe<MessageInput>;
}>;

export type Message_CreateMessageMutation = {
  __typename?: 'Mutation';
  message_createMessage?: {
    __typename?: 'ResponseBaseOfMessages';
    status: ResponseStatus;
    result?: {
      __typename?: 'Messages';
      createdAt: any;
      conversationId: number;
      senderId: number;
      text?: string | null;
      id: number;
      isDeleted: boolean;
    } | null;
  } | null;
};

export type Message_DeleteMessageMutationVariables = Exact<{
  messageId: Scalars['Int'];
}>;

export type Message_DeleteMessageMutation = {
  __typename?: 'Mutation';
  message_deleteMessage?: {
    __typename?: 'ResponseBaseOfMessages';
    status: ResponseStatus;
    result?: {
      __typename?: 'Messages';
      createdAt: any;
      conversationId: number;
      senderId: number;
      text?: string | null;
      id: number;
      isDeleted: boolean;
    } | null;
  } | null;
};

export type Message_RemoveConversationMutationVariables = Exact<{
  conversationId: Scalars['Int'];
}>;

export type Message_RemoveConversationMutation = {
  __typename?: 'Mutation';
  message_removeConversation?: {
    __typename?: 'ResponseBase';
    status: ResponseStatus;
  } | null;
};

export type Message_GetConversationForUserQueryVariables = Exact<{
  otherUserId: Scalars['Int'];
  currentUserId?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
}>;

export type Message_GetConversationForUserQuery = {
  __typename?: 'Query';
  message_getConversationForUser?: {
    __typename?: 'ResponseBaseOfConversations';
    status: ResponseStatus;
    result?: {__typename?: 'Conversations'; id: number} | null;
  } | null;
};

export type Message_CreateGroupMessageMutationVariables = Exact<{
  messageInput?: InputMaybe<MessageInput>;
}>;

export type Message_CreateGroupMessageMutation = {
  __typename?: 'Mutation';
  message_createGroupMessage?: {
    __typename?: 'ResponseBaseOfMessages';
    status: ResponseStatus;
    result?: {
      __typename?: 'Messages';
      messageType: MessageTypes;
      photoUrl?: string | null;
      isEdited: boolean;
      text?: string | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      conversationId: number;
    } | null;
  } | null;
};

export type Message_GetConversationQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<MessagesFilterInput>;
  order?: InputMaybe<Array<MessagesSortInput> | MessagesSortInput>;
  conversationId: Scalars['Int'];
}>;

export type Message_GetConversationQuery = {
  __typename?: 'Query';
  message_getConversation?: {
    __typename?: 'ListResponseBaseOfMessages';
    status: ResponseStatus;
    result?: {
      __typename?: 'MessagesCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Messages';
        createdAt: any;
        conversationId: number;
        senderId: number;
        text?: string | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
        photoUrl?: string | null;
        messageType: MessageTypes;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_GetUserMessagesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ConversationDtoFilterInput>;
  order?: InputMaybe<
    Array<ConversationDtoSortInput> | ConversationDtoSortInput
  >;
}>;

export type Message_GetUserMessagesQuery = {
  __typename?: 'Query';
  message_getUserMessages?: {
    __typename?: 'ListResponseBaseOfConversationDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ConversationDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ConversationDto';
        subject?: string | null;
        conversationId: number;
        unreadCount: number;
        latestMessageDate: any;
        user?: {
          __typename?: 'Users';
          userName?: string | null;
          imageAddress?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_HasUnreadChatQueryVariables = Exact<{[key: string]: never}>;

export type Message_HasUnreadChatQuery = {
  __typename?: 'Query';
  message_hasUnreadChat?: {
    __typename?: 'ResponseBaseOfBoolean';
    result: boolean;
    status: ResponseStatus;
  } | null;
};

export type Message_GetConversationsProjectQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ConversationsProjectDtoFilterInput>;
  order?: InputMaybe<
    Array<ConversationsProjectDtoSortInput> | ConversationsProjectDtoSortInput
  >;
  userId: Scalars['Int'];
}>;

export type Message_GetConversationsProjectQuery = {
  __typename?: 'Query';
  message_getConversationsProject?: {
    __typename?: 'ListResponseBaseOfConversationsProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ConversationsProjectDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ConversationsProjectDto';
        latestMessage?: string | null;
        latestMessageDate: any;
        conversation?: {__typename?: 'Conversations'; id: number} | null;
        project?: {
          __typename?: 'Project';
          title?: string | null;
          id: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_GetUserMessagesGroupedByUserQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ConversationDtoFilterInput>;
  order?: InputMaybe<
    Array<ConversationDtoSortInput> | ConversationDtoSortInput
  >;
  currentUserId?: InputMaybe<Scalars['Int']>;
}>;

export type Message_GetUserMessagesGroupedByUserQuery = {
  __typename?: 'Query';
  message_getUserMessagesGroupedByUser?: {
    __typename?: 'ListResponseBaseOfConversationDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ConversationDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ConversationDto';
        projectId?: number | null;
        userEmail?: string | null;
        userFirstName?: string | null;
        userLastName?: string | null;
        subject?: string | null;
        userName?: string | null;
        userId?: number | null;
        imageAddress?: string | null;
        projectNames?: Array<string | null> | null;
        conversationId: number;
        unreadCount: number;
        latestMessageDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_GetGroupsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ConversationDtoFilterInput>;
  order?: InputMaybe<
    Array<ConversationDtoSortInput> | ConversationDtoSortInput
  >;
  userId: Scalars['Int'];
}>;

export type Message_GetGroupsQuery = {
  __typename?: 'Query';
  message_getGroups?: {
    __typename?: 'ListResponseBaseOfConversationDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ConversationDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ConversationDto';
        isMemberOfGroup: boolean;
        conversationId: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Message_GetGroupMembersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserMessageGroupFilterInput>;
  order?: InputMaybe<
    Array<UserMessageGroupSortInput> | UserMessageGroupSortInput
  >;
  conversationId: Scalars['Int'];
}>;

export type Message_GetGroupMembersQuery = {
  __typename?: 'Query';
  message_getGroupMembers?: {
    __typename?: 'ListResponseBaseOfUserMessageGroup';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserMessageGroupCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'UserMessageGroup';
        conversationId: number;
        isAdmin: boolean;
        unreadCount: number;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type MessageAddedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type MessageAddedSubscription = {
  __typename?: 'Subscription';
  messageAdded?: {
    __typename?: 'Messages';
    messageType: MessageTypes;
    photoUrl?: string | null;
    isEdited: boolean;
    createdAt: any;
    conversationId: number;
    senderId: number;
    text?: string | null;
    id: number;
    isDeleted: boolean;
    createdDate: any;
    conversation?: {
      __typename?: 'Conversations';
      subject?: string | null;
      projectId?: number | null;
      id: number;
      isDeleted: boolean;
      createdDate: any;
      project?: {
        __typename?: 'Project';
        title?: string | null;
        id: number;
      } | null;
    } | null;
    sender?: {
      __typename?: 'Users';
      userName?: string | null;
      id: number;
    } | null;
  } | null;
};

export type SubscribeToGroupMessageAddedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type SubscribeToGroupMessageAddedSubscription = {
  __typename?: 'Subscription';
  subscribeToGroupMessageAdded?: {
    __typename?: 'Messages';
    messageType: MessageTypes;
    photoUrl?: string | null;
    isEdited: boolean;
    createdAt: any;
    conversationId: number;
    senderId: number;
    text?: string | null;
    id: number;
    isDeleted: boolean;
    createdDate: any;
  } | null;
};

export type Notification_AddNotificationMutationVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationFilterInput>;
  order?: InputMaybe<Array<NotificationSortInput> | NotificationSortInput>;
  notifications?: InputMaybe<
    | Array<InputMaybe<NotificationInputsInput>>
    | InputMaybe<NotificationInputsInput>
  >;
}>;

export type Notification_AddNotificationMutation = {
  __typename?: 'Mutation';
  notification_addNotification?: {
    __typename?: 'ListResponseBaseOfNotification';
    status: ResponseStatus;
    result?: {
      __typename?: 'NotificationCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Notification';
        title?: string | null;
        description?: string | null;
        isReaded: boolean;
        notificationType: NotificationType;
        userId: number;
        id: number;
        isDeleted: boolean;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Notification_ReadNotificationMutationVariables = Exact<{
  notificationId: Scalars['Int'];
}>;

export type Notification_ReadNotificationMutation = {
  __typename?: 'Mutation';
  notification_readNotification?: {
    __typename?: 'ResponseBaseOfNotification';
    status: ResponseStatus;
    result?: {__typename?: 'Notification'; id: number} | null;
  } | null;
};

export type Notification_DeleteNotificationMutationVariables = Exact<{
  notificationId: Scalars['Int'];
}>;

export type Notification_DeleteNotificationMutation = {
  __typename?: 'Mutation';
  notification_deleteNotification?: {
    __typename?: 'ResponseBaseOfNotification';
    status: ResponseStatus;
    result?: {__typename?: 'Notification'; id: number} | null;
  } | null;
};

export type Notification_GetNotificationsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NotificationFilterInput>;
  order?: InputMaybe<Array<NotificationSortInput> | NotificationSortInput>;
}>;

export type Notification_GetNotificationsQuery = {
  __typename?: 'Query';
  notification_getNotifications?: {
    __typename?: 'ListResponseBaseOfNotification';
    status: ResponseStatus;
    result?: {
      __typename?: 'NotificationCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Notification';
        title?: string | null;
        description?: string | null;
        isReaded: boolean;
        notificationType: NotificationType;
        projectId?: number | null;
        id: number;
        isDeletedAccount: boolean;
        createdDate: any;
        spanishTitle?: string | null;
        project?: {
          __typename?: 'Project';
          title?: string | null;
          isDeleted: boolean;
        } | null;
        sender?: {
          __typename?: 'Users';
          id: number;
          imageAddress?: string | null;
          userName?: string | null;
          email?: string | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type NotificationAddedSubscriptionVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type NotificationAddedSubscription = {
  __typename?: 'Subscription';
  notificationAdded?: {
    __typename?: 'Notification';
    title?: string | null;
    id: number;
  } | null;
};

export type Payment_WidthrawlReferallIncomeMutationVariables = Exact<{
  [key: string]: never;
}>;

export type Payment_WidthrawlReferallIncomeMutation = {
  __typename?: 'Mutation';
  payment_widthrawlReferallIncome?: {
    __typename?: 'ResponseBaseOfBoolean';
    result: boolean;
    status: ResponseStatus;
  } | null;
};

export type Payment_OnboardUserInStripeConnectMutationVariables = Exact<{
  isByApp: Scalars['Boolean'];
}>;

export type Payment_OnboardUserInStripeConnectMutation = {
  __typename?: 'Mutation';
  payment_onboardUserInStripeConnect?: {
    __typename?: 'ResponseBaseOfString';
    result?: string | null;
    status: ResponseStatus;
  } | null;
};

export type Payment_CreateEphemeralKeyMutationVariables = Exact<{
  [key: string]: never;
}>;

export type Payment_CreateEphemeralKeyMutation = {
  __typename?: 'Mutation';
  payment_createEphemeralKey?: {
    __typename?: 'ResponseBaseOfEphemeralKeyDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'EphemeralKeyDto';
      id?: string | null;
      object?: string | null;
      created: any;
      deleted?: boolean | null;
      expires: any;
      livemode: boolean;
      secret?: string | null;
      rawJson?: string | null;
    } | null;
  } | null;
};

export type Payment_WidthrawUsersWalletMutationVariables = Exact<{
  amount: Scalars['Decimal'];
  widthrawWalletType: WidthrawWalletType;
}>;

export type Payment_WidthrawUsersWalletMutation = {
  __typename?: 'Mutation';
  payment_widthrawUsersWallet?: {
    __typename?: 'ResponseBaseOfBoolean';
    result: boolean;
    status: ResponseStatus;
  } | null;
};

export type Payment_PayoutForConnectsMutationVariables = Exact<{
  amount: Scalars['Decimal'];
}>;

export type Payment_PayoutForConnectsMutation = {
  __typename?: 'Mutation';
  payment_payoutForConnects?: {
    __typename?: 'ResponseBaseOfString';
    result?: string | null;
    status: ResponseStatus;
  } | null;
};

export type Payment_HasStripeAccountQueryVariables = Exact<{
  [key: string]: never;
}>;

export type Payment_HasStripeAccountQuery = {
  __typename?: 'Query';
  payment_hasStripeAccount?: {
    __typename?: 'ResponseBaseOfBoolean';
    result: boolean;
    status: ResponseStatus;
  } | null;
};

export type Coupon_IsCouponValidQueryVariables = Exact<{
  couponCode?: InputMaybe<Scalars['String']>;
}>;

export type Coupon_IsCouponValidQuery = {
  __typename?: 'Query';
  coupon_isCouponValid?: {
    __typename?: 'ResponseBaseOfCouponValidResultDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'CouponValidResultDto';
      coupon?: {__typename?: 'Coupon'; percent: number; id: number} | null;
    } | null;
  } | null;
};

export type Payment_GetProjectPaymentDetailsQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Payment_GetProjectPaymentDetailsQuery = {
  __typename?: 'Query';
  payment_getProjectPaymentDetails?: {
    __typename?: 'ResponseBaseOfProjectPaymentDetailsDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectPaymentDetailsDto';
      listerPayForAcceptingBidFee: number;
      listerPayForAcceptingBid: number;
      couponUsed: number;
      doerReceipt: number;
      doerFee: number;
    } | null;
  } | null;
};

export type Payment_GetPublishableKeyQueryVariables = Exact<{
  [key: string]: never;
}>;

export type Payment_GetPublishableKeyQuery = {
  __typename?: 'Query';
  payment_getPublishableKey?: {
    __typename?: 'ResponseBaseOfAppSettingsDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'AppSettingsDto';
      publishableKey?: string | null;
      listerApplicationFee?: string | null;
      hudurApplicationFee?: string | null;
      referalDiscountPercent: number;
      isFirstAcceptingProject: boolean;
    } | null;
  } | null;
};

export type Payment_GetStripeConnectUserBlanceQueryVariables = Exact<{
  [key: string]: never;
}>;

export type Payment_GetStripeConnectUserBlanceQuery = {
  __typename?: 'Query';
  payment_getStripeConnectUserBlance?: {
    __typename?: 'ResponseBaseOfInt64';
    result: any;
    status: ResponseStatus;
  } | null;
};

export type Payment_GetProjectDoerPaymentDetailsQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type Payment_GetProjectDoerPaymentDetailsQuery = {
  __typename?: 'Query';
  payment_getProjectDoerPaymentDetails?: {
    __typename?: 'ResponseBaseOfProjectDoerPaymentDetails';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDoerPaymentDetails';
      huduerReceiveForCompletingTheJobFee: number;
      huduerReceiveForCompletingTheJob: number;
    } | null;
  } | null;
};

export type Payment_GetClientSecretOfProjectQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Payment_GetClientSecretOfProjectQuery = {
  __typename?: 'Query';
  payment_getClientSecretOfProject?: {
    __typename?: 'ResponseBaseOfClientSecretDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ClientSecretDto';
      clientSecret?: string | null;
      bid?: {
        __typename?: 'Bid';
        isListerDeletedAccount: boolean;
        listerDeleteAccountDate: any;
        isHuduDeletedAccount: boolean;
        huduDeleteAccountDate: any;
        bidStatus: BidStatus;
        amount: number;
        description?: string | null;
        hudusComment?: string | null;
        hudusRate?: string | null;
        isHuduCommented: boolean;
        listersComment?: string | null;
        listersRate?: string | null;
        isListerCommented: boolean;
        huduId: number;
        listerId: number;
        projectId: number;
        id: number;
        isDeleted: boolean;
        project?: {__typename?: 'Project'; id: number} | null;
      } | null;
    } | null;
  } | null;
};

export type Payment_GetConnectUserBlanceQueryVariables = Exact<{
  [key: string]: never;
}>;

export type Payment_GetConnectUserBlanceQuery = {
  __typename?: 'Query';
  payment_getConnectUserBlance?: {
    __typename?: 'ResponseBaseOfInt64';
    result: any;
    status: ResponseStatus;
  } | null;
};

export type Project_GetProjectQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_GetProjectQuery = {
  __typename?: 'Query';
  project_getProject?: {
    __typename?: 'SingleResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDto';
      isHuduFinished: boolean;
      yourLowesBid?: number | null;
      currentLowBid: number;
      isLiked: boolean;
      project?: {
        __typename?: 'Project';
        createdDate: any;
        id: number;
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration?: string | null;
        availability: Availability;
        addressTitle?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        cover?: string | null;
        projectDeadLine: any;
        startDate: any;
        endDate: any;
        latestPaymentDateTime?: any | null;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        backgroundCheckTypeForDoer?: BackgroundCheckTypeForDoer | null;
        userId: number;
        categoryId?: number | null;
        projectImages?: Array<{
          __typename?: 'ProjectImages';
          imageAddress?: string | null;
          alt?: string | null;
          id: number;
        } | null> | null;
        user?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          id: number;
          userName?: string | null;
          imageAddress?: string | null;
          asListerRates?: number | null;
          isVerified: boolean;
          asHuduRates?: number | null;
        } | null;
        category?: {
          __typename?: 'Category';
          text?: string | null;
          spanishText?: string | null;
          id: number;
          parentId?: number | null;
          userId: number;
        } | null;
      } | null;
      awardedBid?: {
        __typename?: 'Bid';
        amount: number;
        createdDate: any;
        id: number;
        bidStatus: BidStatus;
        cancellRequestStatus?: CancellRequestStatus | null;
      } | null;
      currentDoer?: {
        __typename?: 'Users';
        userName?: string | null;
        imageAddress?: string | null;
        id: number;
      } | null;
    } | null;
  } | null;
};

export type Project_GetProject_QuestionsQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_GetProject_QuestionsQuery = {
  __typename?: 'Query';
  project_getProject?: {
    __typename?: 'SingleResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDto';
      isHuduFinished: boolean;
      projectQuestions?: Array<string | null> | null;
      yourLowesBid?: number | null;
      currentLowBid: number;
      isLiked: boolean;
      project?: {
        __typename?: 'Project';
        backgroundCheckTypeForDoer?: BackgroundCheckTypeForDoer | null;
        createdDate: any;
        id: number;
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration?: string | null;
        availability: Availability;
        addressTitle?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        cover?: string | null;
        projectDeadLine: any;
        startDate: any;
        endDate: any;
        latestPaymentDateTime?: any | null;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        categoryId?: number | null;
        projectImages?: Array<{
          __typename?: 'ProjectImages';
          imageAddress?: string | null;
          alt?: string | null;
          id: number;
        } | null> | null;
        user?: {
          __typename?: 'Users';
          isDeletedAccount: boolean;
          id: number;
          userName?: string | null;
          imageAddress?: string | null;
          asListerRates?: number | null;
          isVerified: boolean;
        } | null;
        category?: {
          __typename?: 'Category';
          text?: string | null;
          spanishText?: string | null;
          id: number;
          parentId?: number | null;
          userId: number;
        } | null;
      } | null;
      awardedBid?: {
        __typename?: 'Bid';
        amount: number;
        createdDate: any;
        id: number;
        bidStatus: BidStatus;
      } | null;
      currentDoer?: {
        __typename?: 'Users';
        userName?: string | null;
        imageAddress?: string | null;
        id: number;
      } | null;
    } | null;
  } | null;
};

export type Project_GetProjectsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
  order?: InputMaybe<Array<ProjectDtoSortInput> | ProjectDtoSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  isMyBid: Scalars['Boolean'];
  location?: InputMaybe<Scalars['Position']>;
  projectOrderVms?: InputMaybe<
    Array<InputMaybe<ProjectOrderVmInput>> | InputMaybe<ProjectOrderVmInput>
  >;
}>;

export type Project_GetProjectsQuery = {
  __typename?: 'Query';
  project_getProjects?: {
    __typename?: 'ListResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectDto';
        isBidder: boolean;
        isLiked: boolean;
        currentLowBid: number;
        yourLowesBid?: number | null;
        isHuduFinished: boolean;
        project?: {
          __typename?: 'Project';
          backgroundCheckTypeForDoer?: BackgroundCheckTypeForDoer | null;
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          userId: number;
          id: number;
          state?: string | null;
          availability: Availability;
          projectDeadLine: any;
          cover?: string | null;
          category?: {
            __typename?: 'Category';
            text?: string | null;
            spanishText?: string | null;
            id: number;
          } | null;
          projectImages?: Array<{
            __typename?: 'ProjectImages';
            imageAddress?: string | null;
            alt?: string | null;
            id: number;
          } | null> | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetListerProjectsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
  order?: InputMaybe<Array<ProjectDtoSortInput> | ProjectDtoSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  isMyBid: Scalars['Boolean'];
  location?: InputMaybe<Scalars['Position']>;
  projectOrderVms?: InputMaybe<
    Array<InputMaybe<ProjectOrderVmInput>> | InputMaybe<ProjectOrderVmInput>
  >;
}>;

export type Project_GetListerProjectsQuery = {
  __typename?: 'Query';
  project_getProjects?: {
    __typename?: 'ListResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectDto';
        isLiked: boolean;
        currentLowBid: number;
        yourLowesBid?: number | null;
        isHuduFinished: boolean;
        project?: {
          __typename?: 'Project';
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          userId: number;
          id: number;
          projectDeadLine: any;
          cover?: string | null;
          projectImages?: Array<{
            __typename?: 'ProjectImages';
            imageAddress?: string | null;
            alt?: string | null;
            id: number;
          } | null> | null;
          category?: {
            __typename?: 'Category';
            text?: string | null;
            spanishText?: string | null;
            id: number;
          } | null;
        } | null;
        lowestBid?: {
          __typename?: 'LowestBidDto';
          huduerUsername?: string | null;
          huduerId: number;
          bidAmount: number;
          bidStatus: BidStatus;
          bidId: number;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetMyBidsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
  order?: InputMaybe<Array<ProjectDtoSortInput> | ProjectDtoSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  isMyBid: Scalars['Boolean'];
  location?: InputMaybe<Scalars['Position']>;
  projectOrderVms?: InputMaybe<
    Array<InputMaybe<ProjectOrderVmInput>> | InputMaybe<ProjectOrderVmInput>
  >;
}>;

export type Project_GetMyBidsQuery = {
  __typename?: 'Query';
  project_getProjects?: {
    __typename?: 'ListResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectDto';
        isHuduFinished: boolean;
        currentLowBid: number;
        yourLowesBid?: number | null;
        project?: {
          __typename?: 'Project';
          projectStatus: ProjectStatus;
          title?: string | null;
          userId: number;
          id: number;
          projectDeadLine: any;
          description?: string | null;
          cover?: string | null;
          category?: {
            __typename?: 'Category';
            text?: string | null;
            spanishText?: string | null;
            id: number;
          } | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetProjectsByStatusQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
  order?: InputMaybe<Array<ProjectDtoSortInput> | ProjectDtoSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  isMyBid: Scalars['Boolean'];
  location?: InputMaybe<Scalars['Position']>;
  projectOrderVms?: InputMaybe<
    Array<InputMaybe<ProjectOrderVmInput>> | InputMaybe<ProjectOrderVmInput>
  >;
}>;

export type Project_GetProjectsByStatusQuery = {
  __typename?: 'Query';
  project_getProjects?: {
    __typename?: 'ListResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectDto';
        isHuduFinished: boolean;
        currentLowBid: number;
        project?: {
          __typename?: 'Project';
          projectStatus: ProjectStatus;
          title?: string | null;
          userId: number;
          id: number;
          projectDeadLine: any;
          category?: {
            __typename?: 'Category';
            text?: string | null;
            spanishText?: string | null;
            id: number;
          } | null;
        } | null;
        awardedBid?: {
          __typename?: 'Bid';
          amount: number;
          createdDate: any;
          id: number;
          bidStatus: BidStatus;
          awardDate?: any | null;
          cancellRequestStatus?: CancellRequestStatus | null;
        } | null;
        currentDoer?: {__typename?: 'Users'; id: number} | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetQuestionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QuestionsDtoFilterInput>;
  order?: InputMaybe<Array<QuestionsDtoSortInput> | QuestionsDtoSortInput>;
  isIllegal?: InputMaybe<Scalars['Boolean']>;
}>;

export type Project_GetQuestionsQuery = {
  __typename?: 'Query';
  project_getQuestions?: {
    __typename?: 'ListResponseBaseOfQuestionsDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'QuestionsDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'QuestionsDto';
        isUpVoted: boolean;
        question?: {
          __typename?: 'Question';
          isDeletedAccount: boolean;
          text?: string | null;
          parentId?: number | null;
          projectId: number;
          userId: number;
          id: number;
          isDeleted: boolean;
          upVote: number;
          isPin: boolean;
          createdDate: any;
          user?: {
            __typename?: 'Users';
            id: number;
            isDeletedAccount: boolean;
            userName?: string | null;
            email?: string | null;
            imageAddress?: string | null;
            firstName?: string | null;
            lastName?: string | null;
            isVerified: boolean;
            averageRate?: number | null;
            userImages?: Array<{
              __typename?: 'UserImage';
              imageAddress?: string | null;
            } | null> | null;
          } | null;
          childrenQuestions?: Array<{
            __typename?: 'Question';
            isDeletedAccount: boolean;
            userId: number;
            text?: string | null;
            createdDate: any;
            user?: {
              __typename?: 'Users';
              id: number;
              userName?: string | null;
              firstName?: string | null;
              lastName?: string | null;
              email?: string | null;
              isVerified: boolean;
              averageRate?: number | null;
              imageAddress?: string | null;
            } | null;
          } | null> | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetUserLikeProjectQueryVariables = Exact<{
  projectId: Scalars['Int'];
}>;

export type Project_GetUserLikeProjectQuery = {
  __typename?: 'Query';
  project_getUserLikeProject?: {
    __typename?: 'ResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDto';
      isLiked: boolean;
      project?: {
        __typename?: 'Project';
        isDeletedAccount: boolean;
        deleteAccountDate: any;
        projectStatus: ProjectStatus;
        title?: string | null;
        description?: string | null;
        duration?: string | null;
        availability: Availability;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        projectDeadLine: any;
        projectImages?: Array<{
          __typename?: 'ProjectImages';
          imageAddress?: string | null;
          alt?: string | null;
          id: number;
        } | null> | null;
        category?: {
          __typename?: 'Category';
          text?: string | null;
          spanishText?: string | null;
          id: number;
        } | null;
      } | null;
    } | null;
  } | null;
};

export type Project_GetUserLikeProjectsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectDtoFilterInput>;
  order?: InputMaybe<Array<ProjectDtoSortInput> | ProjectDtoSortInput>;
  projectFilter?: InputMaybe<ProjectFilter>;
  location?: InputMaybe<Scalars['Position']>;
}>;

export type Project_GetUserLikeProjectsQuery = {
  __typename?: 'Query';
  project_getUserLikeProjects?: {
    __typename?: 'ListResponseBaseOfProjectDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectDto';
        isLiked: boolean;
        currentLowBid: number;
        project?: {
          __typename?: 'Project';
          projectStatus: ProjectStatus;
          title?: string | null;
          description?: string | null;
          userId: number;
          id: number;
          projectDeadLine: any;
          cover?: string | null;
          category?: {
            __typename?: 'Category';
            text?: string | null;
            spanishText?: string | null;
            id: number;
          } | null;
          projectImages?: Array<{
            __typename?: 'ProjectImages';
            imageAddress?: string | null;
            alt?: string | null;
            id: number;
          } | null> | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Category_GetCategoryQueryVariables = Exact<{
  entityId: Scalars['Int'];
}>;

export type Category_GetCategoryQuery = {
  __typename?: 'Query';
  category_getCategory?: {
    __typename?: 'ResponseBaseOfCategory';
    status: ResponseStatus;
    result?: {
      __typename?: 'Category';
      text?: string | null;
      spanishText?: string | null;
      id: number;
    } | null;
  } | null;
};

export type Project_GetBidCountByStatusQueryVariables = Exact<{
  huduerId: Scalars['Int'];
}>;

export type Project_GetBidCountByStatusQuery = {
  __typename?: 'Query';
  project_getBidCountByStatus?: {
    __typename?: 'ResponseBaseOfDictionaryOfBidStatusAndInt32';
    status: ResponseStatus;
    result?: Array<{
      __typename?: 'KeyValuePairOfBidStatusAndInt32';
      key: BidStatus;
      value: number;
    }> | null;
  } | null;
};

export type Project_GetProjectCountByStatusQueryVariables = Exact<{
  listerId: Scalars['Int'];
}>;

export type Project_GetProjectCountByStatusQuery = {
  __typename?: 'Query';
  project_getProjectCountByStatus?: {
    __typename?: 'ResponseBaseOfProjectCountByStatus';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectCountByStatus';
      bidding: number;
      inProgress: number;
      failed: number;
      finished: number;
      cancelled: number;
    } | null;
  } | null;
};

export type Category_GetCategoriesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryDtoFilterInput>;
  order?: InputMaybe<Array<CategoryDtoSortInput> | CategoryDtoSortInput>;
}>;

export type Category_GetCategoriesQuery = {
  __typename?: 'Query';
  category_getCategories?: {
    __typename?: 'ListResponseBaseOfCategoryDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'CategoryDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'CategoryDto';
        isPined: boolean;
        hasChild: boolean;
        category?: {
          __typename?: 'Category';
          text?: string | null;
          spanishText?: string | null;
          userId: number;
          id: number;
          parentId?: number | null;
        } | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type ChatGpt_CreateChatUsingAzureQueryVariables = Exact<{
  projectTitle?: InputMaybe<Scalars['String']>;
  projectDescription?: InputMaybe<Scalars['String']>;
}>;

export type ChatGpt_CreateChatUsingAzureQuery = {
  __typename?: 'Query';
  chatGpt_createChatUsingAzure?: {
    __typename?: 'ResponseBaseOfChatGptResponseDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ChatGptResponseDto';
      questionDto?: Array<{
        __typename?: 'QuestionDto';
        question?: string | null;
      } | null> | null;
    } | null;
  } | null;
};

export type Project_GetProjectsGrouptedByCityQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectsGrouptedByCityDtoFilterInput>;
  order?: InputMaybe<
    | Array<ProjectsGrouptedByCityDtoSortInput>
    | ProjectsGrouptedByCityDtoSortInput
  >;
}>;

export type Project_GetProjectsGrouptedByCityQuery = {
  __typename?: 'Query';
  project_getProjectsGrouptedByCity?: {
    __typename?: 'ListResponseBaseOfProjectsGrouptedByCityDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectsGrouptedByCityDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectsGrouptedByCityDto';
        count: number;
        city?: string | null;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetProjectIBidOnGroupedByStatusQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GetProjectIBidOnFilterInput>;
  order?: InputMaybe<
    Array<GetProjectIBidOnSortInput> | GetProjectIBidOnSortInput
  >;
  userId: Scalars['Int'];
}>;

export type Project_GetProjectIBidOnGroupedByStatusQuery = {
  __typename?: 'Query';
  project_getProjectIBidOnGroupedByStatus?: {
    __typename?: 'ListResponseBaseOfGetProjectIBidOn';
    status: ResponseStatus;
    result?: {
      __typename?: 'GetProjectIBidOnCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'GetProjectIBidOn';
        projectStatus: ProjectStatus;
        projectCount: number;
        bidCount: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetEnthusiasticCistyStateQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EnthusiasticCistyStateFilterInput>;
  order?: InputMaybe<
    Array<EnthusiasticCistyStateSortInput> | EnthusiasticCistyStateSortInput
  >;
}>;

export type Project_GetEnthusiasticCistyStateQuery = {
  __typename?: 'Query';
  project_getEnthusiasticCistyState?: {
    __typename?: 'ListResponseBaseOfEnthusiasticCistyState';
    status: ResponseStatus;
    result?: {
      __typename?: 'EnthusiasticCistyStateCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'EnthusiasticCistyState';
        state?: string | null;
        city?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Project_GetProjectsGrouptedByCityFromMapDataQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProjectsGrouptedByCityDtoFilterInput>;
  order?: InputMaybe<
    | Array<ProjectsGrouptedByCityDtoSortInput>
    | ProjectsGrouptedByCityDtoSortInput
  >;
}>;

export type Project_GetProjectsGrouptedByCityFromMapDataQuery = {
  __typename?: 'Query';
  project_getProjectsGrouptedByCityFromMapData?: {
    __typename?: 'ListResponseBaseOfProjectsGrouptedByCityDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ProjectsGrouptedByCityDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ProjectsGrouptedByCityDto';
        count: number;
        city?: string | null;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Translator_TranslateMutationVariables = Exact<{
  input?: InputMaybe<TranslateInput>;
}>;

export type Translator_TranslateMutation = {
  __typename?: 'Mutation';
  translator_translate?: {
    __typename?: 'ResponseBaseOfString';
    result?: string | null;
    status: ResponseStatus;
  } | null;
};

export type Course_GetCourseTranslatesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CourseTranslateFilterInput>;
  order?: InputMaybe<
    Array<CourseTranslateSortInput> | CourseTranslateSortInput
  >;
}>;

export type Course_GetCourseTranslatesQuery = {
  __typename?: 'Query';
  course_getCourseTranslates?: {
    __typename?: 'ListResponseBaseOfCourseTranslate';
    status: ResponseStatus;
    result?: {
      __typename?: 'CourseTranslateCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'CourseTranslate';
        languageType: LanguageType;
        title?: string | null;
        content?: string | null;
        mediaUrl?: string | null;
        courseId?: number | null;
        slideId?: number | null;
        courseQuestionId?: number | null;
        courseQuestionAnswerId?: number | null;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type Referall_GetReferallInfoQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type Referall_GetReferallInfoQuery = {
  __typename?: 'Query';
  referall_getReferallInfo?: {
    __typename?: 'ResponseBaseOfReferallInfo';
    status: ResponseStatus;
    result?: {
      __typename?: 'ReferallInfo';
      sucessfullReferall: number;
      totalRewarded: number;
      earnedPts: number;
    } | null;
  } | null;
};

export type User_GetUserImagesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserImageFilterInput>;
  order?: InputMaybe<Array<UserImageSortInput> | UserImageSortInput>;
  userId: Scalars['Int'];
}>;

export type User_GetUserImagesQuery = {
  __typename?: 'Query';
  user_getUserImages?: {
    __typename?: 'ListResponseBaseOfUserImage';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserImageCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'UserImage';
        imageAddress?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetReviewsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ReviewsDtoFilterInput>;
  order?: InputMaybe<Array<ReviewsDtoSortInput> | ReviewsDtoSortInput>;
  getReviewType: GetReviewType;
  userId: Scalars['Int'];
}>;

export type User_GetReviewsQuery = {
  __typename?: 'Query';
  user_getReviews?: {
    __typename?: 'ListResponseBaseOfReviewsDto';
    status: ResponseStatus;
    result?: {
      __typename?: 'ReviewsDtoCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'ReviewsDto';
        score: number;
        count: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetUserAddressesQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserAddressFilterInput>;
  order?: InputMaybe<Array<UserAddressSortInput> | UserAddressSortInput>;
  userId: Scalars['Int'];
}>;

export type User_GetUserAddressesQuery = {
  __typename?: 'Query';
  user_getUserAddresses?: {
    __typename?: 'ListResponseBaseOfUserAddress';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserAddressCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'UserAddress';
        addressTitle?: string | null;
        streetAddress?: string | null;
        city?: string | null;
        state?: string | null;
        longitude: number;
        latitude: number;
        zipCode?: string | null;
        userId: number;
        id: number;
        isDeleted: boolean;
        createdDate: any;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetProfileQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type User_GetProfileQuery = {
  __typename?: 'Query';
  user_getProfile?: {
    __typename?: 'ResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'Users';
      isDeletedAccount: boolean;
      userName?: string | null;
      imageAddress?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phoneNumber?: string | null;
      bio?: string | null;
      streetAddress?: string | null;
      city?: string | null;
      state?: string | null;
      isActive: boolean;
      zipCode?: string | null;
      asHuduRates?: number | null;
      earnPtsFromReferall: number;
      totalRewardedFromReferall: number;
      asListerRates?: number | null;
      averageRate?: number | null;
      email?: string | null;
      id: number;
      isDeleted: boolean;
      isVerified: boolean;
      stripeAccountId?: string | null;
      stripeCustomerId?: string | null;
      highestProjectCompletionRate?: number | null;
      createdDate: any;
      leaderBoardPoint: number;
      wallet?: any | null;
      userImages?: Array<{
        __typename?: 'UserImage';
        imageAddress?: string | null;
        id: number;
      } | null> | null;
    } | null;
  } | null;
};

export type User_GetMinimalProfileQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type User_GetMinimalProfileQuery = {
  __typename?: 'Query';
  user_getProfile?: {
    __typename?: 'ResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'Users';
      isDeletedAccount: boolean;
      userName?: string | null;
      imageAddress?: string | null;
      id: number;
      phoneNumber?: string | null;
      averageRate?: number | null;
      email?: string | null;
      leaderBoardPoint: number;
    } | null;
  } | null;
};

export type User_GetNotificationStatusQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;

export type User_GetNotificationStatusQuery = {
  __typename?: 'Query';
  user_getProfile?: {
    __typename?: 'ResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'Users';
      id: number;
      projectNotification?: boolean | null;
      bidNotification?: boolean | null;
      chatNotification?: boolean | null;
      questionNotification?: boolean | null;
    } | null;
  } | null;
};

export type User_GetUsersSafeQueryVariables = Exact<{
  where?: InputMaybe<UserDtoSafeFilterInput>;
}>;

export type User_GetUsersSafeQuery = {
  __typename?: 'Query';
  user_getUsersSafe?: {
    __typename?: 'ListResponseBaseOfUserDtoSafe';
    status: ResponseStatus;
    result?: {
      __typename?: 'UserDtoSafeCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'UserDtoSafe';
        id: number;
        userName?: string | null;
        email?: string | null;
        userTypes: UserTypes;
        imageAddress?: string | null;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};

export type User_GetUsersQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UsersFilterInput>;
  order?: InputMaybe<Array<UsersSortInput> | UsersSortInput>;
}>;

export type User_GetUsersQuery = {
  __typename?: 'Query';
  user_getUsers?: {
    __typename?: 'ListResponseBaseOfUsers';
    status: ResponseStatus;
    result?: {
      __typename?: 'UsersCollectionSegment';
      totalCount: number;
      items?: Array<{
        __typename?: 'Users';
        isDeletedAccount: boolean;
        userName?: string | null;
        imageAddress?: string | null;
        city?: string | null;
        state?: string | null;
        isActive: boolean;
        leaderBoardPoint: number;
        email?: string | null;
        id: number;
      } | null> | null;
      pageInfo: {
        __typename?: 'CollectionSegmentInfo';
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    } | null;
  } | null;
};
