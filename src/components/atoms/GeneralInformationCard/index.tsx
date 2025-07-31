import {VStack, View} from 'native-base';
import React, {memo} from 'react';
import {fontFamily, fontSize} from '~/utils/style';
import Accordion from '../Accordion';
import CustomText from '../CustomText';
import {Colors} from '~/styles';
import dayjs from 'dayjs';
import {useTranslation} from 'react-i18next';

const GeneralInformationCard = ({data}: {data: any}) => {
  const {t} = useTranslation();

  return (
    <Accordion
      title={t('profile.generalInformation')}
      icon={<View />}
      disabled
      open>
      <VStack space="4" my="4">
        <VStack space="1">
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.SEMI_BLACK}
            fontFamily={fontFamily.light}>
            {t('profile.createdIn')}
          </CustomText>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.BLACK}
            fontFamily={fontFamily.medium}>
            {dayjs(data?.createdDate).format('MMMM D YYYY')}
          </CustomText>
        </VStack>
        {/* <VStack>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.SEMI_BLACK}
            fontFamily={fontFamily.light}>
            Background check
          </CustomText>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.BLACK}
            fontFamily={fontFamily.medium}>
            lorem ipsum
          </CustomText>
        </VStack>
        <VStack>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.SEMI_BLACK}
            fontFamily={fontFamily.light}>
            Hourly Rate
          </CustomText>
          <CustomText
            fontSize={fontSize.xNormal}
            color={Colors.BLACK}
            fontFamily={fontFamily.medium}>
            lorem ipsum
          </CustomText>
        </VStack> */}
      </VStack>
    </Accordion>
  );
};

export default memo(GeneralInformationCard);
