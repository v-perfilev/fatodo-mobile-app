import React, {ComponentType, memo, useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import VersionCheck from 'react-native-version-check';
import StartupModalBase from '../../components/startupModals/StartupModalBase';
import StartupModalVersion from '../../components/startupModals/StartupModalVersion';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';

const withStartupModalDisplay = (Component: ComponentType) => (props: any) => {
  const appStatus = useAppSelector(AuthSelectors.appStatus);
  const [show, setShow] = useState<boolean>(false);
  const [storeUrl, setStoreUrl] = useState<string>();

  const close = (): void => setShow(false);

  useEffect(() => {
    VersionCheck.needUpdate().then((res) => {
      res.isNeeded && setStoreUrl(res.storeUrl);
    });
  }, []);

  useEffect(() => {
    appStatus === 'READY' && storeUrl && setShow(true);
  }, [appStatus, storeUrl]);

  return (
    <>
      <StartupModalBase show={show}>
        {storeUrl && <StartupModalVersion storeUrl={storeUrl} close={close} />}
      </StartupModalBase>
      <Component {...props} />
    </>
  );
};

export default flowRight([memo, withStartupModalDisplay]);
