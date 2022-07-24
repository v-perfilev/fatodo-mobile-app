import React, {ReactElement, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';

const ItemViewChanges = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.item);
  const users = useAppSelector(InfoSelectors.users);
  const [creator, setCreator] = useState<string>();
  const [updater, setUpdater] = useState<string>();

  const getDate = (timestamp: number): string => {
    const timestampNumber = timestamp * 1000;
    return DateFormatters.formatTimeWithDate(new Date(timestampNumber));
  };

  useEffect(() => {
    if (item?.createdBy) {
      const user = users.get(item.createdBy);
      const username = user?.username || item.createdBy;
      setCreator(username);
    }
    if (item?.lastModifiedBy) {
      const user = users.get(item.lastModifiedBy);
      const username = user?.username || item.lastModifiedBy;
      setUpdater(username);
    }
  }, [item, users]);

  const labeledBox = (label: string, text: string): ReactElement => (
    <LabeledBox label={label} isText color="gray.500" fontSize="xs">
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
