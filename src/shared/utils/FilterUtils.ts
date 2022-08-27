export class FilterUtils {
  public static uniqueFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t === value) === i;
  };

  public static uniqueByIdFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t.id === value.id) === i;
  };

  public static uniqueByUserIdFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t.userId === value.userId) === i;
  };

  public static notUndefinedFilter = (value: any): boolean => {
    return value !== undefined;
  };

  public static notNullFilter = (value: any): boolean => {
    return value !== null;
  };

  public static withIdFilter = (value: any): boolean => {
    return value.id !== undefined && value.id !== null;
  };
}
