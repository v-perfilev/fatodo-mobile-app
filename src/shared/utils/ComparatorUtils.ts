export class ComparatorUtils {
  public static dateComparator = (a: any, b: any): number => {
    return a.date > b.date ? 1 : -1;
  };

  public static createdAtComparator = (a: any, b: any): number => {
    return a.createdAt > b.createdAt ? 1 : -1;
  };

  public static createdAtInvertedComparator = (a: any, b: any): number => {
    return a.createdAt < b.createdAt ? 1 : -1;
  };

  public static itemsComparator = (a: any, b: any): number => {
    if (a.priority === b.priority) {
      return a.createdAt < b.createdAt ? 1 : -1;
    }
    return a.priority < b.priority ? 1 : -1;
  };
}
