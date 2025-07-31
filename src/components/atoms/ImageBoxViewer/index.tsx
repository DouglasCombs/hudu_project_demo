import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Box, Center, IconButton} from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import {ConfirmationActionSheet, CustomImage, CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';
import {useTranslation} from 'react-i18next';
import projectStore from '~/stores/projectStore';

const ImageBoxViewer = ({
  item,
  index,
  onDelete,
  onEdit,
}: {
  item: any;
  index: number;
  onDelete?: any;
  onEdit?: any;
}) => {
  const {t} = useTranslation();

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [value, setValue] = useState('');
  const {projectData, setProjectData} = projectStore(state => state);
  const imageAddresses = projectData?.projectImages?.[index];

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const onSubmitDeleteModal = () => {
    onDelete?.(item);
    closeDeleteModal();
  };

  const onSubmitEdit = txt => {
    let temp = imageAddresses;
    temp = {...imageAddresses, alt: txt};
    let array = projectData?.projectImages;
    array[index] = temp;
    let object = projectData;
    object.projectImages = array;
    setProjectData(object);
    setValue(txt);
  };

  return (
    <>
      <CustomImage
        style={styles.image}
        imageSource={item?.imageAddress}
        resizeMode="cover"
        zoomable>
        {onDelete && (
          <IconButton
            position="absolute"
            top="2"
            right="2"
            rounded="full"
            onPress={openDeleteModal}
            size={scale(36)}
            icon={
              <Center
                p="2"
                borderRadius={'full'}
                bg={Colors.BLACK_TRANSPARENT_2}>
                <Feather name="trash" color={Colors.WHITE} size={scale(20)} />
              </Center>
            }
          />
        )}
        {/* {onEdit && (
          <IconButton
            position="absolute"
            top="2"
            right="9"
            rounded="full"
            onPress={onSubmitEdit}
            size={scale(36)}
            icon={<Feather name="edit" color={Colors.WHITE} size={scale(20)} />}
          />
        )} */}
        {index === 0 && (
          <CustomText
            color={Colors.SEMI_BLACK}
            fontSize={fontSize.xTiny}
            fontFamily={fontFamily.medium}
            style={styles.cover}>
            {t('projects.createProject.coverPhoto')}
          </CustomText>
        )}
      </CustomImage>
      <Box mb="8" px="4" bg={Colors.WHITE} borderRadius="sm" mt="4">
        <TextInput
          placeholder={t('projects.createProject.tabToWrite')}
          placeholderTextColor={Colors.Topaz}
          style={styles.textInput}
          onSubmitEditing={onSubmitEdit}
          returnKeyLabel="Save"
          multiline
          value={value}
          scrollEnabled
          onChangeText={onSubmitEdit}
        />
      </Box>

      {/* <CustomText
        color={Colors.BLACK}
        fontSize={fontSize.xNormal}
        fontFamily={fontFamily.medium}
        textAlign="left"
        marginTop={16}>
        {item?.alt}
      </CustomText> */}
      {deleteModalVisible && (
        <ConfirmationActionSheet
          visible={deleteModalVisible}
          onClose={closeDeleteModal}
          onSubmit={onSubmitDeleteModal}
        />
      )}
    </>
  );
};

export default ImageBoxViewer;

const styles = StyleSheet.create({
  image: {
    height: scale(183),
    width: '100%',
    borderRadius: 10,
  },
  cover: {
    backgroundColor: Colors.SEARCH_BACKGROUND,
    borderRadius: 8,
    top: '80%',
    bottom: 0,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center',
  },
  textInput: {
    marginVertical: scale(20),
    color: Colors.BLACK,
    minHeight: scale(70),
    maxHeight: scale(150),
    paddingHorizontal: 10,
    backgroundColor: Colors.WHITE,
  },
});
