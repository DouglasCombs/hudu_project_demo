import {Box, Center, Spinner} from 'native-base';
import React, {forwardRef, useCallback, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  SectionList,
  StyleSheet,
} from 'react-native';
import {
  AnimationProvider,
  CustomFloatActionButton,
  EmptyData,
} from '~/components';
import {Colors} from '~/styles';

const CustomSectionList = forwardRef(
  (
    props: {
      sections: any;
      renderItem: any;
      listHeaderComponent?: any;
      listEmptyComponent?: any;
      onEndReached?: any;
      refreshing?: any;
      onRefresh?: any;
      isLoading?: boolean;
      contentContainerStyle?: any;
      itemSeparatorComponent?: any;
      SectionSeparatorComponent?: any;
      renderSectionHeader?: any;
      renderSectionFooter?: any;
      keyExtractor?: any;
      isFetchingNextPage?: boolean;
      onLayout?: any;
      inverted?: boolean;
      horizontal?: boolean;
      keyValue?: string;
      pagingEnabled?: boolean;
      hasItemSeparatorComponent?: boolean;
      hasListEmptyComponent?: boolean;
      snapToInterval?: any;
      showScrollToTop?: boolean;
      onScroll?: any;
    },
    ref,
  ) => {
    const {
      sections,
      renderItem,
      listHeaderComponent,
      listEmptyComponent,
      onEndReached,
      refreshing = false,
      onRefresh,
      isLoading,
      isFetchingNextPage,
      contentContainerStyle,
      itemSeparatorComponent,
      SectionSeparatorComponent,
      renderSectionHeader,
      renderSectionFooter,
      keyExtractor,
      onLayout,
      inverted,
      horizontal,
      keyValue,
      pagingEnabled,
      hasItemSeparatorComponent = true,
      snapToInterval,
      hasListEmptyComponent = true,
      showScrollToTop,
      onScroll,
      ...rest
    } = props;

    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

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
      [],
    );

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      // Adjust the threshold value as needed
      const threshold = 200; // You can adjust this threshold
      setShowScrollButton(offsetY > threshold);
    };

    const scrollToTop = () => {
      if (ref?.current) {
        if (inverted) {
          ref?.current?.scrollToLocation({
            animated: true,
            sectionIndex: 0,
            itemIndex: 0,
          });
        } else {
          ref?.current?.scrollToLocation({
            animated: true,
            sectionIndex: 0,
            itemIndex: 0,
          });
        }
      }
    };

    return (
      <>
        <SectionList
          pagingEnabled={pagingEnabled}
          horizontal={horizontal}
          inverted={inverted}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ref={ref}
          onRefresh={onRefresh}
          ListEmptyComponent={
            !isLoading && hasListEmptyComponent
              ? listEmptyComponent
                ? listEmptyComponent
                : EmptyData
              : undefined
          }
          refreshing={refreshing}
          renderItem={renderItem}
          sections={sections}
          renderSectionHeader={renderSectionHeader}
          renderSectionFooter={renderSectionFooter}
          ListFooterComponent={
            isFetchingNextPage && !isLoading ? footerComponent : undefined
          }
          ListHeaderComponent={listHeaderComponent}
          ItemSeparatorComponent={itemSeparatorComponent ?? itemSeparator}
          SectionSeparatorComponent={SectionSeparatorComponent}
          contentContainerStyle={
            contentContainerStyle ?? {
              ...(!horizontal && styles.contentContainerStyle),
            }
          }
          onScroll={showScrollToTop ? handleScroll : onScroll}
          keyExtractor={keyExtractor ?? internalKeyExtractor}
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd < 0) {
              return;
            }
            onEndReached?.();
          }}
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

export default CustomSectionList;

const styles = StyleSheet.create({
  contentContainerStyle: {
    flexGrow: 1,
  },
});
