import {ArrowRight2} from 'iconsax-react-native';
import {Box, HStack, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  CustomImage,
  CustomText,
  CustomTouchable,
  ProjectRemainedTime,
  ProjectStatusLabel,
  SectionBidAmount,
} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';
import {Colors} from '~/styles';
import {fontSize, width} from '~/utils/style';

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
  };
  onClose?: () => void;
};

const ProjectsByCityRow = ({
  item: {project, currentLowBid},
  onClose,
}: Props) => {
  const imageSource = project?.cover;
  const projectDeadLine = project?.projectDeadLine;
  const userId = project?.userId;
  const projectStatus = project?.projectStatus;
  const cancelRequestStatus = project?.cancellRequestStatus;
  const categoryText = project?.category?.text;
  const projectTitle = project?.title;

  const onPressHandler = () => {
    onClose?.();
    navigate('ProjectDetails', {projectId: project?.id, isDeepLinking: false});
  };

  return (
    <CustomTouchable style={styles.container} onPress={onPressHandler}>
      <Box
        alignItems="center"
        shadow="4"
        bg={Colors.WHITE_F}
        px="8px"
        py="12px"
        rounded="sm"
        w={width * 0.8}>
        <HStack space="12px">
          <CustomImage
            resizeMode="cover"
            imageSource={imageSource}
            style={styles.image}
          />
          <VStack flex={1} space="1">
            <HStack justifyContent="space-between" alignItems="center">
              <ProjectStatusLabel
                fontSize={fontSize.xTiny}
                status={projectStatus}
                projectDeadLine={projectDeadLine}
                cancelRequestStatus={cancelRequestStatus}
              />
              <ArrowRight2 size="24" color={Colors.Ghost} />
            </HStack>
            <CustomText numberOfLines={1} fontSize={fontSize.xNormal}>
              {projectTitle}
            </CustomText>
            {categoryText && (
              <HStack>
                <CustomText
                  fontSize={fontSize.xTiny}
                  numberOfLines={1}
                  color={Colors.Topaz}>
                  {categoryText}
                </CustomText>
              </HStack>
            )}
            <HStack
              flex={1}
              w="100%"
              py="4px"
              rounded="sm"
              alignItems="center"
              space="16px">
              <ProjectRemainedTime
                color={Colors.BLACK}
                iconColor={Colors.PRIMARY}
                time={projectDeadLine}
              />
              <SectionBidAmount
                color={Colors.BLACK}
                titleColor={Colors.GREY}
                listerId={userId}
                currentLowBid={currentLowBid}
                flex={1}
              />
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </CustomTouchable>
  );
};

export default ProjectsByCityRow;

const styles = StyleSheet.create({
  image: {
    width: 89,
    height: 89,
    borderRadius: 4,
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    width: '100%',
  },
});
