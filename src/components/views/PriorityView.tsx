import React, {ReactElement, useMemo} from 'react';
import {ItemPriorityType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import {IIconProps, Text} from 'native-base';
import LowPriorityIcon from '../icons/LowPriorityIcon';
import NormalPriorityIcon from '../icons/NormalPriorityIcon';
import HighPriorityIcon from '../icons/HighPriorityIcon';
import FCenter from '../surfaces/FCenter';
import FHStack from '../surfaces/FHStack';

type PriorityViewProps = IIconProps & {
  priority: ItemPriorityType;
  withoutText?: boolean;
};

export const PriorityView = ({priority, withoutText, ...props}: PriorityViewProps) => {
  const {t, i18n} = useTranslation();

  const icon = useMemo<ReactElement>(() => {
    let result;
    if (priority === 'LOW') {
      result = <LowPriorityIcon color="gray.500" />;
    } else if (priority === 'NORMAL') {
      result = <NormalPriorityIcon color="primary.500" />;
    } else {
      result = <HighPriorityIcon color="error.500" />;
    }
    return result;
  }, [priority]);

  const text = useMemo<string>(() => {
    return t('common:priorities.' + priority);
  }, [priority, i18n.language]);

  return withoutText ? (
    <FCenter>{icon}</FCenter>
  ) : (
    <FHStack smallSpace alignItems="center">
      {React.cloneElement(icon, {...props, mt: 1})}
      <Text>{text}</Text>
    </FHStack>
  );
};

export default PriorityView;
