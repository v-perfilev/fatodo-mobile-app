export class ArrayUtils {
  public static addItem = (array: any[], item: any): any[] => {
    const arrayCopy = [...array];
    arrayCopy.push(item);
    return arrayCopy;
  };

  public static deleteItemByIndex = (array: any[], index: number): any[] => {
    const arrayCopy = [...array];
    if (index >= 0) {
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static deleteItem = (array: any[], item: any): any[] => {
    const arrayCopy = [...array];
    const index = arrayCopy.indexOf(item);
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

  public static uniqueFilter = (item: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t === item) === i;
  };

  public static uniqueByIdFilter = (item: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t.id === item.id) === i;
  };

  public static withIdFilter = (item: any): boolean => {
    return item.id !== undefined && item.id !== null;
  };
}
