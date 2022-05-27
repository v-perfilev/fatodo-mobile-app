import React, {ReactElement, useMemo} from 'react';
import {ItemType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import {IIconProps, Text} from 'native-base';
import TaskIcon from '../icons/TaskIcon';
import EventIcon from '../icons/EventIcon';
import RepetitionIcon from '../icons/RepetitionIcon';
import NoteIcon from '../icons/NoteIcon';
import FCenter from '../surfaces/FCenter';
import FHStack from '../surfaces/FHStack';

type TypeViewProps = IIconProps & {
  type: ItemType;
  withoutText?: boolean;
};

export const TypeView = ({type, withoutText, ...props}: TypeViewProps) => {
  const {t, i18n} = useTranslation();

  const icon = useMemo<ReactElement>(() => {
    let result;
    if (type === 'TASK') {
      result = <TaskIcon color="primary.500" {...props} />;
    } else if (type === 'EVENT') {
      result = <EventIcon color="primary.500" {...props} />;
    } else if (type === 'REPETITION') {
      result = <RepetitionIcon color="primary.500" {...props} />;
    } else {
      result = <NoteIcon color="primary.500" {...props} />;
    }
    return result;
  }, [type]);

  const text = useMemo<string>(() => {
    return t('common:types.' + type);
  }, [type, i18n.language]);

  return withoutText ? (
    <FCenter>{icon}</FCenter>
  ) : (
    <FHStack smallSpace alignItems="center">
      {React.cloneElement(icon, {...props, mt: 1})}
      <Text>{text}</Text>
    </FHStack>
  );
};

export default TypeView;
