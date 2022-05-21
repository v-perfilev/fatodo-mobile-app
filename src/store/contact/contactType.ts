import {ContactRelation} from '../../models/ContactRelation';
import {ContactRequest} from '../../models/ContactRequest';

export type ContactState = {
  relationCount: number;
  outcomingRequestCount: number;
  incomingRequestCount: number;
  relations: ContactRelation[];
  outcomingRequests: ContactRequest[];
  incomingRequests: ContactRequest[];
  loading: boolean;
};
