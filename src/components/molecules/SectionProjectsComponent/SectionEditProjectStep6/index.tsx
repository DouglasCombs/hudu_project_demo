import {yupResolver} from '@hookform/resolvers/yup';
import {useFocusEffect} from '@react-navigation/native';
import {Center, Flex, HStack, VStack} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import * as yup from 'yup';
import {
  CustomButton,
  CustomImage,
  CustomKeyboardAwareScrollView,
  CustomText,
} from '~/components';
import {useGetProject} from '~/hooks/project';
import {push} from '~/navigation/Methods';
import projectStore from '~/stores/projectStore';
import {Colors} from '~/styles';
import {fontFamily, fontSize, scale, verticalScale} from '~/utils/style';

const schema = yup.object().shape({});

const SectionEditProjectStep6 = ({projectId}) => {
  const {t} = useTranslation();
  const clicked = useRef(false);

  const {projectData, setProjectData} = projectStore(state => state);
  const [selectProductType, setSelectProductType] = useState<
    'MANDATORY' | 'OPTIONAL'
  >('OPTIONAL');

  const {...methods} = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  useFocusEffect(
    React.useCallback(() => {
      if (clicked?.current === true) {
        clicked.current = false;
      }
    }, []),
  );

  const {isLoading: getProjectLoading, data: getProject} = useGetProject({
    projectId: projectId,
  });
  const projectProductType =
    getProject?.project_getProject?.result?.project
      ?.backgroundCheckTypeForDoer ?? {};

  useEffect(() => {
    setSelectProductType(projectProductType);
  }, [projectProductType]);

  const {handleSubmit} = methods;

  const nextHandler = (formData: any) => {
    const data = {
      ...projectData,
      ...formData,
      backgroundCheckTypeForDoer: selectProductType,
    };
    setProjectData(data);
    if (clicked?.current === false) {
      clicked.current = true;

      push('ProjectPreview');
    }
  };

  return (
    <Flex flex={1} pb="6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <FormProvider {...methods}>
          <CustomKeyboardAwareScrollView>
            <VStack py="4" space="4" flex={1}>
              <CustomText
                fontSize={fontSize.tooLarge}
                fontFamily={fontFamily.medium}
                marginTop={verticalScale(8)}>
                {t('projects.createProject.whoBidProject')}
              </CustomText>
              <CustomText
                marginTop={16}
                marginBottom={30}
                fontSize={fontSize.small}
                fontFamily={fontFamily.regular}>
                {t('projects.createProject.verifiedExpert')}
              </CustomText>
              <RadioButton
                isSelected={selectProductType === 'MANDATORY'}
                item={{
                  title: t('projects.createProject.yesBids'),
                }}
                onPressHandler={() => {
                  setSelectProductType('MANDATORY');
                }}
              />
              <RadioButton
                isSelected={selectProductType === 'OPTIONAL'}
                item={{
                  title: t('projects.createProject.noBids'),
                }}
                onPressHandler={() => {
                  setSelectProductType('OPTIONAL');
                }}
              />
            </VStack>
          </CustomKeyboardAwareScrollView>
        </FormProvider>
      </ScrollView>
      <VStack alignSelf={'center'} w={'90%'}>
        <CustomButton
          title={t('projects.createProject.preview')}
          onPress={handleSubmit(nextHandler)}
        />
      </VStack>
    </Flex>
  );
};

export default SectionEditProjectStep6;

const RadioButton = ({
  isActive = true,
  isSelected,
  item,
  onPressHandler,
  image,
  icon = null,
}: {
  isActive: boolean;
  item: any;
  onPressHandler: () => void;
  image?: any;
  icon?: any;
  isSelected: boolean;
}) => {
  return (
    <TouchableOpacity
      key={item?.value}
      disabled={!isActive}
      onPress={() => onPressHandler(item)}
      activeOpacity={0.7}
      style={styles.item}>
      {image && (
        <CustomImage
          local
          style={styles.image}
          imageSource={image}
          resizeMode="cover"
        />
      )}
      {icon && icon}
      <VStack flex={1} ml="2">
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
            borderColor={isSelected ? Colors.PRIMARY : Colors.GRAY_6}
            bg={Colors.GRAY_6}>
            <Center
              size="full"
              borderRadius="full"
              bg={isSelected ? Colors.PRIMARY : Colors.GRAY_6}
            />
          </Center>
        </HStack>
      </VStack>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: scale(16),
    width: '100%',
    borderRadius: 5,
    flexDirection: 'row',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: Colors.RED_LOVE,
    alignSelf: 'flex-start',
  },
});
