import React, {FC, ReactNode, useMemo} from 'react';
import {ItemType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import {Center, HStack, IIconProps, Text} from 'native-base';
import TaskIcon from '../icons/TaskIcon';
import EventIcon from '../icons/EventIcon';
import RepetitionIcon from '../icons/RepetitionIcon';
import NoteIcon from '../icons/NoteIcon';

type TypeViewProps = IIconProps & {
  type: ItemType;
  withoutText?: boolean;
};

export const TypeView: FC<TypeViewProps> = ({type, withoutText, ...props}) => {
  const {t, i18n} = useTranslation();

  const icon = useMemo<ReactNode>(() => {
    if (type === 'TASK') {
      return <TaskIcon color="primary.500" {...props} />;
    } else if (type === 'EVENT') {
      return <EventIcon color="primary.500" {...props} />;
    } else if (type === 'REPETITION') {
      return <RepetitionIcon color="primary.500" {...props} />;
    } else {
      return <NoteIcon color="primary.500" {...props} />;
    }
  }, [type]);

  const text = useMemo<string>(() => {
    return t('common:types.' + type);
  }, [type, i18n.language]);

  return withoutText ? (
    <Center>{icon}</Center>
  ) : (
    <HStack alignItems="center">
      {icon}
      <Text>{text}</Text>
    </HStack>
  );
};

export default TypeView;
