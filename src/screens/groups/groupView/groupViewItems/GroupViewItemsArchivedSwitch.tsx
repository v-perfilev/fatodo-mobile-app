import * as React from 'react';
import {useTranslation} from 'react-i18next';
import {Switch, Text} from 'native-base';
import FHStack from '../../../../components/surfaces/FHStack';

type GroupViewItemsArchivedSwitchProps = {
  showArchived: boolean;
  setShowArchived: (archived: boolean) => void;
};

const GroupViewItemsArchivedSwitch = ({showArchived, setShowArchived}: GroupViewItemsArchivedSwitchProps) => {
  const {t} = useTranslation();

  const toggleArchived = (): void => {
    setShowArchived(!showArchived);
  };

  return (
    <FHStack smallSpace alignItems="center">
      <Text color="gray.500">{t('group:actions.showArchived')}</Text>
      <Switch isChecked={showArchived} onChange={toggleArchived} color="primary.500" />
    </FHStack>
  );
};

export default GroupViewItemsArchivedSwitch;
