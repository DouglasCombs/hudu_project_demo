import React from 'react';
import {HStack, VStack} from 'native-base';
import Stars from 'react-native-stars';
import {Colors} from '~/styles';
import {scale} from '~/utils/style';
import {CustomText} from '~/components';
import {StarIcon, StarIconFill, StarIconHalf} from '~/assets/icons';

export default function StarRating({
  rate = 0,
  disabled = false,
  size = scale(16),
  spacing = 6,
  onChange,
  showRating,
  total,
  fillColor = Colors.GOLDEN,
  half = true,
  min = 1,
  count = 5,
  customFullStar,
  customHalfStar,
  customEmptyStar,
}: {
  rate: number;
  disabled?: boolean;
  size?: number;
  spacing?: number;
  onChange?: any;
  showRating?: 'right' | 'left';
  total?: number;
  fillColor?: any;
  half?: boolean;
  min?: number;
  count?: number;
  customFullStar?: JSX.Element;
  customHalfStar?: JSX.Element;
  customEmptyStar?: JSX.Element;
}) {
  const onChangeHandler = (value: number) => {
    onChange?.(value);
  };

  function getDecimalPart(num: number) {
    return num % 1;
  }

  function roundHalf(num: number) {
    const step = getDecimalPart(num) > 0.5 ? 1.0 : 0.5;
    var inv = 1.0 / step;
    return Math.round(num * inv) / inv;
  }

  return (
    <VStack alignItems="center">
      <HStack space="1" alignItems="center">
        {showRating === 'left' && (
          <CustomText fontSize={size - 2} color={Colors.GARY_3}>
            {Number(rate)?.toFixed(1)}
          </CustomText>
        )}
        <Stars
          disabled={disabled}
          default={roundHalf(rate)}
          update={onChangeHandler}
          count={count}
          half={half}
          min={min}
          spacing={spacing}
          fullStar={
            customFullStar ? (
              customFullStar
            ) : (
              <StarIconFill fillColor={fillColor} />
            )
          }
          halfStar={
            customHalfStar ? (
              customHalfStar
            ) : (
              <StarIconHalf fillColor={fillColor} />
            )
          }
          emptyStar={customEmptyStar ? customEmptyStar : <StarIcon />}
        />
        {showRating === 'right' && (
          <CustomText fontSize={size - 2} color={Colors.GARY_3}>
            {Number(rate)?.toFixed(1)}
          </CustomText>
        )}
      </HStack>
      {(total || total >= 0) && (
        <CustomText fontSize={size - 2} color={Colors.GARY_3}>
          {`(${total} Review${total > 1 ? 's' : ''})`}
        </CustomText>
      )}
    </VStack>
  );
}
