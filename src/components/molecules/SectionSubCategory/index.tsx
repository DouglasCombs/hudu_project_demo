import {Circle, HStack, VStack} from 'native-base';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  ActionSheetContainer,
  CustomDivider,
  CustomFlatList,
  CustomText,
} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useGetProjectCategories} from '~/hooks/project';
import {Colors} from '~/styles';
import {useGetLanguageTitle} from '~/utils/utils';

export default function SectionSubCategory({
  visible,
  onClose,
  modalTitle,
  value,
  onChangeValue,
  category,
}: {
  visible: boolean;
  onClose: () => void;
  modalTitle?: any;
  value?: any;
  onChangeValue?: any;
  category?: any;
}) {
  const {getLanguageText} = useGetLanguageTitle();

  const {
    data: categoryData,
    isLoading: isLoadingGetCategory,
    isFetchingNextPage: isFetchingNextPageCategories,
    refetch: refetchCategories,
    fetchNextPage: fetchNextPageCategories,
    hasNextPage: hasNextPageCategories,
  } = useGetProjectCategories({
    where: {
      category: {
        or: [
          {parentId: {eq: category?.category?.id}},
          {id: {eq: category?.category?.id}},
        ],
      },
    },
  });

  const onLoadMore = () => {
    if (hasNextPageCategories) {
      fetchNextPageCategories();
    }
  };

  const itemSeparatorComponent = useCallback(() => <CustomDivider />, []);

  const renderItem = useCallback(
    ({item}: {item: any}) => {
      const itemOnPress = () => {
        if (item?.category?.id !== value?.category?.id) {
          onChangeValue?.(item);
        }
        onClose();
      };

      const isActive = item?.category?.id === value?.category?.id;
      const textColor = isActive ? Colors.PRIMARY : Colors.BLACK;
      const color = isActive ? Colors.PRIMARY : Colors.Gainsboro;
      const backGroundColor = isActive ? Colors.WHITE_F : Colors.Gainsboro;

      return (
        <TouchableOpacity activeOpacity={0.7} onPress={itemOnPress}>
          <HStack
            alignItems="center"
            justifyContent="space-between"
            w="100%"
            space="8px">
            <CustomText color={textColor}>
              {item?.category?.[getLanguageText()]}
            </CustomText>

            <Circle
              size="22px"
              borderWidth="1"
              bg={backGroundColor}
              borderColor={color}>
              {isActive && <Circle size="14px" bg={color} />}
            </Circle>
          </HStack>
        </TouchableOpacity>
      );
    },
    [value, onChangeValue, onClose, getLanguageText],
  );

  return (
    <ActionSheetContainer isVisible={visible} onClose={onClose}>
      <VStack w="100%" minH="500px">
        {modalTitle && (
          <VStack w="100%">
            <HStack px="16px" alignItems="center">
              <CustomText
                flex={1}
                fontFamily={fontFamily.medium}
                fontSize={fontSize.xMedium}>
                {modalTitle}
              </CustomText>
              <TouchableOpacity activeOpacity={0.7} onPress={onClose}>
                <AntDesignIcon name="close" size={24} />
              </TouchableOpacity>
            </HStack>
            <CustomDivider />
          </VStack>
        )}
        <CustomFlatList
          data={categoryData?.pages ?? []}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainerStyle}
          itemSeparatorComponent={itemSeparatorComponent}
          onEndReached={onLoadMore}
          isLoading={isLoadingGetCategory}
          onRefresh={refetchCategories}
          isFetchingNextPage={isFetchingNextPageCategories}
          hasInternalLoading
        />
      </VStack>
    </ActionSheetContainer>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
});
