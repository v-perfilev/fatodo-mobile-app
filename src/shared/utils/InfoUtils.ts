import {AxiosPromise} from 'axios';
import {FilterUtils} from './FilterUtils';

type WithId = {id: string};

export class InfoUtils {
  public static extractIdsToLoad = (ids: string[], entries: [string, any][], loadingIds: string[]): string[] => {
    const existingIds = entries.map(([key, _]) => key);
    const notAllowedIds = [...existingIds, ...loadingIds];
    return ids
      .filter(FilterUtils.notUndefinedFilter)
      .filter(FilterUtils.notNullFilter)
      .filter(FilterUtils.uniqueFilter)
      .filter((id) => !notAllowedIds.includes(id));
  };

  public static fetchByIds = async (
    ids: string[],
    loadingFunc: (ids: string[]) => AxiosPromise<any[]>,
  ): Promise<any[]> => {
    let result: any[] = [];
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
    const newIds = newValues.map((value) => value.id);
    const updatedValues = stateValues.filter(([key, _]) => newIds.includes(key));
    newValues.forEach((value) => updatedValues.push([value.id, value]));
    return updatedValues;
  };

  public static prepareFinishedLoadingIds = (loadingIds: string[], newIds: string[]): string[] => {
    return loadingIds.filter((id) => !newIds.includes(id));
  };
}
