import {HStack, VStack} from 'native-base';
import React, {memo} from 'react';
import Accordion from '../Accordion';
import CustomText from '../CustomText';
import {BluePlus, PlusIcon} from '~/assets/icons';
import {fontFamily, fontSize, scale} from '~/utils/style';
import {Colors} from '~/styles';
import {useGetDocuments} from '~/hooks/document';
import {userDataStore} from '~/stores';
import CustomTouchable from '../CustomTouchable';
import {Linking} from 'react-native';
import {getFullImageUrl} from '~/utils/helper';
import {navigate} from '~/navigation/Methods';
import {useTranslation} from 'react-i18next';
import {getFileExtension} from '~/utils/getFileExtension';
import Icon from 'react-native-vector-icons/AntDesign';

const CredentialCard = ({userId}: {userId?: id}) => {
  const {userData} = userDataStore();
  const id = userId || userData?.id;
  const {t} = useTranslation();

  const {isLoading: getDocumentsLoading, data} = useGetDocuments({
    where: {
      userId: {
        eq: id,
      },
    },
    order: {
      createdDate: 'DESC',
    },
  });
  const documents = data?.pages ?? [];
  const arrayDocuments = documents.slice(0, 3);

  const onItemPressHandler = (item: string) => {
    if (item) {
      Linking.openURL(getFullImageUrl(item));
    }
  };

  return (
    <Accordion
      title={t('profile.credentialsDocumentation')}
      onPress={userId ? null : () => navigate('Documents')}
      open
      icon={<BluePlus />}>
      <VStack space="4" my="4">
        {arrayDocuments?.length === 0 ? (
          <CustomTouchable
            onPress={userId ? null : () => navigate('Documents')}>
            <CustomText
              fontSize={fontSize.xNormal}
              color={Colors.SEMI_BLACK}
              fontFamily={fontFamily.light}>
              {userId ? t('profile.noDocument') : t('profile.addNewDocument')}
            </CustomText>
          </CustomTouchable>
        ) : (
          arrayDocuments?.map(doc => {
            const isImage = getFileExtension(doc?.file) === 'image';
            return (
              <VStack space="2">
                <CustomText
                  fontSize={fontSize.xNormal}
                  color={Colors.SEMI_BLACK}
                  fontFamily={fontFamily.light}>
                  {doc?.fileName}
                </CustomText>
                <CustomTouchable onPress={() => onItemPressHandler(doc?.file)}>
                  <HStack space="2">
                    {isImage ? (
                      <Icon
                        name="picture"
                        color={Colors.PRIMARY}
                        size={scale(18)}
                      />
                    ) : (
                      <Icon
                        name="pdffile1"
                        color={Colors.PRIMARY}
                        size={scale(18)}
                      />
                    )}

                    <CustomText
                      fontSize={fontSize.xNormal}
                      color={Colors.PRIMARY}
                      fontFamily={fontFamily.medium}>
                      {t('profile.downloadFile')}
                    </CustomText>
                  </HStack>
                </CustomTouchable>
              </VStack>
            );
          })
        )}
        {}
      </VStack>
    </Accordion>
  );
};

export default memo(CredentialCard);
