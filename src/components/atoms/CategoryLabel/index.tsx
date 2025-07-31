import {Center} from 'native-base';
import React from 'react';
import {CustomText} from '~/components';
import {languageStore} from '~/stores';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';

export default function CategoryLabel({category}: {category: any}) {
  const {currentLanguage} = languageStore(state => state);

  return (
    <Center px="8px" py="4px" borderRadius="sm" bg={Colors.SEARCH_BACKGROUND}>
      <CustomText
        fontSize={fontSize.xTiny}
        fontFamily={fontFamily.medium}
        numberOfLines={1}
        color={Colors.Topaz}>
        {currentLanguage === 'en'
          ? category?.text
          : category?.spanish
          ? category?.spanish
          : category?.text}
      </CustomText>
    </Center>
  );
}
