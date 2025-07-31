import {useCallback, useEffect, useState} from 'react';
import Config from 'react-native-config';
import auth from '@react-native-firebase/auth';
import dynamicLinks, {
  FirebaseDynamicLinksTypes,
} from '@react-native-firebase/dynamic-links';
import {useGetMessages} from '~/utils/helper';
import {authStore, userDataStore} from '~/stores';
import graphQLClient, {fetcher} from '~/graphql/graphQLClient';
import {goBack, navigate, replace} from '~/navigation/Methods';
import {useMutation} from '@tanstack/react-query';
import {
  ResponseStatus,
  User_LoginQuery,
  User_SignUpMutation,
  User_LoginQueryVariables,
  User_SignUpMutationVariables,
} from '~/generated/graphql';
import {USER_LOGIN, USER_SIGN_UP} from '~/graphql/user/mutations';
import {
  statusCodes,
  GoogleSignin,
} from '@react-native-google-signin/google-signin';
import {
  Profile,
  Settings,
  AccessToken,
  GraphRequest,
  LoginManager,
  GraphRequestManager,
} from 'react-native-fbsdk-next';
import appleAuth from '@invertase/react-native-apple-authentication';
import {showErrorMessage, showSuccessMessage} from '~/utils/utils';
import {removeData, storeData} from '~/services/storage';
import {ANDROID_PACKAGE_NAME, IOS_BUNDLE_ID} from '~/constants/constants';
import {useTranslation} from 'react-i18next';
import queryKeys from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';

GoogleSignin.configure({
  scopes: ['profile', 'email'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: Config.GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  // @ts-ignore
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  iosClientId: Config.GOOGLE_IOS_CLIENT_ID, // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] optional, if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
});

type OnSignIn = (emailLink: string, email?: string | null) => void;

Settings.setAppID(Config.FACEBOOK_APP_ID);

export const useSignUpAuth = () => {
  const {getFireBaseErrorMessage} = useGetMessages();

  const signUpWithEmailAndPass = async (email: string, password: string) => {
    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response?.additionalUserInfo?.isNewUser) {
        const idToken = await auth().currentUser?.getIdToken();
        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);
          authStore.setState({token: idToken});
          return {data: idToken, error: null, loading: false};
        } else {
          return {data: null, error: response, loading: false};
        }
      } else {
        return {data: null, error: response, loading: false};
      }
    } catch (errorData: any) {
      const errorMessage = getFireBaseErrorMessage(errorData?.message);
      if (errorMessage) {
        showErrorMessage(errorMessage);
      }
      return {data: null, error: errorData, loading: false};
    }
  };

  return {signUpWithEmailAndPass};
};

export const useLoginAuth = () => {
  const {getFireBaseErrorMessage} = useGetMessages();

  const loginWithEmailAndPass = async (email: string, password: string) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      if (response?.user) {
        const idToken = await auth().currentUser?.getIdToken();
        if (idToken) {
          graphQLClient.setHeader('authorization', 'Bearer ' + idToken);
          authStore.setState({token: idToken});
          return {data: idToken, error: null, loading: false};
        } else {
          return {data: null, error: response, loading: false};
        }
      } else {
        return {data: null, error: response, loading: false};
      }
    } catch (errorData: any) {
      const errorMessage = getFireBaseErrorMessage(errorData);
      if (errorMessage) {
        showErrorMessage(errorMessage);
      }
      return {data: null, error: errorData, loading: false};
    }
  };

  return {loginWithEmailAndPass};
};

export const useForgotPasswordAuth = () => {
  const {getFireBaseErrorMessage} = useGetMessages();
  const {t} = useTranslation();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          showSuccessMessage(t('messages.auth.emailSent'));
          goBack();
          setIsSuccess(true);
          setError(false);
          setLoading(false);
        })
        .catch((errorData: any) => {
          setIsSuccess(false);
          setError(errorData);
          setLoading(false);
          const errorMessage = getFireBaseErrorMessage(errorData?.message);
          if (errorMessage) {
            showErrorMessage(errorMessage);
          }
        });
    } catch (err: any) {
      setIsSuccess(false);
      setError(err);
      setLoading(false);
    }
  };

  return {forgotPassword, loading, isSuccess, error};
};

export const useLogin = () => {
  return useMutation<User_LoginQuery, any, User_LoginQueryVariables>(
    async () => {
      return fetcher(USER_LOGIN)();
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getBadges);
        queryClient.invalidateQueries(queryKeys.getBadge);
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useSignUp = () => {
  const {setUserData} = userDataStore(state => state);
  const {showResponseMessage} = useGetMessages();

  return useMutation<User_SignUpMutation, any, User_SignUpMutationVariables>(
    async ({email}: {email?: string}) => {
      return fetcher(USER_SIGN_UP, {email})();
    },
    {
      onSuccess: successData => {
        queryClient.invalidateQueries(queryKeys.getBadges);
        queryClient.invalidateQueries(queryKeys.getBadge);
        if (successData.user_signUp?.status === ResponseStatus.Success) {
          setUserData(successData.user_signUp?.result);
          replace('CompleteProfileStepOne');
        } else {
          showResponseMessage(successData.user_signUp?.status);
        }
      },
      onError: (errorData: any) => {
        showErrorMessage(JSON.stringify(errorData));
      },
    },
  );
};

export const useGoogleAuth = () => {
  const {signOut} = useSignOutAuth();
  const {t} = useTranslation();

  const signInWithGoogle = async () => {
    try {
      signOut();
      await GoogleSignin.hasPlayServices();
      const googleResponse = await GoogleSignin.signIn();
      const email = googleResponse?.user?.email;
      if (!email) {
        throw new Error(t('messages.errors.acceptEmailPermission'));
      }

      const idToken = googleResponse?.idToken;
      if (idToken) {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        await auth().signInWithCredential(googleCredential);
        const currentUser = auth().currentUser;
        const fbIdToken = await currentUser?.getIdToken();
        graphQLClient.setHeader('authorization', 'Bearer ' + fbIdToken);
        authStore.setState({token: fbIdToken});
        return {
          data: fbIdToken,
          success: true,
          loading: false,
          error: false,
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: null,
        };
      }
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        return {
          data: null,
          success: false,
          loading: false,
          error: t('messages.errors.cancelledByUser'),
        };
      } else if (err.code === statusCodes.IN_PROGRESS) {
        return {
          data: null,
          success: false,
          loading: false,
          error: t('messages.errors.signInInProgress'),
        };
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          data: null,
          success: false,
          loading: false,
          error: t('messages.errors.playServicesNotAvailable'),
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: err,
        };
      }
    }
  };

  return {signInWithGoogle};
};

export const useFacebookAuth = () => {
  const {signOut} = useSignOutAuth();
  const {t} = useTranslation();

  const signInWithFacebook = async () => {
    try {
      signOut();
      LoginManager.logOut();
      const fbResult = await LoginManager.logInWithPermissions([
        'email',
        'public_profile',
      ]);

      if (
        fbResult &&
        !fbResult.isCancelled &&
        fbResult.declinedPermissions &&
        fbResult.declinedPermissions.includes('email')
      ) {
        return {
          data: null,
          success: false,
          loading: false,
          error: t('messages.errors.acceptEmailPermission'),
        };
      }
      if (fbResult.isCancelled) {
        return {
          data: null,
          success: false,
          loading: false,
          error: t('messages.errors.cancelledByUser'),
        };
      }
      const data = await AccessToken.getCurrentAccessToken();

      if (!data || !data.accessToken) {
        return {
          data: null,
          success: false,
          loading: false,
          error: t('messages.errors.couldNotObtainToken'),
        };
      }
      const accessToken = data.accessToken;
      const currentProfile = await getProfile(accessToken);

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      await auth().signInWithCredential(facebookCredential);
      const currentUser = auth().currentUser;

      const fbIdToken = await currentUser?.getIdToken();

      graphQLClient.setHeader('authorization', 'Bearer ' + fbIdToken);
      authStore.setState({token: fbIdToken});
      return {
        data: {
          fbIdToken,
          fullResult: {
            user: currentProfile,
            loginResult: fbResult,
          },
        },
        success: true,
        loading: false,
        error: false,
      };
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Cancelled by user',
        };
      } else if (err.code === statusCodes.IN_PROGRESS) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'SignIn in progress',
        };
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          data: null,
          success: false,
          loading: false,
          error: 'Google play services not available',
        };
      } else {
        return {
          data: null,
          success: false,
          loading: false,
          error: err,
        };
      }
    }
  };

  const getProfile = async (accessToken: any) => {
    const currentProfile = await Profile.getCurrentProfile();
    if (!currentProfile || !currentProfile.email) {
      const graphProfile = await _fetchProfileWithGraph(accessToken);
      return graphProfile;
    } else {
      return currentProfile;
    }
  };

  const _fetchProfileWithGraph = async (accessToken: any) => {
    return new Promise((resolve, reject) => {
      const infoRequest = new GraphRequest(
        '/me',
        {
          accessToken,
          parameters: {
            fields: {
              string: 'email,name,first_name,middle_name,last_name',
            },
          },
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      new GraphRequestManager().addRequest(infoRequest).start();
    });
  };

  return {signInWithFacebook};
};

export const useAppleAuth = () => {
  const {signOut} = useSignOutAuth();
  const {t} = useTranslation();

  const signInWithApple = async () => {
    try {
      signOut();
      if (appleAuth.isSupported) {
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
        if (!appleAuthRequestResponse.identityToken) {
          return {
            data: null,
            success: false,
            loading: false,
            error: t('messages.errors.noTokenReturned'),
          };
        }
        const fullResult = appleAuthRequestResponse;
        const idToken = appleAuthRequestResponse.identityToken;
        const nonce = appleAuthRequestResponse.nonce;
        const appleCredential = auth.AppleAuthProvider.credential(
          idToken,
          nonce,
        );

        await auth().signInWithCredential(appleCredential);
        const currentUser = auth().currentUser;
        const fbIdToken = await currentUser?.getIdToken();
        graphQLClient.setHeader('authorization', 'Bearer ' + fbIdToken);
        authStore.setState({token: fbIdToken});
        return {
          data: {
            fbIdToken,
            fullResult,
          },
          success: true,
          loading: false,
          error: false,
        };
      } else {
        const message = t('messages.errors.deviceNotSupported');
        showErrorMessage(message);
        return {
          data: null,
          success: false,
          loading: false,
          error: message,
        };
      }
    } catch (err: any) {
      return {
        data: null,
        success: false,
        loading: false,
        error: err,
      };
    }
  };

  return {signInWithApple};
};

export const useSignOutAuth = () => {
  const signOut = async () => {
    const firebaseAuth = auth();
    if (firebaseAuth.currentUser) {
      await firebaseAuth.signOut();
    }
  };

  return {signOut};
};

export const useDeleteAuth = () => {
  const deleteCurrentUser = async () => {
    await auth().currentUser?.delete();
  };

  return {deleteCurrentUser};
};

export const useFirebaseLink = (email: any): [boolean, boolean] => {
  const [onSignIn, isLoading, isError] = useSignIn();
  const [isSignInError, setSignInError] = useState(false);

  const handleDynamicLink = useCallback<
    (link: FirebaseDynamicLinksTypes.DynamicLink) => void
  >(
    async link => {
      try {
        onSignIn(link.url, email);
      } catch (error) {
        setSignInError(true);
      }
    },
    [onSignIn],
  );
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => {
      unsubscribe();
    };
  }, [handleDynamicLink]);

  useEffect(() => {
    let unsubscribed = false;
    async function getInitialLink() {
      const initialLink = await dynamicLinks().getInitialLink();

      if (initialLink && !unsubscribed) {
        handleDynamicLink(initialLink);
      }
    }
    getInitialLink();

    return () => {
      unsubscribed = true;
    };
    // Remove handleDynamicLink from the deps array to avoid redundant calls.
    // This hook should be called only once, at start.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isLoading, isError || isSignInError];
};

const useSignIn = (): [OnSignIn, boolean, boolean] => {
  const [loading, onLoadingChange] = useState<any>(false);
  const [emailError, setEmailError] = useState<any>(false);

  const onSignIn = useCallback<OnSignIn>(async (emailLink, email) => {
    try {
      onLoadingChange(true);

      if (!auth().isSignInWithEmailLink(emailLink)) {
        return;
      }

      if (!email) {
        return;
      }

      await auth().signInWithEmailLink(email, emailLink);
    } catch (error) {
      setEmailError(error);
    } finally {
      onLoadingChange(false);
    }
  }, []);

  return [onSignIn, loading, emailError];
};

export const useAuth = () => {
  const {setToken} = authStore(state => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idToken, onIdTokenChange] = useState<string | undefined>();
  const [isSignedIn, onSignedInChange] = useState<boolean | undefined>();
  const [user, onUserChange] = useState<{
    uid: string;
    email: string;
    status: 'in_progress' | string;
  } | null>();

  useEffect(() => {
    const unsubscribe = auth().onIdTokenChanged(async user => {
      setIsLoading(true);
      if (!user) {
        return onSignedInChange(false), setIsLoading(false);
      }

      // ** Fetch new idToken
      const token = await user.getIdToken();

      // ** Store idToken to Async Storage
      setToken(token);
      graphQLClient.setHeader('authorization', 'Bearer ' + token);
      await storeData('id_token', token);

      // ** Fetch user profile
      //   const res = await getProfile();//TODO

      onUserChange(null);
      onIdTokenChange(token);
      onSignedInChange(true);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {user, idToken, isSignedIn, isLoading};
};

export const useSendSignInLink = () => {
  const {signOut} = useSignOutAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const sendSignInLinkToEmail = async (email: any) => {
    try {
      setIsLoading(true);
      signOut();
      await removeData('id_token');
      const res = await auth().sendSignInLinkToEmail(email, {
        handleCodeInApp: true,
        url: Config.DYNAMIC_LINK_URL,
        android: {packageName: ANDROID_PACKAGE_NAME},
        iOS: {bundleId: IOS_BUNDLE_ID},
      });
      setIsLoading(false);
      navigate('EmailVerification', {email});
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {sendSignInLinkToEmail, isLoading};
};
