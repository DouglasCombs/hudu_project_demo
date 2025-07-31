import {HStack, Spacer, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  CategoryLabel,
  CustomImage,
  CustomText,
  CustomTouchable,
  ProjectStatusLabel,
  RemainedTimeSection,
  SectionDoerBidAmount,
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
    isHuduFinished?: boolean;
    currentLowBid?: number;
    yourLowesBid?: number;
  };
  mb?: number;
};

const MyBidsRow = ({item, mb}: Props) => {
  const project = item?.project;
  const isHuduFinished = item?.isHuduFinished;
  const currentLowBid = item?.currentLowBid;
  const yourLowestBid = item?.yourLowesBid;
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
            isDoer
            status={projectStatus}
            projectDeadLine={projectDeadLine}
            cancelRequestStatus={cancelRequestStatus}
            isDoerFinishProject={isHuduFinished}
          />
          {category && <CategoryLabel category={category} />}
        </HStack>
        <CustomText numberOfLines={3} fontSize={fontSize.xNormal}>
          {projectTitle}
        </CustomText>
        {yourLowestBid && (
          <>
            <Spacer h="8px" />
            <SectionDoerBidAmount
              listerId={userId}
              currentLowBid={yourLowestBid}
            />
          </>
        )}
      </VStack>
    </CustomTouchable>
  );
};

export default MyBidsRow;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: verticalScale(183),
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  container: {
    width: '100%',
  },
});
