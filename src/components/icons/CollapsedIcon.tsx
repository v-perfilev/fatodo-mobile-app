import React from 'react';
import {IIconProps, PresenceTransition} from 'native-base';
import ArrowDownIcon from './ArrowDownIcon';

type CollapsedIconProps = IIconProps & {
  hidden: boolean;
};

const CollapsedIcon = ({hidden, ...props}: CollapsedIconProps) => {
  const initial = {
    rotate: '180deg',
  };

  const animate = {
    rotate: '360deg',
    transition: {
      duration: 300,
    },
  };

  return (
    <PresenceTransition visible={!hidden} initial={initial} animate={animate}>
      <ArrowDownIcon {...props} />
    </PresenceTransition>
  );
};

export default CollapsedIcon;
