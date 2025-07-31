import {Spinner} from 'native-base';
import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {ProjectFilter} from '~/generated/graphql';
import {useGetUserLikeProjects} from '~/hooks/project';
import {navigate} from '~/navigation/Methods';
import {authStore} from '~/stores';
import {Colors} from '~/styles';
import {withLoggedInCheck} from '~/utils/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SavedProjectsButton() {
  const {isUserLoggedIn} = authStore(state => state);

  const options = useMemo(() => {
    return {
      projectFilter: ProjectFilter.NewestToOldest,
      location: [12, 12],
      where: {
        project: {
          and: [{isDeletedAccount: {neq: true}}],
        },
      },
      enabled: isUserLoggedIn,
    };
  }, [isUserLoggedIn]);

  const {isLoading: getUserLikeProjectsLoading, data: getUserLikeProjects} =
    useGetUserLikeProjects(options);

  const data = getUserLikeProjects?.pages ?? [];

  const archiveOnPress = () => {
    withLoggedInCheck(() => navigate('SavedProjects'));
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={archiveOnPress}>
      {getUserLikeProjectsLoading ? (
        <Spinner color={Colors.Rhino} size="sm" />
      ) : data?.length > 0 ? (
        <Ionicons color={Colors.Rhino} name="bookmark" size={22} />
      ) : (
        <Ionicons color={Colors.Rhino} name="bookmark-outline" size={22} />
      )}
    </TouchableOpacity>
  );
}

export default SavedProjectsButton;
