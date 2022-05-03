import * as React from 'react';
import {ComponentType, useState} from 'react';
import {useSnackContext} from '../../contexts/SnackContext';
import {Group} from '../../../models/Group';
import ItemService from '../../../services/ItemService';
import {ResponseUtils} from '../../utils/ResponseUtils';
import {GroupViewContext} from '../../contexts/viewContexts/groupViewContext';

const withGroupView = (Component: ComponentType) => (props: any) => {
  const {handleResponse} = useSnackContext();
  const [group, setGroup] = useState<Group>();
  const [loading, setLoading] = useState<boolean>(false);

  const load = (groupId: string, notFoundAction?: () => void, failedAction?: () => void): void => {
    setLoading(true);
    ItemService.getGroup(groupId)
      .then((response) => {
        setGroup(response.data);
      })
      .catch(({response}) => {
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

  const context = {group, setGroup, load, loading};

  return (
    <GroupViewContext.Provider value={context}>
      <Component {...props} />
    </GroupViewContext.Provider>
  );
};

export default withGroupView;
