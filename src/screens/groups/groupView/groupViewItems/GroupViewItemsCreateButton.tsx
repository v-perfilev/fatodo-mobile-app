import React, {FC, useMemo} from 'react';
import {Flex} from 'native-base';
import {Group} from '../../../../models/Group';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../../navigators/GroupNavigator';
import SolidButton from '../../../../components/controls/SolidButton';

type GroupViewItemsCreateButtonProps = {
  group: Group;
};

const GroupViewItemsCreateButton: FC<GroupViewItemsCreateButtonProps> = ({group}) => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {t, i18n} = useTranslation();

  const goToItemCreate = (): void => {
    navigation.navigate('ItemCreate', {groupId: group.id});
  };

  const text = useMemo<string>(() => t('group:menu.createItem'), [i18n.language]);

  return (
    <Flex>
      <SolidButton onPress={goToItemCreate}>{text}</SolidButton>
    </Flex>
  );
};

export default GroupViewItemsCreateButton;
