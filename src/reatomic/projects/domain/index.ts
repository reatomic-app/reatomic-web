
// DOMAINS

import { GraphData, NodeConfig } from '@antv/g6/lib/types';

export interface Project {
    name: string;
    description: string;
}

export interface DataSource {
    id: string;
    type: string;
    description: string;
    date: Date;
    source: string;
}

export interface Fact {
    id: string;
    type: string;
    description: string;
    link: string;
}

export interface Conclusion {
    id: string;
    description: string;
    url: string;
}

export interface Insight {
    id: string;
    description: string;
    url: string;
}

// INPUTS
export interface DataSourceInput {
    type: string;
    description: string;
    date: Date;
    url: string;
}

export interface FactInput {
    type: string;
    description: string;
    url: string;
}

export interface ConclusionInput {
    description: string;
    url: string;
}

export interface InsightInput {
    description: string;
    url: string;
}

// GRAPH
export interface Card extends NodeConfig {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    cardType: string;
    factType?: string;
    dataSourceType?: string;
    source?: string;
    date?: Date;
    url?: string;
}

export interface DataSourceCard extends Card {

}
