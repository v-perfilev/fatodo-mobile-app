import * as React from 'react';
import {useMemo} from 'react';
import {MenuElement} from '../../models/MenuElement';
import FContainer from '../boxes/FContainer';
import IconButton from '../controls/IconButton';

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
          colorScheme={action.color}
          icon={action.icon}
          onPress={action.action}
          isDisabled={disabled || action.disabled}
          size="sm"
          key={index}
        />
      ))}
    </FContainer>
  );
};

export default ControlMenu;
