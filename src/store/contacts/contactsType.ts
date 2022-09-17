import {ContactRelation, ContactRequest} from '../../models/Contact';

export type ContactsState = {
  relationCount: number;
  outcomingRequestCount: number;
  incomingRequestCount: number;
  relations: ContactRelation[];
  outcomingRequests: ContactRequest[];
  incomingRequests: ContactRequest[];
};
