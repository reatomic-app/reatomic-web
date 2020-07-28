import { DataSourceInput, Card, FactInput, InsightInput, ConclusionInput, Link, Point } from "../../domain";
import { fromFact, fromDataSource, fromConclusion, fromInsight } from './converters';
import { Observable, BehaviorSubject } from "rxjs";
import { List, Range } from "immutable";

// 135 means one level right after the previous one
// the next operand means the real separation between levels
// const SEPARATION = 135 + 40;
// const LEVEL_DATASOURCE = 100;


const createEmptyCard = (type: string) => {
  return {
    type,
    empty: true,
  } as Card
}

const createMatrix = () => {
  const cards = List().merge(
    // eslint-disable-next-line
    Range(0, 100).map((n: number) => createEmptyCard("data-source")).toList(),
    // eslint-disable-next-line
    Range(0, 100).map((n: number) => createEmptyCard("fact")).toList(),
    // eslint-disable-next-line
    Range(0, 100).map((n: number) => createEmptyCard("insight")).toList(),
    // eslint-disable-next-line
    Range(0, 100).map((n: number) => createEmptyCard("conclusion")).toList(),
  )

  return cards;
}

const byIndexedCardOfType = (type: string) =>
  (next: Card): boolean => next.index !== undefined && next.type === type;

export class ProjectManagerStore {
    public _cards$: BehaviorSubject<List<Card>> = new BehaviorSubject<List<Card>>(createMatrix());
    public cards$: Observable<List<Card>> = this._cards$.asObservable();

    public _links$: BehaviorSubject<List<Link>> = new BehaviorSubject<List<Link>>(List.of());
    public links$: Observable<List<Link>> = this._links$.asObservable();

    /**
     * Adds a new card to the graph
     */
    public addCard(card: Card) {
      const cards = this._cards$.getValue();
      const index = cards.findLastIndex(byIndexedCardOfType(card.type))
      const found = index !== -1;

      card.index = found ? index + 1 : card.index = 0;

      this._cards$.next(cards.push(card));
    }

    /**
     * Updates a given card position
     *
     * @param id
     * @param point
     */
    public updateCardPosition(id: string, point: Point) {
      console.log("store:updateCard(id, point)");
    }

    /**
     * Adds new link to graph
     *
     * @param link
     */
    public addLink(link: Link) {
      this._links$.next(this._links$.getValue().push(link));
    }

    /**
     * Adds a new data source
     *
     * @param input
     */
    public addDataSource(input: DataSourceInput): void {
        this.addCard(fromDataSource(input));
    }

    /**
     * Adds a new fact
     *
     * @param input
     */
    public addFact(input: FactInput): void {
        this.addCard(fromFact(input));
    }

    /**
     * Adds a new insight
     *
     * @param input
     */
    public addInsight(input: InsightInput): void {
        this.addCard(fromInsight(input));
    }

    /**
     * Adds a new conclusion
     *
     * @param input
     */
    public addConclusion(input: ConclusionInput): void {
        this.addCard(fromConclusion(input));
    }
}

export default new ProjectManagerStore();
