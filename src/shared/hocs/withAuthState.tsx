import * as React from 'react';
import {ComponentType, FC, PropsWithChildren, ReactElement, useMemo} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {flowRight} from 'lodash';
import {RootState} from '../../store';
import {AuthState} from '../../store/rerducers/AuthReducer';
import {UserAccount} from '../../models/User';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = PropsWithChildren<ConnectedProps<typeof connector>>;

const withAuthState =
  (Component: ComponentType<AuthState>): FC<any> =>
  (props: Props): ReactElement => {
    const {authState, ...propsWithoutAuthState} = props;

    const isAuthenticated = useMemo<boolean>(() => authState.isAuthenticated, [authState.isAuthenticated]);
    const account = useMemo<UserAccount>(() => authState.account, [authState.account]);

    return <Component {...propsWithoutAuthState} isAuthenticated={isAuthenticated} account={account} />;
  };

export default flowRight([connector, withAuthState]);
