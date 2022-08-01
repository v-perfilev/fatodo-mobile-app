type WithId = {id: string};
type WithUserId = {userId: string};
type WithIdAndUserIdAndText = {id: string; userId: string; text: string};

export class ArrayUtils {
  public static findValueById = (array: WithId[], id: string): any => {
    return array.find((i) => i.id === id);
  };

  public static findValueWithId = (array: WithId[], value: WithId): any => {
    return array.find((i) => i.id === value.id);
  };

  public static findValueWithUserIdAndText = (array: WithIdAndUserIdAndText[], value: WithIdAndUserIdAndText): any => {
    return array.find((m) => !m.id && m.userId === value.userId && m.text === value.text);
  };

  public static addValueToEnd = (array: any[], value: any): any[] => [...array, value];

  public static replaceValue = (array: any[], value: any, newValue: any): any[] => {
    const arrayCopy = [...array];
    const index = arrayCopy.indexOf(value);
    arrayCopy[index] = newValue;
    return arrayCopy;
  };

  public static updateValueWithId = (array: WithId[], value: WithId): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.id === value.id);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy[index] = value;
    }
    return arrayCopy;
  };

  public static updateValueWithUserId = (array: WithUserId[], value: WithUserId): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.userId === value.userId);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy[index] = value;
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

  public static deleteValueWithId = (array: WithId[], value: WithId): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.id === value.id);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static deleteValueByIndex = (array: any[], index: number): any[] => {
    const arrayCopy = [...array];
    if (index >= 0) {
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };
}
