import React, {useRef, useState} from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ChevronRight} from '~/assets/icons';
import {FormPickerV2, SectionSubCategory} from '~/components';
import {useGetProjectCategories} from '~/hooks/project';
import {Colors} from '~/styles';
import {useGetLanguageTitle} from '~/utils/utils';

export default React.forwardRef(
  (
    {
      name,
    }: {
      name: any;
    },
    ref: any,
  ) => {
    const {t} = useTranslation();
    const {field} = useController({name});

    const {getLanguageText} = useGetLanguageTitle();

    const [subCategoryModalVisible, setSubCategoryModalVisible] =
      useState<boolean>(false);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();

    const formPickerRef = useRef();

    const {
      data: categoryData,
      isLoading: isLoadingCategoryData,
      isFetchingNextPage: isFetchingNextPageCategoryData,
      hasNextPage: hasNextPageCategoryData,
      fetchNextPage: fetchNextPageCategoryData,
    } = useGetProjectCategories({
      pageSize: 20,
      where: {
        category: {
          parentId: {eq: null},
        },
      },
    });

    const onLoadMore = () => {
      if (hasNextPageCategoryData) {
        fetchNextPageCategoryData();
      }
    };

    const onChangeHandler = (item: any) => {
      if (item?.hasChild) {
        setCategory(item);
        setSubCategoryModalVisible(true);
      } else {
        field?.onChange(item);
        formPickerRef?.current?.onClose();
      }
    };

    const onChangeSubCategory = (subCat: any) => {
      setSubCategory(subCat);
      formPickerRef?.current?.onClose();
      field?.onChange(subCat);
      onCloseSubCategoryModal();
    };

    const onCloseSubCategoryModal = () => {
      setSubCategoryModalVisible(false);
    };

    return (
      <>
        <FormPickerV2
          ref={formPickerRef}
          data={categoryData?.pages ?? []}
          name={name}
          nestedTitleKey={getLanguageText()}
          nestedValueKey="id"
          valueKey="category"
          titleKey="category"
          backgroundColor={Colors.WHITE_F}
          label={t('projects.createProject.category')}
          placeholder={t('projects.createProject.tapToSelect')}
          isLoading={isLoadingCategoryData}
          onLoadMore={onLoadMore}
          isFetchingNextPage={isFetchingNextPageCategoryData}
          activeFieldOnChange={false}
          onChange={onChangeHandler}
          handleCloseInComponent={false}
          rightComponent={<ChevronRight />}
          modalTitle={t('projects.createProject.selectCategory')}
          minHeight={'500px'}
        />
        {subCategoryModalVisible && (
          <SectionSubCategory
            visible={subCategoryModalVisible}
            onClose={onCloseSubCategoryModal}
            value={subCategory}
            onChangeValue={onChangeSubCategory}
            category={category}
            modalTitle={category?.category?.[getLanguageText()]}
          />
        )}
      </>
    );
  },
);
