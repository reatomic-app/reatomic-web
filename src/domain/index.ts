// DOMAINS

import * as G6 from '@antv/g6/lib';

export interface Data<T> {
  state: 'empty' | 'loading' | 'fetched' | 'error';
  error?: unknown;
  data?: T;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
}

export interface ProjectFull extends Project{
  cards?: Card[];
  links?: Link[];
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
  id?: string;
  cardType: 'data-source' | 'fact' | 'insight' | 'conclusion';
  x?: number;
  y?: number;
  width?: number;
  height?: number;

  description?: string;
  factType?: string;
  dataSourceType?: string;
  source?: string;
  date?: Date;
  url?: string;
}

export interface Link {
  id?: string;
  target?: string;
  targetAnchor?: number;
  source?: string;
  sourceAnchor?: number;
}

export interface LinkEdgeConfig extends G6.EdgeConfig {

}

export interface CardNodeConfig extends G6.NodeConfig {
  x: number;
  y: number;
  width?: number;
  height?: number;
  description?: string;
  cardType: string;
  factType?: string;
  dataSourceType?: string;
  source?: string;
  date?: Date;
  url?: string;
}

export interface DataSourceCard extends Card {

}
