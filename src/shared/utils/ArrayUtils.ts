export class ArrayUtils {
  public static addValueToStart = (array: any[], value: any): any[] => [value, ...array];

  public static addValueToEnd = (array: any[], value: any): any[] => [...array, value];

  public static addValuesToEnd = (array: any[], values: any[]): any[] => [...array, ...values];

  public static updateValue = (array: any[], value: any): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.id === value.id);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy[index] = value;
    }
    return [...arrayCopy];
  };

  public static deleteValueById = (array: any[], id: string): any[] => {
    const arrayCopy = [...array];
    return arrayCopy.filter((a) => a.id !== id);
  };

  public static deleteValueByIndex = (array: any[], index: number): any[] => {
    const arrayCopy = [...array];
    if (index >= 0) {
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static deleteValue = (array: any[], value: any): any[] => {
    const arrayCopy = [...array];
    const index = arrayCopy.indexOf(value);
    if (index >= 0) {
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static createdAtComparator = (a: any, b: any): number => {
    return a.createdAt > b.createdAt ? 1 : -1;
  };

  public static createdAtDescComparator = (a: any, b: any): number => {
    return a.createdAt < b.createdAt ? 1 : -1;
  };

  public static uniqueFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t === value) === i;
  };

  public static uniqueByIdFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t.id === value.id) === i;
  };

  public static notUndefinedFilter = (value: any): boolean => {
    return value !== undefined;
  };

  public static withIdFilter = (value: any): boolean => {
    return value.id !== undefined && value.id !== null;
  };
}
