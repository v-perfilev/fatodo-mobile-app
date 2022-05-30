import {ContactRelation} from '../../models/ContactRelation';
import {ContactRequest} from '../../models/ContactRequest';

export class ContactUtils {
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
