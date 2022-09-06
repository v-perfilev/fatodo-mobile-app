import React, {useEffect} from 'react';
import {createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView} from '@react-navigation/drawer';
import RootNavigator from './RootNavigator';
import {Divider} from 'native-base';
import withDrawer from '../shared/hocs/withDrawer';
import {useDrawerContext} from '../shared/contexts/DrawerContext';
import FVStack from '../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../store/store';
import AuthSelectors from '../store/auth/authSelectors';
import {AuthActions} from '../store/auth/authActions';
import {RootActions} from '../store/rootActions';
import UserFullView from '../components/views/UserFullView';
import OutlinedButton from '../components/controls/OutlinedButton';
import {useTranslation} from 'react-i18next';
import AccountForm from '../screens/account/accountForm/AccountForm';
import AccountChangePasswordForm from '../screens/account/accountChangePasswordForm/AccountChangePasswordForm';
import LanguageMenu from '../components/controls/LanguageMenu';
import {ListUtils} from '../shared/utils/ListUtils';
import GhostButton from '../components/controls/GhostButton';
import {ChangeLanguageDTO} from '../models/dto/ChangeLanguageDTO';

const Drawer = createDrawerNavigator();

const Sidebar = ({navigation}: DrawerContentComponentProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {setToggleDrawer} = useDrawerContext();
  const account = useAppSelector(AuthSelectors.account);

  const goToAccountForm = (): void => {
    navigation.navigate('AccountForm');
  };

  const goToAccountChangePasswordForm = (): void => {
    navigation.navigate('AccountChangePasswordForm');
  };

  const logout = (): void => {
    dispatch(AuthActions.logout());
    requestAnimationFrame(() => {
      dispatch(RootActions.resetState());
    });
  };

  const changeLanguage = (code: string): void => {
    const dto: ChangeLanguageDTO = {language: code};
    dispatch(AuthActions.changeLanguageThunk(dto));
  };

  useEffect(() => {
    setToggleDrawer(() => navigation.toggleDrawer);
  }, []);

  return (
    <DrawerContentScrollView contentContainerStyle={ListUtils.containerStyle()}>
      <FVStack grow mx="3" my="4" space="6" defaultSpace>
        <UserFullView user={account} account={account} />

        <Divider bg="secondary.500" />

        <FVStack flex="1" flexGrow="1" defaultSpace flexShrink="1">
          <GhostButton justifyContent="flex-start" onPress={goToAccountForm}>
            {t('routes.AccountForm')}
          </GhostButton>
          {account.provider === 'LOCAL' && (
            <GhostButton justifyContent="flex-start" onPress={goToAccountChangePasswordForm}>
              {t('routes.AccountChangePasswordForm')}
            </GhostButton>
          )}
        </FVStack>

        <LanguageMenu onChange={changeLanguage} />
        <OutlinedButton onPress={logout}>{t('account:actions.logout')}</OutlinedButton>
      </FVStack>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator screenOptions={{headerShown: false, drawerType: 'back'}} drawerContent={Sidebar}>
      <Drawer.Screen name="Default" component={RootNavigator} />
      <Drawer.Screen name="AccountForm" component={AccountForm} />
      <Drawer.Screen name="AccountChangePasswordForm" component={AccountChangePasswordForm} />
    </Drawer.Navigator>
  );
};

export default withDrawer(DrawerNavigator);
