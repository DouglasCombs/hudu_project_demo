import React from 'react';
import {useController} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FormPickerV2} from '~/components';
import {useUSCities} from '~/hooks/location';

export default React.forwardRef(
  (
    {
      name,
      stateTitle,
    }: {
      name: any;
      stateTitle?: any;
    },
    ref: any,
  ) => {
    const {field} = useController({name});
    const {t} = useTranslation();

    const {data, isLoading} = useUSCities(stateTitle);

    const onChange = (item: any) => {
      field.onChange(item);
    };

    return (
      <FormPickerV2
        outline
        label={t('common.city')}
        data={data ?? []}
        name={name}
        onChange={onChange}
      />
    );
  },
);
