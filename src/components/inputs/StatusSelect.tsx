import React, {ReactElement, useMemo} from 'react';
import {ItemStatusType} from '../../models/Item';
import StatusCreatedIcon from '../icons/StatusCreatedIcon';
import StatusWipIcon from '../icons/StatusWipIcon';
import StatusClosedIcon from '../icons/StatusClosedIcon';
import StatusCompletedIcon from '../icons/StatusCompletedIcon';
import Menu, {MenuItem, MenuItemProps} from '../controls/Menu';
import SolidButton from '../controls/SolidButton';

type StatusSelectProps = {
  statusType: ItemStatusType;
  setStatusType: (statusType: ItemStatusType) => void;
  loading?: boolean;
};

export const StatusSelect = ({statusType, setStatusType, loading}: StatusSelectProps) => {
  const getIconByStatusType = (statusType: ItemStatusType): ReactElement => {
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

  const getMenuIcon = (statusType: ItemStatusType) => {
    const icon = getIconByStatusType(statusType);
    return React.cloneElement(icon, {color: 'primary.500', size: 'md'});
  };

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

  const menuItems: MenuItemProps[] = [
    {
      action: setStatusToCreated,
      icon: getMenuIcon('CREATED'),
    },
    {
      action: setStatusToWip,
      icon: getMenuIcon('WORK_IN_PROGRESS'),
    },
    {
      action: setStatusToCompleted,
      icon: getMenuIcon('COMPLETED'),
    },
    {
      action: setStatusToClosed,
      icon: getMenuIcon('CLOSED'),
    },
  ];

  const activeIcon = useMemo<ReactElement>(() => {
    const icon = getIconByStatusType(statusType);
    return React.cloneElement(icon, {color: 'white', size: 'md'});
  }, [statusType]);

  return (
    <Menu
      trigger={(triggerProps) => (
        <SolidButton w="30px" h="30px" isLoading={loading} leftIcon={activeIcon} {...triggerProps} />
      )}
    >
      {menuItems.map((itemProps, index) => (
        <MenuItem {...itemProps} key={index} />
      ))}
    </Menu>
  );
};
