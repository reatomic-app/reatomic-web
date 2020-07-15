import { AddDataSourceUseCase } from "../AddDataSourceUseCase";
import { DataSourceInput, Card, FactInput, InsightInput, ConclusionInput } from "../../domain";
import { Action, Module, Mutation, getModule, VuexModule } from "vuex-module-decorators";
import store from "@/store";
import { GraphData } from '@antv/g6/lib/types';

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
        const data =  {
            id: "id-data-source-" + dataSourceCounter,
            x: dataSourceCounter,
            y: 0,
            width: 200,
            height: 260,
            cardType: "dataSource",
        }

        dataSourceCounter += 125;
        return data;
    }

    @Action({ commit: "addNodeCard"})
    public addFact(input: FactInput): Card {
        const data = {
            id: "id-fact-" + factCounter,
            x: factCounter,
            y: 150,
            width: 200,
            height: 260,
            cardType: "fact",
            factType: "gain"
        }

        factCounter += 125;
        return data;
    }

    @Action({ commit: "addNodeCard"})
    public addInsight(input: InsightInput): Card {
        const data = {
            id: "id-insight-" + insightCounter,
            x: insightCounter,
            y: 300,
            width: 200,
            height: 260,
            cardType: "insight",
        }

        insightCounter += 125;
        return data;
    }

    @Action({ commit: "addNodeCard"})
    public addConclusion(input: ConclusionInput): Card {
        const data = {
            id: "id-conclusion-" + conclusionCounter,
            x: conclusionCounter,
            y: 450,
            width: 200,
            height: 260,
            cardType: "conclusion",
        }

        conclusionCounter += 125;
        return data;
    }    
}

export default getModule(ProjectManagerStore);