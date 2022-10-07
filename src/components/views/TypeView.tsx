import React, {ReactElement} from 'react';
import {ItemType} from '../../models/Item';
import {useTranslation} from 'react-i18next';
import {IIconProps, Text} from 'native-base';
import TaskIcon from '../icons/TaskIcon';
import EventIcon from '../icons/EventIcon';
import RepetitionIcon from '../icons/RepetitionIcon';
import NoteIcon from '../icons/NoteIcon';
import FCenter from '../boxes/FCenter';
import FHStack from '../boxes/FHStack';
import {IColors} from 'native-base/lib/typescript/theme/base/colors';

type TypeViewProps = IIconProps & {
  type: ItemType;
  fontColor?: IColors;
  withoutText?: boolean;
};

export const TypeView = ({type, fontColor, withoutText, ...props}: TypeViewProps) => {
  const {t} = useTranslation();

  const getIcon = (): ReactElement => {
    switch (type) {
      case 'TASK':
        return <TaskIcon />;
      case 'EVENT':
        return <EventIcon />;
      case 'REPETITION':
        return <RepetitionIcon />;
      case 'NOTE':
        return <NoteIcon />;
    }
  };

  const icon = React.cloneElement(getIcon(), {...props, color: 'primary.500', mt: !withoutText ? 1 : undefined});
  const text = t('common:types.' + type);

  const onlyIcon = <FCenter>{icon}</FCenter>;
  const iconWithText = (
    <FHStack smallSpace alignItems="center">
      {icon}
      <Text color={fontColor} isTruncated>
        {text}
      </Text>
    </FHStack>
  );

  return withoutText ? onlyIcon : iconWithText;
};

export default TypeView;
