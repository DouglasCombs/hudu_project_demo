import {Divider, HStack, VStack} from 'native-base';
import React, {Fragment} from 'react';
import {TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {ActionSheetContainer, CustomText} from '~/components';
import {Colors} from '~/styles';
import {cameraOptions} from '~/utils/camera';
import {requestReadPermission} from '~/utils/getPermissions';
import {isIos} from '~/utils/helper';
import {useTranslation} from 'react-i18next';

interface PickerItemProps {
  title: string;
  onPress: () => void;
}

export default function AttachmentPickerModalCreateProject({
  visible,
  onChangeImage,
  onClose,
  multiple,
  videoSelect,
  fromGallery = true,
  fromCamera = true,
  galleryOptions = cameraOptions,
}: {
  visible: boolean;
  onChangeImage: any;
  onClose: any;
  multiple?: boolean;
  videoSelect?: boolean;
  fromGallery?: boolean;
  fromCamera?: boolean;
  galleryOptions?: any;
}) {
  const {t} = useTranslation();

  const pickerData = [
    ...(fromGallery
      ? [
          {
            title: t('academy.chooseFromGallery'),
            onPress: () => onPressGalleryPhoto(),
          },
        ]
      : []),
    ...(fromCamera
      ? [
          {
            title: t('academy.takePhoto'),
            onPress: () => onPressOpenCamera(),
          },
        ]
      : []),
    ...(videoSelect
      ? [
          {
            title: t('academy.chooseVideo'),
            onPress: () => onPressOpenVideo(),
          },
        ]
      : []),
  ];

  const onPressOpenCamera = () => {
    ImagePicker.openCamera(galleryOptions)
      .then((image: any) => {
        onChangeImage?.([image], 'image');
      })
      .finally(onClose);
  };

  const onPressGalleryPhoto = async () => {
    if ((await requestReadPermission()) || isIos) {
      ImagePicker.openPicker({...galleryOptions, multiple})
        .then(async (image: any) => {
          if (multiple) {
            const result = [];
            for (const img of image) {
              result.push(
                await ImagePicker.openCropper({
                  ...galleryOptions,
                  path: img.path,
                }),
              );
            }
            onChangeImage?.(result, 'image');
          } else {
            onChangeImage?.(image, 'image');
          }
        })
        .catch(err => {}) //TODO clean
        .finally(onClose);
    }
  };

  const onPressOpenVideo = () => {
    ImagePicker.openPicker({mediaType: 'video', multiple})
      .then((video: any) => {
        onChangeImage?.(video, 'video');
      })
      .finally(onClose);
  };

  return (
    <ActionSheetContainer isVisible={visible} onClose={onClose}>
      <VStack space="2" w="full" p="4">
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
