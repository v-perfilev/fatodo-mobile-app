import {ArrayUtils} from './ArrayUtils';
import {AxiosPromise} from 'axios';

type WithId = {id: string};

export class InfoUtils {
  public static extractIdsToLoad = <T>(ids: string[], map: [string, T][], loadingIds: string[]): string[] => {
    const existingIds = Array.from(map.keys());
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

  public static prepareFulfilledContent = <T extends WithId>(
    stateValues: [string, T][],
    newValues: T[],
  ): [string, T][] => {
    const stateMap = new Map(stateValues);
    const newMap = new Map(newValues.map((v) => [v.id, v]));
    let newKeys = Array.from(newMap.keys()).filter((k) => !stateMap.has(k));
    newKeys.map((k) => stateMap.set(k, newMap.get(k)));
    return [...stateMap];
  };

  public static prepareFinishedLoadingIds = (loadingIds: string[], newIds: string[]): string[] => {
    return loadingIds.filter((id) => !newIds.includes(id));
  };
}
