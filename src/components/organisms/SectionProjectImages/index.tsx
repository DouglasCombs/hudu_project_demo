import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Center, FormControl, VStack} from 'native-base';
import {
  CustomButton,
  CustomImage,
  CustomImageUploader,
  CustomKeyboardAwareScrollView,
  ImageBoxViewer,
  ModalContainer,
} from '~/components';
import {useController} from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fontFamily, fontSize, scale, verticalScale, width} from '~/utils/style';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {useTranslation} from 'react-i18next';

export default React.forwardRef(({name}: {name: any}, ref: any) => {
  const {t} = useTranslation();

  const {field, fieldState} = useController({name});

  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
  const [selectedImageToEdit, setselectedImageToEdit] = useState({
    imageAddress: null,
    alt: '',
  });
  const [inputText, setInputText] = useState('');

  const onDeleteImage = (item: string) => {
    const temp = field.value?.filter(
      (imageElement: any) => imageElement?.imageAddress !== item?.imageAddress,
    );
    field.onChange(temp);
  };

  const onEditDescription = (item, index) => {
    setDescriptionModal(true);
    setselectedImageToEdit(item);
    setInputText(item?.alt);
  };

  const onUploadImage = (image: string) => {
    setDescriptionModal(true);
    setselectedImageToEdit({imageAddress: image});

    if (field.value) {
      field.onChange([...field.value, {imageAddress: image}]);
    } else {
      field.onChange([{imageAddress: image}]);
    }
  };

  const listFooterComponent = () => (
    <Center width={'100%'} my="6">
      <CustomImageUploader onUploadImage={onUploadImage} />
    </Center>
  );

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <VStack mt="4">
      <ImageBoxViewer
        {...{item, index, onDelete: onDeleteImage, onEdit: onEditDescription}}
      />
    </VStack>
  );

  const onCloseModal = () => {
    if (inputText?.length > 0) {
    } else {
      let tempObject = {
        imageAddress: selectedImageToEdit?.imageAddress,
        alt: inputText,
      };

      const filteredArray = field.value?.filter((el: any) => {
        return el?.imageAddress !== selectedImageToEdit?.imageAddress;
      });

      field.onChange([...filteredArray, tempObject]);
      setDescriptionModal(false);
    }

    setInputText('');
    setselectedImageToEdit(null);
  };

  return (
    <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
      <FlatList
        data={field.value || []}
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={{flex: 1}}
        renderItem={renderItem}
        keyExtractor={(itm, index: number) => `projectImage${index}`}
        showsHorizontalScrollIndicator={false}
      />
      {descriptionModal && (
        <ModalContainer
          isVisible={descriptionModal}
          onClose={() => onCloseModal()}
          backgroundColor={Colors.BLACK}
          style={styles.flex1}>
          <CustomKeyboardAwareScrollView>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => onCloseModal()}
                activeOpacity={0.7}
                style={styles.closeIcon}>
                <Ionicons
                  name={'ios-chevron-back-outline'}
                  color={Colors.WHITE}
                  size={verticalScale(24)}
                />
                <CustomImage
                  style={styles.avatar}
                  imageSource={selectedImageToEdit?.imageAddress}
                  resizeMode="cover"
                />
                <TextInput
                  placeholder={t('projects.createProject.tabToWrite')}
                  placeholderTextColor={Colors.WHITE}
                  style={styles.textInput}
                  returnKeyLabel="Save"
                  multiline
                  value={inputText}
                  onChangeText={e => {
                    setInputText(e);
                  }}
                />
                <CustomButton
                  title={t('projects.createProject.save')}
                  onPress={() => onCloseModal()}
                  mt={20}
                />
              </TouchableOpacity>
            </View>
          </CustomKeyboardAwareScrollView>
        </ModalContainer>
      )}
      <FormControl.ErrorMessage
        fontSize={fontSize.small}
        fontFamily={fontFamily.regular}
        mt="0"
        px="4">
        {fieldState.error?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
});

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  modalHeader: {
    position: 'absolute',
    top: isIos ? verticalScale(40) : verticalScale(20),
    zIndex: 1000,
  },
  closeIcon: {
    padding: 4,
    marginTop: isIos ? 10 : 0,
  },
  avatar: {
    height: scale(211),
    width: width,
    marginVertical: verticalScale(10),
    alignSelf: 'center',
  },
  textInput: {
    marginVertical: scale(20),
    color: Colors.WHITE,
  },
});
