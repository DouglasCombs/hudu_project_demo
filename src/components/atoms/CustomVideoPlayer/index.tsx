import {PlayCircle} from 'iconsax-react-native';
import {Box, Center, CloseIcon, VStack} from 'native-base';
import React, {memo, useRef, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Video from 'react-native-video';
import {useGetStatusBarHeight} from '~/hooks/useGetStatusBarHeight';
import {useGetThumbnailVideo} from '~/hooks/useGetThumbnailVideo';
import {Colors} from '~/styles';
import {height, scale, width} from '~/utils/style';
import CustomTouchable from '../CustomTouchable';
import {PlayIcon} from '~/assets/icons';

const CustomVideoPlayer = ({url}: {url: string}) => {
  const [isVisible, setIsVisible] = useState(false);
  const {statusBarHeight} = useGetStatusBarHeight();
  const ref = useRef();
  return (
    <VStack>
      <CustomTouchable onPress={() => setIsVisible(true)}>
        <VideoImageViewer url={url} />
      </CustomTouchable>

      <ReactNativeModal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        backdropOpacity={1}
        backdropColor={Colors.BLACK}>
        <Center
          position={'absolute'}
          zIndex={1000}
          top={statusBarHeight || 10}
          right={statusBarHeight || 0}>
          <CustomTouchable
            style={{padding: 10}}
            onPress={() => setIsVisible(false)}>
            <Center>
              <CloseIcon />
            </Center>
          </CustomTouchable>
        </Center>
        <Video
          controls
          source={{uri: url}}
          ref={ref}
          style={styles.backgroundVideo}
        />
      </ReactNativeModal>
    </VStack>
  );
};

export default memo(CustomVideoPlayer);

const VideoImageViewer = ({url}: {url: string}) => {
  const {isLoading, imageUrl} = useGetThumbnailVideo(url);

  if (isLoading) {
    return (
      <Center
        style={{
          width: width,
          height: width * 0.6,
        }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </Center>
    );
  }

  return (
    <>
      <Center
        style={{
          width: width,
          height: width * 0.6,
        }}
        position={'absolute'}
        zIndex={1000}>
        <Center
          size={scale(70)}
          shadow="1"
          borderRadius={'full'}
          bg={'rgba(255,255,255,0.5)'}>
          <Center position={'absolute'} width="100%" height="100%">
            <PlayIcon />
          </Center>
        </Center>
      </Center>

      <Image
        style={{
          width: width,
          height: width * 0.6,
        }}
        source={{uri: imageUrl}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  backgroundVideo: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: width,
    height: height * 0.5,
  },
});
