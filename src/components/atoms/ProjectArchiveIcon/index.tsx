import React, {useEffect, useState} from 'react';
import {Archive, ArchiveOutline} from '~/assets/icons';
import {CustomTouchable} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {Project, ResponseStatus} from '~/generated/graphql';
import {queryClient} from '~/graphql/AuthProvider';
import {useProjectLike, useProjectUnLike} from '~/hooks/project';
import {userDataStore} from '~/stores';
import {withLoggedInCheck} from '~/utils/utils';

const ProjectArchiveIcon = ({
  item,
  isLiked,
}: {
  item: Project;
  isLiked?: boolean;
}) => {
  const {userData} = userDataStore(state => state);
  const [like, setLike] = useState<boolean>(isLiked ?? false);

  useEffect(() => {
    setLike(isLiked ?? false);
  }, [isLiked]);

  const {mutate: projectLikeMutate, isLoading: isLoadingProjectLike} =
    useProjectLike();
  const {mutate: projectUnLikeMutate, isLoading: isLoadingProjectUnLike} =
    useProjectUnLike();

  const onPressHandler = () => {
    withLoggedInCheck(() => likeUnLike());
  };

  const likeUnLike = () => {
    if (like) {
      setLike(false);
      const input = {item, userId: userData?.id};
      projectUnLikeMutate(input as any, {
        onSuccess: successData => {
          if (successData?.project_unlike?.status !== ResponseStatus.Success) {
            setLike(true);
          }
        },
        onError: () => {
          setLike(true);
        },
      });
    } else {
      setLike(true);
      projectLikeMutate(item as any, {
        onSuccess: successData => {
          if (successData?.project_like?.status !== ResponseStatus.Success) {
            setLike(false);
          }
        },
        onError: () => {
          setLike(false);
        },
      });
    }
  };

  const loading = isLoadingProjectLike || isLoadingProjectUnLike;

  return (
    <CustomTouchable disabled={loading} onPress={onPressHandler}>
      {like ? <Archive /> : <ArchiveOutline />}
    </CustomTouchable>
  );
};

export default ProjectArchiveIcon;
