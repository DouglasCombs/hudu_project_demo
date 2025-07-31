import {Center, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  CustomButton,
  CustomImage,
  CustomImageUploader,
  CustomText,
  ImageBoxViewer,
} from '~/components';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {height, scale, verticalScale, width} from '~/utils/style';

const AddProjectImages = () => {
  const {t} = useTranslation();

  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
  const [descriptionModalEdit, setDescriptionModalEdit] =
    useState<boolean>(false);
  const [editNumber, setEditNumber] = useState(0);

  const [currentImage, setCurrentImage] = useState('');

  const {projectData, setProjectData} = projectStore(state => state);

  const imageAddresses = projectData?.projectImages || [];

  const onDeleteImage = (item: string) => {
    let arr = imageAddresses;
    const objWithIdIndex = arr.findIndex(obj => obj.imageAddress === item);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
    let object = projectData;
    object.projectImages = arr;
    setProjectData(object);
  };
  const onEditDescription = (item, index) => {
    setEditNumber(index);

    setDescriptionModalEdit(true);
  };

  const onUploadImage = useCallback(
    (image: string) => {
      const temp = {
        imageAddress: image,
        alt: '',
      };
      let array = imageAddresses;
      array.push(temp);
      setCurrentImage(image);
      let object = projectData;
      object.projectImages = array;

      setProjectData(object);
      // setDescriptionModal(true);
    },
    [imageAddresses, setProjectData],
  );

  const onCloseModal = () => {
    setDescriptionModal(false);
  };
  const onCloseModalEdit = () => {
    setDescriptionModalEdit(false);
  };

  const listFooterComponent = () => {
    return (
      <Center width={'100%'} my="6">
        <CustomImageUploader onUploadImage={onUploadImage} />
      </Center>
    );
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <VStack mt="4">
      <ImageBoxViewer
        {...{item, index}}
        onDelete={() => onDeleteImage(item?.imageAddress)}
        onEdit={() => onEditDescription(item, index)}
      />
    </VStack>
  );

  return (
    <VStack>
      <FlatList
        data={imageAddresses || []}
        ListFooterComponent={listFooterComponent}
        contentContainerStyle={{flex: 1}}
        renderItem={renderItem}
        keyExtractor={(itm, index: number) => `projectImage${index}`}
        showsHorizontalScrollIndicator={false}
      />
      <AddModalContainer {...{descriptionModal, currentImage, onCloseModal}} />
      <EditModalContainer
        {...{
          descriptionModal: descriptionModalEdit,
          currentImage,
          onCloseModal: onCloseModalEdit,
          editNumber,
        }}
      />
    </VStack>
  );
};

export default AddProjectImages;

const EditModalContainer = ({
  descriptionModal,
  onCloseModal,
  currentImage,
  editNumber,
}: {
  descriptionModal: boolean;
  onCloseModal: any;
  currentImage: string;
  editNumber: number;
}) => {
  const {t} = useTranslation();

  const {projectData, setProjectData} = projectStore(state => state);

  const imageAddresses = projectData?.projectImages?.[editNumber];

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    if (imageAddresses?.alt?.length > 0) {
      setValue(imageAddresses?.alt);
    } else {
      setValue('');
    }
  }, [imageAddresses]);

  const onSavePress = () => {
    let temp = imageAddresses;
    temp = {...imageAddresses, alt: value};
    let array = projectData?.projectImages;
    array[editNumber] = temp;
    let object = projectData;
    object.projectImages = array;
    setProjectData(object);

    onCloseModal();
    setErrorMessage(false);
    setValue('');
  };

  return (
    <Modal
      isVisible={descriptionModal}
      avoidKeyboard
      coverScreen
      backdropColor={Colors.BLACK}
      closeOnTouchOutSide={false}
      style={styles.flex1}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={onSavePress}
            activeOpacity={0.7}
            style={styles.closeIcon}>
            <Ionicons
              name={'ios-chevron-back-outline'}
              color={Colors.WHITE}
              size={verticalScale(24)}
            />
          </TouchableOpacity>
          <CustomImage
            style={styles.avatar}
            imageSource={imageAddresses?.imageAddress}
            resizeMode="cover"
          />
          <TextInput
            placeholder={t('projects.createProject.tabToWrite')}
            placeholderTextColor={Colors.WHITE}
            style={styles.textInput}
            returnKeyLabel="Save"
            multiline
            value={value}
            onChangeText={setValue}
          />
          {errorMessage ? (
            <CustomText style={{color: Colors.ERROR}}>
              Please write a description
            </CustomText>
          ) : null}
          <CustomButton
            title={t('projects.createProject.save')}
            onPress={onSavePress}
            mt={20}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const AddModalContainer = ({
  descriptionModal,
  onCloseModal,
  currentImage,
}: {
  descriptionModal: boolean;
  onCloseModal: any;
  currentImage: string;
}) => {
  const {t} = useTranslation();

  const {projectData, setProjectData} = projectStore(state => state);

  const imageAddresses =
    projectData?.projectImages?.[projectData?.projectImages?.length - 1];

  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const onSavePress = () => {
    if (value?.length > 0) {
      let temp = imageAddresses;
      temp = {...imageAddresses, alt: value};
      let array = projectData?.projectImages;
      array[projectData?.projectImages?.length - 1] = temp;
      let object = projectData;
      object.projectImages = array;

      setProjectData(object);
      onCloseModal();
      setValue('');
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <Modal
      isVisible={descriptionModal}
      avoidKeyboard
      coverScreen
      backdropColor={Colors.BLACK}
      closeOnTouchOutSide={false}
      style={styles.flex1}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={onSavePress}
            activeOpacity={0.7}
            style={styles.closeIcon}>
            <Ionicons
              name={'ios-chevron-back-outline'}
              color={Colors.WHITE}
              size={verticalScale(24)}
            />
          </TouchableOpacity>
          <CustomImage
            style={styles.avatar}
            imageSource={currentImage}
            resizeMode="cover"
          />
          <TextInput
            placeholder={t('projects.createProject.tabToWrite')}
            placeholderTextColor={Colors.WHITE}
            style={styles.textInput}
            returnKeyLabel="Save"
            multiline
            value={value}
            onChangeText={setValue}
          />
          {errorMessage ? (
            <CustomText style={{color: Colors.ERROR}}>
              Please write a description
            </CustomText>
          ) : null}
          <CustomButton
            title={t('projects.createProject.save')}
            onPress={onSavePress}
            mt={20}
          />
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    padding: 0,
    paddingHorizontal: -50,
    paddingLeft: 0,
    backgroundColor: Colors.BLACK,
  },
  modalHeader: {
    height: height,
    backgroundColor: Colors.BLACK,
    flex: 1,
  },
  closeIcon: {
    padding: 8,
    marginTop: isIos ? scale(20) : 0,
    alignSelf: 'flex-start',
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
    minHeight: scale(50),
  },
});
