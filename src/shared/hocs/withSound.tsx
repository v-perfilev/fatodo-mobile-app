import React, {ComponentType, memo, useCallback, useMemo} from 'react';
import {flowRight} from 'lodash';
import {SoundContext} from '../contexts/SoundContext';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');
const ding = new Sound('ding.mp3', Sound.MAIN_BUNDLE);

const withSound = (Component: ComponentType) => (props: any) => {
  const playDing = useCallback(() => {
    ding.play();
  }, []);

  const value = useMemo(
    () => ({
      playDing,
    }),
    [],
  );

  return (
    <SoundContext.Provider value={value}>
      <Component {...props} />
    </SoundContext.Provider>
  );
};

export default flowRight([memo, withSound]);
