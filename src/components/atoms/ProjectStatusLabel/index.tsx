import dayjs from 'dayjs';
import {Center, HStack} from 'native-base';
import React, {memo, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {CustomText} from '~/components';
import {ProjectStatus} from '~/generated/graphql';
import {Colors} from '~/styles';
import {fontSize as appFontSize, fontFamily} from '~/utils/style';

const ProjectStatusLabel = ({
  status,
  flex,
  isDoer,
  fontSize = appFontSize.xTiny,
  type = 'normal',
  projectDeadLine,
  cancelRequestStatus,
  isDoerFinishProject,
}: {
  status?: ProjectStatus | undefined;
  flex?: number;
  isDoer?: boolean;
  fontSize?: number;
  type?: 'normal' | 'outline';
  projectDeadLine?: any;
  cancelRequestStatus?: any;
  isDoerFinishProject?: boolean;
}) => {
  const {t} = useTranslation();

  const date1 = dayjs(projectDeadLine);
  const current = dayjs();
  const deadLine = date1.diff(current, 'millisecond', true);

  const pendingCancelation = cancelRequestStatus === 'PENDING';

  const projectStatus = useMemo(() => {
    return isDoer
      ? {
          ['DOER_FINISHED_PROJECT']: t('projects.doerProjectStatus.done'),
          ['PENDING']: t('projects.doerProjectStatus.bidding'),
          [ProjectStatus.Bidding]: t('projects.doerProjectStatus.bidding'),
          [ProjectStatus.Failed]: t('projects.doerProjectStatus.failed'),
          [ProjectStatus.InProgress]: t('projects.projectStatus.awarded'),
          [ProjectStatus.Finished]: t('projects.doerProjectStatus.finished'),
          [ProjectStatus.Cancelled]: t('projects.doerProjectStatus.canceled'),
        }
      : {
          ['DOER_FINISHED_PROJECT']: t('projects.doerProjectStatus.done'),
          ['PENDING']: t('projects.projectStatus.cancelationPending'),
          [ProjectStatus.Bidding]: t('projects.projectStatus.bidding'),
          [ProjectStatus.Failed]: t('projects.projectStatus.failed'),
          [ProjectStatus.InProgress]: t('projects.projectStatus.awarded'),
          [ProjectStatus.Finished]: t('projects.projectStatus.finished'),
          [ProjectStatus.Cancelled]: t('projects.projectStatus.canceled'),
        };
  }, [isDoer, t]);

  const projectStatusColor = useMemo(() => {
    return isDoer
      ? {
          ['PENDING']: {
            backgroundColor: Colors.OffYellow,
            color: Colors.Ronchi,
          },
          ['DOER_FINISHED_PROJECT']: {
            backgroundColor: Colors.PRIMARY_BACKGROUND,
            color: Colors.PRIMARY,
          },
          [ProjectStatus.Bidding]: {
            backgroundColor: Colors.OffYellow,
            color: Colors.Ronchi,
          },
          [ProjectStatus.Failed]: {
            backgroundColor: Colors.PRIMARY_BACKGROUND,
            color: Colors.PRIMARY,
          },
          [ProjectStatus.InProgress]: {
            backgroundColor: Colors.MountainMeadow,
            color: Colors.LimeGreen,
          },
          [ProjectStatus.Finished]: {
            backgroundColor: Colors.PRIMARY_BACKGROUND,
            color: Colors.SUCCESS,
          },
          [ProjectStatus.Cancelled]: {
            backgroundColor: Colors.FrenchRoseBackground,
            color: Colors.FrenchRose,
          },
        }
      : {
          ['PENDING']: {
            backgroundColor: Colors.FrenchRoseBackground,
            color: Colors.FrenchRose,
          },
          ['DOER_FINISHED_PROJECT']: {
            backgroundColor: Colors.PRIMARY_BACKGROUND,
            color: Colors.PRIMARY,
          },
          [ProjectStatus.Bidding]: {
            backgroundColor: Colors.PRIMARY_BACKGROUND,
            color: Colors.PRIMARY,
          },
          [ProjectStatus.Failed]: {
            backgroundColor: Colors.PRIMARY_BACKGROUND,
            color: Colors.PRIMARY,
          },
          [ProjectStatus.InProgress]: {
            backgroundColor: Colors.MountainMeadow,
            color: Colors.LimeGreen,
          },
          [ProjectStatus.Finished]: {
            backgroundColor: Colors.SUCCESS_BACKGROUND,
            color: Colors.SUCCESS,
          },
          [ProjectStatus.Cancelled]: {
            backgroundColor: Colors.FrenchRoseBackground,
            color: Colors.FrenchRose,
          },
        };
  }, [isDoer]);

  const isClosed = useMemo(() => {
    return status === ProjectStatus.Bidding && deadLine <= 0;
  }, [status, deadLine]);

  const textColor = useMemo(() => {
    return isClosed
      ? Colors.Topaz
      : projectStatusColor?.[
          pendingCancelation
            ? 'PENDING'
            : isDoerFinishProject
            ? 'DOER_FINISHED_PROJECT'
            : status
        ]?.color;
  }, [
    isClosed,
    status,
    pendingCancelation,
    isDoerFinishProject,
    projectStatusColor,
  ]);

  const statusText = useMemo(() => {
    return isClosed
      ? t('projects.projectStatus.closedBid')
      : projectStatus[
          pendingCancelation
            ? 'PENDING'
            : isDoerFinishProject
            ? 'DOER_FINISHED_PROJECT'
            : status
        ];
  }, [
    t,
    isClosed,
    pendingCancelation,
    isDoerFinishProject,
    status,
    projectStatus,
  ]);

  const backgroundColor = useMemo(() => {
    return textColor ? textColor.concat('26') : Colors.Topaz.concat('26');
  }, [textColor]);

  if (type === 'outline') {
    return (
      <HStack
        flex={1}
        py="8px"
        space="8px"
        rounded="sm"
        alignItems="center"
        justifyContent="center"
        bg={backgroundColor}>
        <CustomText
          fontFamily={fontFamily.medium}
          fontSize={appFontSize.small}
          color={textColor}>
          {status ? statusText : ''}
        </CustomText>
      </HStack>
    );
  }

  return (
    <Center
      flex={flex}
      px="8px"
      py="4px"
      borderRadius="sm"
      bg={backgroundColor}>
      <CustomText
        fontSize={fontSize}
        zIndex={11}
        fontFamily={fontFamily.medium}
        color={textColor}>
        {status ? statusText : ''}
      </CustomText>
    </Center>
  );
};

export default memo(ProjectStatusLabel);
