import { EventsHandler } from "../domain/eventHandler";
import { MyEvents } from "./events";
import { items } from "./domain";

export default class PlayerStore {
  itemBeingShownId: string | undefined;
  isPlaying = false;

  constructor(private events: EventsHandler<MyEvents>) {}

  play = (itemId: string) => {
    const previousItem = this.itemBeingShownId;
    this.isPlaying = true;

    this.itemBeingShownId = itemId;
    if (previousItem) this.dispatchPlayEvent(previousItem);
    this.dispatchPlayEvent(itemId);
  };

  pause = () => {
    this.isPlaying = false;
    if (this.itemBeingShownId) this.dispatchPlayEvent(this.itemBeingShownId);
  };

  private dispatchPlayEvent = (itemId: string) =>
    this.events.dispatchCompundEvent(
      "item-play",
      itemId,
      items.getItem(itemId)
    );

  onItemPlay = (itemId: string, cb: ItemCallback) =>
    this.events.addCompoundEventListener("item-play", itemId, cb);

  isPlayingItem = (item: Item) =>
    this.isPlaying && this.itemBeingShownId === item.id;
}