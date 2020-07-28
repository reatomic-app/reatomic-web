import { FactInput, Card, InsightInput, DataSourceInput, ConclusionInput } from "../../domain";
import { generateID } from "@/commons/utils/uuid"

export const fromDataSource = (input: DataSourceInput): Card => {
    return {
        id: generateID(),
        type: "data-source",
        comboId: "data-source",
        date: input.date,
        dataSourceType: input.type,
        description: input.description,
        url: input.url,
    };
};

export const fromFact = (input: FactInput): Card => {
    return {
        id: generateID(),
        type: "fact",
        comboId: "fact",
        factType: input.type,
        description: input.description,
        url: input.url,
    };
};

export const fromInsight = (input: InsightInput): Card => {
    return {
        id: generateID(),
        type: "insight",
        comboId: "insight",
        description: input.description,
        url: input.url,
    };
};

export const fromConclusion = (input: ConclusionInput): Card => {
    return {
        id: generateID(),
        type: "conclusion",
        comboId: "conclusion",
        description: input.description,
        url: input.url,
    };
};

