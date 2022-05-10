import * as React from 'react';
import {ComponentType, ReactElement} from 'react';
import {SnackContext, SnackState} from '../../contexts/SnackContext';

const withSnackContext = (Component: ComponentType<SnackState>) => (props: any) => {
  return <SnackContext.Consumer>{(value): ReactElement => <Component {...props} {...value} />}</SnackContext.Consumer>;
};

export default withSnackContext;
