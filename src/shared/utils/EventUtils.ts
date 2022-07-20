import {ArrayUtils} from './ArrayUtils';

export class EventUtils {
  public static filterEvents = (event: Event[]): Event[] => {
    return event.filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtComparator).reverse();
  };
}
