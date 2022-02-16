export class ArrayUtils {
  public static deleteItem = (array: any[], item: any): void => {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
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
