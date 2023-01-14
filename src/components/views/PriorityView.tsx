import React, {ReactElement, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {IIconProps, Text} from 'native-base';
import LowPriorityIcon from '../icons/LowPriorityIcon';
import NormalPriorityIcon from '../icons/NormalPriorityIcon';
import HighPriorityIcon from '../icons/HighPriorityIcon';
import FCenter from '../boxes/FCenter';
import FHStack from '../boxes/FHStack';
import {IColors} from 'native-base/lib/typescript/theme/base/colors';
import {ColorScheme} from '../../shared/themes/ThemeFactory';
import {ItemPriorityType} from '../../models/Item';

type PriorityViewProps = IIconProps & {
  priority: number | ItemPriorityType;
  colorScheme?: ColorScheme;
  fontColor?: IColors;
  withoutText?: boolean;
};

export const PriorityView = ({
  priority,
  colorScheme,
  fontSize,
  fontColor,
  withoutText,
  ...props
}: PriorityViewProps) => {
  const {t, i18n} = useTranslation();

  const getIcon = (priority: number | ItemPriorityType): ReactElement => {
    switch (priority) {
      case 1:
      case 'LOW':
        return <LowPriorityIcon color="gray.500" />;
      case 2:
      case 'NORMAL':
        return <NormalPriorityIcon color={`${colorScheme || 'primary'}.500`} />;
      case 3:
      case 'HIGH':
        return <HighPriorityIcon color="error.500" />;
    }
  };

  const getText = (priority: number | ItemPriorityType): string => {
    switch (priority) {
      case 1:
      case 'LOW':
        return t('common:priorities.low');
      case 2:
      case 'NORMAL':
        return t('common:priorities.normal');
      case 3:
      case 'HIGH':
        return t('common:priorities.high');
    }
  };

  const icon = React.cloneElement(getIcon(priority), {...props, mt: !withoutText ? 0.5 : undefined});
  const text = useMemo(() => getText(priority), [priority, i18n.language]);

  const onlyIcon = <FCenter>{icon}</FCenter>;

  const iconWithText = (
    <FHStack space="2" alignItems="center">
      {icon}
      <Text fontSize={fontSize} color={fontColor} isTruncated>
        {text}
      </Text>
    </FHStack>
  );

  return withoutText ? onlyIcon : iconWithText;
};

export default PriorityView;
