import {useQueryClient} from '@tanstack/react-query';
import {HStack} from 'native-base';
import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TouchableOpacity} from 'react-native';
import images from '~/assets/images';
import {CustomImage, CustomText} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {NotificationType, ResponseStatus} from '~/generated/graphql';
import {useReadNotification} from '~/hooks/notification';
import {navigate} from '~/navigation/Methods';
import {languageStore} from '~/stores';
import {Colors} from '~/styles';
import {getTodayTimeFromNow} from '~/utils/helper';
import {fontFamily, fontSize, scale} from '~/utils/style';
import {showInfoMessage} from '~/utils/utils';

const NotificationItem = ({item}: {item: any}) => {
  const {t} = useTranslation();
  const {currentLanguage} = languageStore(state => state);

  const queryClient = useQueryClient();
  const {mutate: mutateReadNotification, isLoading: readNotificationLoading} =
    useReadNotification();

  useEffect(() => {
    if (item?.id && !item?.isReaded) {
      mutateReadNotification(item?.id, {
        onSuccess: successData => {
          if (
            successData?.notification_readNotification?.status ===
            ResponseStatus.Success
          ) {
            queryClient.invalidateQueries(queryKeys.unReadNotifications);
          }
        },
        onError: () => {},
      });
    }
  }, []);

  const onPressHandler = () => {
    if (item?.isDeletedAccount === true) {
      showInfoMessage(t('messages.errors.thisAccountHasBeenDeleted'));
    } else {
      if (item?.project) {
        switch (item?.notificationType) {
          case NotificationType.BidApprovedByLister:
          case NotificationType.BidRejectedByLister:
          case NotificationType.ProjectFailedByLister:
          case NotificationType.BidWasDeleted:
            navigate('MainTabs', {
              screen: 'ProjectsTab',
              params: {initialRoute: 0},
            });
            break;
          case NotificationType.HuduShouldCompleteStripeAccountToWithdraw:
            navigate('MainTabs', {
              screen: 'ProjectsTab',
              params: {initialRoute: 1},
            });
            break;
          case NotificationType.NewQuestionAskedOnProject:
            navigate('ProjectDetails', {
              projectId: item?.projectId,
              initialRoute: 1,
              isDeepLinking: false,
            });
            break;
          // case NotificationType.FeedbackReceived:

          //   break;
          case NotificationType.BidActivatedByHudu:
          case NotificationType.NewBidGiven:
            navigate('ProjectDetails', {
              projectId: item?.projectId,
              initialRoute: 2,
              isDeepLinking: false,
            });
            break;
          default:
            navigate('ProjectDetails', {
              projectId: item?.projectId,
              isDeepLinking: false,
            });
            break;
        }
      }
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPressHandler}>
      <HStack space="12px" alignItems="center" px="24px" bg={Colors.WHITE_F}>
        <CustomImage
          imageSource={item?.sender?.imageAddress}
          errorText={item?.sender?.userName ?? item?.sender?.email}
          style={styles.avatar}
          errorImage={images.avatarErrorImage}
        />
        <CustomText
          fontSize={fontSize.small}
          fontFamily={fontFamily.medium}
          flex={1}>
          {currentLanguage === 'en' ? item?.title : item?.spanishTitle}
        </CustomText>
        <CustomText
          fontSize={fontSize.small}
          fontFamily={fontFamily.medium}
          color={Colors.Topaz}>
          {getTodayTimeFromNow(item?.createdDate)}
        </CustomText>
      </HStack>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginRight: scale(14),
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
  },
});

/*

  const {
    mutate: mutateDeleteNotification,
    isLoading: deleteNotificationLoading,
  } = useDeleteNotification();

  const deleteOnPress = () => {
    mutateDeleteNotification(item?.id, {
      onSuccess: () => {},
    });
  };

<HStack
      p="2"
      w="100%"
      rounded={10}
      borderWidth="1"
      overflow="hidden"
      borderColor={Colors.GARY_2}>
      {!item?.isReaded && (
        <Badge
          mt="1"
          px="1"
          h="3"
          w="3"
          mr="2"
          rounded="full"
          variant="solid"
          bg={Colors.FINISHED}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPressHandler}
        style={styles.item}>
        <VStack>
          <CustomText fontSize={fontSize.small} flex={1}>
            {item?.title}
          </CustomText>
        </VStack>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={deleteOnPress}>
        {deleteNotificationLoading ? (
          <Spinner color={Colors.BLACK_3} size={24} />
        ) : (
          <Icon name="close" color={Colors.BLACK_3} size={24} />
        )}
      </TouchableOpacity>
    </HStack>

*/
