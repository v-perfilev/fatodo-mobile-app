import React, {FC, ReactNode, useMemo} from 'react';
import {ItemPriorityType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import {Center, HStack, IIconProps, Text} from 'native-base';
import LowPriorityIcon from '../icons/LowPriorityIcon';
import NormalPriorityIcon from '../icons/NormalPriorityIcon';
import HighPriorityIcon from '../icons/HighPriorityIcon';

type PriorityViewProps = IIconProps & {
  priority: ItemPriorityType;
  withoutText?: boolean;
};

export const PriorityView: FC<PriorityViewProps> = ({priority, withoutText, ...props}) => {
  const {t, i18n} = useTranslation();

  const icon = useMemo<ReactNode>(() => {
    if (priority === 'LOW') {
      return <LowPriorityIcon color="gray.500" {...props} />;
    } else if (priority === 'NORMAL') {
      return <NormalPriorityIcon color="primary.500" {...props} />;
    } else {
      return <HighPriorityIcon color="error.500" {...props} />;
    }
  }, [priority]);

  const text = useMemo<string>(() => {
    return t('common:priorities.' + priority);
  }, [priority, i18n.language]);

  return withoutText ? (
    <Center>{icon}</Center>
  ) : (
    <HStack alignItems="center">
      {icon}
      <Text>{text}</Text>
    </HStack>
  );
};

export default PriorityView;
