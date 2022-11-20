import React, {ReactElement, useMemo} from 'react';
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
import {ColorScheme} from '../../shared/themes/ThemeFactory';

type TypeViewProps = IIconProps & {
  type: ItemType;
  colorScheme?: ColorScheme;
  fontColor?: IColors;
  withoutText?: boolean;
};

export const TypeView = ({type, fontSize, colorScheme, fontColor, withoutText, ...props}: TypeViewProps) => {
  const {t, i18n} = useTranslation();

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

  const icon = React.cloneElement(getIcon(), {
    ...props,
    color: `${colorScheme || 'primary'}.500`,
    mt: !withoutText ? 0.5 : undefined,
  });
  const text = useMemo(() => t('common:types.' + type), [type, i18n.language]);

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

export default TypeView;
