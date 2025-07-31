import {VStack, View} from 'native-base';
import React, {memo} from 'react';
import {fontFamily, fontSize} from '~/utils/style';
import Accordion from '../Accordion';
import CustomText from '../CustomText';
import {Colors} from '~/styles';
import {useGetProjectCountByStatus} from '~/hooks/project';
import {ProjectStatus} from '~/generated/graphql';
import {useTranslation} from 'react-i18next';

const ProjectHistoryCard = ({
  userId,
  leaderBoardPoint,
}: {
  userId: number;
  leaderBoardPoint: number;
}) => {
  const {data: getProjectCount, isLoading: isLoadingGetProjectCount} =
    useGetProjectCountByStatus({listerId: userId});
  const {t} = useTranslation();

  const projectsCount =
    getProjectCount?.project_getProjectCountByStatus?.result;

  const listingCount = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.Bidding:
        return projectsCount?.bidding ?? 0;
      case ProjectStatus.Cancelled:
        return projectsCount?.cancelled ?? 0;
      case ProjectStatus.Failed:
        return projectsCount?.failed ?? 0;
      case ProjectStatus.Finished:
        return projectsCount?.finished ?? 0;
      case ProjectStatus.InProgress:
        return projectsCount?.inProgress ?? 0;

      default:
        break;
    }
  };

  return (
    <Accordion title={t('profile.projectHistory')} icon={<View />} open>
      <VStack space="4" my="4">
        <VStack space="1">
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.SEMI_BLACK}
            fontFamily={fontFamily.light}>
            {t('profile.successfulProjects')}
          </CustomText>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.BLACK}
            fontFamily={fontFamily.medium}>
            {listingCount(ProjectStatus.Finished)}
          </CustomText>
        </VStack>
        {/* <VStack>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.SEMI_BLACK}
            fontFamily={fontFamily.light}>
            {t('profile.cancelProjects')}
          </CustomText>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.BLACK}
            fontFamily={fontFamily.medium}>
            {listingCount(ProjectStatus.Cancelled)}
          </CustomText>
        </VStack> */}
        <VStack>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.SEMI_BLACK}
            fontFamily={fontFamily.light}>
            {t('profile.leaderboardScore')}
          </CustomText>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.BLACK}
            fontFamily={fontFamily.medium}>
            {leaderBoardPoint} PTS
          </CustomText>
        </VStack>
      </VStack>
    </Accordion>
  );
};

export default memo(ProjectHistoryCard);
