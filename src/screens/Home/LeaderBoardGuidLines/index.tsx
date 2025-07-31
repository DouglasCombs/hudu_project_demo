import {VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet} from 'react-native';
import {CustomContainer, CustomText, ScreensHeader} from '~/components';
import {useMockData} from '~/constants/mockData';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function LeaderBoardGuidLinesScreen() {
  const {t} = useTranslation();
  const {leaderBoardGuideline} = useMockData();

  return (
    <CustomContainer>
      <ScreensHeader backAction title={t('common.leaderBoardGuidLines')} />
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <VStack py="16px" px="24px" space="16px">
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.tooLarge}
            color={Colors.RegalBlue}>
            {t('common.leaderBoardGuidelineTitle')}
          </CustomText>
          <CustomText
            fontFamily={fontFamily.medium}
            fontSize={fontSize.small}
            color={Colors.BLACK}>
            {t('common.leaderBoardGuidelineDescription1')}
          </CustomText>
          <CustomText
            fontFamily={fontFamily.regular}
            fontSize={fontSize.small}
            color={Colors.Topaz}>
            {t('common.leaderBoardGuidelineDescription2')}
          </CustomText>
        </VStack>
        <VStack px="24px" flex={1}>
          {leaderBoardGuideline.map(
            (item: {title: any; description: any}, index: number) => {
              return (
                <Item
                  key={`guidelineItem${index}`}
                  title={item.title}
                  description={item.description}
                  index={index}
                />
              );
            },
          )}
        </VStack>
      </ScrollView>
    </CustomContainer>
  );
}

const Item = ({title, description}: {title: any; description: any}) => {
  return (
    <VStack
      py="16px"
      px="8px"
      justifyContent="center"
      shadow="4"
      bg={Colors.WHITE}
      space="4px"
      borderRadius="sm"
      mb="24px">
      <CustomText
        fontFamily={fontFamily.regular}
        fontSize={fontSize.small}
        color={Colors.PLACEHOLDER}>
        {title}
      </CustomText>
      <CustomText
        fontFamily={fontFamily.regular}
        fontSize={fontSize.small}
        color={Colors.BLACK}>
        {description}
      </CustomText>
    </VStack>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});
