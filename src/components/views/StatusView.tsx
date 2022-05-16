import * as React from 'react';
import {ReactNode, useMemo} from 'react';
import {IIconProps} from 'native-base';
import {ItemStatusType} from '../../models/Item';
import StatusCreatedIcon from '../icons/StatusCreatedIcon';
import StatusWipIcon from '../icons/StatusWipIcon';
import StatusClosedIcon from '../icons/StatusClosedIcon';
import StatusCompletedIcon from '../icons/StatusCompletedIcon';
import FCenter from '../surfaces/FCenter';

type StatusViewProps = IIconProps & {
  statusType: ItemStatusType;
};

const StatusView = ({statusType, ...props}: StatusViewProps) => {
  const icon = useMemo<ReactNode>(() => {
    switch (statusType) {
      case 'CREATED':
        return <StatusCreatedIcon color="primary.500" {...props} />;
      case 'WORK_IN_PROGRESS':
        return <StatusWipIcon color="primary.500" {...props} />;
      case 'COMPLETED':
        return <StatusCompletedIcon color="primary.500" {...props} />;
      case 'CLOSED':
        return <StatusClosedIcon color="primary.500" {...props} />;
      default:
        return <StatusCreatedIcon color="primary.500" {...props} />;
    }
  }, [statusType]);

  return <FCenter>{icon}</FCenter>;
};

export default StatusView;
