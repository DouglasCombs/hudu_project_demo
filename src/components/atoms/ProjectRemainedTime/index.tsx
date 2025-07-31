import {HStack} from 'native-base';
import React from 'react';
import {Clock} from '~/assets/icons';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontSize} from '~/utils/style';
import {useGetProjectRemainedTime} from '~/utils/utils';

function ProjectRemainedTime({
  time,
  color = Colors.WHITE_F,
  iconColor = Colors.WHITE_F,
}: {
  time?: any;
  color?: string;
  iconColor?: string;
}) {
  const {getProjectRemainedTime} = useGetProjectRemainedTime();

  return (
    <HStack space="8px" alignItems="center">
      <Clock strokeColor={iconColor} />
      <CustomText fontSize={fontSize.xTiny} color={color}>
        {getProjectRemainedTime(time)}
      </CustomText>
    </HStack>
  );
}

export default ProjectRemainedTime;
