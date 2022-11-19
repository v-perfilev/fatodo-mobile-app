import * as React from 'react';
import {ReactElement, useMemo} from 'react';
import {IIconProps, Text} from 'native-base';
import {ItemStatusType} from '../../models/Item';
import StatusCreatedIcon from '../icons/StatusCreatedIcon';
import StatusWipIcon from '../icons/StatusWipIcon';
import StatusClosedIcon from '../icons/StatusClosedIcon';
import StatusCompletedIcon from '../icons/StatusCompletedIcon';
import FCenter from '../boxes/FCenter';
import FHStack from '../boxes/FHStack';
import {useTranslation} from 'react-i18next';
import {IColors} from 'native-base/lib/typescript/theme/base/colors';
import {ColorScheme} from '../../shared/themes/ThemeFactory';

type StatusViewProps = IIconProps & {
  statusType: ItemStatusType;
  colorScheme?: ColorScheme;
  fontColor?: IColors;
  withoutText?: boolean;
};

const StatusView = ({statusType, colorScheme, fontSize, fontColor, withoutText, ...props}: StatusViewProps) => {
  const {t, i18n} = useTranslation();

  const getIcon = (): ReactElement => {
    switch (statusType) {
      case 'CREATED':
        return <StatusCreatedIcon />;
      case 'WORK_IN_PROGRESS':
        return <StatusWipIcon />;
      case 'COMPLETED':
        return <StatusCompletedIcon />;
      case 'CLOSED':
        return <StatusClosedIcon />;
    }
  };

  const icon = React.cloneElement(getIcon(), {
    ...props,
    color: `${colorScheme || 'primary'}.500`,
    mt: !withoutText ? 0.5 : undefined,
  });
  const text = useMemo(() => t('common:statuses.' + statusType), [statusType, i18n.language]);

  const onlyIcon = <FCenter>{icon}</FCenter>;

  const iconWithText = (
    <FHStack smallSpace alignItems="center">
      {icon}
      <Text fontSize={fontSize} color={fontColor} isTruncated>
        {text}
      </Text>
    </FHStack>
  );

  return withoutText ? onlyIcon : iconWithText;
};

export default StatusView;
