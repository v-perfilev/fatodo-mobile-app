import * as React from 'react';
import {ReactElement} from 'react';
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

  const icon = React.cloneElement(getIcon(), {color: 'primary.500', ...props});

  return <FCenter>{icon}</FCenter>;
};

export default StatusView;
