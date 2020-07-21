import { map } from "rxjs/operators";
import { List } from "immutable";

export function toArray<T>() {
  return map((cards: List<T>) => cards.toArray())
}

