import React, {ReactElement, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FHStack from '../boxes/FHStack';
import CheckboxInput from '../controls/CheckboxInput';

type StatusViewProps = {
  done: boolean;
};

export const StatusView = ({done}: StatusViewProps) => {
  const {t, i18n} = useTranslation();

  const getIcon = (done: boolean): ReactElement => {
    return <CheckboxInput isSelected={done} size={20} />;
  };

  const getText = (done: boolean): string => {
    switch (done) {
      case false:
        return t('common:statuses.workInProgress');
      case true:
        return t('common:statuses.closed');
    }
  };

  const icon = React.cloneElement(getIcon(done));
  const text = useMemo(() => getText(done), [done, i18n.language]);

  return (
    <FHStack space="2" alignItems="center">
      {icon}
      <Text isTruncated>{text}</Text>
    </FHStack>
  );
};

export default StatusView;
