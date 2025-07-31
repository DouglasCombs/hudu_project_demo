import {Center} from 'native-base';
import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {
  AttachmentPickerModal,
  ConfirmationModal,
  CustomText,
  UserImagesCarousel,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';
import {useUploadFile} from '~/hooks/upload';
import {
  useAddUserImages,
  useDeleteUserImages,
  useEditUserImages,
  useGetMeProfile,
  useGetUserImages,
  useUpdateProfile,
} from '~/hooks/user';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {abbr} from '~/utils/abbr';
import {cameraOptionsProfile} from '~/utils/camera';
import {height, scale, width} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

interface ProfilePickerProps {
  name?: any;
  title?: string;
  setImagePickerVisible: () => void;
  imagePickerVisible: boolean;
}
export default React.forwardRef(
  (
    {
      name,
      title = 'No Name',
      setImagePickerVisible,
      imagePickerVisible,
    }: ProfilePickerProps,
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const {userData} = userDataStore();
    const [isModal, setIsModal] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [isModalEdit, setIsModalEdit] = useState(false);
    const {t} = useTranslation();

    const getMeOptions = userData?.id
      ? {userId: userData?.id}
      : {enabled: false};

    const {isLoading: getProfileLoading, data: getProfile} =
      useGetMeProfile(getMeOptions);
    const profile = getProfile?.user_getProfile?.result ?? {};

    const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
    const {mutate: addUserImage, isLoading: isUploadingUserImage} =
      useAddUserImages();
    const {mutate: deleteUserImage, isLoading: isUploadingDeleteUserImage} =
      useDeleteUserImages();
    const {mutate: editUserImage, isLoading: isUploadingEditUserImage} =
      useEditUserImages();
    const {mutate: mutateUpdate, isLoading: updateLoading} = useUpdateProfile();

    const {data, isLoading} = useGetUserImages({
      userId: userData?.id,
      order: {createdDate: 'DESC'},
    });
    const userImages = data?.pages || [];
    const closeImagePicker = () => {
      setImagePickerVisible(false);
      setIsModal(false);
      setIsModalEdit(false);
    };

    const updateUser = () => {
      let userInput = {
        userName: profile?.userName,
        imageAddress: userImages?.[0]?.imageAddress,
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        bio: profile?.bio,
        id: userData?.id,
      };

      mutateUpdate(userInput, {
        onSuccess: successData => {
          queryClient.invalidateQueries(queryKeys.myProfile);
        },
      });
    };

    const onChangeImage = (image: any) => {
      if (userImages?.length < 10) {
        uploadFileMutate(image, {
          onSuccess: (successData: any) => {
            const input = {
              imageAddress: successData?.uploadedUrl,
              id: null,
            };
            addUserImage(input, {
              onSuccess: () => {
                // updateUser();
                queryClient.invalidateQueries(queryKeys.getUserImages);
              },
            });
            field.onChange(successData?.uploadedUrl);
          },
        });
      } else {
        showErrorMessage('You cant upload your images more than 10');
      }
    };

    const onDeletePress = () => {
      const userImageids = [currentItem];
      deleteUserImage(userImageids, {
        onSuccess: (successData: any) => {
          // updateUser();

          queryClient.invalidateQueries(queryKeys.getUserImages);
        },
      });
      closeImagePicker();
    };

    const onEditPress = (image: any) => {
      uploadFileMutate(image, {
        onSuccess: (successData: any) => {
          const input = {
            imageAddress: successData?.uploadedUrl,
            id: currentItem,
          };
          editUserImage(input, {
            onSuccess: () => {
              // updateUser();
              queryClient.invalidateQueries(queryKeys.getUserImages);
            },
          });
          field.onChange(successData?.uploadedUrl);
        },
      });
      closeImagePicker();
    };

    const loading =
      isUploading ||
      isUploadingUserImage ||
      isUploadingDeleteUserImage ||
      isUploadingEditUserImage ||
      isLoading ||
      updateLoading;

    return (
      <Center alignSelf="center">
        {loading ? (
          <Center height={width * 0.7} width={width}>
            <ActivityIndicator size="large" color={Colors.PRIMARY} />
          </Center>
        ) : userImages?.length ? (
          <UserImagesCarousel
            height={width * 0.7}
            data={userImages}
            onEditPress={id => {
              setCurrentItem(id);
              setIsModalEdit(true);
            }}
            onDeletePress={id => {
              setCurrentItem(id);
              setIsModal(true);
            }}
          />
        ) : (
          <Center
            bg={Colors.SEARCH_BACKGROUND}
            borderWidth={fieldState.error ? '1' : '0'}
            borderColor={fieldState.error ? Colors.ERROR : Colors.TRANSPARENT}
            height={width * 0.7}
            width={width}>
            <CustomText fontSize={scale(18)} color={Colors.PLACEHOLDER}>
              {abbr(title)}
            </CustomText>
          </Center>
        )}

        <AttachmentPickerModal
          onClose={closeImagePicker}
          visible={imagePickerVisible}
          onChangeImage={onChangeImage}
          cameraOption={cameraOptionsProfile}
        />
        <AttachmentPickerModal
          onClose={closeImagePicker}
          visible={isModalEdit}
          onChangeImage={onEditPress}
          cameraOption={cameraOptionsProfile}
        />
        <ConfirmationModal
          isVisible={isModal}
          onClose={closeImagePicker}
          onSubmit={onDeletePress}
          title={t('alerts.delete')}
          description={t('alerts.areYouSureToDelete')}
          submitTitle={t('alerts.ok')}
          submitColor={Colors.FrenchRose}
        />
      </Center>
    );
  },
);

const styles = StyleSheet.create({
  plusButton: {
    right: 0,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BLACK_3,
  },
  image: {
    height: height * 0.3,
    width: width,
  },
});
