import { FactInput, Card, InsightInput, DataSourceInput, ConclusionInput } from "../../domain";

export const fromDataSource = (id: string, x: number, y: number, input: DataSourceInput): Card => {
    return {
        id,
        x,
        y,
        type: "data-source",
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
        type: "fact",
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
        type: "insight",
        description: input.description,
        url: input.url,
    };
};

export const fromConclusion = (id: string, x: number, y: number, input: ConclusionInput): Card => {
    return {
        id,
        x,
        y,
        type: "conclusion",
        description: input.description,
        url: input.url,
    };
};

