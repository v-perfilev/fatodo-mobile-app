import React from 'react';
import PressableButton from './PressableButton';
import {IPressableProps} from 'native-base/lib/typescript/components/primitives/Pressable/types';
import FCenter from '../boxes/FCenter';
import {ColorScheme} from '../../shared/themes/ThemeFactory';
import CentredSpinner from '../surfaces/CentredSpinner';
import CheckIcon from '../icons/CheckIcon';
import {useColorModeValue} from 'native-base';

type CheckboxProps = IPressableProps & {
  checked: boolean;
  loading?: boolean;
  size?: number;
  colorScheme?: ColorScheme;
  canNotEdit?: boolean;
};

const Checkbox = ({checked, loading, size = 25, colorScheme, canNotEdit, ...props}: CheckboxProps) => {
  const disabledColor = useColorModeValue('gray.500', 'gray.300');
  const disabledBg = useColorModeValue('gray.200', 'gray.700');
  const borderColor = useColorModeValue('gray.400', 'gray.600');

  const bg = !canNotEdit ? undefined : disabledBg;
  const iconColor = !canNotEdit ? `${colorScheme || 'primary'}.500` : disabledColor;

  return (
    <PressableButton {...props}>
      <FCenter w={`${size}px`} h={`${size}px`} bg={bg} borderWidth="1" borderColor={borderColor} borderRadius="5">
        {!loading && checked && <CheckIcon color={iconColor} size={`${size}px`} />}
        {loading && <CentredSpinner size={size * 0.8} color={`${colorScheme || 'primary'}.500`} />}
      </FCenter>
    </PressableButton>
  );
};

export default Checkbox;
