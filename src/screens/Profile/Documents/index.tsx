import {VStack, View} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  AttachmentDocumentPickerModal,
  CustomButton,
  CustomContainer,
  CustomFlatList,
  DocumentItem,
  ScreensHeader,
  UploadDocumentModal,
} from '~/components';
import queryKeys from '~/constants/queryKeys';
import {queryClient} from '~/graphql/AuthProvider';
import {useAddDocument, useGetDocuments} from '~/hooks/document';
import {useUploadFile} from '~/hooks/upload';
import {goBack} from '~/navigation/Methods';
import {userDataStore} from '~/stores';
import {Colors} from '~/styles';
import {isAndroid} from '~/utils/helper';

const DocumentsScreen = () => {
  const {t} = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);
  const [file, setFile] = useState({});
  const {userData} = userDataStore();

  const {mutate: uploadFileMutate, isLoading: isUploading} = useUploadFile();
  const {mutate: mutateAddDocument, isLoading: isLoadingAddDocument} =
    useAddDocument();

  const onPressHandler = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
    setVisibleModal(false);
  };

  const {
    isLoading: getDocumentsLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useGetDocuments({
    where: {
      userId: {
        eq: userData?.id,
      },
    },
    order: {
      createdDate: 'DESC',
    },
  });

  const documents = data?.pages ?? [];
  const onLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onUploadPress = (inFile: any) => {
    setFile(inFile);
    setTimeout(() => {
      setVisibleModal(true);
    }, 1000);
  };

  const onSubmit = text => {
    onClose();

    uploadFileMutate(file, {
      onSuccess: (successData: any) => {
        const input = {
          file: successData?.uploadedUrl,
          fileName: text ? text : file?.name || 'no name',
          id: null,
        };
        mutateAddDocument(
          {input},
          {
            onSuccess: () => {
              queryClient.invalidateQueries(queryKeys.getDocuments);
            },
          },
        );
      },
    });
  };

  const renderItem = ({item, index}: {item: any; index: number}) => (
    <DocumentItem {...{item, index}} />
  );

  const loading = getDocumentsLoading;
  return (
    <CustomContainer isLoading={loading}>
      <ScreensHeader backAction title={t('profile.drawer.documents')} />
      <View h="4" w="100%" bg={Colors.SEARCH_BACKGROUND} />
      <VStack flex={1}>
        <CustomFlatList
          style={{paddingTop: 15}}
          data={documents}
          renderItem={renderItem}
          refreshing={isRefetching}
          onRefresh={refetch}
          isFetchingNextPage={isFetchingNextPage}
          onEndReached={onLoadMore}
        />
      </VStack>

      <VStack pb={isAndroid && '4'} space="4" px="4">
        <CustomButton
          onPress={onPressHandler}
          spinnerColor={Colors.PRIMARY}
          outline
          loading={isUploading || isLoadingAddDocument}
          title={t('profile.document.uploadNewDocument')}
        />
        <CustomButton
          onPress={goBack}
          title={t('projects.createProject.save')}
        />
      </VStack>
      <AttachmentDocumentPickerModal
        onClose={onClose}
        visible={visible}
        onChangeImage={onUploadPress}
      />
      <UploadDocumentModal
        visible={visibleModal}
        onClose={onClose}
        onSubmitPress={onSubmit}
        {...{file}}
        loading={isUploading || isLoadingAddDocument}
      />
    </CustomContainer>
  );
};

export default DocumentsScreen;
