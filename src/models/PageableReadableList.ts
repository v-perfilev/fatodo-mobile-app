export interface PageableReadableList<T> {
  data: T[];
  count: number;
  unread: number;
}
