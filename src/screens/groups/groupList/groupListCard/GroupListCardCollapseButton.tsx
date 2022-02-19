import React, {FC, useMemo} from 'react';
import {PresenceTransition} from 'native-base';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {useGroupListItemsContext} from '../../../../shared/contexts/listContexts/groupListItemsContext';
import ArrowDownIcon from '../../../../components/icons/ArrowDownIcon';
import {GestureResponderEvent} from 'react-native';
import RoundButton from '../../../../components/controls/RoundButton';

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

  const initial = {
    rotate: '0deg',
  };

  const animate = {
    rotate: '180deg',
    transition: {
      duration: 300,
    },
  };

  return (
    <RoundButton onPress={handlePress}>
      <PresenceTransition visible={!collapsed} initial={initial} animate={animate}>
        <ArrowDownIcon size="6" color="white" />
      </PresenceTransition>
    </RoundButton>
  );
};

export default GroupListCardCollapseButton;
