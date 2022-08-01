import {User} from '../../models/User';
import {ContactRelation, ContactRequest} from '../../models/Contact';

export class ContactUtils {
  public static isContact = (user: User, relations: ContactRelation[]): boolean => {
    const relation = relations.find((r) => r.secondUserId === user.id);
    return !!relation;
  };

  public static isOutcomingRequest = (user: User, requests: ContactRequest[]): boolean => {
    const request = requests.find((r) => r.recipientId === user.id);
    return !!request;
  };

  public static isIncomingRequest = (user: User, requests: ContactRequest[]): boolean => {
    const request = requests.find((r) => r.requesterId === user.id);
    return !!request;
  };

  public static createStubRelation = (secondUserId: string): ContactRelation => ({
    id: undefined,
    firstUserId: undefined,
    secondUserId,
  });

  public static createStubIncomingRequest = (requesterId: string): ContactRequest => ({
    id: undefined,
    requesterId,
    recipientId: undefined,
    message: undefined,
  });

  public static createStubOutcomingRequest = (recipientId: string): ContactRequest => ({
    id: undefined,
    requesterId: undefined,
    recipientId,
    message: undefined,
  });
}
