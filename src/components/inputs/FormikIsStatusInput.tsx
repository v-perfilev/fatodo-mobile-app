import React, {memo} from 'react';
import FHStack from '../boxes/FHStack';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';
import CheckboxInput from '../controls/CheckboxInput';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';

type FormikStatusInputProps = FormikInputProps;

const FormikStatusInput = (props: FormikStatusInputProps) => {
  const {value, setValue} = props;
  const {t} = useTranslation();

  const toggleValue = (): void => setValue(!value);

  return (
    <FHStack space="5" alignItems="center">
      <CheckboxInput isSelected={value} onPress={toggleValue} size={35} />
      <Text fontSize="lg">
        {value && t('common:statuses.closed')}
        {!value && t('common:statuses.workInProgress')}
      </Text>
    </FHStack>
  );
};

export default flowRight([memo, withFormikWrapper])(FormikStatusInput);
