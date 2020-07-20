import { AddDataSourceUseCase } from "../AddDataSourceUseCase";
import { DataSourceInput, Card, FactInput, InsightInput, ConclusionInput, Link } from "../../domain";
import { Action, Module, Mutation, getModule, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { fromFact, fromDataSource, fromConclusion, fromInsight } from './converters';

const moduleName = "projects:manager";

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

@Module({ stateFactory: true, dynamic: true, namespaced: true, name: moduleName, store })
export class ProjectManagerStore extends VuexModule implements AddDataSourceUseCase {
    public graphData = {
        cards: [] as Card[],
        links: [] as Link[],
    };

    @Mutation
    public addNodeCard(card: Card) {
        this.graphData.cards?.push(card);
    }

    @Mutation
    public addEdgeLink(link: Link) {
      this.graphData.links?.push(link);
    }

    @Action({ commit: "addEdgeLink" })
    public addLink(link: Link) {
      return link;
    }

    @Action({ commit: "addNodeCard"})
    public addDataSource(input: DataSourceInput): Card {
        const dataSource = fromDataSource(
            "id-data-source-" + dataSourceCounter,
            dataSourceCounter,
            LEVEL_DATASOURCE,
            input,
        );
        dataSourceCounter += 125;
        return dataSource;
    }

    @Action({ commit: "addNodeCard"})
    public addFact(input: FactInput): Card {
        const fact = fromFact(
            "id-fact-" + factCounter,
            factCounter,
            LEVEL_FACT,
            input
        );
        factCounter += 125;
        return fact;
    }

    @Action({ commit: "addNodeCard"})
    public addInsight(input: InsightInput): Card {
        const insight = fromInsight(
            "id-insight-" + insightCounter,
            insightCounter,
            LEVEL_INSIGHT,
            input,
        )
        insightCounter += 125;
        return insight;
    }

    @Action({ commit: "addNodeCard"})
    public addConclusion(input: ConclusionInput): Card {
        const conclusion = fromConclusion(
            "id-conclusion-" + conclusionCounter,
            conclusionCounter,
            LEVEL_CONCLUSION,
            input,
        );
        conclusionCounter += 125;
        return conclusion;
    }
}

export default getModule(ProjectManagerStore);
