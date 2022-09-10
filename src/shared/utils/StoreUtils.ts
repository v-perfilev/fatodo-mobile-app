export class StoreUtils {
  public static getValue = (store: [string, any][], requestedKey: string, defaultValue: any): any => {
    if (!requestedKey) {
      return undefined;
    }
    const entry = store.find(([key, _]) => key === requestedKey);
    return entry ? entry[1] : defaultValue;
  };

  public static getMultipleValues = (store: [string, any][], requestedKeys: string[]): any => {
    if (!requestedKeys) {
      return [];
    }
    return store.filter(([key, _]) => requestedKeys.includes(key)).map(([_, value]) => value);
  };

  public static reduceBoolean = (store: [string, boolean][]): any => {
    return store.length > 0 ? store.map((s) => s[1]).reduce((acc, val) => acc && val, true) : false;
  };

  static setValue(store: [string, any][], requestedKey: string, value: any): [string, any][] {
    const entry: [string, any] = [requestedKey, value];
    const index = store.findIndex(([key, _]) => key === requestedKey);
    index >= 0 ? (store[index] = entry) : store.push(entry);
    return store;
  }

  static setMultipleValues(store: [string, any][], requestedKeys: string[], value: any): [string, any][] {
    const updatedStore = store.filter(([key, _]) => !requestedKeys.includes(key));
    requestedKeys.forEach((key) => updatedStore.push([key, value]));
    return updatedStore;
  }

  static setMultipleValuesFunc(
    store: [string, any][],
    requestedKeys: string[],
    func: (key: string) => any,
  ): [string, any][] {
    const updatedStore = store.filter(([key, _]) => !requestedKeys.includes(key));
    requestedKeys.forEach((key) => updatedStore.push([key, func(key)]));
    return updatedStore;
  }

  static setAllValues(store: [string, any][], value: any): [string, any][] {
    return store.map(([key, _]) => [key, value]);
  }

  static deleteValue(store: [string, any][], requestedKey: any): [string, any][] {
    return store.filter(([key, _]) => key !== requestedKey);
  }
}
