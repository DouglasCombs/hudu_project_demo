import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, scale} from '~/utils/style';
import {CustomImage, HuduVerified, RatingStar, CustomText} from '~/components';
import images from '~/assets/images';

export default function ProfileInfo({data}: {data: any}) {
  const totalReview = useMemo(() => {
    const listerCounts = data?.listersWhoRatedToMeCount ?? 0;
    const hudurCounts = data?.huduersWhoRatedToMeCount ?? 0;
    const reviews = Number(listerCounts) + Number(hudurCounts);
    return reviews ? reviews : 0;
  }, [data]);

  return (
    <VStack top="-70px" alignItems="center" space="1">
      <CustomImage
        style={styles.avatar}
        imageSource={data?.imageAddress}
        resizeMode="cover"
        errorImage={images.avatarErrorImage}
        zoomable
        errorText={data?.userName ?? data?.email}
      />
      <CustomText numberOfLines={1} marginTop={4} fontFamily={fontFamily.bold}>
        {data?.userName}
      </CustomText>
      {data?.isVerified && <HuduVerified />}
      <CustomText numberOfLines={1} color={Colors.GARY_3}>
        {data?.email}
      </CustomText>
      <RatingStar
        disabled
        rate={data?.averageRate}
        showRating="right"
        size={14}
        total={totalReview}
      />
    </VStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    height: scale(105),
    width: scale(105),
    borderRadius: 100,
  },
});
