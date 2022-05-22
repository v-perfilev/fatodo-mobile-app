export class MapUtils {
  public static setValue = (map: Map<string, any>, id: string, value: any): Map<string, any> => {
    map.set(id, value);
    return new Map(map);
  };

  public static setValues = (map: Map<string, any>, ids: string[], value: any): Map<string, any> => {
    ids.forEach((id) => map.set(id, value));
    return new Map(map);
  };

  public static setValuesFunc = (map: Map<string, any>, ids: string[], func: (id: string) => any): Map<string, any> => {
    ids.forEach((id) => map.set(id, func(id)));
    return new Map(map);
  };

  public static setAllValues = (map: Map<string, any>, value: any): Map<string, any> => {
    Array.from(map.keys()).forEach((id) => map.set(id, value));
    return new Map(map);
  };

  public static deleteValue = (map: Map<string, any>, id: string): Map<string, any> => {
    map.delete(id);
    return new Map(map);
  };
}
