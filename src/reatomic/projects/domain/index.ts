
export interface Project {
    name: string;
    description: string;
}

export interface DataSourceInput {
    type: string;
    description: string;
    date: Date;
    url: string;
}

export interface FactInput {
    type: string;
    description: string;
    link: string;
}

export interface ConclusionInput {
    description: string;
    url: string;
}

export interface InsightInput {
    description: string;
    url: string;
}