import React from 'react';
import {Text} from 'native-base';
import {User} from '../../models/User';
import UrlPic from '../surfaces/UrlPic';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';
import PaperBox from '../surfaces/PaperBox';
import FHStack from '../surfaces/FHStack';

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
    <FHStack space="1" alignItems="center">
      {withUserPic && (
        <UrlPic file={user.imageFilename} size={picSize} border={1} invertedBorder={withInvertedBorder} />
      )}
      {withUsername && <Text fontSize="12">{user.username}</Text>}
    </FHStack>
  );

  return withPaperBox ? <PaperBox>{imageWithUsername}</PaperBox> : imageWithUsername;
};

export default UserView;
