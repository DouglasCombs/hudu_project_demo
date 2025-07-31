import React from 'react';
import {useTranslation} from 'react-i18next';
import {CustomDropDown} from '~/components';

type Props = {
  value?: any;
  disabled?: boolean;
  data?: any;
  onChange?: any;
  title?: any;
  modalTitle?: any;
  width?: any;
  flex?: number;
  showChevronIcon?: boolean;
  titleColor?: string;
  showSelectedValue?: boolean;
};

export default function SectionTranslate(props: Props) {
  const {t} = useTranslation();

  const {
    disabled,
    value,
    data,
    onChange,
    title = t('search.selectLang'),
    modalTitle = t('search.selectLang'),
    width,
    flex = 1,
    showChevronIcon,
    titleColor,
    showSelectedValue,
  } = props;

  return (
    <CustomDropDown
      data={data ?? []}
      onChange={onChange}
      value={value}
      disabled={disabled}
      titleKey="title"
      title={title}
      flex={flex}
      width={width}
      alignItems="center"
      justifyContent="center"
      modalTitle={modalTitle}
      showChevronIcon={showChevronIcon}
      titleColor={titleColor}
      showSelectedValue={showSelectedValue}
    />
  );
}
