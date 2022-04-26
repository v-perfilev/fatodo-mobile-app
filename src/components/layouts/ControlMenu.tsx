import * as React from 'react';
import {FC, useMemo} from 'react';
import {MenuElement} from '../../models/MenuElement';
import {Flex} from 'native-base';
import CustomIconButton from '../controls/IconButton';

type Props = {
  menu: MenuElement[];
  disabled?: boolean;
};

const ControlMenu: FC<Props> = ({menu, disabled}: Props) => {
  const filteredMenu = useMemo<MenuElement[]>(() => {
    return menu?.filter((action) => !action.hidden);
  }, [menu]);

  return (
    <Flex flexDirection="row" flexWrap="wrap" justifyContent="space-around">
      {filteredMenu?.map((action, index) => (
        <CustomIconButton
          key={index}
          icon={action.icon}
          onPress={action.action}
          disabled={disabled || action.disabled}
          color={action.color || 'primary.500'}
          size="sm"
          mx="1"
          my="1"
        />
      ))}
    </Flex>
  );
};

export default ControlMenu;