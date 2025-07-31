import {Box, HStack, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  CategoryLabel,
  CustomImage,
  CustomText,
  CustomTouchable,
  ProjectStatusLabel,
  RemainedTimeSection,
} from '~/components';
import {Project, ProjectStatus} from '~/generated/graphql';
import {fontSize, verticalScale, width} from '~/utils/style';

type Props = {
  item: {
    project: Project;
    currentLowBid?: number;
  };
};

const ProjectsToBidRow = ({item: {project, currentLowBid}}: Props) => {
  const imageSource = project?.projectImages?.[0]?.imageAddress;
  const projectDeadLine = project?.projectDeadLine;
  const userId = project?.userId;
  const projectStatus = project?.projectStatus;
  const cancelRequestStatus = project?.cancellRequestStatus;
  const category = project?.category;
  const projectTitle = project?.title;
  const isBidding = projectStatus === ProjectStatus.Bidding;

  const onPressHandler = () => {};

  return (
    <Box px="24px" w={width}>
      <CustomTouchable style={styles.container} onPress={onPressHandler}>
        <VStack space="20px">
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
          <HStack alignItems="center" space="8px">
            <ProjectStatusLabel
              status={projectStatus}
              projectDeadLine={projectDeadLine}
              cancelRequestStatus={cancelRequestStatus}
            />
            {category && <CategoryLabel category={category} />}
          </HStack>
          <CustomText numberOfLines={3} fontSize={fontSize.xNormal}>
            {projectTitle}
          </CustomText>
        </VStack>
      </CustomTouchable>
    </Box>
  );
};

export default ProjectsToBidRow;

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
