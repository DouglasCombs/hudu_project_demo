import {Center, HStack} from 'native-base';
import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {CustomText, CustomTouchable, UserImage} from '~/components';
import {useGetConversationId} from '~/hooks/message';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {abbr} from '~/utils/abbr';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';

const UserProfileHeader = ({
  userData,
  userId,
  isShowMessage,
  projectId,
}: {
  userData: any;
  userId: number;
  isShowMessage: boolean;
  projectId?: number;
}) => {
  const {userData: currentUserData} = userDataStore(state => state);
  const isCurrentUser = userId === currentUserData?.id;
  const {t} = useTranslation();

  const {mutate: mutateGetConversationId, isLoading: getConversationIdLoading} =
    useGetConversationId();

  const messageOnPress = () => {
    const input = {
      otherUserId: userId,
      projectId: projectId,
      currentUserId: currentUserData?.id,
    };
    mutateGetConversationId(input, {
      onSuccess: successData => {
        const conversationId =
          successData?.message_getConversationForUser?.result?.id;
        navigate('Chat', {conversationId, user: userData, projectId});
      },
    });
  };

  const onEditPress = () => {
    navigate('EditProfile');
  };

  return (
    <HStack py="4" px="4" justifyContent={'space-between'} alignItems="center">
      {userData?.imageAddress ? (
        <UserImage
          errorText={userData?.userName ?? userData?.email}
          sourceImage={userData?.imageAddress}
          style={styles.image}
          imageStyle={{
            borderRadius: 1000,
          }}
        />
      ) : (
        <Center
          borderRadius={1000}
          bg={Colors.SEARCH_BACKGROUND}
          borderColor={Colors.TRANSPARENT}
          size="105px">
          <CustomText fontSize={fontSize.large} color={Colors.PLACEHOLDER}>
            {abbr(userData?.userName ?? userData?.email)}
          </CustomText>
        </Center>
      )}

      {isCurrentUser ? (
        <Button outline title={t('common.edit')} onPress={onEditPress} />
      ) : isShowMessage ? (
        <Button
          title={t('profile.message')}
          onPress={messageOnPress}
          loading={getConversationIdLoading}
        />
      ) : null}
    </HStack>
  );
};

export default memo(UserProfileHeader);

const styles = StyleSheet.create({
  image: {
    width: scale(70),
    height: scale(70),
    borderRadius: 1000,
  },
  outline: {
    borderRadius: 1000,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    paddingHorizontal: scale(30),
    paddingVertical: scale(8),
    minWidth: scale(130),
    minHeight: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 1000,
    borderColor: Colors.BORDER,
    borderWidth: 1,
    paddingHorizontal: scale(30),
    paddingVertical: scale(8),
    backgroundColor: Colors.PRIMARY,
    minWidth: scale(130),
    minHeight: verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Button = ({
  title,
  loading,
  outline,
  onPress,
}: {
  title: string;
  loading?: boolean;
  outline?: boolean;
  onPress: () => void;
}) => {
  return (
    <CustomTouchable
      style={outline ? styles.outline : styles.button}
      {...{onPress}}>
      <Center>
        {loading ? (
          <ActivityIndicator color={Colors.WHITE} size="small" />
        ) : (
          <CustomText
            textAlign="center"
            fontSize={fontSize.tiny}
            fontFamily={fontFamily.medium}
            color={outline ? Colors.BORDER : Colors.WHITE}>
            {title}
          </CustomText>
        )}
      </Center>
    </CustomTouchable>
  );
};
