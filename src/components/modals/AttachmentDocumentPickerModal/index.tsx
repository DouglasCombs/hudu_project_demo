import {Divider, HStack, VStack} from 'native-base';
import React, {Fragment} from 'react';
import {TouchableOpacity} from 'react-native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {Colors} from '~/styles';
import {ActionSheetContainer, CustomText} from '~/components';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {cameraOptions} from '~/utils/camera';
import {requestReadPermission} from '~/utils/getPermissions';
import {isIos} from '~/utils/helper';
import {useTranslation} from 'react-i18next';

export default function AttachmentDocumentPickerModal({
  visible,
  onChangeImage,
  onClose,
}: {
  visible: boolean;
  onChangeImage: any;
  onClose: any;
}) {
  const {t} = useTranslation();
  const pickerData = [
    {
      icon: 'folder-outline',
      title: t('academy.chooseFromStorage'),
      onPress: () => openDocumentPicker(),
    },
    {
      icon: 'image-outline',
      title: t('academy.chooseFromGallery'),
      onPress: () => onPressGalleryPhoto(),
    },
    {
      icon: 'camera-outline',
      title: t('academy.takePhoto'),
      onPress: () => onPressOpenCamera(),
    },
  ];

  const onPressOpenCamera = () => {
    ImagePicker.openCamera(cameraOptions)
      .then((image: any) => {
        onChangeImage?.(image);
      })
      .finally(onClose);
  };

  const onPressGalleryPhoto = async () => {
    if (isIos) {
      ImagePicker.openPicker(cameraOptions)
        .then((image: any) => {
          onChangeImage?.(image);
        })
        .finally(onClose);
    } else {
      const hasPermissionReadMediaImages = await requestReadPermission();
      if (hasPermissionReadMediaImages) {
        ImagePicker.openPicker(cameraOptions)
          .then((image: any) => {
            onChangeImage?.(image);
          })
          .finally(onClose);
      }
    }
  };

  const openDocumentPicker = () => {
    DocumentPicker.pick({
      type: types.allFiles,
    })
      .then(file => {
        if (Array.isArray(file)) {
          const res = {
            name: file?.[0].name,
            mime: file?.[0].type,
            path: file?.[0].uri,
            type: 'FILE',
          };
          onChangeImage?.(res);
        } else {
          const res = {
            name: file?.name,
            mime: file?.type,
            path: file?.uri,
            type: 'FILE',
          };
          onChangeImage?.(res);
        }
      })
      .finally(onClose);
  };

  return (
    <ActionSheetContainer isVisible={visible} onClose={onClose}>
      <VStack w="full" p="4">
        {pickerData.map((item: PickerItemProps, index: number) => {
          return (
            <Fragment key={`pickerItem${index}`}>
              <TouchableOpacity onPress={item.onPress} activeOpacity={0.7}>
                <HStack space="2" alignItems="center">
                  <Icon name={item?.icon} color={Colors.BLACK_3} size={24} />
                  <CustomText flex={1} color={Colors.BLACK_3}>
                    {item?.title}
                  </CustomText>
                </HStack>
              </TouchableOpacity>
              {index + 1 < pickerData?.length && <Divider my="3" />}
            </Fragment>
          );
        })}
      </VStack>
    </ActionSheetContainer>
  );
}
