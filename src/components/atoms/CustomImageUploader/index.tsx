import {Center, Spinner} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AttachmentPickerModalCreateProject} from '~/components';
import {uploadFile} from '~/services/fileUploader';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

const CustomImageUploader = ({onUploadImage}: {onUploadImage?: any}) => {
  const [imagePickerVisible, setImagePickerVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const openImagePicker = () => {
    setImagePickerVisible(true);
  };

  const closeImagePicker = () => {
    setImagePickerVisible(false);
  };

  const onChangeImage = async (images: any) => {
    setIsUploading(true);
    try {
      const multiUpload = images?.map?.(async el => await uploadFile(el));

      const imagesUploaded = await Promise.all(multiUpload).then(values => {
        return values?.map(el => el?.uploadedUrl);
      });
      imagesUploaded?.map(el => onUploadImage?.(el));
      setIsUploading(false);
    } catch (error) {
      showErrorMessage(JSON.stringify(error));
      setIsUploading(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        disabled={isUploading}
        activeOpacity={0.7}
        style={{width: '100%', height: '100%'}}
        onPress={openImagePicker}>
        <Center
          bg={Colors.WHITE}
          borderRadius="sm"
          height={scale(183)}
          width={'100%'}>
          {isUploading ? (
            <Spinner size={scale(16)} color={Colors.BLACK_3} />
          ) : (
            <MaterialCommunityIcons
              name="plus-box"
              color={Colors.PRIMARY}
              size={18}
            />
          )}
        </Center>
      </TouchableOpacity>

      <AttachmentPickerModalCreateProject
        onClose={closeImagePicker}
        visible={imagePickerVisible}
        onChangeImage={onChangeImage}
        multiple
      />
    </>
  );
};

export default CustomImageUploader;
