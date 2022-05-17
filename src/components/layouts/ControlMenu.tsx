import * as React from 'react';
import {useMemo} from 'react';
import {MenuElement} from '../../models/MenuElement';
import IconButton from '../controls/IconButton';
import FContainer from '../surfaces/FContainer';

type ControlMenuProps = {
  menu: MenuElement[];
  disabled?: boolean;
};

const ControlMenu = ({menu, disabled}: ControlMenuProps) => {
  const filteredMenu = useMemo<MenuElement[]>(() => {
    return menu?.filter((action) => !action.hidden);
  }, [menu]);

  return (
    <FContainer itemM="1" justifyContent="space-around">
      {filteredMenu?.map((action, index) => (
        <IconButton
          key={index}
          icon={action.icon}
          onPress={action.action}
          isDisabled={disabled || action.disabled}
          colorScheme={action.color}
          size="sm"
        />
      ))}
    </FContainer>
  );
};

export default ControlMenu;
