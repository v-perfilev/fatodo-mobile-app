export interface ContactInfo {
  relationCount: number;
  outcomingRequestCount: number;
  incomingRequestCount: number;
}

export interface ContactRelation {
  id: string;
  firstUserId: string;
  secondUserId: string;
}

export interface ContactRequest {
  id: string;
  requesterId: string;
  recipientId: string;
  message: string;
}
