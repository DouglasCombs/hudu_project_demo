import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {VStack, HStack, Box} from 'native-base';
import {
  CustomButton,
  RatingStar,
  CustomImage,
  HuduVerified,
  CustomText,
} from '~/components';
import {scale, fontFamily, verticalScale, fontSize} from '~/utils/style';
import {Colors} from '~/styles';
import {useRejectBid} from '~/hooks/bid';
import images from '~/assets/images';
import {ResponseStatus} from '~/generated/graphql';

const BidItem = ({
  item,
  onClose,
  onAwardBid,
}: {
  item?: any;
  onClose: any;
  onAwardBid: (bid: object) => void;
}) => {
  const {mutate: mutateRejectBid, isLoading: rejectBidLoading} = useRejectBid();

  const awardOnPress = () => {
    onAwardBid?.(item);
  };

  const rejectOnPress = () => {
    mutateRejectBid(item?.id, {
      onSuccess: successData => {
        if (successData?.bid_rejectBid?.status === ResponseStatus.Success) {
          onClose?.();
        }
      },
      onError: () => {},
    });
  };

  return (
    <TouchableOpacity activeOpacity={1}>
      <VStack
        borderRadius="md"
        shadow="3"
        p="4"
        mx="4"
        space="2"
        bg={Colors.WHITE}>
        <HStack justifyContent="space-between">
          <HStack space="2" flex={1}>
            <CustomImage
              imageSource={item?.hudu?.imageAddress}
              style={styles.avatar}
              resizeMode="cover"
              errorImage={images.avatarErrorImage}
              errorText={item?.hudu?.userName ?? item?.hudu?.email}
            />
            <VStack flex={1}>
              <CustomText
                numberOfLines={2}
                fontSize={fontSize.medium}
                fontFamily={fontFamily.medium}>
                {item?.hudu?.userName ?? 'Doer'}
              </CustomText>
              {item?.hudu?.isVerified && <HuduVerified />}
            </VStack>
          </HStack>
          <VStack alignItems="center">
            <RatingStar
              showRating="left"
              size={scale(10)}
              rate={item?.hudu?.asHuduRates}
              disabled
              total={item?.hudu?.listersWhoRatedToMeCount}
            />
          </VStack>
        </HStack>
        <HStack space="2">
          <CustomText>Note:</CustomText>
          <CustomText flex={1} color={Colors.PLACEHOLDER}>
            {item?.description}
          </CustomText>
        </HStack>
        <HStack alignItems="center" justifyContent="space-between">
          <CustomText>Bid amount</CustomText>
          <CustomText color={Colors.INFO}>
            {`$${Number(item?.amount)?.toFixed(2) ?? ''}`}
          </CustomText>
        </HStack>
        <HStack alignItems="center" space="4" h="30px">
          <Box flex={1}>
            <CustomButton
              title="Award"
              onPress={awardOnPress}
              height={verticalScale(30)}
            />
          </Box>
          <Box flex={1}>
            <CustomButton
              outline
              color={Colors.BLACK_3}
              title="Decline"
              onPress={rejectOnPress}
              loading={rejectBidLoading}
              spinnerColor={Colors.BLACK_3}
              height={verticalScale(30)}
            />
          </Box>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
};

export default BidItem;

const styles = StyleSheet.create({
  avatar: {
    height: scale(36),
    width: scale(36),
    borderRadius: 100,
  },
});
