import {Center, HStack, VStack} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '~/styles';
import {CustomText} from '~/components';
import dayjs from 'dayjs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontSize, scale} from '~/utils/style';
import {useTranslation} from 'react-i18next';
import {listerStore} from '~/stores';

const RemainedTimePrompt = ({
  isLister,
  isBidding,
  projectDeadLine,
  projectId,
}: {
  isLister?: boolean;
  isBidding?: boolean;
  projectDeadLine: any;
  projectId: number;
}) => {
  const {t} = useTranslation();

  const {skipList, setSkipList} = listerStore(state => state);

  const isExist = skipList?.includes(projectId);

  const now = dayjs();
  const timeDiff = projectDeadLine.diff(now);
  const durationDiff = dayjs.duration(timeDiff);
  const hoursDiff = durationDiff.asHours();

  const closeOnPress = () => {
    setSkipList([...skipList, projectId]);
  };

  if (hoursDiff <= 0 && hoursDiff > -48 && isBidding && !isExist && isLister) {
    return (
      <VStack
        bg={Colors.SEARCH_BACKGROUND}
        borderColor={Colors.Ghost}
        mb="24px"
        rounded="sm"
        borderWidth="1px">
        <HStack alignItems="center" justifyContent="flex-end">
          <TouchableOpacity
            onPress={closeOnPress}
            style={styles.icon}
            activeOpacity={0.7}>
            <Ionicons name="close" size={scale(12)} color={Colors.DEEP_FIR} />
          </TouchableOpacity>
        </HStack>
        <Center pb="16px" px="16px">
          <CustomText lineHeight={17} fontSize={fontSize.small}>
            {t('projects.remainedTimePrompt')}{' '}
            {`(${dayjs(projectDeadLine).add(2, 'day').format('DD MMM')})`}
          </CustomText>
        </Center>
      </VStack>
    );
  }
  return null;
};

export default RemainedTimePrompt;

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
});
