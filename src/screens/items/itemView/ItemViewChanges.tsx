import React, {ReactElement, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import UserService from '../../../services/UserService';
import {User} from '../../../models/User';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import FVStack from '../../../components/surfaces/FVStack';
import FHStack from '../../../components/surfaces/FHStack';

const ItemViewChanges = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();
  const [creator, setCreator] = useState<string>();
  const [updater, setUpdater] = useState<string>();

  const getDate = (timestamp: number): string => {
    const timestampNumber = timestamp * 1000;
    return DateFormatters.formatTimeWithDate(new Date(timestampNumber));
  };

  const loadUsernames = (): void => {
    UserService.getAllByIds([item.createdBy, item.lastModifiedBy].filter((id) => id != null))
      .then((response) => {
        const users: User[] = response.data;
        if (item.createdBy) {
          const username = users.length > 0 ? users[0].username : item.createdBy;
          setCreator(username);
        }
        if (item.lastModifiedBy) {
          const username = users.length > 1 ? users[1].username : users.length > 0 ? users[0].username : item.createdBy;
          setUpdater(username);
        }
      })
      .catch(() => {
        if (item.createdBy) {
          setCreator(item.createdBy);
        }
        if (item.lastModifiedBy) {
          setUpdater(item.lastModifiedBy);
        }
      });
  };

  useEffect(() => {
    loadUsernames();
  }, []);

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
