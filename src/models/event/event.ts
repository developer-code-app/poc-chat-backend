abstract class Event {
  readonly id: number;
  readonly owner: Owner;
  readonly createdAt: Date;

  constructor(id: number, owner: Owner, createdAt: Date) {
    this.id = id;
    this.owner = owner;
    this.createdAt = createdAt;
  }
}

class Owner {
  readonly rueJaiUserId: number;
  readonly rueJaiUserType: string;

  constructor(rueJaiUserId: number, rueJaiUserType: string) {
    this.rueJaiUserId = rueJaiUserId;
    this.rueJaiUserType = rueJaiUserType;
  }
}

export { Event, Owner };
