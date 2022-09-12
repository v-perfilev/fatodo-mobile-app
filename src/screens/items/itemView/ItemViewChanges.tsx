import React, {ReactElement, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';

const ItemViewChanges = () => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.item);
  const creator = useAppSelector((state) => userSelector(state, item.createdBy));
  const updater = useAppSelector((state) => userSelector(state, item.lastModifiedBy));

  const formatDate = (timestamp: number): string => {
    return DateFormatters.formatTimeWithDate(new Date(timestamp));
  };

  const labeledBox = (label: string, text: string): ReactElement => (
    <LabeledBox label={label} isText color="gray.500" fontSize="xs">
      {text}
    </LabeledBox>
  );

  return (
    <FVStack defaultSpace>
      {creator && (
        <FHStack defaultSpace>
          {labeledBox(t('item:labels.createdBy'), creator.username)}
          {labeledBox(t('item:labels.createdAt'), formatDate(item.createdAt))}
        </FHStack>
      )}
      {updater && item.createdAt !== item.lastModifiedAt && (
        <FHStack defaultSpace>
          {labeledBox(t('item:labels.updatedBy'), updater.username)}
          {labeledBox(t('item:labels.createdAt'), formatDate(item.lastModifiedAt))}
        </FHStack>
      )}
    </FVStack>
  );
};

export default ItemViewChanges;
