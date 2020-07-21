import { DataSourceInput, Card, FactInput, InsightInput, ConclusionInput, Link } from "../../domain";
import { fromFact, fromDataSource, fromConclusion, fromInsight } from './converters';
import { Observable, BehaviorSubject } from "rxjs";
import { List } from "immutable";
import { generateID } from "@/commons/utils/uuid";

// 135 means one level right after the previous one
// the next operand means the real separation between levels
const SEPARATION = 135 + 40;
const LEVEL_DATASOURCE = 100;
const LEVEL_FACT = LEVEL_DATASOURCE + SEPARATION;
const LEVEL_INSIGHT = LEVEL_FACT + SEPARATION;
const LEVEL_CONCLUSION = LEVEL_INSIGHT + SEPARATION;

let dataSourceCounter = 0;
let factCounter = 0;
let insightCounter = 0;
let conclusionCounter = 0;

export class ProjectManagerStore {
    public _cards$: BehaviorSubject<List<Card>> = new BehaviorSubject<List<Card>>(List.of());
    public cards$: Observable<List<Card>> = this._cards$.asObservable();

    public _links$: BehaviorSubject<List<Link>> = new BehaviorSubject<List<Link>>(List.of());
    public links$: Observable<List<Link>> = this._links$.asObservable();

    public addCard(card: Card) {
      this._cards$.next(this._cards$.getValue().push(card));
    }

    public addLink(link: Link) {
      this._links$.next(this._links$.getValue().push(link));
    }

    public addDataSource(input: DataSourceInput): void {
        const dataSource = fromDataSource(
            generateID(),
            dataSourceCounter,
            LEVEL_DATASOURCE,
            input,
        );
        dataSourceCounter += 125;
        this.addCard(dataSource);
    }

    public addFact(input: FactInput): void {
        const fact = fromFact(
            generateID(),
            factCounter,
            LEVEL_FACT,
            input
        );
        factCounter += 125;
        this.addCard(fact);
    }

    public addInsight(input: InsightInput): void {
        const insight = fromInsight(
            generateID(),
            insightCounter,
            LEVEL_INSIGHT,
            input,
        )
        insightCounter += 125;

        this.addCard(insight);
    }

    public addConclusion(input: ConclusionInput): void {
        const conclusion = fromConclusion(
            generateID(),
            conclusionCounter,
            LEVEL_CONCLUSION,
            input,
        );
        conclusionCounter += 125;
        this.addCard(conclusion);
    }
}

export default new ProjectManagerStore();
