import React, {ComponentType, useState} from 'react';
import CentredSpinner from '../../components/surfaces/CentredSpinner';

export type WithSpinnerRendererProps = {
  hideSpinner: () => void;
};

const withSpinnerRenderer = (Component: ComponentType<WithSpinnerRendererProps>) => (props: any) => {
  const [loading, setLoading] = useState<boolean>(true);

  const hideSpinner = (): void => {
    setLoading(false);
  };

  return (
    <>
      {/*<Text>Test</Text>*/}
      {loading && <CentredSpinner />}
      <>
        <Component hideSpinner={hideSpinner} {...props} />
      </>
    </>
  );
};

export default withSpinnerRenderer;
