export class ComparatorUtils {
  public static dateComparator = (a: any, b: any): number => {
    return a.date > b.date ? 1 : -1;
  };

  public static createdAtComparator = (a: any, b: any): number => {
    return a.createdAt > b.createdAt ? 1 : -1;
  };

  public static createdAtDescComparator = (a: any, b: any): number => {
    return a.createdAt < b.createdAt ? 1 : -1;
  };
}
