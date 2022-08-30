export class MapUtils {
  public static get = <T>(map: Map<string, T>, ids: string[]): T[] => {
    return ids ? ids.filter((id) => map.has(id)).map((id) => map.get(id)) : undefined;
  };

  public static getValue = (e: [string, any][], id: string): any => {
    const map = new Map(e);
    return map.get(id);
  };

  public static setValue = (e: [string, any][], id: string, value: any): [string, any][] => {
    const map = new Map(e);
    map.set(id, value);
    return [...map];
  };

  public static setValues = (e: [string, any][], ids: string[], value: any): [string, any][] => {
    const map = new Map(e);
    ids.forEach((id) => map.set(id, value));
    return [...map];
  };

  public static setValuesFunc = (e: [string, any][], ids: string[], func: (id: string) => any): [string, any][] => {
    const map = new Map(e);
    ids.forEach((id) => map.set(id, func(id)));
    return [...map];
  };

  public static setAllValues = (e: [string, any][], value: any): [string, any][] => {
    const map = new Map(e);
    Array.from(map.keys()).forEach((id) => map.set(id, value));
    return [...map];
  };

  public static deleteValue = (e: [string, any][], id: string): [string, any][] => {
    const map = new Map(e);
    map.delete(id);
    return [...map];
  };
}
