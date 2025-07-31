import {
  Box,
  Checkbox,
  CloseIcon,
  FlatList,
  FormControl,
  HStack,
  Input,
} from 'native-base';
import React, {forwardRef} from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import CustomButton from '~/components/atoms/CustomButton';
import CustomText from '~/components/atoms/CustomText';
import CustomTouchable from '~/components/atoms/CustomTouchable';
import {Colors} from '~/styles';
import {fontFamily, fontSize} from '~/utils/style';
import {Stop, TickSquare, CloseSquare} from 'iconsax-react-native';

export default forwardRef(
  (
    {
      name,
      disabled,
      projectData,
      onChangeText,
      onChangeCheckBox,
      questionsState,
      addNewQuestion,
      onDeletePress,
    }: {
      name: any;
      disabled?: boolean;
      projectData: any;
    },
    ref: any,
  ) => {
    const {field, fieldState} = useController({name});
    const {t} = useTranslation();

    const onChangeHandler = (text: string, index: number) => {
      onChangeText(text, index);
    };

    const ListFooterComponent = () => {
      return (
        <CustomButton
          color={Colors.WHITE}
          textColor={Colors.PRIMARY}
          mt="4"
          title={t('projects.createProject.addNewQuestion')}
          onPress={addNewQuestion}
        />
      );
    };

    const renderItem = ({item, index}: {item: any; index: number}) => {
      return (
        <>
          <HStack justifyContent={'center'} py="3" alignItems={'center'}>
            <CustomText
              fontSize={fontSize.small}
              fontFamily={fontFamily.medium}
              style={{flex: 1}}>
              {t('projects.createProject.question')} {index + 1}
            </CustomText>
            <HStack space="2">
              <CustomTouchable onPress={() => onDeletePress(index)}>
                <CloseSquare
                  color={Colors.TIME_LEFT_RED_BACKGROUND}
                  size="24"
                />
              </CustomTouchable>

              <CustomTouchable onPress={() => onChangeCheckBox(index)}>
                <HStack
                  alignItems="center"
                  w="100%"
                  justifyContent="space-between">
                  {item?.checked !== false ? (
                    <TickSquare
                      size="24"
                      color={Colors.PRIMARY}
                      variant="Bold"
                    />
                  ) : (
                    <Stop size="24" color={Colors.Ghost} variant="Outline" />
                  )}
                </HStack>
              </CustomTouchable>
            </HStack>
          </HStack>
          <Box borderRadius={'sm'} p="4" bg={Colors.WHITE}>
            <Input
              multiline={true}
              px="0"
              fontSize={fontSize.xNormal}
              fontFamily={fontFamily.regular}
              value={item?.question}
              onBlur={field.onBlur}
              placeholder={'Tap to write question'}
              keyboardType={'default'}
              onChangeText={txt => onChangeHandler(txt, index)}
              borderWidth="0"
              h="100%"
              flex={1}
              textAlignVertical={'top'}
              placeholderTextColor={Colors.PLACEHOLDER}
              color={Colors.PLACEHOLDER}
              variant="unstyled"
            />
          </Box>
        </>
      );
    };

    return (
      <FormControl isInvalid={fieldState.error} w={{base: '100%'}}>
        <FlatList
          data={questionsState || []}
          renderItem={renderItem}
          ListFooterComponent={ListFooterComponent}
          ref={ref}
          contentContainerStyle={{paddingBottom: 70}}
        />
        <FormControl.ErrorMessage
          fontSize={fontSize.small}
          fontFamily={fontFamily.regular}
          mt="0">
          {fieldState.error?.message}
        </FormControl.ErrorMessage>
      </FormControl>
    );
  },
);
