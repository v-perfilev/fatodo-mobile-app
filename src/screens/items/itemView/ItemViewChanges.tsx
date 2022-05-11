import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import UserService from '../../../services/UserService';
import {User} from '../../../models/User';
import {Box, HStack} from 'native-base';
import LabeledBox from '../../../components/surfaces/LabeledBox';

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

  return (
    <Box>
      {creator && (
        <HStack>
          <LabeledBox label={t('item:labels.createdBy')} isText>
            {creator}
          </LabeledBox>
          <LabeledBox label={t('item:labels.createdAt')} isText>
            {getDate(item.createdAt)}
          </LabeledBox>
        </HStack>
      )}
      {updater && item.createdAt !== item.lastModifiedAt && (
        <HStack>
          <LabeledBox label={t('item:labels.updatedBy')} isText>
            {updater}
          </LabeledBox>
          <LabeledBox label={t('item:labels.updatedAt')} isText>
            {getDate(item.lastModifiedAt)}
          </LabeledBox>
        </HStack>
      )}
    </Box>
  );
};

export default ItemViewChanges;
