import React, {ReactElement, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import InfoSelectors from '../../../store/info/infoSelectors';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import AuthSelectors from '../../../store/auth/authSelectors';
import {UserUtils} from '../../../shared/utils/UserUtils';

const ItemViewChanges = () => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);
  const item = useAppSelector(ItemSelectors.item);
  const creator = useAppSelector((state) => userSelector(state, item.createdBy));
  const updater = useAppSelector((state) => userSelector(state, item.lastModifiedBy));

  const formatDate = (timestamp: number): string => {
    return DateFormatters.formatDate(new Date(timestamp), account, 'FULL', 'FULL');
  };

  const labeledBox = (label: string, content: string): ReactElement => (
    <LabeledBox label={label} color="gray.500" fontSize="sm">
      {content}
    </LabeledBox>
  );

  return (
    <FVStack space="3">
      {creator && (
        <FHStack space="3" flexWrap="wrap">
          {labeledBox(t('item:labels.createdBy'), UserUtils.getUsername(creator, t))}
          {labeledBox(t('item:labels.createdAt'), formatDate(item.createdAt))}
        </FHStack>
      )}
      {updater && item.createdAt !== item.lastModifiedAt && (
        <FHStack space="3" flexWrap="wrap">
          {labeledBox(t('item:labels.updatedBy'), UserUtils.getUsername(updater, t))}
          {labeledBox(t('item:labels.updatedAt'), formatDate(item.lastModifiedAt))}
        </FHStack>
      )}
    </FVStack>
  );
};

export default ItemViewChanges;
