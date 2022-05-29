import React from 'react';
import ArrowDownIcon from '../../../../components/icons/ArrowDownIcon';
import ArrowUpIcon from '../../../../components/icons/ArrowUpIcon';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import IconButton from '../../../../components/controls/IconButton';

type GroupViewItemsPaginationProps = {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const GroupViewItemsPagination = ({page, setPage, totalPages}: GroupViewItemsPaginationProps) => {
  const totalPageToShow = totalPages > 0 ? totalPages : 1;

  const upDisabled = page === 0;
  const downDisabled = page === totalPageToShow - 1;

  const onUpClick = (): void => {
    if (!upDisabled) {
      setPage(page - 1);
    }
  };

  const onDownClick = (): void => {
    if (!downDisabled) {
      setPage(page + 1);
    }
  };

  return (
    <FHStack smallSpace alignItems="center">
      <IconButton p="1" icon={<ArrowUpIcon />} onPress={onUpClick} isDisabled={upDisabled} />
      <Text fontWeight="bold">
        {page + 1} / {totalPageToShow}
      </Text>
      <IconButton p="1" icon={<ArrowDownIcon />} onPress={onDownClick} isDisabled={downDisabled} />
    </FHStack>
  );
};

export default GroupViewItemsPagination;
