import {Divider, FlatList, FormControl, HStack, VStack} from 'native-base';
import React, {useEffect} from 'react';
import {useController} from 'react-hook-form';
import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
import {DeleteIcon, EditIcon} from '~/assets/icons';
import {CustomText} from '~/components';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale} from '~/utils/style';
import {showErrorMessage} from '~/utils/utils';

export default React.forwardRef(
  (
    {
      name,
      data,
      mt,
      label,
      fetchNextPage,
      hasNextPage,
      refetch,
      isRefetching,
      ListHeaderComponent,
      ListFooterComponent,
      onLongPress,
      onEditPress,
    }: {
      name: any;
      data?: any;
      mt?: number | string;
      label?: string;
      fetchNextPage: any;
      hasNextPage: any;
      refetch: any;
      isRefetching: any;
      ListHeaderComponent?: any;
      ListFooterComponent?: any;
      onLongPress?: (id: number) => void;
      onEditPress?: (item: any) => void;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    useEffect(() => {
      if (fieldState?.error?.message) {
        showErrorMessage(fieldState?.error?.message);
      }
    }, [fieldState]);

    const onPressHandler = (item: any) => {
      field.onChange(item?.value);
    };
    const onLoadMoreHandler = () => {
      if (hasNextPage) {
        fetchNextPage?.();
      }
    };
    const renderItem = ({item}: {item: any}) => {
      const isActive = field.value === item?.value;
      return (
        <TouchableOpacity
          key={item?.value}
          onPress={() => onPressHandler(item)}
          activeOpacity={0.7}
          style={styles.item}>
          <VStack
            space="4"
            p="4"
            borderRadius={'sm'}
            borderWidth={'0.5'}
            borderColor={Colors.Gainsboro}>
            <HStack alignItems="center" space="1">
              <CustomText
                color={Colors.BLACK_2}
                flex={1}
                fontSize={fontSize.xNormal}
                fontFamily={fontFamily.medium}>
                {item?.title}
              </CustomText>
              <HStack space="4">
                <Pressable
                  onPress={() => onEditPress(item)}
                  style={{marginTop: 5}}>
                  <EditIcon />
                </Pressable>
                <Pressable
                  onPress={() => onLongPress(item?.value)}
                  style={{marginTop: 5}}>
                  <DeleteIcon />
                </Pressable>
              </HStack>
            </HStack>
            <CustomText color={Colors.Topaz} fontSize={fontSize.xNormal}>
              {item?.description}
            </CustomText>
          </VStack>
        </TouchableOpacity>
      );
    };
    const ItemSeparatorComponent = () => (
      <Divider h="1" bg={Colors.TRANSPARENT} />
    );

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <VStack mt={mt}>
          {label && (
            <CustomText
              numberOfLines={1}
              zIndex={60}
              color={Colors.PLACEHOLDER}>
              {label}
            </CustomText>
          )}
          <FlatList
            data={data}
            ListHeaderComponent={ListHeaderComponent}
            ListFooterComponent={ListFooterComponent}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => `item${index}`}
            renderItem={renderItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
            contentContainerStyle={{paddingBottom: 100}}
            onEndReachedThreshold={0.5}
            onEndReached={() => onLoadMoreHandler?.()}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </VStack>
        <FormControl.ErrorMessage
          fontSize={fontSize.small}
          fontFamily={fontFamily.regular}
          mt="0">
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    paddingVertical: scale(10),
    width: '100%',
    borderRadius: 5,
  },
});
