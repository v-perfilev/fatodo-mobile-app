import React from 'react';
import IconButton from '../controls/IconButton';
import {Share, ShareContent} from 'react-native';
import ShareIcon from '../icons/ShareIcon';

type ShareButtonProps = {
  content: ShareContent;
};

const ShareButton = ({content}: ShareButtonProps) => {
  const share = (): void => {
    Share.share(content).finally();
  };

  return <IconButton icon={<ShareIcon />} onPress={share} />;
};

export default ShareButton;
