import {
  Center,
  Divider,
  FlatList,
  FormControl,
  HStack,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import {useController} from 'react-hook-form';
import {Pressable, StyleSheet, TouchableOpacity} from 'react-native';
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
          onLongPress={() => onLongPress(item?.value)}
          activeOpacity={0.7}
          style={styles.item}>
          <HStack alignItems="center" space="1">
            <CustomText
              color={Colors.BLACK_2}
              flex={1}
              fontSize={fontSize.xNormal}
              fontFamily={fontFamily.medium}>
              {item?.title}
            </CustomText>
            <Center
              borderRadius="full"
              size="6"
              p="0.5"
              overflow="hidden"
              borderWidth="0.5"
              borderColor={isActive ? Colors.PRIMARY : Colors.GRAY_6}
              bg={Colors.GRAY_6}>
              <Center
                size="full"
                borderRadius="full"
                bg={isActive ? Colors.PRIMARY : Colors.GRAY_6}
              />
            </Center>
          </HStack>
          <CustomText color={Colors.Topaz} fontSize={fontSize.xNormal}>
            {item?.description}
          </CustomText>
          <Pressable onPress={() => onEditPress(item)} style={{marginTop: 5}}>
            <CustomText color={Colors.PRIMARY} fontSize={fontSize.xNormal}>
              Edit Address
            </CustomText>
          </Pressable>
        </TouchableOpacity>
      );
    };
    const ItemSeparatorComponent = () => (
      <Divider h="5" bg={Colors.TRANSPARENT} />
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
            contentContainerStyle={{paddingBottom: 40}}
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
    padding: scale(10),
    width: '100%',
    borderRadius: 5,
  },
});
