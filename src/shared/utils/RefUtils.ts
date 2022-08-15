import {MutableRefObject} from 'react';
import {FilterUtils} from './FilterUtils';

export class RefUtils {
  public static merge = (...refs: MutableRefObject<any>[]): ((node: any) => void) => {
    return (node): void =>
      refs
        .filter(FilterUtils.notUndefinedFilter)
        .filter(FilterUtils.notNullFilter)
        .forEach((ref) => (ref.current = node));
  };
}
