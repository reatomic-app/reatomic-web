import { FactInput, Card, InsightInput, DataSourceInput, ConclusionInput } from "../../domain";

export const fromDataSource = (id: string, x: number, y: number, input: DataSourceInput): Card => {
    return {
        id,
        x,
        y,
        width: 200,
        height: 260,
        cardType: "dataSource",
        date: input.date,
        dataSourceType: input.type,
        description: input.description,
        url: input.url,
    };
};

export const fromFact = (id: string, x: number, y: number, input: FactInput): Card => {
    return {
        id,
        x,
        y,
        width: 200,
        height: 260,
        cardType: "fact",
        factType: input.type,
        description: input.description,
        url: input.url,
    };
};

export const fromInsight = (id: string, x: number, y: number, input: InsightInput): Card => {
    return {
        id,
        x,
        y,
        width: 200,
        height: 260,
        cardType: "insight",
        description: input.description,
        url: input.url,
    };
};

export const fromConclusion = (id: string, x: number, y: number, input: ConclusionInput): Card => {
    return {
        id,
        x,
        y,
        width: 200,
        height: 260,
        cardType: "conclusion",
        description: input.description,
        url: input.url,
    };
};

