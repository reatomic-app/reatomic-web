import { AddDataSourceUseCase } from "../AddDataSourceUseCase";
import { DataSourceInput, Card, FactInput, InsightInput, ConclusionInput } from "../../domain";
import { Action, Module, Mutation, getModule, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { GraphData } from '@antv/g6/lib/types';
import { fromFact, fromDataSource, fromConclusion, fromInsight } from './converters';

const moduleName = "projects:manager";
let dataSourceCounter = 0;
let factCounter = 0;
let insightCounter = 0;
let conclusionCounter = 0;

@Module({ stateFactory: true, dynamic: true, namespaced: true, name: moduleName, store })
export class ProjectManagerStore extends VuexModule implements AddDataSourceUseCase {
    public graphData: GraphData = {
        nodes: [],
        edges: [],
    };

    @Mutation
    public addNodeCard(card: Card) {
        this.graphData.nodes?.push(card);
    }

    @Action({ commit: "addNodeCard"})
    public addDataSource(input: DataSourceInput): Card {
        const dataSource = fromDataSource(
            "id-data-source-" + dataSourceCounter,
            dataSourceCounter,
            0,
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
            150,
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
            300,    
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
            450,        
            input,
        );
        conclusionCounter += 125;
        return conclusion;
    }    
}

export default getModule(ProjectManagerStore);