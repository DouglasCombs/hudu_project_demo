import React from 'react';
import {IconButton} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '~/styles';
import {authStore, userDataStore} from '~/stores';
import {useProjectLike, useProjectUnLike} from '~/hooks/project';
import {showInfoMessage} from '~/utils/utils';

const ProjectFavoriteIcon = ({item, size = 18}: {item: any; size?: number}) => {
  const {isUserLoggedIn} = authStore(state => state);
  const {userData} = userDataStore(state => state);

  const {mutate: projectLikeMutate} = useProjectLike();
  const {mutate: projectUnLikeMutate} = useProjectUnLike();

  const onPressHandler = () => {
    if (isUserLoggedIn) {
      if (item?.isLiked) {
        const input = {item, userId: userData?.id};
        projectUnLikeMutate(input, {
          onSuccess: () => {},
          onError: () => {},
        });
      } else {
        projectLikeMutate(item, {
          onSuccess: () => {},
          onError: () => {},
        });
      }
    } else {
      showInfoMessage('You are not logged in');
    }
  };

  const loading = false;

  return (
    <IconButton
      disabled={loading}
      onPress={onPressHandler}
      bg={Colors.FAVORITE_RIPPLE}
      colorScheme={Colors.WHITE_RIPPLE}
      borderRadius="full"
      icon={
        <MaterialCommunityIcons
          name={item?.isLiked ? 'heart' : 'heart-outline'}
          color={item?.isLiked ? Colors.ERROR : Colors.BLACK}
          size={size}
        />
      }
    />
  );
};

export default ProjectFavoriteIcon;

/*


loading ? (
          <Spinner size={size} color={Colors.BLACK} />
        ) : (
          <MaterialCommunityIcons
            name={item?.isLiked ? 'heart' : 'heart-outline'}
            color={item?.isLiked ? Colors.ERROR : Colors.BLACK}
            size={size}
          />
        )

*/
