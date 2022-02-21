import React, {FC, useMemo} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {useGroupListItemsContext} from '../../../../shared/contexts/listContexts/groupListItemsContext';
import {GestureResponderEvent} from 'react-native';
import RoundButton from '../../../../components/controls/RoundButton';
import CollapsedIcon from '../../../../components/icons/CollapsedIcon';

const GroupListCardCollapseButton: FC = () => {
  const {group} = useGroupViewContext();
  const {collapsed: previewCollapsed, setCollapsed} = useGroupListItemsContext();

  const collapsed = useMemo<boolean>(() => {
    return group && previewCollapsed.has(group.id) ? previewCollapsed.get(group.id) : false;
  }, [group, previewCollapsed]);

  const handlePress = (e: GestureResponderEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed([group.id], !collapsed);
  };

  return (
    <RoundButton onPress={handlePress}>
      <CollapsedIcon visible={!collapsed} size="6" color="white" />
    </RoundButton>
  );
};

export default GroupListCardCollapseButton;
