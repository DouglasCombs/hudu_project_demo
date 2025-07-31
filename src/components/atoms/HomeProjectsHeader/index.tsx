import {HStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function HomeProjectsHeader({
  title,
  onPress,
  pb,
}: {
  title: any;
  onPress?: () => void;
  pb?: string | number;
}) {
  const {t} = useTranslation();

  const onPressHandler = () => {
    onPress?.();
  };

  return (
    <TouchableOpacity
      disabled={!onPress}
      activeOpacity={0.7}
      onPress={onPressHandler}>
      <HStack
        pb={pb}
        px="24px"
        alignItems="center"
        justifyContent="space-between">
        <CustomText fontFamily={fontFamily.bold} fontSize={fontSize.xLarge}>
          {title}
        </CustomText>
        {onPress && (
          <CustomText
            color={Colors.PRIMARY}
            fontFamily={fontFamily.medium}
            fontSize={fontSize.xMedium}>
            {t('common.seeAll')}
          </CustomText>
        )}
      </HStack>
    </TouchableOpacity>
  );
}
