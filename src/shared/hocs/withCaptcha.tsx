import * as React from 'react';
import {ComponentType, FC, ReactElement, useRef, useState} from 'react';
import Recaptcha from 'react-native-recaptcha-that-works';
import {BASE_URL, RECAPTCHA_KEY} from '../../constants';
import {StyleSheet, View} from 'react-native';

export type CaptchaProps = {
  captchaToken: string;
  requestCaptchaToken: () => void;
};

const withCaptcha =
  (Component: ComponentType<CaptchaProps>): FC =>
  (props): ReactElement => {
    const recaptcha = useRef<any>();
    const [token, setToken] = useState<string>('');

    const requestToken = (): void => {
      setToken('');
      recaptcha.current.open();
    };

    const handleVerify = (t: string): void => setToken(t);
    const handleError = (): void => setToken('error');

    return (
      <>
        <Recaptcha
          ref={recaptcha}
          theme="light"
          style={styles.loader}
          loadingComponent={<View />}
          siteKey={RECAPTCHA_KEY}
          baseUrl={BASE_URL}
          onVerify={handleVerify}
          onError={handleError}
          size="invisible"
        />
        <Component {...props} captchaToken={token} requestCaptchaToken={requestToken} />
      </>
    );
  };

const styles = StyleSheet.create({
  loader: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default withCaptcha;
