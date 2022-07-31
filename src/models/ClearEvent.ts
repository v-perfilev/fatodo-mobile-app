type ClearEventType = 'GROUP' | 'ITEM' | 'CONTACT' | 'INCOMING_REQUEST' | 'OUTCOMING_REQUEST' | 'CHAT';

export interface ClearEvent {
  type: ClearEventType;
  id: string;
}
