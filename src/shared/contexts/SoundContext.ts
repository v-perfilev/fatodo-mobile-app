import React, {useContext} from 'react';

export interface SoundState {
  playDing: () => void;
}

export const SoundContext = React.createContext<SoundState>({} as SoundState);
export const useSoundContext = (): SoundState => useContext(SoundContext);
