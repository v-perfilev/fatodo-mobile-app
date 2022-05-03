import React from 'react';
import {Box, HStack, Text} from 'native-base';
import {User} from '../../models/User';
import UrlPic from '../surfaces/UrlPic';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';
import PaperBox from '../surfaces/PaperBox';

type UserViewProps = {
  user: User;
  picSize?: ISizes;
  withUserPic?: boolean;
  withUsername?: boolean;
  withPaperBox?: boolean;
  withInvertedBorder?: boolean;
};

export const UserView = (props: UserViewProps) => {
  const {user, picSize = 'xs'} = props;
  const {withUserPic = true, withUsername = false, withPaperBox = false, withInvertedBorder = false} = props;

  const imageWithUsername = (
    <HStack alignItems="center">
      {withUserPic && <UrlPic url={user.imageFilename} size={picSize} border={1} invertedBorder={withInvertedBorder} />}
      {withUserPic && withUsername && <Box m="0.5" />}
      {withUsername && <Text fontSize="12">{user.username}</Text>}
    </HStack>
  );

  return withPaperBox ? <PaperBox>{imageWithUsername}</PaperBox> : imageWithUsername;
};

export default UserView;
