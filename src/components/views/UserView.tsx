import React from 'react';
import {Text} from 'native-base';
import {User} from '../../models/User';
import UrlPic from '../surfaces/UrlPic';
import {ISizes} from 'native-base/lib/typescript/theme/base/sizes';
import PaperBox from '../surfaces/PaperBox';
import FHStack from '../boxes/FHStack';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProps} from '../../navigators/ProtectedNavigator';
import PressableButton from '../controls/PressableButton';
import {ColorScheme} from '../../shared/themes/ThemeFactory';
import {useTranslation} from 'react-i18next';
import {UserUtils} from '../../shared/utils/UserUtils';

type UserViewProps = {
  user: User;
  picSize?: ISizes | number | string;
  colorScheme?: ColorScheme;
  withUserPic?: boolean;
  withUsername?: boolean;
  withPaperBox?: boolean;
  withInvertedBorder?: boolean;
  onPressCallBack?: () => void;
};

export const UserView = (props: UserViewProps) => {
  const {user, picSize = 'xs', colorScheme} = props;
  const {withUserPic = true, withUsername, withPaperBox, withInvertedBorder, onPressCallBack} = props;
  const navigation = useNavigation<ProtectedNavigationProps>();
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const isAnotherUser = account.id !== user?.id;
  const isNotDeleted = !user?.deleted;

  const goToUser = (): void => {
    onPressCallBack?.();
    navigation.navigate('UserView', {user});
  };

  let result = (
    <FHStack space="2" alignItems="center">
      {withUserPic && (
        <UrlPic
          file={user?.imageFilename}
          size={picSize}
          colorScheme={colorScheme}
          border={1}
          invertedBorder={withInvertedBorder}
        />
      )}
      {withUsername && <Text>{UserUtils.getUsername(user, t)}</Text>}
    </FHStack>
  );

  result = withPaperBox ? <PaperBox>{result}</PaperBox> : result;
  result = isAnotherUser && isNotDeleted ? <PressableButton onPress={goToUser}>{result}</PressableButton> : result;

  return result;
};

export default UserView;
