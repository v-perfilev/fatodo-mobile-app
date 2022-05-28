import * as React from 'react';
import {ReactElement, useMemo} from 'react';
import {IIconProps} from 'native-base';
import {ItemStatusType} from '../../models/Item';
import StatusCreatedIcon from '../icons/StatusCreatedIcon';
import StatusWipIcon from '../icons/StatusWipIcon';
import StatusClosedIcon from '../icons/StatusClosedIcon';
import StatusCompletedIcon from '../icons/StatusCompletedIcon';
import FCenter from '../boxes/FCenter';

type StatusViewProps = IIconProps & {
  statusType: ItemStatusType;
};

const StatusView = ({statusType, ...props}: StatusViewProps) => {
  const iconElement = useMemo<ReactElement>(() => {
    switch (statusType) {
      case 'CREATED':
        return <StatusCreatedIcon />;
      case 'WORK_IN_PROGRESS':
        return <StatusWipIcon />;
      case 'COMPLETED':
        return <StatusCompletedIcon />;
      case 'CLOSED':
        return <StatusClosedIcon />;
      default:
        return <StatusCreatedIcon />;
    }
  }, [statusType]);

  const icon = useMemo<ReactElement>(
    () => React.cloneElement(iconElement, {color: 'primary.500', ...props}),
    [iconElement],
  );

  return <FCenter>{icon}</FCenter>;
};

export default StatusView;
