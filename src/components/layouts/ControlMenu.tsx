import * as React from 'react';
import {useMemo} from 'react';
import {MenuElement} from '../../models/MenuElement';
import {Flex} from 'native-base';
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
    <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-around">
      {filteredMenu?.map((action, index) => (
        <IconButton
          key={index}
          icon={action.icon}
          onPress={action.action}
          isDisabled={disabled || action.disabled}
          colorScheme={action.color}
          size="sm"
          mx="1"
          my="1"
        />
      ))}
    </Flex>
  );
};

export default ControlMenu;
