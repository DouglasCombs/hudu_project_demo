import {HStack} from 'native-base';
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {CustomText, CustomTouchable, Rate, UserImage} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';

const UserInfoCard = ({
  data,
  isLoading = false,
  asLister = true,
  isDoer,
  isBidder,
  projectStatus,
  projectId,
}: {
  data: any;
  isLoading?: boolean;
  asLister?: boolean;
  isDoer?: boolean;
  isBidder?: boolean;
  projectStatus?: ProjectStatus;
  projectId?: number;
}) => {
  const isBidding = projectStatus === ProjectStatus.Bidding;

  const onPressHandler = () => {
    if (asLister) {
      navigate('HudurProfile', {
        userId: data?.id,
        projectId,
        showMessage: true,
      });
    } else if (isDoer) {
      navigate('ListerProfile', {
        userId: data?.id,
        projectId,
        showMessage: true,
      });
    } else if (isBidder && isBidding) {
      navigate('ListerProfile', {
        userId: data?.id,
        projectId,
        showMessage: true,
      });
    } else {
      navigate('ListerProfile', {
        userId: data?.id,
        projectId,
        showMessage: false,
      });
    }
  };

  return (
    <CustomTouchable onPress={onPressHandler}>
      <HStack
        borderWidth={'1'}
        borderColor={Colors.Ghost}
        borderRadius={'sm'}
        justifyContent={'space-between'}
        px="16px"
        py="16px"
        alignItems={'center'}>
        <HStack
          justifyContent={'space-between'}
          alignItems={'center'}
          space="12px">
          <UserImage
            errorText={data?.userName ?? data?.email}
            style={styles.avatar}
            sourceImage={data?.imageAddress}
            imageStyle={{borderRadius: 10}}
          />

          {isLoading ? (
            <ActivityIndicator color={Colors.PRIMARY} size="small" />
          ) : (
            <CustomText
              fontSize={fontSize.small}
              fontFamily={fontFamily.medium}>
              {data?.userName ?? ''}
            </CustomText>
          )}
        </HStack>
        <Rate rate={asLister ? data?.asListerRates : data?.asHuduRates} />
      </HStack>
    </CustomTouchable>
  );
};

export default UserInfoCard;

const styles = StyleSheet.create({
  avatar: {width: scale(40), height: scale(40), borderRadius: 10},
});
