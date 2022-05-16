import React, {ReactElement, useCallback} from 'react';
import {ItemStatusType} from '../../models/Item';
import StatusCreatedIcon from '../icons/StatusCreatedIcon';
import StatusWipIcon from '../icons/StatusWipIcon';
import StatusClosedIcon from '../icons/StatusClosedIcon';
import StatusCompletedIcon from '../icons/StatusCompletedIcon';
import Menu, {MenuItem, MenuItemProps} from '../controls/Menu';
import SolidButton from '../controls/SolidButton';
import {Box} from 'native-base';

type StatusSelectProps = {
  statusType: ItemStatusType;
  setStatusType: (statusType: ItemStatusType) => void;
  loading?: boolean;
};

export const StatusSelect = ({statusType, setStatusType, loading}: StatusSelectProps) => {
  const iconByStatusType = useCallback(
    (statusType: ItemStatusType): ReactElement => {
      switch (statusType) {
        case 'CREATED':
          return <StatusCreatedIcon color="white" size="md" />;
        case 'WORK_IN_PROGRESS':
          return <StatusWipIcon color="white" size="md" />;
        case 'COMPLETED':
          return <StatusCompletedIcon color="white" size="md" />;
        case 'CLOSED':
          return <StatusClosedIcon color="white" size="md" />;
        default:
          return <StatusCreatedIcon color="white" size="md" />;
      }
    },
    [statusType, loading],
  );

  const setStatusToCreated = (): void => {
    if (statusType !== 'CREATED') {
      setStatusType('CREATED');
    }
  };

  const setStatusToWip = (): void => {
    if (statusType !== 'WORK_IN_PROGRESS') {
      setStatusType('WORK_IN_PROGRESS');
    }
  };

  const setStatusToCompleted = (): void => {
    if (statusType !== 'COMPLETED') {
      setStatusType('COMPLETED');
    }
  };

  const setStatusToClosed = (): void => {
    if (statusType !== 'CLOSED') {
      setStatusType('CLOSED');
    }
  };

  const menuItems = [
    {
      action: setStatusToCreated,
      icon: <StatusCreatedIcon color="primary.500" size="md" />,
    },
    {
      action: setStatusToWip,
      icon: <StatusWipIcon color="primary.500" size="md" />,
    },
    {
      action: setStatusToCompleted,
      icon: <StatusCompletedIcon color="primary.500" size="md" />,
    },
    {
      action: setStatusToClosed,
      icon: <StatusClosedIcon color="primary.500" size="md" />,
    },
  ] as MenuItemProps[];

  return (
    <Box mx="1">
      <Menu
        trigger={(triggerProps) => (
          <SolidButton
            w="30px"
            h="30px"
            isLoading={loading}
            leftIcon={iconByStatusType(statusType)}
            {...triggerProps}
          />
        )}
      >
        {menuItems.map((itemProps, index) => (
          <MenuItem {...itemProps} key={index} />
        ))}
      </Menu>
    </Box>
  );
};
