import React from 'react';
import {IIconProps, PresenceTransition} from 'native-base';
import ArrowDownIcon from './ArrowDownIcon';

type CollapsedIconProps = IIconProps & {
  visible: boolean;
};

const CollapsedIcon = ({visible, ...props}: CollapsedIconProps) => {
  const initial = {
    rotate: '0deg',
  };

  const animate = {
    rotate: '180deg',
    transition: {
      duration: 300,
    },
  };

  return (
    <PresenceTransition visible={visible} initial={initial} animate={animate}>
      <ArrowDownIcon {...props} />
    </PresenceTransition>
  );
};

export default CollapsedIcon;
