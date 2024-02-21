// db.ts
import Dexie, { Table } from "dexie";

export interface Partner {
  id?: number;
  name: string;
}

export class MySubClassedDexie extends Dexie {
  partners!: Table<Partner>;

  constructor() {
    super("rghm");
    this.version(1).stores({
      partners: "++id, name",
    });
  }
}

export const db = new MySubClassedDexie();
