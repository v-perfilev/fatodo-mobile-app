import React, {ReactElement} from 'react';
import {ItemPriorityType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import {IIconProps, Text} from 'native-base';
import LowPriorityIcon from '../icons/LowPriorityIcon';
import NormalPriorityIcon from '../icons/NormalPriorityIcon';
import HighPriorityIcon from '../icons/HighPriorityIcon';
import FCenter from '../boxes/FCenter';
import FHStack from '../boxes/FHStack';
import {IColors} from 'native-base/lib/typescript/theme/base/colors';

type PriorityViewProps = IIconProps & {
  priority: ItemPriorityType;
  fontColor?: IColors;
  withoutText?: boolean;
};

export const PriorityView = ({priority, fontColor, withoutText, ...props}: PriorityViewProps) => {
  const {t} = useTranslation();

  const getIcon = (priority: ItemPriorityType): ReactElement => {
    switch (priority) {
      case 'LOW':
        return <LowPriorityIcon color="gray.500" />;
      case 'NORMAL':
        return <NormalPriorityIcon color="primary.500" />;
      case 'HIGH':
        return <HighPriorityIcon color="error.500" />;
    }
  };

  const icon = React.cloneElement(getIcon(priority), {...props, mt: !withoutText ? 1 : undefined});
  const text = t('common:priorities.' + priority);

  const onlyIcon = <FCenter>{icon}</FCenter>;

  const iconWithText = (
    <FHStack smallSpace alignItems="center">
      {icon}
      <Text color={fontColor}>{text}</Text>
    </FHStack>
  );

  return withoutText ? onlyIcon : iconWithText;
};

export default PriorityView;
