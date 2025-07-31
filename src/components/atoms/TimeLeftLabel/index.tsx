import React from 'react';
import {Box, HStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {CustomText} from '~/components';
dayjs.extend(duration);

const TimeLeftLabel = ({time, type = 'public'}: {time: any; type?: string}) => {
  const date1 = dayjs(time);
  const current = dayjs();
  const projectDeadLine = date1.diff(current, 'millisecond', true);

  const days = dayjs.duration(projectDeadLine).days();
  const hours = dayjs.duration(projectDeadLine).hours();
  const minutes = dayjs(projectDeadLine).minute();

  const status =
    days < 0
      ? {
          days: 0,
          hours: 0,
          minutes: 0,
          backgroundColor: Colors.TIME_LEFT_RED,
          color: Colors.WHITE,
        }
      : days < 1
      ? {
          days,
          hours,
          minutes,
          backgroundColor: Colors.TIME_LEFT_RED,
          color: Colors.WHITE,
        }
      : days >= 1 && days < 3
      ? {
          days,
          hours,
          minutes,
          backgroundColor: Colors.TIME_LEFT_ORANGE,
          color: Colors.BLACK_1,
        }
      : days >= 3 && days < 7
      ? {
          days,
          hours,
          minutes,
          backgroundColor: Colors.BLACK_1,
          color: Colors.WHITE,
        }
      : {
          days: 0,
          hours: 0,
          minutes: 0,
          backgroundColor: Colors.BLACK_1,
          color: Colors.WHITE,
        };

  return (
    <>
      {type === 'public' ? (
        <HStack alignItems="center" w="100%" h={'24px'}>
          <Box
            w="100%"
            h="100%"
            position="absolute"
            bg={status?.backgroundColor}
            opacity={0.8}
          />
          <CustomText
            marginHorizontal={scale(8)}
            zIndex={10}
            color={status?.color}
            fontSize={scale(10)}
            fontFamily={fontFamily.medium}>
            {'Time left: '}
            {status?.days
              ? status?.days > 1
                ? `${status?.days} Days`
                : `${status?.days} Day`
              : ''}
            {status?.hours > 0
              ? status?.hours > 1
                ? `${status?.days > 0 ? ',' : ''} ${status?.hours} h`
                : `${status?.days > 0 ? ',' : ''} ${status?.hours} h`
              : ''}
            {status?.minutes > 0
              ? status?.minutes > 1
                ? `${status?.hours > 0 ? ',' : status?.days > 0 ? ',' : ''} ${
                    status?.minutes
                  } m`
                : `${status?.hours > 0 ? ',' : status?.days > 0 ? ',' : ''} ${
                    status?.minutes
                  } m`
              : ''}
          </CustomText>
        </HStack>
      ) : (
        <HStack alignItems="center" justifyContent="space-between">
          <CustomText fontSize={fontSize.medium}>Time left</CustomText>
          <CustomText fontSize={fontSize.medium} color={Colors.BLACK_3}>
            {status?.days
              ? status?.days > 1
                ? `${status?.days} Days`
                : `${status?.days} Day`
              : ''}
            {status?.hours > 0
              ? status?.hours > 1
                ? `${status?.days > 0 ? ',' : ''} ${status?.hours} h`
                : `${status?.days > 0 ? ',' : ''} ${status?.hours} h`
              : ''}
            {status?.minutes > 0
              ? status?.minutes > 1
                ? `${status?.hours > 0 ? ',' : status?.days > 0 ? ',' : ''} ${
                    status?.minutes
                  } m`
                : `${status?.hours > 0 ? ',' : status?.days > 0 ? ',' : ''} ${
                    status?.minutes
                  } m`
              : ''}
          </CustomText>
        </HStack>
      )}
    </>
  );
};

export default TimeLeftLabel;
