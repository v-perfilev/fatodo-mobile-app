import React, {FC} from 'react';
import {Text} from 'native-base';
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

export const UserView: FC<UserViewProps> = (props) => {
  const {user, picSize = 'xs'} = props;
  const {withUserPic = true, withUsername = false, withPaperBox = false, withInvertedBorder = false} = props;

  const imageWithUsername = (
    <>
      {withUserPic && <UrlPic url={user.imageFilename} size={picSize} border={1} invertedBorder={withInvertedBorder} />}
      {/*{withUserPic && withUsername && <Emp />}*/}
      {withUsername && <Text>{user.username}</Text>}
    </>
  );

  return withPaperBox ? <PaperBox>{imageWithUsername}</PaperBox> : imageWithUsername;
};

export default UserView;
