declare module "linked-list" {
  class ListItem {
    value: number; // extension
    prev: ListItem | null;
    next: ListItem | null;

    append(item: ListItem): void;
    detach(): void;
  }

  class LinkedList {
    constructor(...items: Array<ListItem>);

    static from(items: Array<ListItem>): LinkedList;

    static Item: typeof ListItem;

    head: ListItem | null;
    tail: ListItem | null;
  }

  export = LinkedList;
}
