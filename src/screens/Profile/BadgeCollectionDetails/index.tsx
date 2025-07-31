import dayjs from 'dayjs';
import {HStack, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomContainer,
  CustomImage,
  CustomText,
  ScreensHeader,
} from '~/components';
import {BadgeLevel} from '~/generated/graphql';
import {Colors} from '~/styles';
import {fontFamily, fontSize, width} from '~/utils/style';

const BadgeCollectionDetailsScreen = ({route}: {route: any}) => {
  const badge = route?.params?.badge;
  const {t} = useTranslation();
  const level = badge?.badgeLevel;
  const currentIcon = badge?.item;
  const level1Desc = badge?.item?.levelDesc?.first;
  const level2Desc = badge?.item?.levelDesc?.second;
  const level3Desc = badge?.item?.levelDesc?.third;

  const isLevel1 =
    level === BadgeLevel?.Level1 ||
    level === BadgeLevel?.Level2 ||
    level === BadgeLevel?.Level3
      ? true
      : false;

  const isLevel2 =
    level === BadgeLevel?.Level2 || level === BadgeLevel?.Level3 ? true : false;

  const isLevel3 = level === BadgeLevel?.Level3 ? true : false;

  const time = dayjs(badge?.createdDate).format('MMMM D, YYYY');

  return (
    <CustomContainer statusBarBackgroundColor={Colors.WHITE}>
      <ScreensHeader
        backgroundColor={Colors.WHITE}
        titleColor={Colors.BLACK}
        contentColor={Colors.BLACK}
        backAction
        title={
          badge?.createdDate
            ? `${t('badge.earned')} ${time}`
            : t('badge.noEarned')
        }
      />
      <VStack flex={1} pt="16" px="4">
        <VStack
          flex={1}
          space="8"
          justifyContent={'center'}
          alignItems={'center'}>
          <CustomImage
            imageSource={badge?.colorIcon}
            local
            style={{width: width * 0.5, height: width * 0.5}}
          />
          <VStack space="4">
            <CustomText
              color={Colors.PRIMARY}
              fontSize={fontSize.xLarge}
              fontFamily={fontFamily.medium}
              textAlign="center">
              {badge?.item?.title}
              {/* {badge?.badgeType || badge?.item?.title} */}
            </CustomText>
            <CustomText
              fontSize={fontSize.normal}
              fontFamily={fontFamily.medium}
              textAlign="center">
              {badge?.description ||
                `To earn this badge log into\nthe app everyday`}
            </CustomText>
          </VStack>
        </VStack>
        <VStack justifyContent={'center'} flex={1} space="8">
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <VStack>
              <CustomText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.medium}>
                {t('badge.level')} 1
              </CustomText>
              <CustomText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.medium}
                color={Colors.Topaz}>
                {level1Desc}
              </CustomText>
            </VStack>
            <CustomImage
              imageSource={
                isLevel1 ? currentIcon?.iconBlue : currentIcon?.iconGray
              }
              local
              style={{width: width * 0.1, height: width * 0.1}}
            />
          </HStack>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <VStack>
              <CustomText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.medium}>
                {t('badge.level')} 2
              </CustomText>
              <CustomText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.medium}
                color={Colors.Topaz}>
                {level2Desc}
              </CustomText>
            </VStack>
            <CustomImage
              imageSource={
                isLevel2 ? currentIcon?.iconPurple : currentIcon?.iconGray
              }
              local
              style={{width: width * 0.1, height: width * 0.1}}
            />
          </HStack>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <VStack>
              <CustomText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.medium}>
                {t('badge.level')} 3
              </CustomText>
              <CustomText
                fontSize={fontSize.medium}
                fontFamily={fontFamily.medium}
                color={Colors.Topaz}>
                {level3Desc}
              </CustomText>
            </VStack>
            <CustomImage
              imageSource={
                isLevel3 ? currentIcon?.iconPink : currentIcon?.iconGray
              }
              local
              style={{width: width * 0.1, height: width * 0.1}}
            />
          </HStack>
        </VStack>
      </VStack>
    </CustomContainer>
  );
};

export default BadgeCollectionDetailsScreen;
