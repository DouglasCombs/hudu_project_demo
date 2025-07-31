import {Divider, HStack, VStack} from 'native-base';
import React, {Fragment} from 'react';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActionSheetContainer, CustomText} from '~/components';
import {Colors} from '~/styles';
import {cameraOptions} from '~/utils/camera';
import {
  requestReadPermission,
  requestReadPermissionMediaImages,
} from '~/utils/getPermissions';
import {useTranslation} from 'react-i18next';

import {isIos} from '~/utils/helper';

interface PickerItemProps {
  icon: string;
  title: string;
  onPress: () => void;
}

export default function AttachmentPickerModal({
  visible,
  onChangeImage,
  onClose,
  cameraOption = cameraOptions,
}: {
  visible: boolean;
  onChangeImage: any;
  onClose: any;
  cameraOption?: any;
}) {
  const {t} = useTranslation();

  const pickerData = [
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
    ImagePicker.openCamera(cameraOption)
      .then((image: any) => {
        onChangeImage?.(image);
      })
      .finally(onClose);
  };

  const onPressGalleryPhoto = async () => {
    if (isIos) {
      ImagePicker.openPicker(cameraOption)
        .then((image: any) => {
          onChangeImage?.(image);
        })
        .finally(onClose);
    } else {
      const hasPermissionReadMediaImages = await requestReadPermission();
      if (hasPermissionReadMediaImages) {
        ImagePicker.openPicker(cameraOption)
          .then((image: any) => {
            onChangeImage?.(image);
          })
          .finally(onClose);
      }
    }
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
