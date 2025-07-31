import {HStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ChevronRightCircle, DollarCircle} from '~/assets/icons';
import {Colors} from '~/styles';
import {CustomText} from '~/components';
import {useTranslation} from 'react-i18next';
import {fontSize} from '~/utils/style';
import dayjs from 'dayjs';
import {ProjectStatus} from '~/generated/graphql';
import {navigate} from '~/navigation/Methods';

type Props = {
  projectData?: any;
};

export default function ManageBidsShortcut({projectData}: Props) {
  const {t} = useTranslation();

  const isBidding =
    projectData?.project?.projectStatus === ProjectStatus.Bidding;
  const isBidder = projectData?.yourLowesBid > 0;
  const projectDeadLine = projectData?.project?.projectDeadLine;
  const yourLowestBid = projectData?.yourLowesBid;

  const date1 = dayjs(projectDeadLine);
  const current = dayjs();
  const deadLine = date1.diff(current, 'millisecond', true);

  const isClosed = deadLine <= 0;

  const onPress = () => {
    navigate('ManageBids', {projectId: projectData?.project?.id});
  };

  if (isBidding && isBidder && !isClosed) {
    return (
      <TouchableOpacity onPress={onPress}>
        <HStack
          px="16px"
          py="12px"
          mb="8px"
          space="8px"
          rounded="sm"
          bg={Colors.Rhino}
          alignItems="center">
          <DollarCircle
            strokeColor={Colors.WHITE}
            fillColor={Colors.MidnightExpress}
          />
          <CustomText fontSize={fontSize.small} color={Colors.WHITE}>
            {t('projects.bidAmount.yourLowestBid')}
          </CustomText>
          <CustomText flex={1} fontSize={fontSize.small} color={Colors.WHITE}>
            {`$${yourLowestBid?.toFixed(2) ?? '0.00'}`}
          </CustomText>
          <ChevronRightCircle />
        </HStack>
      </TouchableOpacity>
    );
  }

  return null;
}
