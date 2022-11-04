import {SAME_DATE_TIMEOUT} from '../../constants';

export class FilterUtils {
  public static uniqueFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((v) => v === value) === i;
  };

  public static uniqueByKeyFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((v) => v[0] === value[0]) === i;
  };

  public static uniqueByIdFilter = (value: any, i: number, arr: any[]): boolean => {
    return !value.id || arr.findIndex((v) => v.id === value.id) === i;
  };

  public static uniqueByIdOrUserIdAndTextAndDateFilter = (value: any, i: number, arr: any[]): boolean => {
    const idsEqual = (value: any, t: any): boolean => {
      return t.id === value.id;
    };
    const userIdAndTextAndDateEqual = (value: any, t: any): boolean => {
      return (
        t.userId === value.userId &&
        t.text === value.text &&
        Math.abs(t.createdAt - value.createdAt) < SAME_DATE_TIMEOUT
      );
    };
    const findIndexWithId = (value: any): number => {
      return arr.findIndex((t) => t.id && userIdAndTextAndDateEqual(value, t));
    };
    const valuesEqual = (value: any, t: any): boolean => {
      if (value.id) {
        return idsEqual(value, t);
      } else {
        const indexWithId = findIndexWithId(value);
        return indexWithId >= 0 ? t.id === arr[indexWithId].id : userIdAndTextAndDateEqual(value, t);
      }
    };
    return arr.findIndex((t) => valuesEqual(value, t)) === i;
  };

  public static uniqueByIdOrTypeAndDateFilter = (value: any, i: number, arr: any[]): boolean => {
    const idsEqual = (value: any, t: any): boolean => {
      return t.id === value.id;
    };
    const typeAndDateEqual = (value: any, t: any): boolean => {
      return t.type === value.type && Math.abs(t.date - value.date) < 1000;
    };
    const findIndexWithId = (value: any): number => {
      return arr.findIndex((t) => t.id && typeAndDateEqual(value, t));
    };
    const valuesEqual = (value: any, t: any): boolean => {
      if (value.id) {
        return idsEqual(value, t);
      } else {
        const indexWithId = findIndexWithId(value);
        return indexWithId >= 0 ? t.id === arr[indexWithId].id : typeAndDateEqual(value, t);
      }
    };
    return arr.findIndex((t) => valuesEqual(value, t)) === i;
  };

  public static uniqueByUserIdFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t.userId === value.userId) === i;
  };

  public static uniqueBySecondUserIdFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t.secondUserId === value.secondUserId) === i;
  };

  public static uniqueByRequesterIdFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t.requesterId === value.requesterId) === i;
  };

  public static uniqueByRecipientIdFilter = (value: any, i: number, arr: any[]): boolean => {
    return arr.findIndex((t) => t.recipientId === value.recipientId) === i;
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
