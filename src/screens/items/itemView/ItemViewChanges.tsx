import React, {ReactElement, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import FVStack from '../../../components/surfaces/FVStack';
import FHStack from '../../../components/surfaces/FHStack';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import UsersSelectors from '../../../store/users/usersSelectors';

const ItemViewChanges = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.item);
  const users = useAppSelector(UsersSelectors.users);
  const [creator, setCreator] = useState<string>();
  const [updater, setUpdater] = useState<string>();

  const getDate = (timestamp: number): string => {
    const timestampNumber = timestamp * 1000;
    return DateFormatters.formatTimeWithDate(new Date(timestampNumber));
  };

  useEffect(() => {
    if (item?.createdBy) {
      const user = users.find((u) => u.id === item.createdBy);
      const username = user.username || item.createdBy;
      setCreator(username);
    }
    if (item?.lastModifiedBy) {
      const user = users.find((u) => u.id === item.lastModifiedBy);
      const username = user.username || item.lastModifiedBy;
      setUpdater(username);
    }
  }, [item, users]);

  const labeledBox = (label: string, text: string): ReactElement => (
    <LabeledBox label={label} isText fontSize="12" color="gray.500">
      {text}
    </LabeledBox>
  );

  return (
    <FVStack defaultSpace>
      {creator && (
        <FHStack defaultSpace>
          {labeledBox(t('item:labels.createdBy'), creator)}
          {labeledBox(t('item:labels.createdAt'), getDate(item.createdAt))}
        </FHStack>
      )}
      {updater && item.createdAt !== item.lastModifiedAt && (
        <FHStack defaultSpace>
          {labeledBox(t('item:labels.updatedBy'), updater)}
          {labeledBox(t('item:labels.createdAt'), getDate(item.lastModifiedAt))}
        </FHStack>
      )}
    </FVStack>
  );
};

export default ItemViewChanges;
