import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import OutlinedButton from '../../../../components/controls/OutlinedButton';
import PlusIcon from '../../../../components/icons/PlusIcon';
import {useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';

const GroupViewItemsCreateButton = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t, i18n} = useTranslation();
  const group = useAppSelector(GroupSelectors.group);

  const goToItemCreate = (): void => navigation.navigate('ItemCreate', {group});

  const text = useMemo<string>(() => t('group:menu.createItem'), [i18n.language]);

  return (
    <OutlinedButton
      h="45px"
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
