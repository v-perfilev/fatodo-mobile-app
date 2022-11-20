import React, {ReactElement, useMemo} from 'react';
import {ItemPriorityType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import {IIconProps, Text} from 'native-base';
import LowPriorityIcon from '../icons/LowPriorityIcon';
import NormalPriorityIcon from '../icons/NormalPriorityIcon';
import HighPriorityIcon from '../icons/HighPriorityIcon';
import FCenter from '../boxes/FCenter';
import FHStack from '../boxes/FHStack';
import {IColors} from 'native-base/lib/typescript/theme/base/colors';
import {ColorScheme} from '../../shared/themes/ThemeFactory';

type PriorityViewProps = IIconProps & {
  priority: ItemPriorityType;
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

  const getIcon = (priority: ItemPriorityType): ReactElement => {
    switch (priority) {
      case 'LOW':
        return <LowPriorityIcon color="gray.500" />;
      case 'NORMAL':
        return <NormalPriorityIcon color={`${colorScheme || 'primary'}.500`} />;
      case 'HIGH':
        return <HighPriorityIcon color="error.500" />;
    }
  };

  const icon = React.cloneElement(getIcon(priority), {...props, mt: !withoutText ? 0.5 : undefined});
  const text = useMemo(() => t('common:priorities.' + priority), [priority, i18n.language]);

  const onlyIcon = <FCenter>{icon}</FCenter>;

  const iconWithText = (
    <FHStack space="1" alignItems="center">
      {icon}
      <Text fontSize={fontSize} color={fontColor} isTruncated>
        {text}
      </Text>
    </FHStack>
  );

  return withoutText ? onlyIcon : iconWithText;
};

export default PriorityView;
