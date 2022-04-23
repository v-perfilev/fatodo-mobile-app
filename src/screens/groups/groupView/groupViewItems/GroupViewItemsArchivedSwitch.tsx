import * as React from 'react';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {HStack, Switch, Text} from 'native-base';

type GroupViewItemsArchivedSwitchProps = {
  showArchived: boolean;
  setShowArchived: (archived: boolean) => void;
};

const GroupViewItemsArchivedSwitch: FC<GroupViewItemsArchivedSwitchProps> = ({showArchived, setShowArchived}) => {
  const {t} = useTranslation();

  const toggleArchived = (): void => {
    setShowArchived(!showArchived);
  };

  return (
    <HStack alignItems="center">
      <Text mr="1" color="gray.500">
        {t('group:actions.showArchived')}
      </Text>
      <Switch isChecked={showArchived} onChange={toggleArchived} color="primary.500" />
    </HStack>
  );
};

export default GroupViewItemsArchivedSwitch;
