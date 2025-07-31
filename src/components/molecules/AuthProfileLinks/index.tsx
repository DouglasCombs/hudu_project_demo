import React, {Fragment} from 'react';
import {Divider, VStack} from 'native-base';
import {Linking, StyleSheet} from 'react-native';
import {navigate} from '~/navigation/Methods';
import {LinkItem} from '~/components';
import {Colors} from '~/styles';

const LINKS = [
  {
    id: 1,
    title: 'FAQ & Tutorials',
    navLink: null,
    url: 'https://heyhudu.com/faq/',
  },
  {
    id: 2,
    title: 'Terms and Conditions',
    navLink: null,
    url: 'https://heyhudu.com/terms-and-conditions/',
  },
  {
    id: 3,
    title: 'Privacy Policy',
    navLink: null,
    url: 'https://heyhudu.com/privacy/',
  },
  {
    id: 4,
    title: 'Support',
    navLink: null,
    url: 'https://heyhudu.com/support/',
  },
];

const AuthProfileLinks = () => {
  const onItemPressHandler = (item: any) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else if (item.navLink) {
      //@ts-ignore
      navigate('AuthStack', {
        screen: item.navLink,
      });
    } else if (item?.onPress) {
      item.onPress();
    }
  };

  const onLogInPressHandler = () => {
    navigate('AuthStack');
  };

  return (
    <>
      <VStack py="4">
        {LINKS.map(item => (
          <Fragment key={item.id}>
            <LinkItem
              title={item.title}
              onPress={() => onItemPressHandler(item)}
            />
            {<Divider my="1" />}
          </Fragment>
        ))}
      </VStack>
      <LinkItem
        mt="4"
        last
        title="Log in"
        onPress={onLogInPressHandler}
        icon="log-in-outline"
        color={Colors.PRIMARY}
        iconStyle={styles.icon}
      />
    </>
  );
};

export default AuthProfileLinks;

const styles = StyleSheet.create({
  icon: {
    marginRight: 8,
  },
});
