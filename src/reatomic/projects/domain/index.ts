
// DOMAINS

import { GraphData, NodeConfig, EdgeConfig } from '@antv/g6/lib/types';

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
export interface Card {
    id: string;
    x?: number;
    y?: number;
    index?: number;
    type: string;
    empty?: boolean;
    comboId: string;
    width?: number;
    height?: number;
    description: string;
    factType?: string;
    dataSourceType?: string;
    source?: string;
    date?: Date;
    url?: string;
}

export interface Point {
  x: number;
  y: number;
}

export interface Link {
  id: string;
  target?: string;
  targetAnchor?: number;
  source?: string;
  sourceAnchor?: number;
}

export interface LinkEdgeConfig extends EdgeConfig {

}

export interface CardNodeConfig extends NodeConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  cardType: string;
  factType?: string;
  dataSourceType?: string;
  source?: string;
  date?: Date;
  url?: string;
}

export interface DataSourceCard extends Card {

}
