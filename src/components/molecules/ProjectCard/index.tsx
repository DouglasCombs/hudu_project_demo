import {HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ChevronRight2, DollarCircle, TimerCircle} from '~/assets/icons';
import {CustomButton, CustomText, CustomTouchable} from '~/components';
import {
  CancellRequestStatus,
  Project,
  ProjectStatus,
} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {appFormatDate} from '~/utils/helper';
import {fontSize} from '~/utils/style';
import {useGetLowestBidTitle, useGetProjectRemainedTime} from '~/utils/utils';

type Props = {
  item: {
    project: Project;
    currentLowBid: number;
    isHuduFinished: boolean;
    awardedBid: any;
  };
  showDetails: boolean;
  isArchive?: boolean;
};

export default function ProjectCard({
  item,
  showDetails = true,
  isArchive,
}: Props) {
  const {t} = useTranslation();
  const {getLowestBidTitle} = useGetLowestBidTitle();
  const {getProjectRemainedTime} = useGetProjectRemainedTime();

  const projectData = item?.project ?? {};

  const {userData} = userDataStore(state => state);

  const isLister = projectData?.userId === userData?.id;
  const projectStatus = projectData?.projectStatus;
  const inProgress = projectStatus === ProjectStatus.InProgress;
  const projectDeadLine = projectData?.projectDeadLine;
  const isDoerFinishProject = item?.isHuduFinished;
  const awardedBid = item?.awardedBid;
  const isDoer = item?.currentDoer?.id === userData?.id;
  const cancelStatus =
    awardedBid?.cancellRequestStatus === CancellRequestStatus.Pendding ||
    awardedBid?.cancellRequestStatus === CancellRequestStatus.Cancelled;
  const remainedTime = item?.awardedBid?.awardDate
    ? appFormatDate(item?.awardedBid?.awardDate)
    : getProjectRemainedTime(projectDeadLine);
  const lowestBid = getLowestBidTitle({
    currentLowBid: item?.currentLowBid,
    listerId: userData?.id,
    projectDeadLine,
  });

  const onPressHandler = () => {
    navigate('ProjectDetails', {
      projectId: item?.project?.id,
      isDeepLinking: false,
    });
  };

  const finishOnPress = () => {
    navigate('RateAndReview', {
      projectId: item?.project?.id,
      bidId: item?.awardedBid?.id,
      asLister: false,
    });
  };

  const markAsComplete = () => {
    navigate('RateAndReview', {
      projectId: item?.project?.id,
      bidId: item?.awardedBid?.id,
    });
  };

  return (
    <CustomTouchable onPress={onPressHandler}>
      <VStack shadow="4" rounded="sm" bg={Colors.WHITE_F} p="16px" space="18px">
        <HStack alignItems="center">
          <CustomText
            flex={1}
            numberOfLines={2}
            color={Colors.RegalBlue}
            fontSize={fontSize.xNormal}>
            {item?.project?.title}
          </CustomText>
          <ChevronRight2 />
        </HStack>
        {showDetails && (
          <VStack space="16px">
            <HStack space="16px">
              <Item
                icon={<TimerCircle />}
                title={
                  item?.awardedBid?.awardDate
                    ? t('projects.awardedOn')
                    : t('projects.remainedTime')
                }
                value={remainedTime}
              />
              <Item
                icon={<DollarCircle />}
                title={
                  item?.awardedBid?.awardDate
                    ? t('projects.bidAmount.awardedBid')
                    : t('projects.bidAmount.currentLowBid')
                }
                value={lowestBid}
              />
            </HStack>
            {cancelStatus && isDoer && (
              <CustomButton
                disabled
                title={t('projects.pendingAdminApproval')}
                textColor={Colors.FINISHED}
                disableColor={Colors.FINISHED.concat('26')}
                onPress={() => {}}
                height={38}
                borderRadius="full"
              />
            )}
            {!isLister &&
              !isDoerFinishProject &&
              inProgress &&
              !isArchive &&
              !cancelStatus && (
                <CustomButton
                  outline
                  height={38}
                  borderRadius="full"
                  title={t('projects.finishProjects')}
                  onPress={finishOnPress}
                />
              )}
            {isLister && isDoerFinishProject && !isArchive && (
              <CustomButton
                outline
                height={38}
                borderRadius="full"
                title={t('projects.markAsComplete')}
                onPress={markAsComplete}
              />
            )}
          </VStack>
        )}
      </VStack>
    </CustomTouchable>
  );
}

const Item = ({
  title,
  value,
  icon,
}: {
  title: any;
  value: any;
  icon: JSX.Element;
}) => {
  return (
    <HStack space="8px" alignItems="center" flex={1}>
      {icon}
      <VStack space="4px">
        <CustomText fontSize={fontSize.xTiny} color={Colors.Topaz}>
          {title}
        </CustomText>
        <CustomText fontSize={fontSize.small} color={Colors.BLACK}>
          {value}
        </CustomText>
      </VStack>
    </HStack>
  );
};
