import React, {memo} from 'react';
import {ColorScheme, LINEAR_GRADIENT} from '../../shared/themes/ThemeFactory';
import FBox from '../boxes/FBox';
import {IBoxProps} from 'native-base';
import withThemeProvider from '../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';

type ThemeViewProps = IBoxProps & {
  color: ColorScheme;
};

export const ThemeView = (props: ThemeViewProps) => {
  return <FBox {...props} bg={LINEAR_GRADIENT} />;
};

export default flowRight([withThemeProvider, memo])(ThemeView);
