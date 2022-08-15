import {MutableRefObject} from 'react';

export class RefUtils {
  public static merge = (...refs: MutableRefObject<any>[]): ((node: any) => void) => {
    return (node): void => refs.forEach((ref) => (ref.current = node));
  };
}
