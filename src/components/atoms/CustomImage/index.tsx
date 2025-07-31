import {Box, Spinner} from 'native-base';
import React, {useState, forwardRef, useImperativeHandle, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage from 'react-native-fast-image';
import {createImageProgress} from 'react-native-image-progress';
import ImageViewer from 'react-native-image-zoom-viewer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getFullImageUrl} from 'src/utils/helper';
import images from '~/assets/images';
import {CustomLoading, CustomText, ModalContainer} from '~/components';
import {Colors} from '~/styles';
import {isIos} from '~/utils/helper';
import {scale, verticalScale, fontFamily, fontSize} from '~/utils/style';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

const Image = createImageProgress(FastImage);

const CustomImage = forwardRef(
  (
    {
      imageSource,
      style,
      containerStyle = styles.container,
      zoomable = false,
      resizeMode = FastImage.resizeMode.contain,
      backgroundColor = Colors.TRANSPARENT,
      local = false,
      children,
      imageSourceArray,
      errorImage = images.errorImage,
      isLoading,
      customIndicator,
      cancelOnPress,
      errorText,
      imageStyle = {},
    }: {
      imageSource?: any;
      style?: ViewStyle | ViewStyle[];
      containerStyle?: ViewStyle | ViewStyle[];
      zoomable?: boolean;
      resizeMode?: 'cover' | 'center' | 'contain' | 'stretch';
      backgroundColor?: any;
      local?: boolean;
      children?: any;
      imageSourceArray?: any;
      errorImage?: any;
      isLoading?: boolean;
      customIndicator?: JSX.Element;
      cancelOnPress?: () => void;
      errorText?: string;
      imageStyle?: any;
    },
    ref,
  ) => {
    const [imageZoom, setImageZoom] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errorLoading, setErrorLoading] = useState<boolean>(false);
    const inSets = useSafeAreaInsets();
    const {t} = useTranslation();
    const imageViewerRef = useRef<ImageViewer>();

    useImperativeHandle(ref, () => ({
      onPress(index: any = 0) {
        onPressHandler();
        setCurrentIndex(index);
      },
    }));

    const zooming = imageSource && imageSource !== null && zoomable;

    const bgColor = local
      ? backgroundColor
      : imageSource && imageSource !== null
      ? backgroundColor
      : Colors.WHITE;
    const height = style?.height ?? null;
    const width = style?.width ?? null;
    const borderRadius = style?.borderRadius ?? null;

    const imgSource = errorLoading
      ? errorImage
      : local
      ? imageSource
      : imageSource && imageSource !== null
      ? {
          uri: getFullImageUrl(imageSource),
          priority: FastImage.priority.high,
        }
      : errorImage;

    const onPressHandler = () => {
      setImageZoom(true);
    };

    const oncloseZoomModal = () => {
      setImageZoom(false);
    };

    const onErrorLoading = () => {
      setErrorLoading(true);
    };

    return (
      <>
        {(errorLoading || !imageSource) && errorText ? (
          <ErrorText text={errorText} style={style} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!zooming || errorLoading}
            onPress={onPressHandler}
            style={[
              containerStyle,
              {
                height,
                width,
                borderRadius,
              },
            ]}>
            <Image
              indicator={() =>
                customIndicator ?? <Spinner size={24} color={Colors.PRIMARY} />
              }
              imageStyle={imageStyle}
              style={[style, {backgroundColor: bgColor}]}
              source={imgSource}
              onError={onErrorLoading}
              resizeMode={resizeMode}>
              {isLoading && (
                <Box bg={Colors.BLACK_TRANSPARENT_2} flex={1}>
                  {cancelOnPress && (
                    <TouchableOpacity
                      style={styles.cancelIcon}
                      activeOpacity={0.7}
                      onPress={cancelOnPress}>
                      <Ionicons
                        name="close"
                        color={Colors.SECONDARY}
                        size={scale(18)}
                      />
                    </TouchableOpacity>
                  )}
                  <Spinner
                    position="absolute"
                    alignSelf="center"
                    bottom="0"
                    top="0"
                    size={24}
                    color={Colors.SECONDARY}
                  />
                </Box>
              )}
              {children && children}
            </Image>
          </TouchableOpacity>
        )}
        {imageZoom && !errorLoading && (
          <ModalContainer
            useBody={false}
            isVisible={imageZoom}
            onClose={oncloseZoomModal}>
            <Box flex={1} w="100%">
              <View
                style={[
                  styles.modalHeader,
                  {paddingTop: inSets.top, paddingBottom: inSets.bottom},
                ]}>
                <TouchableOpacity
                  onPress={oncloseZoomModal}
                  activeOpacity={0.7}
                  style={styles.closeIcon}>
                  <Ionicons
                    name={'chevron-back'}
                    color={Colors.WHITE}
                    size={verticalScale(24)}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.modalFooter}>
                <CustomText color={Colors.WHITE}>
                  {t('common.closeImage')}
                </CustomText>
              </View>
              <ImageViewer
                ref={imageViewerRef}
                index={currentIndex}
                renderImage={props => (
                  // Use CustomFastImage instead of the default <Image />
                  <FastImage {...props} />
                )}
                enableSwipeDown
                renderIndicator={(currentIndex, allSize) => (
                  <>
                    {imageSourceArray?.[currentIndex - 1]?.alt ? (
                      <View style={styles.description}>
                        <CustomText
                          marginBottom={4}
                          fontFamily={fontFamily.medium}
                          fontSize={fontSize.xMedium}
                          color={Colors.WHITE}>
                          {t('common.description')}
                        </CustomText>
                        <CustomText
                          fontSize={fontSize.small}
                          color={Colors.WHITE}>
                          {imageSourceArray?.[currentIndex - 1]?.alt}
                        </CustomText>
                      </View>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                loadingRender={() => <CustomLoading />}
                imageUrls={
                  imageSourceArray && imageSourceArray?.length > 0
                    ? imageSourceArray
                    : [
                        local
                          ? {
                              url: '',
                              props: {
                                source: imageSource ? imageSource : errorImage,
                              },
                            }
                          : imageSource
                          ? {url: getFullImageUrl(imageSource)}
                          : {
                              url: '',
                              props: {
                                source: errorImage,
                              },
                            },
                      ]
                }
                onSwipeDown={oncloseZoomModal}
              />
            </Box>
          </ModalContainer>
        )}
      </>
    );
  },
);

const ErrorText = ({
  text,
  style,
  backgroundColor = Colors.FrenchRose,
}: {
  text: string;
  style?: ViewStyle | ViewStyle[];
  backgroundColor?: string;
}) => {
  return (
    <View style={[style, styles.errorTextContainer, {backgroundColor}]}>
      <CustomText
        color={Colors.WHITE_F}
        fontSize={fontSize.xLarge}
        fontFamily={fontFamily.medium}>
        {text?.[0]?.toUpperCase()}
      </CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  modalHeader: {
    position: 'absolute',
    left: scale(16),
    zIndex: 1000,
  },
  modalFooter: {
    position: 'absolute',
    bottom: verticalScale(40),
    paddingVertical: 4,
    alignSelf: 'center',
    zIndex: 1000,
    backgroundColor: Colors.IMAGE_FOOTER,
    width: '100%',
    alignItems: 'center',
  },
  closeIcon: {
    padding: 4,
    left: 0,
    marginTop: isIos ? 10 : 0,
  },
  container: {overflow: 'hidden'},
  cancelIcon: {
    padding: 6,
  },
  description: {
    bottom: '30%',
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  errorTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomImage;
