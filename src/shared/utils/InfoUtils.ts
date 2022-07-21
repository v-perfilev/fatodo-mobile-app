import {ArrayUtils} from './ArrayUtils';
import {AxiosPromise} from 'axios';

type WithId = {id: string};

export class InfoUtils {
  public static extractIdsToLoad = (ids: string[], array: WithId[], loadingIds: string[]): string[] => {
    const existingIds = array.map((v) => v.id);
    const notAllowedIds = [...existingIds, ...loadingIds];
    return ids
      .filter(ArrayUtils.notUndefinedFilter)
      .filter(ArrayUtils.uniqueFilter)
      .filter((id) => !notAllowedIds.includes(id));
  };

  public static fetchIds = async <T>(
    ids: string[],
    loadingFunc: (ids: string[]) => AxiosPromise<T[]>,
  ): Promise<T[]> => {
    let result: T[] = [];
    if (ids.length > 0) {
      const response = await loadingFunc(ids);
      result = response.data;
    }
    return result;
  };

  public static preparePendingLoadingIds = (loadingIds: string[], newIds: string[]): string[] => {
    return [...loadingIds, ...newIds];
  };

  public static prepareFulfilledContent = <T extends WithId>(stateValues: T[], newValues: T[]): T[] => {
    return [...stateValues, ...newValues].filter(ArrayUtils.uniqueByIdFilter);
  };

  public static prepareFinishedLoadingIds = (loadingIds: string[], newIds: string[]): string[] => {
    return loadingIds.filter((id) => !newIds.includes(id));
  };
}
