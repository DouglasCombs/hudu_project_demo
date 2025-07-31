import {VStack} from 'native-base';
import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CustomContainer,
  ScreensHeader,
  SectionAddProjectStep1,
  SectionAddProjectStep2,
  SectionAddProjectStep4,
  SectionAddProjectStep3,
  SectionAddProjectStep5,
  SectionAddProjectStep6,
  CustomText,
} from '~/components';
import PagerView from 'react-native-pager-view';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {StyleSheet} from 'react-native';
import projectStore from '~/stores/projectStore';
import {goBack} from '~/navigation/Methods';

const tabData = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'];

const CreateProjectScreen = () => {
  const {t} = useTranslation();

  const {setProjectData} = projectStore(state => state);

  const [page, setPage] = useState<number>(0);
  const viewPager = useRef<PagerView>(null);

  const move = (currentPage: number) => {
    viewPager?.current?.setPage(currentPage + 1);
  };
  function moveLastPage() {
    viewPager?.current?.setPage(0);
    setPage(0);
  }

  return (
    <CustomContainer backgroundColor={Colors.SEARCH_BACKGROUND}>
      <ScreensHeader
        centerHeader={
          <VStack>
            <CustomText
              color={Colors.WHITE}
              fontSize={fontSize.xNormal}
              textAlign={'center'}
              fontFamily={fontFamily.medium}>
              {t('projects.createProject.listAProject')}
            </CustomText>
            <CustomText
              color={Colors.WHITE}
              fontSize={fontSize.xTiny}
              textAlign={'center'}
              fontFamily={fontFamily.medium}>
              {t('projects.createProject.step', {n: page + 1})}
            </CustomText>
          </VStack>
        }
        backAction
        backActionHandler={() => {
          move?.(page - 2, 1);
          if (page === 0) {
            setProjectData({});
            goBack();
          }
        }}
      />
      <PagerView
        style={styles.flex1}
        ref={viewPager}
        initialPage={0}
        scrollEnabled={false}
        onPageSelected={e => setPage(e.nativeEvent.position)}>
        {tabData.map((item: any, index: number) => {
          switch (item) {
            case 'step1':
              return (
                <SectionAddProjectStep1 key={index + 1} {...{page, move}} />
              );
            case 'step2':
              return (
                <SectionAddProjectStep2 key={index + 1} {...{page, move}} />
              );
            case 'step3':
              return (
                <SectionAddProjectStep3 key={index + 1} {...{page, move}} />
              );
            case 'step4':
              return (
                <SectionAddProjectStep4 key={index + 1} {...{page, move}} />
              );
            case 'step5':
              return (
                <SectionAddProjectStep5 key={index + 1} {...{page, move}} />
              );
            case 'step6':
              return (
                <SectionAddProjectStep6
                  key={index + 1}
                  {...{page, move, moveLastPage}}
                />
              );
            default:
              return;
          }
        })}
      </PagerView>
    </CustomContainer>
  );
};

export default CreateProjectScreen;

const styles = StyleSheet.create({
  flex1: {flex: 1},
});
