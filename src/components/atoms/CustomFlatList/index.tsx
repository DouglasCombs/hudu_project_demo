import React, {forwardRef, useCallback, useState} from 'react';
import {Box, Center, Spinner} from 'native-base';
import {
  FlatList,
  StyleSheet,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ViewStyle,
} from 'react-native';
import {
  AnimationProvider,
  CustomFloatActionButton,
  EmptyData,
} from '~/components';
import {Colors} from '~/styles';

const CustomFlatList = forwardRef(
  (
    props: {
      data: any;
      renderItem: any;
      listHeaderComponent?: any;
      listEmptyComponent?: any;
      onEndReached?: any;
      refreshing?: any;
      onRefresh?: any;
      isLoading?: boolean;
      contentContainerStyle?: any;
      itemSeparatorComponent?: any;
      keyExtractor?: any;
      isFetchingNextPage?: boolean;
      onLayout?: any;
      numColumns?: any;
      columnWrapperStyle?: any;
      inverted?: boolean;
      horizontal?: boolean;
      keyValue?: string;
      pagingEnabled?: boolean;
      hasItemSeparatorComponent?: boolean;
      hasListEmptyComponent?: boolean;
      snapToInterval?: any;
      LoadingComponent?: JSX.Element;
      hasInternalLoading?: boolean;
      keyboardShouldPersistTaps?: 'always' | 'handled' | 'never';
      onScroll?: any;
      showScrollToTop?: boolean;
      style?: ViewStyle;
    },
    ref,
  ) => {
    const {
      data,
      renderItem,
      listHeaderComponent,
      listEmptyComponent,
      onEndReached,
      refreshing = false,
      onRefresh,
      isLoading,
      isFetchingNextPage,
      contentContainerStyle,
      columnWrapperStyle,
      itemSeparatorComponent,
      keyExtractor,
      onLayout,
      numColumns,
      inverted,
      horizontal,
      keyValue,
      pagingEnabled,
      hasItemSeparatorComponent = true,
      snapToInterval,
      hasListEmptyComponent = true,
      LoadingComponent = (
        <Center flex={1}>
          <Spinner size="lg" color={Colors.PRIMARY} />
        </Center>
      ),
      hasInternalLoading = false,
      keyboardShouldPersistTaps,
      onScroll,
      showScrollToTop,
      style,
      ...rest
    } = props;

    const [showScrollButton, setShowScrollButton] = useState(false);

    const itemSeparator = useCallback(() => {
      if (hasItemSeparatorComponent) {
        return <Box h={horizontal ? '0' : '4'} w={horizontal ? '2' : '0'} />;
      } else {
        return;
      }
    }, [horizontal, hasItemSeparatorComponent]);

    const footerComponent = useCallback(() => {
      return (
        <Center
          flex={1}
          h={horizontal ? undefined : '55px'}
          w={horizontal ? '55px' : undefined}>
          <Spinner color={Colors.PRIMARY} size="lg" />
        </Center>
      );
    }, [horizontal]);

    const internalKeyExtractor = useCallback(
      (item: any, index: number) =>
        `flatListItm${item?.[keyValue ?? 'id'] ?? index}`,
      [keyValue],
    );

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      // Adjust the threshold value as needed
      const threshold = 200; // You can adjust this threshold
      setShowScrollButton(offsetY > threshold);
    };

    const scrollToTop = () => {
      if (ref.current) {
        ref.current.scrollToIndex({index: 0, animated: true});
      }
    };

    return (
      <>
        <FlatList
          pagingEnabled={pagingEnabled}
          horizontal={horizontal}
          ref={ref}
          onScroll={showScrollToTop ? handleScroll : onScroll}
          inverted={inverted}
          data={data}
          style={style}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            contentContainerStyle ?? {
              ...(!horizontal && styles.contentContainerStyle),
            }
          }
          columnWrapperStyle={columnWrapperStyle}
          keyExtractor={keyExtractor ?? internalKeyExtractor}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListEmptyComponent={
            !isLoading && hasListEmptyComponent
              ? listEmptyComponent
                ? listEmptyComponent
                : EmptyData
              : hasInternalLoading
              ? LoadingComponent
              : undefined
          }
          ListFooterComponent={isFetchingNextPage ? footerComponent : undefined}
          ListHeaderComponent={listHeaderComponent}
          ItemSeparatorComponent={itemSeparatorComponent ?? itemSeparator}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) {
              return;
            }
            onEndReached?.();
          }}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          onLayout={onLayout}
          snapToInterval={snapToInterval}
          {...rest}
        />
        <AnimationProvider
          visible={showScrollButton}
          visibleChildren={
            <CustomFloatActionButton
              right={false}
              left="24px"
              onPress={scrollToTop}
              name={inverted ? 'arrow-down' : 'arrow-up'}
            />
          }
          inVisibleChildren={null}
        />
      </>
    );
  },
);

export default CustomFlatList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
