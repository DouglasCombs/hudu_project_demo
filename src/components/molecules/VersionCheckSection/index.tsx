import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {QuestionModal, CustomText} from '~/components';
import {fontFamily, fontSize} from '~/utils/style';
import VersionCheck from 'react-native-version-check';

const VersionCheckSection = () => {
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<any>(null);

  useEffect(() => {
    checkForUpdate();
  }, []);

  const checkForUpdate = () => {
    VersionCheck.needUpdate().then(async res => {
      if (res.isNeeded) {
        setStoreData(res);
        setUpdateModalVisible(true);
      }
    });
  };

  const onCloseUpdateModal = () => {
    setUpdateModalVisible(false);
  };

  const updateOnPress = () => {
    Linking.openURL(storeData?.storeUrl); // open store if update is needed.
  };

  return (
    <>
      {updateModalVisible && (
        <QuestionModal
          borderRadius="3xl"
          pb="8"
          px="8"
          visible={updateModalVisible}
          onClose={onCloseUpdateModal}
          customText={
            <CustomText textAlign="center">
              <CustomText
                fontSize={fontSize.xxLarge}
                fontFamily={fontFamily.bold}>
                Update!
              </CustomText>
              {
                '\n\nAn updated version of the app is now available.\nPlease update the application to use all the features.'
              }
            </CustomText>
          }
          option1="Update"
          option2="Skip for now"
          option1OnPress={updateOnPress}
          option2OnPress={onCloseUpdateModal}
          closeOnTouchOutSide={false}
        />
      )}
    </>
  );
};

export default VersionCheckSection;
