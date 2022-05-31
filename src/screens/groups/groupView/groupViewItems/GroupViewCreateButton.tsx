import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import OutlinedButton from '../../../../components/controls/OutlinedButton';
import PlusIcon from '../../../../components/icons/PlusIcon';
import {useAppSelector} from '../../../../store/store';
import GroupSelectors from '../../../../store/group/groupSelectors';
import {Box} from 'native-base';

const GroupViewCreateButton = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t, i18n} = useTranslation();
  const group = useAppSelector(GroupSelectors.group);

  const goToItemCreate = (): void => navigation.navigate('ItemCreate', {group});

  const text = useMemo<string>(() => t('group:menu.createItem'), [i18n.language]);

  return (
    <Box my="1.5">
      <OutlinedButton
        h="48px"
        rounded="xs"
        borderColor="gray.200"
        leftIcon={<PlusIcon size="sm" />}
        onPress={goToItemCreate}
      >
        {text}
      </OutlinedButton>
    </Box>
  );
};

export default GroupViewCreateButton;
