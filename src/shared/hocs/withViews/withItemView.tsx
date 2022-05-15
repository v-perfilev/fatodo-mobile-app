import * as React from 'react';
import {ComponentType, useState} from 'react';
import {useSnackContext} from '../../contexts/SnackContext';
import {Item} from '../../../models/Item';
import ItemService from '../../../services/ItemService';
import {ResponseUtils} from '../../utils/ResponseUtils';
import {ItemViewContext} from '../../contexts/viewContexts/itemViewContext';
import {AxiosError} from 'axios';

const withItemView = (Component: ComponentType) => (props: any) => {
  const {handleResponse} = useSnackContext();
  const [item, setItem] = useState<Item>();
  const [loading, setLoading] = useState<boolean>(false);

  const load = (itemId: string, failedAction?: () => void, notFoundAction?: () => void): void => {
    setLoading(true);
    ItemService.getItem(itemId)
      .then((response) => {
        setItem(response.data);
      })
      .catch(({response}: AxiosError) => {
        const status = ResponseUtils.getStatus(response);
        if (status === 404 && notFoundAction) {
          notFoundAction();
        }
        handleResponse(response);
        if (failedAction) {
          failedAction();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const context = {item, setItem, load, loading};

  return (
    <ItemViewContext.Provider value={context}>
      <Component {...props} />
    </ItemViewContext.Provider>
  );
};

export default withItemView;
