import {Linking} from 'react-native';
import Config from 'react-native-config';
import {tempStore} from '~/stores';
import {navigate} from './Methods';

const config = {
  screens: {
    Splash: {path: 'auth'},
    DrawerStack: {
      screens: {
        MainStack: {
          screens: {
            ProjectDetails: {
              path: 'project',
            },
          },
        },
      },
    },
  },
};

const linking = {
  prefixes: ['hudu://hudu', Config.DEEP_LINKING],
  config,
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    url && handleURL(url);
    return url;
  },

  subscribe(listener: any) {
    const linkingSubscription = Linking.addEventListener('url', ({url}) => {
      url && handleURL(url);
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },
};

export default linking;

const handleURL = async (url: any) => {
  if (url?.includes(Config.DEEP_LINKING + 'messages')) {
    const params = getUrlParams(url);
    const {conversationId, userId, projectId} = params;
    if (conversationId && userId && projectId) {
      setTimeout(() => {
        navigate('Chat', {
          user: {id: parseInt(userId)},
          conversationId: parseInt(conversationId),
          projectId: parseInt(projectId),
        });
      }, 3500);
    }
  } else if (url?.includes(Config.DEEP_LINKING + 'auth/signup?referral')) {
    const params = getUrlParams(url);
    const {referral} = params;
    const referralCode = referral?.replace?.('-', '');
    tempStore.setState({referralCode: referralCode});
  }
};

const getUrlParams = (url: any) => {
  const searchParams = new URLSearchParams(url.split('?')[1]);
  return Object.fromEntries(searchParams.entries());
};
