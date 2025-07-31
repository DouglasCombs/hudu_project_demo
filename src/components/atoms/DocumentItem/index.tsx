import {Trash} from 'iconsax-react-native';
import {HStack} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Linking} from 'react-native';
import {EyeIcon} from '~/assets/icons';
import ConfirmationModal from '~/components/modals/ConfirmationModal';
import queryKeys from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';
import {useDeleteDocument} from '~/hooks/document';
import {Colors} from '~/styles';
import {getFullImageUrl} from '~/utils/helper';
import CustomText from '../CustomText';
import CustomTouchable from '../CustomTouchable';

const DocumentItem = ({item, index}: {item: any; index: number}) => {
  const {t} = useTranslation();
  const [isModal, setIsModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const onItemPressHandler = (url: string) => {
    if (url) {
      Linking.openURL(getFullImageUrl(url));
    }
  };
  const {mutate: mutateDeleteDocument, isLoading: isLoadingDeleteDocument} =
    useDeleteDocument();
  const onDeletePress = () => {
    mutateDeleteDocument(currentItem, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.getDocuments);
      },
    });
    onCloseCancelModal();
  };
  const onCloseCancelModal = () => {
    setIsModal(false);
  };

  return (
    <HStack px="4" justifyContent={'space-between'} alignItems={'center'}>
      <HStack
        px="3"
        borderWidth={'1'}
        borderRadius={'sm'}
        py="3"
        borderColor={Colors.Gainsboro}
        justifyContent={'space-between'}
        w="88%"
        alignItems={'center'}>
        <CustomText>{item?.fileName}</CustomText>
        <CustomTouchable onPress={() => onItemPressHandler(item?.file)}>
          <EyeIcon />
        </CustomTouchable>
      </HStack>
      <CustomTouchable
        onPress={() => {
          setCurrentItem(item?.id);
          setIsModal(true);
        }}>
        {isLoadingDeleteDocument ? (
          <ActivityIndicator
            size="small"
            color={Colors.TIME_LEFT_RED_BACKGROUND}
          />
        ) : (
          <Trash color={Colors.TIME_LEFT_RED_BACKGROUND} />
        )}
      </CustomTouchable>

      <ConfirmationModal
        isVisible={isModal}
        onClose={onCloseCancelModal}
        onSubmit={onDeletePress}
        title={t('alerts.delete')}
        description={t('alerts.areYouSureToDelete')}
        submitTitle={t('alerts.ok')}
        submitColor={Colors.FrenchRose}
      />
    </HStack>
  );
};

export default DocumentItem;
