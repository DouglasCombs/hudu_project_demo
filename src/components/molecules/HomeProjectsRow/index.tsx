import {HStack, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  CategoryLabel,
  CustomImage,
  CustomText,
  CustomTouchable,
  ProjectStatusLabel,
  RemainedTimeSection,
  AsListerLabel,
} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';
import {fontSize, verticalScale} from '~/utils/style';

type Props = {
  item: {
    project: {
      projectImages?: {imageAddress?: string}[];
      projectDeadLine?: string;
      userId?: number;
      projectStatus?: ProjectStatus;
      category?: {text?: string};
      title?: string;
      cover?: string;
      cancellRequestStatus?: any;
    };
    currentLowBid?: number;
    isHuduFinished?: boolean;
  };
  mb?: number;
};

const HomeProjectsRow = ({item, mb}: Props) => {
  const project = item?.project;
  const currentLowBid = item?.currentLowBid;
  const imageSource = project?.cover;
  const projectDeadLine = project?.projectDeadLine;
  const userId = project?.userId;
  const projectStatus = project?.projectStatus;
  const cancelRequestStatus = project?.cancellRequestStatus;
  const category = project?.category;
  const projectTitle = project?.title;
  const isBidding = projectStatus === ProjectStatus.Bidding;
  const isDoerFinishProject = item?.isHuduFinished;

  const onPressHandler = () => {
    navigate('ProjectDetails', {projectId: project?.id, isDeepLinking: false});
  };

  return (
    <CustomTouchable
      style={[styles.container, {marginBottom: mb}]}
      onPress={onPressHandler}>
      <VStack>
        <CustomImage
          resizeMode="cover"
          imageSource={imageSource}
          style={styles.image}>
          {isBidding && (
            <RemainedTimeSection
              {...{projectDeadLine, currentLowBid, userId}}
            />
          )}
        </CustomImage>
        <HStack my="12px" alignItems="center" space="8px">
          <ProjectStatusLabel
            status={projectStatus}
            projectDeadLine={projectDeadLine}
            cancelRequestStatus={cancelRequestStatus}
            isDoerFinishProject={isDoerFinishProject}
          />
          {category && <CategoryLabel category={category} />}
          <AsListerLabel {...{userId}} />
        </HStack>
        <CustomText numberOfLines={3} fontSize={fontSize.xNormal}>
          {projectTitle}
        </CustomText>
      </VStack>
    </CustomTouchable>
  );
};

export default HomeProjectsRow;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(183),
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    width: '100%',
  },
});
