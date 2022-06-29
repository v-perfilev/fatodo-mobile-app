import {ContactRelation} from '../../models/ContactRelation';
import {ContactRequest} from '../../models/ContactRequest';
import {User} from '../../models/User';

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

  public static createStubRequest = (recipientId: string): ContactRequest => ({
    id: undefined,
    requesterId: undefined,
    recipientId,
    message: undefined,
  });
}
