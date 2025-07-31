import React from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FormPickerV2} from '~/components';
import {useMockData} from '~/constants/mockData';

export default React.forwardRef(
  (
    {
      name,
    }: {
      name: any;
    },
    ref: any,
  ) => {
    const {field} = useController({name});
    const {field: cityField} = useController({name: 'city'});
    const {t} = useTranslation();

    const {stateList} = useMockData();

    const onChange = (item: any) => {
      field.onChange(item);
      cityField.onChange(undefined);
    };

    return (
      <FormPickerV2
        outline
        label={t('common.state')}
        data={stateList}
        name={name}
        titleKey="title"
        valueKey="value"
        onChange={onChange}
      />
    );
  },
);
