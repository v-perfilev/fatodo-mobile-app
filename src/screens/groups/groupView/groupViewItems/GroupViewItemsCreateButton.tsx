import React, {useMemo} from 'react';
import {Group} from '../../../../models/Group';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import OutlinedButton from '../../../../components/controls/OutlinedButton';
import PlusIcon from '../../../../components/icons/PlusIcon';

type GroupViewItemsCreateButtonProps = {
  group: Group;
};

const GroupViewItemsCreateButton = ({group}: GroupViewItemsCreateButtonProps) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t, i18n} = useTranslation();

  const goToItemCreate = (): void => {
    navigation.navigate('ItemCreate', {groupId: group.id});
  };

  const text = useMemo<string>(() => t('group:menu.createItem'), [i18n.language]);

  return (
    <OutlinedButton
      my="1"
      h="45"
      rounded="xs"
      borderColor="gray.200"
      leftIcon={<PlusIcon size="sm" />}
      onPress={goToItemCreate}
    >
      {text}
    </OutlinedButton>
  );
};

export default GroupViewItemsCreateButton;
