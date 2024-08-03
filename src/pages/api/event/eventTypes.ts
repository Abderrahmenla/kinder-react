export enum EventGroup {
  User = 'User'
}

export enum EventType {
  UserLogin = 'UserLogin',
  RenewSession = 'RenewSession'
}

export type Event = {
  Username: string;
  UserId: string;
  Timestamp: string;
};

export type EventLog = {
  MessageId: string;
  EventGroup: EventGroup;
  EventType: EventType;
  Event: Event;
};
