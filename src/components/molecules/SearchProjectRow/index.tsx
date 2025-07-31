import {HStack, Spacer, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  AsListerLabel,
  CategoryLabel,
  CustomImage,
  CustomText,
  CustomTouchable,
  ProjectArchiveIcon,
  ProjectStatusLabel,
  RemainedTimeSection,
  SectionDoerBidAmount,
} from '~/components';
import {Project, ProjectStatus} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';
import {fontSize, verticalScale} from '~/utils/style';

type Props = {
  project: Project;
  currentLowBid?: number;
  isLiked?: boolean;
  yourLowesBid?: number;
};

const SearchProjectRow = ({item}: {item: Props}) => {
  const project = item?.project;
  const currentLowBid = item?.currentLowBid;
  const yourLowestBid = item?.yourLowesBid;
  const isDoerFinishProject = item?.isHuduFinished;
  const isLiked = item?.isLiked;
  const imageSource = project?.cover;
  const projectDeadLine = project?.projectDeadLine;
  const userId = project?.userId;
  const projectStatus = project?.projectStatus;
  const cancelRequestStatus = project?.cancellRequestStatus;
  const category = project?.category;
  const projectTitle = project?.title;
  const isBidding = projectStatus === ProjectStatus.Bidding;

  const onPressHandler = () => {
    navigate('ProjectDetails', {projectId: project?.id, isDeepLinking: false});
  };

  return (
    <VStack flex={1} w="100%">
      <CustomTouchable onPress={onPressHandler}>
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
      </CustomTouchable>
      <HStack my="12px" alignItems="center" space="8px">
        <HStack alignItems="center" flex={1} space="8px">
          <ProjectStatusLabel
            status={projectStatus}
            projectDeadLine={projectDeadLine}
            cancelRequestStatus={cancelRequestStatus}
            isDoerFinishProject={isDoerFinishProject}
          />
          {category && <CategoryLabel category={category} />}
          <AsListerLabel {...{userId}} />
        </HStack>
        <ProjectArchiveIcon item={project} isLiked={isLiked} />
      </HStack>
      <CustomText numberOfLines={3} fontSize={fontSize.xNormal}>
        {projectTitle}
      </CustomText>
      {yourLowestBid && yourLowestBid > 0 && (
        <>
          <Spacer h="8px" />
          <SectionDoerBidAmount
            listerId={userId}
            currentLowBid={yourLowestBid}
          />
        </>
      )}
    </VStack>
  );
};

export default SearchProjectRow;

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
