import React from 'react';
import {Text} from 'native-base';
import {User} from '../../models/User';
import UrlPic from '../surfaces/UrlPic';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';
import PaperBox from '../surfaces/PaperBox';
import FHStack from '../boxes/FHStack';

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
    <FHStack smallSpace alignItems="center">
      {withUserPic && (
        <UrlPic file={user.imageFilename} size={picSize} border={1} invertedBorder={withInvertedBorder} />
      )}
      {withUsername && <Text fontSize="xs">{user.username}</Text>}
    </FHStack>
  );

  return withPaperBox ? <PaperBox>{imageWithUsername}</PaperBox> : imageWithUsername;
};

export default UserView;
